import type { Components, JSX } from "../types/components";

interface FeatureCardComponent extends Components.FeatureCardComponent, HTMLElement {}
export const FeatureCardComponent: {
    prototype: FeatureCardComponent;
    new (): FeatureCardComponent;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
