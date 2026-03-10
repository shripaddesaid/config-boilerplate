import type { Components, JSX } from "../types/components";

interface ModalOverlay extends Components.ModalOverlay, HTMLElement {}
export const ModalOverlay: {
    prototype: ModalOverlay;
    new (): ModalOverlay;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
