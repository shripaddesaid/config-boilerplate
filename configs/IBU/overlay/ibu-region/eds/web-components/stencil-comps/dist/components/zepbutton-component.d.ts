import type { Components, JSX } from "../types/components";

interface ZepbuttonComponent extends Components.ZepbuttonComponent, HTMLElement {}
export const ZepbuttonComponent: {
    prototype: ZepbuttonComponent;
    new (): ZepbuttonComponent;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
