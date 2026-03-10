import type { Components, JSX } from "../types/components";

interface ButtonComponent extends Components.ButtonComponent, HTMLElement {}
export const ButtonComponent: {
    prototype: ButtonComponent;
    new (): ButtonComponent;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
