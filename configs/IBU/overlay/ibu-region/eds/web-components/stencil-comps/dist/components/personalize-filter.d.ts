import type { Components, JSX } from "../types/components";

interface PersonalizeFilter extends Components.PersonalizeFilter, HTMLElement {}
export const PersonalizeFilter: {
    prototype: PersonalizeFilter;
    new (): PersonalizeFilter;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
