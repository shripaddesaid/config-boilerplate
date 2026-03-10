import type { Components, JSX } from "../types/components";

interface SheetComponent extends Components.SheetComponent, HTMLElement {}
export const SheetComponent: {
    prototype: SheetComponent;
    new (): SheetComponent;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
