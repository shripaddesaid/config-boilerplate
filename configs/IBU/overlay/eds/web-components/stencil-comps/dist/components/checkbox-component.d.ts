import type { Components, JSX } from "../types/components";

interface CheckboxComponent extends Components.CheckboxComponent, HTMLElement {}
export const CheckboxComponent: {
    prototype: CheckboxComponent;
    new (): CheckboxComponent;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
