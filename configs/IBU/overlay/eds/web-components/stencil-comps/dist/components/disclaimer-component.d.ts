import type { Components, JSX } from "../types/components";

interface DisclaimerComponent extends Components.DisclaimerComponent, HTMLElement {}
export const DisclaimerComponent: {
    prototype: DisclaimerComponent;
    new (): DisclaimerComponent;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
