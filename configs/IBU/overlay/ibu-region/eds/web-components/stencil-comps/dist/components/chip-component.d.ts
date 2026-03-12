import type { Components, JSX } from "../types/components";

interface ChipComponent extends Components.ChipComponent, HTMLElement {}
export const ChipComponent: {
    prototype: ChipComponent;
    new (): ChipComponent;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
