import type { Components, JSX } from "../types/components";

interface AccordionComponent extends Components.AccordionComponent, HTMLElement {}
export const AccordionComponent: {
    prototype: AccordionComponent;
    new (): AccordionComponent;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
