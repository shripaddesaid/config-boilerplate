import type { Components, JSX } from "../types/components";

interface SleepApneaQuiz extends Components.SleepApneaQuiz, HTMLElement {}
export const SleepApneaQuiz: {
    prototype: SleepApneaQuiz;
    new (): SleepApneaQuiz;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
