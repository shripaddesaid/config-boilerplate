/**
 * RowBreak Component Class
 * Forces content to flow in rows (full width) instead of columns.
 */
class RowBreak {
  constructor(block) {
    this.block = block;
    this.parentDiv = block.parentElement?.parentElement;
  }

  isAuthorMode() {
    try {
      return (
        window.top?.location?.href.includes("ui#") ||
        window.location.href.includes("ui#")
      );
    } catch {
      return window.location.href.includes("ui#");
    }
  }

  createAuthorPlaceholder() {
    const placeholder = document.createElement("div");
    placeholder.className = "row-break-placeholder col-12";
    Object.assign(placeholder.style, {
      minHeight: "2rem",
      border: ".125rem dashed #f44336",
      padding: ".75rem",
      textAlign: "center",
      color: "#f44336",
      background: "#ffebee",
      fontWeight: "bold",
    });
    placeholder.textContent = "Row Break (Author Only)";

    this.block.innerHTML = "";
    this.block.appendChild(placeholder);
  }

  processLayout() {
    this.block.textContent = "";

    if (!this.parentDiv?.classList.contains("section")) return;

    const hasRowBreaks = this.parentDiv.querySelector(".row-break-wrapper");
    const hasColumnBreaks = this.parentDiv.querySelector(
      ".column-break-wrapper",
    );

    if (hasRowBreaks && hasColumnBreaks) return; // Let column-break handle mixed layout
    if (hasRowBreaks) this.parentDiv.classList.add("row-break-only");
  }

  processMixedLayout(parentDiv) {
    const children = Array.from(parentDiv.children);
    const breakPoints = children
      .map((el, index) => {
        if (el.classList.contains("row-break-wrapper"))
          return { index, type: "row" };
        if (el.classList.contains("column-break-wrapper"))
          return { index, type: "column" };
        return null;
      })
      .filter(Boolean);

    if (!breakPoints.length) return;

    const extraStyles = parentDiv.getAttribute("data-extra-styles");
    parentDiv.classList.add("multi-column-split", "row");
    extraStyles
      ?.split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .forEach((cls) => parentDiv.classList.add(cls));

    const splitClass = Array.from(parentDiv.classList).find((cls) =>
      cls.match(/(two|three|four)-col-\d+(-\d+)*/),
    );
    const gridClass =
      splitClass?.replace(/(two|three|four)-col-/, "") || "50-50";

    const segments = this.createSegments(children, breakPoints);

    parentDiv.innerHTML = "";
    const wrapper = this.createElement("div", ["column-container-wrapper"]);

    segments.forEach((segment) => {
      if (!segment.elements.length) return;

      if (segment.mode === "row") {
        this.createRowSegment(wrapper, segment.elements);
      } else {
        this.createColumnSegment(
          wrapper,
          segment.elements,
          gridClass,
          parentDiv,
        );
      }
    });

    parentDiv.appendChild(wrapper);
  }

  createSegments(children, breakPoints) {
    const segments = [];
    let start = 0;
    let currentMode = "column";

    breakPoints.forEach(({ index, type }) => {
      if (start < index) {
        segments.push({
          elements: children.slice(start, index),
          mode: currentMode,
        });
      }
      currentMode = type;
      start = index + 1;
    });

    if (start < children.length) {
      segments.push({ elements: children.slice(start), mode: currentMode });
    }

    return segments;
  }

  createElement(tag, classes = [], attributes = {}) {
    const element = document.createElement(tag);
    if (classes.length) element.classList.add(...classes);
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
    return element;
  }

  createRowSegment(container, elements) {
    const outerLayout = this.createElement("div", ["lds-layout-container"]);
    const col12 = this.createElement("div", ["col-12"]);

    elements.forEach((el) => {
      const rowWrapper = this.createElement("div", ["row-break-item"]);
      rowWrapper.appendChild(el);
      col12.appendChild(rowWrapper);
    });

    outerLayout.appendChild(col12);
    container.appendChild(outerLayout);
  }

  createColumnSegment(container, elements, gridClass, sectionElement) {
    const columnBreakIndices = elements
      .map((el, idx) =>
        el.classList.contains("column-break-wrapper") ? idx : -1,
      )
      .filter((idx) => idx !== -1);

    const outerLayout = this.createElement("div", ["lds-layout-container"]);
    const col12 = this.createElement("div", ["col-12"]);
    const innerLayout = this.createElement("div", [
      "lds-layout-container",
      "disable-layout-margins",
    ]);

    if (columnBreakIndices.length === 0) {
      const innerClasses = Array.from(sectionElement.classList).filter((cls) =>
        cls.startsWith("inner-"),
      );
      innerLayout.classList.add(...innerClasses);
      elements.forEach((el) => innerLayout.appendChild(el));
    } else {
      const columns = this.splitIntoColumns(elements, columnBreakIndices);
      if (gridClass) innerLayout.classList.add(`grid-${gridClass}`);

      const innerClasses = Array.from(sectionElement.classList).filter((cls) =>
        cls.startsWith("inner-"),
      );
      innerLayout.classList.add(...innerClasses);

      columns.forEach((columnElements, i) => {
        const colDiv = this.createElement("div", ["column"], {
          "data-column-index": i,
        });
        columnElements.forEach((el) => colDiv.appendChild(el));
        innerLayout.appendChild(colDiv);
      });
    }

    col12.appendChild(innerLayout);
    outerLayout.appendChild(col12);
    container.appendChild(outerLayout);
  }

  splitIntoColumns(elements, breakIndices) {
    const columns = [];
    let start = 0;

    breakIndices.forEach((idx) => {
      columns.push(elements.slice(start, idx));
      start = idx + 1;
    });

    columns.push(elements.slice(start));
    return columns;
  }

  render() {
    this.isAuthorMode() ? this.createAuthorPlaceholder() : this.processLayout();
    return this.block;
  }
}

export default function decorate(block) {
  if (!block) return;
  new RowBreak(block).render();
}
