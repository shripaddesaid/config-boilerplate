import type { Components, JSX } from "../types/components";

interface BeaconQuiz extends Components.BeaconQuiz, HTMLElement {}
export const BeaconQuiz: {
    prototype: BeaconQuiz;
    new (): BeaconQuiz;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
