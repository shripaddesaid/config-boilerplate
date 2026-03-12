const fs = require("fs");
const path = require("path");
const glob = require("glob");
// Enhanced pointer resolution: handles arrays by id if pointer includes "arrkey/id/".
function resolvePointer(obj, pointer) {
  if (!pointer || pointer === "#") return obj;
  const parts = pointer.replace(/^#\//, "").split("/").filter(p => p !== ""); // Filter out empty parts from trailing slashes
  let current = obj;
  for (let i = 0; i < parts.length; i++) {
    if (Array.isArray(current)) {
      // Look ahead: if next part matches an 'id' or 'name', descend to that object
      const idValue = parts[i];
      const arrObj = current.find((x) => x.id === idValue || x.name === idValue);
      if (!arrObj) return undefined;
      current = arrObj;
    } else if (current && typeof current === "object") {
      current = current[parts[i]];
    } else {
      return undefined;
    }
  }
  return current;
}
// Include only specific fields by their "name" and maintain the order specified in the include array
function includeFields(arr, include) {
  if (!Array.isArray(arr)) return arr;
  if (!Array.isArray(include)) return arr;
  
  // Create a map for quick lookup
  const fieldMap = new Map();
  for (const item of arr) {
    if (item && item.name) {
      fieldMap.set(item.name, item);
    }
  }
  
  // Return fields in the order specified by the include array
  const result = [];
  for (const name of include) {
    if (fieldMap.has(name)) {
      result.push(fieldMap.get(name));
    }
  }
  return result;
}
// Exclude fields by their "name"
function excludeFields(arr, exclude) {
  if (!Array.isArray(arr)) return arr;
  if (!Array.isArray(exclude)) return arr;
  return arr.filter((item) => !exclude.includes(item.name));
}
// Insert a field at a specific position in the array
function insertFieldAtPosition(arr, field, position) {
  if (position === undefined || position === null) {
    // Default behavior: append to end
    // If a field with the same name already exists remove it (we're replacing)
    if (field && field.name) {
      const existingIndex = arr.findIndex((f) => f && f.name === field.name);
      if (existingIndex !== -1) arr.splice(existingIndex, 1);
    }
    arr.push(field);
  } else {
    // Insert at specified position (0-based index)
    const index = Math.max(0, Math.min(position, arr.length));
    // If a field with the same name already exists remove it first to avoid duplicates
    if (field && field.name) {
      const existingIndex = arr.findIndex((f) => f && f.name === field.name);
      if (existingIndex !== -1) {
        // Adjust insertion index if the existing item was before the target insertion point
        if (existingIndex < index) {
          arr.splice(existingIndex, 1);
          // existing item removed shifts indices left by 1
          const adjustedIndex = Math.max(0, index - 1);
          arr.splice(adjustedIndex, 0, field);
          return;
        }
        arr.splice(existingIndex, 1);
      }
    }
    arr.splice(index, 0, field);
  }
}
function resolveFields(fieldsArr, contextDir, options = {}) {
  const out = [];
  const fieldsToInsert = []; // Store fields with insertAt positions for later processing
  // options: { modelId, excludesByModel }
  options.excludesByModel = options.excludesByModel || {};
  for (const field of fieldsArr) {
    if (field && field["..."]) {
      const spread = field["..."];
      const hashIdx = spread.indexOf("#");
      const srcPath = hashIdx === -1 ? spread : spread.slice(0, hashIdx);
      const pointerRaw = hashIdx === -1 ? "" : spread.slice(hashIdx);
      // Detect if the spread originally targeted a single named field
      const fieldPointerMatch = pointerRaw.match(
        /^#\/models\/[^\/]+\/fields\/([^\/]+)$/
      );
      const targetedFieldName = fieldPointerMatch ? fieldPointerMatch[1] : null;
      // rewrite pointer to the whole fields array if it pointed to a single field
      const pointerToUse = fieldPointerMatch
        ? pointerRaw.replace(/(\/fields)\/[^\/]+$/, "$1")
        : pointerRaw || "#";
      const resolvedPath = path.resolve(contextDir, srcPath);
      let jsonSrc;
      try {
        jsonSrc = JSON.parse(fs.readFileSync(resolvedPath, "utf8"));
      } catch (err) {
        console.warn(`WARNING: Could not read ${resolvedPath}: ${err.message}`);
        continue;
      }
      let resolved = resolvePointer(jsonSrc, pointerToUse);
      // Fallback: if pointer resolution failed for simple pointers like "#/cta-one",
      // try to find an object in the included JSON that has an `id` or `name` equal
      // to the pointer token. This supports files that expose field fragments by id.
      if (resolved === undefined) {
        const simpleNameMatch = (pointerToUse || "").match(/^#\/([^\/]+)$/);
        if (simpleNameMatch) {
          const targetName = simpleNameMatch[1];
          // recursive search helper
          const findByIdOrName = (obj, target) => {
            if (obj === null || obj === undefined) return undefined;
            if (Array.isArray(obj)) {
              for (const item of obj) {
                if (item && (item.id === target || item.name === target))
                  return item;
                const nested = findByIdOrName(item, target);
                if (nested !== undefined) return nested;
              }
            } else if (typeof obj === "object") {
              // if this object itself matches
              if (obj.id === target || obj.name === target) return obj;
              for (const k of Object.keys(obj)) {
                const nested = findByIdOrName(obj[k], target);
                if (nested !== undefined) return nested;
              }
            }
            return undefined;
          };
          const found = findByIdOrName(jsonSrc, targetName);
          if (found !== undefined) {
            resolved = found;
          }
        }
      }
      if (resolved === undefined) {
        console.warn(
          `WARNING: Could not resolve ${spread} (file: ${resolvedPath}, pointer: ${
            pointerToUse || "#"
          })`
        );
        continue;
      }
      // Normalize resolved into array of field objects
      let resolvedFields = [];
      if (Array.isArray(resolved)) {
        if (
          resolved.length > 0 &&
          resolved[0] &&
          (resolved[0].name || resolved[0].component)
        ) {
          // It's already an array of field objects
          resolvedFields = [...resolved];
        } else if (resolved.length > 0 && resolved[0] && resolved[0]["..."]) {
          // It's an array of spread pointers (e.g. models -> fields contains spread objects).
          // Resolve those spreads relative to the included file's directory.
          try {
            const includedDir = path.dirname(resolvedPath);
            resolvedFields = resolveFields(resolved, includedDir);
          } catch (err) {
            console.warn(
              `Warning resolving nested array-of-spreads for ${spread}: ${err.message}`
            );
            resolvedFields = [];
          }
        } else {
          // It may be an array of model objects; collect their `.fields` arrays
          for (const md of resolved) {
            if (md && Array.isArray(md.fields))
              resolvedFields.push(...md.fields);
          }
        }
      } else if (resolved && typeof resolved === "object") {
        if (Array.isArray(resolved.fields)) {
          resolvedFields = [...resolved.fields];
        } else {
          resolvedFields = [resolved];
        }
      }
      // If the resolved fields come from another file, resolve any nested spreads
      // relative to that file's directory so nested "..." pointers are found correctly.
      try {
        const includedDir = path.dirname(resolvedPath);
        // Only recurse if we actually resolved a file path
        if (includedDir) {
          resolvedFields = resolveFields(resolvedFields, includedDir, options);
        }
      } catch (err) {
        // In case of recursion errors or other issues, continue with what we have
        // but warn so maintainers can investigate.
        console.warn(
          `Warning resolving nested spreads for ${spread}: ${err.message}`
        );
      }
      // If the spread originally targeted a single named field, limit to that field only.
      if (targetedFieldName) {
        resolvedFields = resolvedFields.filter(
          (f) => f && f.name === targetedFieldName
        );
      }
      // Apply include filter first (if present, only keep specified fields)
      if (Array.isArray(field.include) && field.include.length > 0) {
        resolvedFields = includeFields(resolvedFields, field.include);
      }
      // Apply excludes (field.exclude refers to names to exclude)
      if (
        Array.isArray(field.exclude) &&
        field.exclude.length > 0 &&
        options.modelId
      ) {
        // record excludes by model id for downstream pruning (e.g., component-definition)
        const set = options.excludesByModel[options.modelId] || new Set();
        for (const n of field.exclude) set.add(n);
        options.excludesByModel[options.modelId] = set;
      }
      resolvedFields = excludeFields(resolvedFields, field.exclude);
      
      // Apply exclusions to nested container fields
      // If any of the resolved fields are containers, apply the same exclusions to their nested fields
      if (Array.isArray(field.exclude) && field.exclude.length > 0) {
        for (const rf of resolvedFields) {
          if (rf && rf.component === 'container' && Array.isArray(rf.fields)) {
            rf.fields = excludeFields(rf.fields, field.exclude);
          }
        }
      }
      
      // Apply container field overrides if specified
      // Format: "containerName.fieldName": { overrides }
      if (field.containerOverrides && typeof field.containerOverrides === 'object') {
        for (const rf of resolvedFields) {
          if (rf && rf.component === 'container' && Array.isArray(rf.fields) && rf.name) {
            const containerName = rf.name;
            // Check if there are overrides for this container
            for (const [key, overrideValue] of Object.entries(field.containerOverrides)) {
              if (key.startsWith(containerName + '.')) {
                const fieldName = key.substring(containerName.length + 1);
                // Find the field in the container and apply overrides
                const fieldIndex = rf.fields.findIndex(f => f && f.name === fieldName);
                if (fieldIndex !== -1) {
                  const cleanOverride = { ...overrideValue };
                  delete cleanOverride.insertAt; // Remove insertAt from override properties
                  delete cleanOverride.exclude; // Remove exclude from override properties (deprecated, use excludeProperties)
                  delete cleanOverride.excludeProperties; // Remove excludeProperties from override properties
                  
                  // Apply overrides to the field
                  rf.fields[fieldIndex] = { ...rf.fields[fieldIndex], ...cleanOverride };
                  
                  // Handle property exclusion within the field
                  // Support both "exclude" (for backward compatibility) and "excludeProperties" (preferred)
                  const propsToExclude = overrideValue.excludeProperties || overrideValue.exclude;
                  if (Array.isArray(propsToExclude) && propsToExclude.length > 0) {
                    for (const prop of propsToExclude) {
                      delete rf.fields[fieldIndex][prop];
                    }
                  }
                  
                  // Handle insertAt for positioning within container
                  if (overrideValue.insertAt !== undefined) {
                    const targetField = rf.fields[fieldIndex];
                    rf.fields.splice(fieldIndex, 1); // Remove from current position
                    const insertPos = Math.min(overrideValue.insertAt, rf.fields.length);
                    rf.fields.splice(insertPos, 0, targetField); // Insert at specified position
                  }
                }
              }
            }
          }
        }
      }
      // Merge overrides from the spread object into each resolved field
      const overrides = { ...field };
      delete overrides["..."];
      delete overrides.include;
      delete overrides.exclude;
      delete overrides.insertAt; // Remove insertAt from field properties
      delete overrides.containerOverrides; // Remove containerOverrides from field properties
      delete overrides.excludeProperties; // Remove excludeProperties from field properties
      for (const rf of resolvedFields) {
        const merged = { ...rf, ...overrides };

        // Handle property exclusion within the field
        // Support both "exclude" (for backward compatibility with containerOverrides) 
        // and "excludeProperties" (for clarity at top level)
        const propsToExclude = field.excludeProperties || field.exclude;
        if (Array.isArray(propsToExclude) && propsToExclude.length > 0) {
          // Only exclude properties that are NOT field names (to avoid confusion with field exclusion)
          for (const prop of propsToExclude) {
            if (typeof prop === 'string' && prop in merged) {
              delete merged[prop];
            }
          }
        }

        // If a field with the same name already exists in `out`, replace it
        if (merged && merged.name) {
          const existingIndex = out.findIndex(
            (f) => f && f.name === merged.name
          );
          if (existingIndex !== -1 && field.insertAt === undefined) {
            out[existingIndex] = merged;
            continue;
          }
          // If insertAt is provided, we'll handle duplicate removal when inserting
        }

        // Check if this field should be inserted at a specific position
        if (field.insertAt !== undefined) {
          fieldsToInsert.push({ field: merged, position: field.insertAt });
        } else {
          out.push(merged);
        }
      }
    } else {
      // Handle regular fields (non-spread)
      if (field.insertAt !== undefined) {
        const fieldCopy = { ...field };
        delete fieldCopy.insertAt; // Remove insertAt from field properties
        fieldsToInsert.push({ field: fieldCopy, position: field.insertAt });
      } else {
        out.push(field);
      }
    }
  }

  // Sort fields to insert by position (ascending) to maintain correct insertion order
  fieldsToInsert.sort((a, b) => a.position - b.position);

  // Insert fields at their specified positions
  for (const { field, position } of fieldsToInsert) {
    insertFieldAtPosition(out, field, position);
  }

  // Recursively resolve nested fields in container components
  // Note: The contextDir for nested fields should be the same as the parent context,
  // since the container definition itself may have come from an included file
  for (const field of out) {
    if (field && field.component === 'container' && Array.isArray(field.fields)) {
      // Check if any of the nested fields contain spread operators
      const hasNestedSpreads = field.fields.some(f => f && f["..."]);
      if (hasNestedSpreads) {
        field.fields = resolveFields(field.fields, contextDir, options);
      }
      // Apply parent-level exclusions to container fields
      // This ensures fields excluded at the parent level are also removed from containers
      if (options.modelId && options.excludesByModel && options.excludesByModel[options.modelId]) {
        const excludeList = Array.from(options.excludesByModel[options.modelId]);
        field.fields = excludeFields(field.fields, excludeList);
      }
    }
  }

  return out;
}
// ...existing code...
function buildComponentModels({ modelsFile, outputFile }) {
  const entries = JSON.parse(fs.readFileSync(modelsFile, "utf8"));
  let mergedModels = {};
  for (const entry of entries) {
    const spread = entry["..."];
    if (!spread) continue;
    const [srcPattern, pointerRaw] = spread.split("#");
    const pointer = pointerRaw ? `#${pointerRaw}` : undefined;
    const files = glob.sync(path.resolve(path.dirname(modelsFile), srcPattern));
    for (const file of files) {
      const fileJson = JSON.parse(fs.readFileSync(file, "utf8"));
      const picked = resolvePointer(fileJson, pointer);
      if (Array.isArray(picked)) {
        // e.g., models is an array
        for (const model of picked) {
          const outModel = { ...model };
          if (Array.isArray(outModel.fields)) {
            outModel.fields = resolveFields(
              outModel.fields,
              path.dirname(file)
            );
          }
          if (!outModel.id) continue;
          mergedModels[outModel.id] = outModel;
        }
      }
    }
  }
  fs.writeFileSync(outputFile, JSON.stringify(mergedModels, null, 2), "utf8");
  console.log("component-models.json generated at:", outputFile);
  // convert mergedModels map to array of model objects (remove top-level named keys)
  const modelsArray = Object.values(mergedModels);
  fs.writeFileSync(outputFile, JSON.stringify(modelsArray, null, 2), "utf8");
  console.log(
    "component-models.json generated (array of models) at:",
    outputFile
  );
}

// Helper function to remove excluded properties and apply overrides to a definition object
function applyDefinitionExclusions(definition, excludeList, overrides = {}) {
  if (!Array.isArray(excludeList) || excludeList.length === 0) {
    // No exclusions, but we still might have overrides
    if (Object.keys(overrides).length === 0) {
      return definition;
    }
  }

  // Deep clone the definition to avoid mutating the original
  const result = JSON.parse(JSON.stringify(definition));

  // Remove excluded properties and apply overrides to the template object
  if (result.plugins?.xwalk?.page?.template) {
    const template = result.plugins.xwalk.page.template;
    
    // Remove excluded properties
    for (const excludeKey of excludeList || []) {
      delete template[excludeKey];

      // Also check nested items (like item0, item1, etc.) for excluded properties
      for (const key in template) {
        if (typeof template[key] === "object" && template[key] !== null) {
          delete template[key][excludeKey];
        }
      }
    }
    
    // Apply overrides (merge new property values into template)
    for (const [key, value] of Object.entries(overrides)) {
      template[key] = value;
    }
  }

  return result;
}

// Helper function to recursively resolve definition spreads
function resolveDefinitionSpreads(definitionsList, contextDir) {
  const resolved = [];

  for (const def of definitionsList) {
    const spread = def["..."];

    if (!spread) {
      // Not a spread, just add it as-is
      resolved.push(def);
      continue;
    }

    // Parse the spread
    const excludeList = def.exclude || [];
    
    // Extract overrides (any properties other than "...", "exclude")
    const overrides = {};
    for (const [key, value] of Object.entries(def)) {
      if (key !== "..." && key !== "exclude") {
        overrides[key] = value;
      }
    }
    
    const [srcPattern, pointerRaw] = spread.split("#");
    const pointer = pointerRaw ? `#${pointerRaw}` : undefined;
    const files = glob.sync(path.resolve(contextDir, srcPattern));

    for (const file of files) {
      try {
        const fileJson = JSON.parse(fs.readFileSync(file, "utf8"));
        const picked = resolvePointer(fileJson, pointer);

        if (Array.isArray(picked)) {
          // Recursively resolve any spreads in the picked array
          const nestedResolved = resolveDefinitionSpreads(
            picked,
            path.dirname(file)
          );
          for (const nestedDef of nestedResolved) {
            const processedDef = applyDefinitionExclusions(
              nestedDef,
              excludeList,
              overrides
            );
            resolved.push(processedDef);
          }
        } else if (picked) {
          // Single definition object
          const processedDef = applyDefinitionExclusions(picked, excludeList, overrides);
          resolved.push(processedDef);
        }
      } catch (err) {
        console.warn(`WARNING: Could not process ${file}: ${err.message}`);
      }
    }
  }

  return resolved;
}

function buildComponentDefinitions({ definitionsFile, outputFile }) {
  const data = JSON.parse(fs.readFileSync(definitionsFile, "utf8"));

  if (!data.groups || !Array.isArray(data.groups)) {
    throw new Error(
      "Invalid component-definition.json structure: missing 'groups' array"
    );
  }

  const result = { groups: [] };

  for (const group of data.groups) {
    const processedGroup = {
      title: group.title,
      id: group.id,
      components: [],
    };

    if (Array.isArray(group.components)) {
      const resolvedComponents = resolveDefinitionSpreads(
        group.components,
        path.dirname(definitionsFile)
      );
      processedGroup.components.push(...resolvedComponents);
    }

    result.groups.push(processedGroup);
  }

  fs.writeFileSync(outputFile, JSON.stringify(result, null, 2), "utf8");
  console.log("component-definition.json generated at:", outputFile);
}

if (require.main === module) {
  const [, , inputFile, outputFile] = process.argv;

  // Detect if we're processing models or definitions based on filename
  if (
    inputFile.includes("component-models") ||
    inputFile.includes("_component-models")
  ) {
    buildComponentModels({
      modelsFile: inputFile,
      outputFile: outputFile,
    });
  } else if (
    inputFile.includes("component-definition") ||
    inputFile.includes("_component-definition")
  ) {
    buildComponentDefinitions({
      definitionsFile: inputFile,
      outputFile: outputFile,
    });
  } else {
    // Default to models for backward compatibility
    buildComponentModels({
      modelsFile: inputFile,
      outputFile: outputFile,
    });
  }
}