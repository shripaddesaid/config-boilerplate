import type { Components, JSX } from "../types/components";

interface ZepboundQuiz extends Components.ZepboundQuiz, HTMLElement {}
export const ZepboundQuiz: {
    prototype: ZepboundQuiz;
    new (): ZepboundQuiz;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
