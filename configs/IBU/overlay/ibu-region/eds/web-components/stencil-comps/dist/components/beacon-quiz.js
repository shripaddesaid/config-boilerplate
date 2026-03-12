import { h, p as proxyCustomElement, H } from './index.js';
import { i as isCorrectAns } from './p-BCZFNITE.js';
import { G as GreenCheckIcon, R as RedCrossIcon, B as BackIcon } from './p-CRE7AF9B.js';
import { d as defineCustomElement$2 } from './p-BPUpDc6t.js';

const defaultBeaconQuestionSet = {
    data: [
        {
            sub_header: 'True or False',
            question: 'In phase 3 cancer clinical trials, half of participants will always receive a placebo',
            option1: 'True',
            option2: 'False',
            correct_answer: 'option2',
            explanation: 'When participants join a phase 3 cancer clinical trial, they receive care no matter what. In most cases, they receive either a currently recommended treatment or a research treatment.Because cancer is a serious disease, placebos are usually only used in combination with the recommended treatment or when the recommended treatment does not include any medication. ',
        },
        {
            sub_header: 'Multiple Choice',
            question: 'Participants in cancer clinical trials may receive additional care and specialized attention from…',
            option1: 'Specialized doctors',
            option2: 'Clinical trial nurses',
            option3: 'Clinical trial coordinators',
            option4: 'All of the above',
            correct_answer: 'option4',
            explanation: 'In a cancer clinical trial, additional care and monitoring may come from specialized doctors, nurses, and trial coordinators connected to the study',
        },
        {
            sub_header: 'True or False',
            question: 'Cancer clinical trials provide access to the latest research treatments before they’re widely available.',
            option1: 'True',
            option2: 'False',
            correct_answer: 'option1',
            explanation: 'Clinical trials offer participants access to new research treatments. These investigational treatments often represent some of the most recent scientific advancements in cancer research.',
        },
        {
            sub_header: 'Multiple Choice',
            question: 'Cancer clinical trials are available for which stages of cancer?',
            option1: 'Stage 1',
            option2: 'Stage 2',
            option3: 'Stage 3',
            option4: 'Stage 4',
            option5: 'All of the above',
            correct_answer: 'option5',
            explanation: 'Clinical trials are available, even at the earliest stages, for most types of cancer. Some participants may be eligible for a trial at the beginning of their cancer treatment plan.',
        },
        {
            sub_header: 'One Last Question!',
            question: 'Which of the following best describes you?',
            option1: 'Patient',
            option2: 'Caregiver',
            option3: 'Healthcare provider',
            option4: 'Member of an advocacy organization',
            option5: 'None of the above, just interested in learning more about clinical trials',
        },
    ],
};

const InitialCard = ({ handleProceedQuiz, quizTitle, quizDescription, isLoading, btnTitle }) => {
    return (h("div", { class: "parent-container initial-side-card d-flex" }, h("div", { class: "d-flex flex-row justify-content-start gap-3", "aria-labelledby": "initial-label" }, h("div", { class: "parent-container-child initial-side-card" }, h("div", { class: "parent-container__content" }, h("h2", { class: "parent-container_child__header mb-0" }, quizTitle), h("p", { class: "parent-container_child__paragraph" }, quizDescription)), h("div", { class: "parent-container_child__button" }, h("button-component", { label: "Take the quiz", isLoading: isLoading, onBtnClick: () => handleProceedQuiz(), btnId: "initial-quiz-start" }, btnTitle))), h("div", { class: "parent-container__right___column" }))));
};

const ResultCard = ({ pyBtnTitle, syBtnTitle, result, handleRevealAllAnswers, handleRestartQuiz, customText, syBtnUrl }) => {
    return (h("div", { class: "parent-container initial-side-card d-flex final-card" }, h("div", { class: "d-flex flex-row justify-content-start gap-3", "aria-labelledby": "initial-label" }, h("div", { class: "parent-container-child" }, h("div", { class: "parent-container__content" }, h("h2", { class: "parent-container_child__header" }, result), h("button-component", { label: pyBtnTitle, onBtnClick: handleRestartQuiz || (() => { }), btnId: "take-quiz-again" }, pyBtnTitle), h("p", { class: "parent-container_child__paragraph" }, customText)), h("div", { class: "parent-container_child__button" }, h("div", { class: "osa-toast mt-2" }, h("button-component", { label: syBtnTitle, onBtnClick: syBtnUrl ? () => window.location.href = syBtnUrl : handleRevealAllAnswers, isbtnprimary: "No", isArrow: false, btnId: "find-trial" }, syBtnTitle)))), h("div", { class: "parent-container__right___column" }))));
};

// Helper function to get the correct answer text
const getCorrectAnswerText = (structure) => {
    if (structure.correct_answer && structure[structure.correct_answer]) {
        return String(structure[structure.correct_answer]).toLowerCase();
    }
    return '';
};
const renderFeedback = ({ isClicked, capturedAnswer, isAnswerRevealed, structure, handleRevealAnswer }) => {
    // Don't show feedback for questions without correct_answer (like demographic questions)
    if (!structure.correct_answer) {
        return null;
    }
    const correctAnswerText = getCorrectAnswerText(structure);
    return (h(h.Fragment, null, isClicked && capturedAnswer && isAnswerRevealed.timeodOutReveal && (h("div", { class: "feedback-wrapper" }, h("div", { class: "feedback-message" }, h("span", { class: "feedback-icon" }, h(GreenCheckIcon, { className: "feedback-icon__img", strokeColor: "#025676" })), h("span", { class: "feedback-wrapper__text d-flex align-items-center", role: "alert" }, h("span", null, "The correct answer is", correctAnswerText ? ` ${correctAnswerText.charAt(0).toLowerCase() + correctAnswerText.slice(1)}` : ''))))), !capturedAnswer && isClicked && (h("div", { class: "feedback-wrapper" }, h("div", { class: "feedback-message" }, h("span", { class: "feedback-icon" }, h("span", { class: "d-flex align-items-center" }, h(RedCrossIcon, { className: "feedback-icon__img", strokeColor: "#CE1562" }))), h("span", { class: "feedback-wrapper__text d-flex align-items-center font-bold small", role: "alert" }, isAnswerRevealed.moreThanOneWrongAttempt ? (h("span", null, "Try again or\u00A0", h("button", { type: "button", "aria-label": "see the correct answer", class: "nonRoutingLink btn p-0 text-decoration-underline fc-neutral-black c-fs-16 c-fw-400 c-lh-125", onClick: () => handleRevealAnswer() }, h("span", { class: "d-flex feedback-wrapper__text answer" }, "see the correct answer")))) : (h("span", null, "Try again or\u00A0", h("button", { type: "button", "aria-label": "see the answer", class: "nonRoutingLink btn p-0 text-decoration-underline fc-neutral-black c-fs-16 c-fw-400 c-lh-125", onClick: () => handleRevealAnswer() }, h("span", { class: "d-flex feedback-wrapper__text answer" }, "see the answer")))))))), isClicked && capturedAnswer && isAnswerRevealed.timeodOutReveal && h("p", { class: "explanation-text" }, structure?.explanation)));
};
const renderHighlightedWord = (question, word) => {
    const parts = question.split(new RegExp(`\\b${word}\\b`, 'g'));
    const matches = question.match(new RegExp(`\\b${word}\\b`, 'g')) || [];
    return (h("span", null, parts.map((part, idx) => (h("span", { key: idx }, part, idx < matches.length && (h("strong", null, word)))))));
};
const QnACard = ({ structure, clickHandle, isClicked, capturedAnswer, handleRevealAnswer, capturedIndex, handleProceedToNextQuestion, isAnswerRevealed, status, handleProceedQuiz, isMobile, isLastQuestion = false, }) => {
    const optionRefs = [];
    const optionEntries = Object.entries(structure).filter(([key]) => key.startsWith('option'));
    //  keyboard navigation
    const focusOption = (idx) => {
        optionRefs[idx] && optionRefs[idx].focus && optionRefs[idx].focus();
    };
    const handleKeyDown = (e, idx) => {
        const total = optionEntries.length;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            e.preventDefault();
            focusOption((idx + 1) % total);
            return;
        }
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            e.preventDefault();
            focusOption((idx - 1 + total) % total);
            return;
        }
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            const [key, value] = optionEntries[idx];
            const isCorrect = structure.correct_answer ? isCorrectAns(key, structure.correct_answer) : true; // For questions without correct_answer (like demographics), treat all as correct
            clickHandle({ text: value, isCorrect }, idx);
        }
    };
    // Mobile feedback logic - don't show feedback for questions without correct_answer (like demographics)
    const correctAnswerText = getCorrectAnswerText(structure);
    const isCorrectMobile = isMobile && isClicked && capturedAnswer && isAnswerRevealed.timeodOutReveal && structure.correct_answer;
    const isIncorrectMobile = isMobile && !capturedAnswer && isClicked && structure.correct_answer;
    return (h("div", { class: "quiz-container" }, h("div", { class: "stats-wrapper" }, status), h("div", { class: "quiz-container__content" }, h("div", { class: "content-wrapper" }, h("div", { class: "left-column" }, h("legend", { id: "question-label", class: `mb-0 ${!isMobile && "pb-1"} ${structure?.sub_header ? 'mt-0' : ""}` }, h("strong", { class: "question_label__sub_header" }, structure.sub_header), h("br", null), structure?.requiresHighlight
        ? renderHighlightedWord(structure?.question, structure?.highlight || '')
        : structure?.question), h("div", { class: "feedback-desktop" }, renderFeedback({
        isClicked,
        capturedAnswer,
        isAnswerRevealed,
        structure,
        handleRevealAnswer,
    }))), h("div", { class: "right-column" }, h("form", { class: "question-form", "aria-labelledby": "question-label" }, h("fieldset", null, h("div", { class: "options-wrapper" }, isCorrectMobile && (h("div", { class: "feedback-mobile" }, h("div", { class: "feedback-wrapper" }, h("div", { class: "feedback-message" }, h("span", { class: "feedback-icon" }, h(GreenCheckIcon, { className: "feedback-icon__img", strokeColor: "#025676" })), h("span", { class: "feedback-wrapper__text d-flex align-items-center", role: "alert" }, h("span", null, "The correct answer is", correctAnswerText ? ` ${correctAnswerText.charAt(0).toLowerCase() + correctAnswerText.slice(1)}` : '')))))), optionEntries.map(([key, value], index) => {
        const isCorrect = structure.correct_answer ? isCorrectAns(key, structure.correct_answer) : true; // For questions without correct_answer, treat all as correct
        const checked = capturedIndex === index;
        // For questions without correct_answer (demographic), only style the selected option
        const isDemographicQuestion = !structure.correct_answer;
        return (h("label", { class: `option-label option_quiz-${isAnswerRevealed.timeodOutReveal
                ? isDemographicQuestion
                    ? checked ? 'correct clicked' : '' // For demographic questions, only style the selected option
                    : isCorrect
                        ? 'correct clicked'
                        : isMobile ? 'dp' : ''
                : checked && isCorrect
                    ? isClicked
                        ? 'correct clicked'
                        : ''
                    : checked && !isCorrect && isClicked
                        ? 'incorrect clicked'
                        : ''}`, tabIndex: 0, "aria-label": value, ref: el => (optionRefs[index] = el), onKeyDown: e => {
                if (!isAnswerRevealed.timeodOutReveal || isDemographicQuestion)
                    handleKeyDown(e, index);
            }, id: `quiz-option-${index + 1}`, onClick: () => {
                if (!isAnswerRevealed.timeodOutReveal || isDemographicQuestion) {
                    const isCorrectForLastQuestion = structure.correct_answer ? isCorrectAns(key, structure.correct_answer) : true;
                    clickHandle({ text: value, isCorrect: isCorrectForLastQuestion, totalOptions: optionEntries.length }, index);
                }
            }, key: key, style: isAnswerRevealed.timeodOutReveal && !isDemographicQuestion ? { pointerEvents: 'none' } : {} }, h("span", { class: "label-span" }, value)));
    }), isCorrectMobile && h("p", { class: "explanation-text" }, structure?.explanation)))), isIncorrectMobile && (h("div", { class: "feedback-mobile incorrect" }, h("div", { class: "feedback-wrapper" }, h("div", { class: "feedback-message" }, h("span", { class: "feedback-icon" }, h("span", { class: "d-flex align-items-center" }, h(RedCrossIcon, { className: "feedback-icon__img", strokeColor: "#CE1562" }))), h("span", { class: "feedback-wrapper__text d-flex align-items-center font-bold small", role: "alert" }, isAnswerRevealed.moreThanOneWrongAttempt ? (h("span", null, "Try again or\u00A0", h("button", { type: "button", "aria-label": "see the correct answer", class: "nonRoutingLink btn p-0 text-decoration-underline fc-neutral-black c-fs-16 c-fw-400 c-lh-125", onClick: () => handleRevealAnswer() }, h("span", { class: "d-flex feedback-wrapper__text answer" }, "see the correct answer")))) : (h("span", null, "Try again or\u00A0", h("button", { type: "button", "aria-label": "see the answer", class: "nonRoutingLink btn p-0 text-decoration-underline fc-neutral-black c-fs-16 c-fw-400 c-lh-125", onClick: () => handleRevealAnswer() }, h("span", { class: "d-flex feedback-wrapper__text answer" }, "see the answer"))))))))), h("div", { class: "feedback-mobile", style: { display: 'none' } }))), h("div", { class: "navigation-wrapper" }, h("div", { class: "button-container" }, h("div", { class: "osa-toast__back" }, h("button", { type: "button", "aria-label": "back", class: `back-button${isMobile && capturedAnswer && isClicked && isAnswerRevealed.timeodOutReveal ? ' mobile-hide-when-continue' : ''}`, onClick: () => handleProceedQuiz() }, h("span", { class: "bck-arrow" }, h(BackIcon, { className: "bck-arrow__icon" })), h("span", null, "Back"))), isLastQuestion ? (capturedIndex === -1 ? (h("button-component", { label: "Skip", onBtnClick: () => handleProceedToNextQuestion(true) }, "Skip")) : (isClicked && isAnswerRevealed.timeodOutReveal && (h("button-component", { label: "Continue", onBtnClick: () => handleProceedToNextQuestion(false) }, "Continue")))) : (capturedAnswer && isClicked && isAnswerRevealed.timeodOutReveal && (h("button-component", { label: "Continue", onBtnClick: () => handleProceedToNextQuestion() }, "Continue"))))))));
};

const beaconQuizCss = "* {\r\n  box-sizing: border-box;\r\n  /* margin: 0; */\r\n  padding: 0;\r\n  font-family: var(--lds-g-font-family-sans-serif);\r\n  letter-spacing: normal;\r\n}\r\n\r\nbody {\r\n  background-color: #f5f7fa;\r\n  color: #2c2c2c;\r\n  line-height: 1.5;\r\n}\r\n\r\n.parent-container {\r\n  width: 100%;\r\n  flex-direction: column;\r\n  justify-content: start;\r\n  align-items: left;\r\n  max-width: 1440px;\r\n}\r\n\r\n.d-flex {\r\n  display: flex;\r\n}\r\n\r\n.flex-row {\r\n  flex-direction: row;\r\n}\r\n\r\n.justify-content-start {\r\n  justify-content: flex-start;\r\n}\r\n\r\n.gap-3 {\r\n  gap: 1rem !important;\r\n}\r\n\r\n.parent-container_child__header {\r\n  font-family: var(--lds-g-font-family-sans-serif);\r\n  font-weight: var(--lds-g-font-style-bold);\r\n  font-size: var(--lds-g-spacing-600);\r\n  line-height: var(--lds-g-font-line-height-18);\r\n  letter-spacing: -2;\r\n}\r\n\r\n.parent-container_child__paragraph {\r\n  font-family: var(--lds-g-font-family-sans-serif);\r\n  font-weight: var(--lds-g-font-style-regular);\r\n  font-size: var(--lds-g-font-size-3);\r\n  line-height: var(--lds-g-spacing-400);\r\n  letter-spacing: 0%;\r\n}\r\n\r\n.parent-container_child__span {\r\n  display: block;\r\n  margin-bottom: 1.5rem;\r\n  font-family: var(--lds-g-font-family-sans-serif);\r\n  font-weight: var(--lds-g-font-weight-400);\r\n  font-size: var(--lds-g-spacing-300);\r\n  line-height: 120%;\r\n  letter-spacing: -2%;\r\n}\r\n\r\n.parent-container-child{\r\n  min-width: 533px;\r\n}\r\n\r\n.parent-container.final-card .parent-container-child,\r\n.parent-container.initial-side-card .parent-container-child {\r\n  flex-grow: 12;\r\n}\r\n\r\n.parent-container .parent-container-child {\r\n  flex: 1 1;\r\n}\r\n\r\n.parent-container .parent-container__right___column {\r\n  flex: 1 1;\r\n}\r\n\r\n.parent-container .parent-container-child legend {\r\n  font-family: var(--lds-g-font-family-sans-serif);\r\n  font-size: 20px;\r\n  line-height: var(--lds-g-spacing-300);\r\n  font-weight: var(--lds-g-spacing-400);\r\n}\r\n\r\n.pb-1{\r\n  padding-bottom: 1rem;\r\n}\r\n\r\n.pb-4 {\r\n  padding-bottom: 1.5rem !important;\r\n}\r\n\r\n.mb-0 {\r\n  margin-bottom: 0 !important;\r\n}\r\n\r\n.mt-0 {\r\n  margin-top: 0 !important;\r\n}\r\n\r\n.answer {\r\n  text-decoration: underline;\r\n  font-family: var(--lds-g-font-family-sans-serif)\r\n}\r\n\r\nb,\r\nstrong {\r\n  font-weight: bolder;\r\n}\r\n\r\n/* Styles for QnA */\r\nfieldset {\r\n  padding: 0;\r\n  margin: 0;\r\n  font: inherit;\r\n  font-size: 100%;\r\n  vertical-align: baseline;\r\n  border: 0;\r\n}\r\n\r\nspan {\r\n  padding: 0;\r\n  margin: 0;\r\n  font: inherit;\r\n  font-size: 100%;\r\n  vertical-align: baseline;\r\n  border: 0;\r\n}\r\n\r\n.option_quiz-correct.clicked {\r\n  border: 2px solid var(--lds-g-color-palette-blue-070);\r\n  color: var(--lds-g-color-palette-blue-070);\r\n  font-family: var(--lds-g-font-family-sans-serif)\r\n}\r\n\r\n.option_quiz-incorrect.clicked {\r\n  border: 2px solid var(--lds-g-color-palette-pink-060);\r\n  color: var(--lds-g-color-palette-pink-060);\r\n  font-family: var(--lds-g-font-family-sans-serif);\r\n}\r\n\r\n.option_quiz-dp {\r\n  display: none !important;\r\n}\r\n\r\ninput[type='checkbox'],\r\ninput[type='radio'] {\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n}\r\n\r\nbutton,\r\ninput,\r\noptgroup,\r\nselect,\r\ntextarea {\r\n  margin: 0;\r\n  font-family: inherit;\r\n  font-size: inherit;\r\n  line-height: inherit;\r\n}\r\n\r\na,\r\nbutton,\r\ninput,\r\nselect,\r\ntextarea {\r\n  -webkit-tap-highlight-color: transparent;\r\n}\r\n\r\n.container-lg,\r\n.container-xxl {\r\n  width: 100%;\r\n  padding-right: calc(var(--lds-g-spacing-300) * 0.5);\r\n  padding-left: calc(var(--lds-g-spacing-0) * 0.5);\r\n  margin-right: auto;\r\n  margin-left: auto;\r\n}\r\n\r\n.row {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  margin-top: calc(-1 * var(--lds-g-spacing-0));\r\n  margin-right: calc(-0.5 * var(--lds-g-spacing-300));\r\n  margin-left: calc(-0.5 * var(--lds-g-spacing-0));\r\n}\r\n\r\n.small {\r\n  font-size: 17px;\r\n}\r\n\r\n.font-bold {\r\n  font-weight: 700;\r\n}\r\n\r\n.p-0 {\r\n  padding: var(--lds-g-spacing-0) !important;\r\n}\r\n\r\n.d-block {\r\n  display: block !important;\r\n}\r\n\r\n.py-2 {\r\n  padding-top: var(--lds-g-spacing-100) !important;\r\n  padding-bottom: var(--lds-g-spacing-100) !important;\r\n}\r\n\r\n.py-4 {\r\n  padding-top: var(--lds-g-spacing-300) !important;\r\n  padding-bottom: var(--lds-g-spacing-300) !important;\r\n}\r\n\r\n.btn {\r\n  display: inline-block;\r\n  padding: var(--lds-g-spacing-100) var(--lds-g-spacing-100);\r\n  font-family: var(--lds-g-font-family-sans-serif);\r\n  font-size: var(--lds-g-spacing-200);\r\n  font-weight: var(--lds-g-font-style-serif-regular);\r\n  line-height: var(--lds-g-font-line-height-015);\r\n  color: #212529;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  cursor: pointer;\r\n  -webkit-user-select: none;\r\n  -moz-user-select: none;\r\n  user-select: none;\r\n  border: 1px solid transparent;\r\n  border-radius: var(--lds-g-spacing-100);\r\n  background-color: transparent;\r\n  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\r\n}\r\n\r\n.p-4 {\r\n  padding: var(--lds-g-spacing-300) !important;\r\n}\r\n\r\n.px-0 {\r\n  padding-right: var(--lds-g-spacing-0) !important;\r\n  padding-left: var(--lds-g-spacing-0) !important;\r\n}\r\n\r\n.ms-2 {\r\n  margin-left: var(--lds-g-spacing-100) !important;\r\n}\r\n\r\n.align-items-center {\r\n  align-items: center !important;\r\n}\r\n\r\n.parent-container__content {  \r\n  gap: var(--lds-g-spacing-300);\r\n}\r\n\r\n.row {\r\n  margin-right: 0;\r\n  margin-left: 0;\r\n}\r\n\r\n.quiz-parent__container{\r\n  display: flex;\r\n  justify-content: center;\r\n  width: 100%;\r\n}\r\n\r\n.quiz-container {\r\n  max-width: 100%;\r\n  padding: var(--lds-g-spacing-400) var(--lds-g-spacing-1600);\r\n  position: relative;\r\n  display: flex;\r\n  flex-direction: column;\r\n  min-height: calc(100vh - var(--lds-g-spacing-1500));\r\n  max-height: 100%;\r\n  padding-bottom: var(--lds-g-spacing-200); \r\n}\r\n\r\n.quiz-container__content {\r\n  width: 100%;\r\n  flex: 1 1 auto;\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.navigation-wrapper {\r\n  margin-top: auto;\r\n  width: 100%;\r\n}\r\n\r\n.bck-arrow path {\r\n  stroke: #191919;\r\n}\r\n\r\n.stats-wrapper {\r\n  font-family: var(--lds-g-font-family-sans-serif);\r\n  font-size: 14px;\r\n  font-weight: var(--lds-g-font-style-serif-regular);\r\n  line-height: var(--lds-g-font-line-height-2);\r\n  color: var(--lds-g-color-neutral-base-100);\r\n  text-transform: uppercase;\r\n  margin-bottom: var(--lds-g-spacing-400);\r\n}\r\n\r\n/* Question styles */\r\n.question-label {\r\n  font-size: var(--lds-g-spacing-400);\r\n  font-weight: 600;\r\n  margin-bottom: var(--lds-g-spacing-400);\r\n  color: #1A1A1A;\r\n}\r\n\r\n.question_label__sub_header{\r\n  font-weight: var(--lds-g-font-style-bold);\r\n  display: inline-block;\r\n  padding-bottom: var(--lds-g-spacing-150);\r\n}\r\n\r\n/* Options styles */\r\n.options-wrapper {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: var(--lds-g-spacing-300);\r\n  margin-top: var(--lds-g-spacing-200);\r\n  width: 100%;\r\n}\r\n\r\n.option-label {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: flex-start;\r\n  padding: var(--lds-g-spacing-300);\r\n  border-radius: var(--lds-g-radius-1);\r\n  border: 1px solid var(--lds-g-color-palette-stone-030);\r\n  cursor: pointer;\r\n  transition: all 0.2s ease;\r\n  text-align: center;\r\n  font-size: 1.125rem;\r\n  width: 100%;\r\n  position: relative;\r\n}\r\n\r\n.option-label:hover,\r\n.option-label:focus {\r\n  background: var(--lds-g-color-neutral-base-010);\r\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\r\n  outline: none;\r\n}\r\n\r\n.option-label input {\r\n  position: absolute;\r\n  opacity: 0;\r\n  cursor: pointer;\r\n  height: 0;\r\n  width: 0;\r\n}\r\n\r\n/* Feedback message */\r\n.feedback-message {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: var(--lds-g-spacing-100)\r\n  /* margin: var(--lds-g-spacing-300) var(--lds-g-spacing-0); */\r\n}\r\n\r\n.feedback-icon {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n}\r\n\r\n.feedback-icon__img{\r\n  height: var(--lds-g-spacing-300);\r\n  width: var(--lds-g-spacing-300);\r\n  display: block;\r\n}\r\n\r\n.feedback-wrapper__text {\r\n  font-family: var(--lds-g-font-family-sans-serif);\r\n  font-weight: var(--lds-g-font-style-bold);\r\n  font-size: var(--lds-g-font-size-2);\r\n  line-height: var(--lds-g-font-line-height-8);\r\n  letter-spacing: 0%\r\n}\r\n\r\n.explanation-text {\r\n  font-size: var(--lds-g-font-size-2);\r\n  font-weight: var(--lds-g-font-weight-400);\r\n  line-height: var(--lds-g-font-line-height-8);\r\n  /* margin: var(--lds-g-spacing-300) var(--lds-g-spacing-0) var(--lds-g-spacing-500) var(--lds-g-spacing-0); */\r\n  color: var(--lds-g-color-neutral-base-100);\r\n  text-align: justify;\r\n  padding-top: var(--lds-g-spacing-150);\r\n  margin: var(--lds-g-spacing-0);\r\n}\r\n\r\n.back-button {\r\n  background: none;\r\n  border: none;\r\n  cursor: pointer;\r\n  font-size: var(--lds-g-spacing-200);\r\n  /* padding-top: 0.5rem 0; */\r\n  padding-top: var(--lds-g-spacing-200);\r\n  font-weight: var(--lds-g-font-style-bold);\r\n  font-size: var(--lds-g-spacing-250);\r\n  line-height: var(--lds-g-spacing-300);\r\n  letter-spacing: 0%;\r\n  text-align: center;\r\n}\r\n\r\n.back-button:focus-visible {\r\n  outline: 2px solid var(--lds-g-color-neutral-base-070);\r\n  outline-offset: 2px;\r\n  padding-top: var(--lds-g-spacing-0) ;\r\n}\r\n\r\n.bck-arrow {\r\n  padding-right: var(--lds-g-spacing-100);\r\n}\r\n\r\n.button-container {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  /* margin-top: 2rem; */\r\n}\r\n\r\n.content-wrapper {\r\n  font-size: var(--lds-g-spacing-400);\r\n  line-height: 10.6px;\r\n  letter-spacing: -.72px;\r\n  /* gap: 20rem; */\r\n}\r\n\r\n.options-wrapper label {\r\n  font-size: var(--lds-g-spacing-300);\r\n  font-weight: var(--lds-g-font-weight-400);\r\n  line-height: 120%;\r\n  letter-spacing: 0%;\r\n}\r\n\r\n.left-column legend {\r\n  font-family: var(--lds-g-font-family-sans-serif);\r\n  margin-top: -2rem;\r\n  font-weight: var(--lds-g-font-weight-400);\r\n  font-size: var(--lds-g-font-size-6);\r\n  line-height: var(--lds-g-font-line-height-15);\r\n  letter-spacing: -2%;\r\n}\r\n\r\n.label-span {\r\n  font-family: var(--lds-g-font-family-sans-serif);\r\n  font-weight: var(--lds-g-font-weight-400);\r\n  font-size: var(--lds-g-spacing-300);\r\n  line-height: var(--lds-g-spacing-400);\r\n  text-align: start\r\n}\r\n\r\n.feedback-desktop {\r\n  display: block;\r\n  padding-top: var(--lds-g-spacing-400);\r\n}\r\n\r\n.feedback-mobile {\r\n  display: none;\r\n}\r\n\r\n/* Keeps only one btn visible for mobile*/\r\n@media (max-width: 991px) {\r\n  .mobile-hide-when-continue {\r\n    display: none !important;\r\n  }\r\n  \r\n  .mobile-full-width {\r\n    width: 100% !important;\r\n    display: block;\r\n  }\r\n  \r\n  .parent-container {\r\n    flex-direction: column;\r\n    padding: var(--lds-g-spacing-300);\r\n  }\r\n\r\n  .parent-container-child,\r\n  .parent-container__right___column {\r\n    flex: 1 1 100%;\r\n    width: 100%;\r\n    margin-bottom: var(--lds-g-spacing-200);\r\n  }\r\n  \r\n  .parent-container-child {\r\n    min-width: 295px;\r\n  }\r\n  \r\n  .parent-container_child__header {\r\n    font-size: var(--lds-g-font-size-6);\r\n    line-height: var(--lds-g-font-line-height-15);\r\n    padding-bottom: var(--lds-g-spacing-250);\r\n  }\r\n  \r\n  .parent-container_child__paragraph {\r\n    font-size: var(--lds-g-font-size-2);\r\n    line-height: var(--lds-g-font-line-height-6);\r\n  }\r\n  \r\n  .parent-container_child__button {\r\n    position: fixed;\r\n    bottom: var(--lds-g-spacing-200);\r\n    width: auto;\r\n    left: 50%;\r\n    transform: translateX(-50%);\r\n  }\r\n  \r\n  .parent-container.initial-side-card {\r\n    padding: 0 0 0 var(--lds-g-spacing-300);\r\n  }\r\n  \r\n  .container-lg {\r\n    padding-right: var(--lds-g-spacing-200);\r\n    padding-left: var(--lds-g-spacing-200);\r\n    width: 80%;\r\n  }\r\n  \r\n  .options-wrapper {\r\n    width: 100%;\r\n    gap: var(--lds-g-spacing-150);\r\n  }\r\n  \r\n  .content-wrapper {\r\n    gap: var(--lds-g-spacing-300);\r\n    display: flex;\r\n    flex-direction: column;\r\n  }\r\n  \r\n  .option-label {\r\n    font-size: var(--lds-g-spacing-200);\r\n    line-height: 1.4;\r\n    padding: var(--lds-g-spacing-250);\r\n  }\r\n  \r\n  .left-column legend {\r\n    font-size: var(--lds-g-font-size-2);\r\n    line-height: var(--lds-g-font-line-height-6);\r\n  }\r\n  \r\n  .left-column, .right-column {\r\n    max-width: 100%;\r\n  }\r\n  \r\n  .label-span {\r\n    font-size: var(--lds-g-font-size-base);\r\n    line-height: var(--lds-g-font-line-height-5);\r\n  }\r\n  \r\n  .feedback-wrapper__text {\r\n    font-size: var(--lds-g-font-size-base);\r\n    line-height: var(--lds-g-font-line-height-5);\r\n  }\r\n  \r\n  .explanation-text {\r\n    font-size: var(--lds-g-font-size-base);\r\n    line-height: var(--lds-g-font-line-height-5);\r\n    text-align: justify;\r\n  }\r\n  \r\n  .parent-container_child__span {\r\n    font-size: var(--lds-g-font-size-base);\r\n  }\r\n  \r\n  .stats-wrapper {\r\n    font-size: var(--lds-g-sizing-4);\r\n    line-height: var(--lds-g-font-line-height-1);\r\n    margin-top: var(--lds-g-spacing-minus-200);\r\n  }\r\n  \r\n  .back-button {\r\n    display: flex;\r\n    font-size: var(--lds-g-spacing-200);\r\n    line-height: 20px;\r\n    align-items: center;\r\n  }\r\n  \r\n  .bck-arrow svg {\r\n    display: block;\r\n  }\r\n  \r\n  .feedback-icon__img {\r\n    height: var(--lds-g-spacing-200);\r\n    width: var(--lds-g-spacing-200);\r\n  }\r\n  \r\n  .feedback-desktop {\r\n    display: none !important;\r\n  }\r\n  \r\n  .feedback-mobile {\r\n    display: block !important;\r\n  }\r\n  \r\n  .feedback-mobile.incorrect {\r\n    padding-top: 5%;\r\n  }\r\n  \r\n  .quiz-container {\r\n    padding: var(--lds-g-spacing-300);\r\n  }\r\n  \r\n  .question-label {\r\n    font-size: var(--lds-g-spacing-350);\r\n    margin-bottom: var(--lds-g-spacing-300);\r\n  }\r\n  \r\n  .option-label {\r\n    padding: var(--lds-g-spacing-250);\r\n  }\r\n  \r\n  .explanation-text {\r\n    margin: var(--lds-g-spacing-250) var(--lds-g-spacing-0) var(--lds-g-spacing-400) var(--lds-g-spacing-0);\r\n    margin-top: var(--lds-g-spacing-0);\r\n  }\r\n  \r\n  .button-container {\r\n    justify-content: center;\r\n  }\r\n  \r\n  .quiz-container__content {\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: space-between;\r\n  }\r\n  \r\n  .osa-toast__back {\r\n    display: flex;\r\n    justify-content: center;\r\n    padding-top: var(--lds-g-spacing-400);\r\n  }\r\n  \r\n  .quiz-container {\r\n    max-width: 100%;\r\n  }\r\n}\r\n\r\n@media (max-width: 576px) {\r\n  .parent-container {\r\n    padding: var(--lds-g-spacing-400);\r\n    overflow-x: hidden;\r\n  }\r\n\r\n  .parent-container__content {\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: space-between;\r\n    gap: var(--lds-g-spacing-0);\r\n  }\r\n}\r\n\r\n@media (min-width: 1024px) {\r\n  .quiz-container {\r\n    display: flex;\r\n    flex-direction: column;\r\n    max-width: 1440px;\r\n    margin: 0;\r\n  }\r\n\r\n  .content-wrapper {\r\n    display: flex;\r\n    flex-direction: row;\r\n    justify-content: space-between;\r\n    gap: var(--lds-g-spacing-2000);\r\n  }\r\n\r\n  .left-column {\r\n    max-width: 40%;\r\n  }\r\n\r\n  .right-column {\r\n    max-width: 60%;\r\n  }\r\n  \r\n  .parent-container .parent-container-child legend {\r\n    font-size: var(--lds-g-font-size-5);\r\n    line-height: var(--lds-g-font-line-height-11);\r\n    letter-spacing: -0.72px;\r\n  }\r\n\r\n  /* .parent-container.final-card {\r\n    padding-left: 10%;\r\n  } */\r\n  \r\n  .parent-container.final-card .parent-container-child,\r\n  .parent-container.initial-side-card .parent-container-child {\r\n    flex-grow: 1;\r\n    padding-left: var(--lds-g-sizing-12);\r\n    padding-top: var(--lds-g-sizing-12);\r\n  }\r\n  \r\n  .container, .container-lg {\r\n    max-width: 960px;\r\n  }\r\n  \r\n  .btn {\r\n    line-height: var(--lds-g-spacing-300) !important;\r\n  }\r\n  \r\n  .options-wrapper {\r\n    width: 405px;\r\n    padding-bottom: var(--lds-g-spacing-200);\r\n  }\r\n}\r\n\r\n";

const QuizCardComponent = /*@__PURE__*/ proxyCustomElement(class QuizCardComponent extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.__attachShadow();
    }
    qnaset;
    test;
    quiztitle = 'Test your knowledge of cancer clinical trials';
    quizdescription = 'Clinical trials may help people currently living with cancer, as well as future patients for generations to come. Take our 4-question quiz to find out how much you know about cancer clinical trials.';
    url;
    trialUrl = 'https://leal.health/clinicaltrials';
    isInitial = true;
    isClicked = false;
    capturedAnswer = false;
    capturedIndex = -1;
    isAnswerRevealed = false;
    isQuizCompleted = false;
    score = 0;
    answeredQuestions = new Set();
    revealedQuestions = new Set();
    viewAnswers = false;
    wrongAttempts = 0;
    // New state to track per-question state
    questionStates = new Map();
    timeodOutReveal = false;
    fetchStatus = { isLoading: false, error: false };
    isMobile = typeof window !== 'undefined' ? window.innerWidth <= 991 : false;
    lastQuestionSelection = '';
    totalSets = 0;
    currentSet = 0;
    scorableQuestions = 4; // Only first 4 questions count towards score
    correctAnsTimeout;
    incorrectAnsTimeout;
    // Mapping for last question options to result screen text
    getCustomTextForLastQuestion = (selection) => {
        if (selection === 'skip') {
            return 'Learn about cancer clinical trials';
        }
        const textMapping = {
            'option1': 'Find a clinical trial near you',
            'option2': 'Find a clinical trial near you',
            'option3': 'Learn more about cancer clinical trials',
            'option4': 'Learn more about how cancer clinical trials work',
            'option5': 'Learn about cancer clinical trials'
        };
        return textMapping[selection] || 'Learn about cancer clinical trials';
    };
    componentWillLoad() {
        this.qnaset = this.qnaset || defaultBeaconQuestionSet;
        this.totalSets = this.qnaset.length;
        this.viewAnswers = false;
        this.questionStates = new Map();
    }
    componentDidLoad() {
        window.addEventListener('resize', this.handleResize);
    }
    disconnectedCallback() {
        window.removeEventListener('resize', this.handleResize);
        clearTimeout(this.correctAnsTimeout);
        clearTimeout(this.incorrectAnsTimeout);
    }
    handleResize = () => {
        this.isMobile = window.innerWidth <= 991;
    };
    getQuizData = () => {
        const { data } = defaultBeaconQuestionSet;
        this.qnaset = data;
        this.totalSets = data.length;
        this.isInitial = false;
    };
    handleOptionClick = (option, index) => {
        this.capturedAnswer = option.isCorrect;
        this.isClicked = true;
        this.capturedIndex = index;
        // Check if this is the last question (demographic question)
        const isLastQuestion = this.currentSet === this.totalSets - 1;
        // For the last question, just track the selection and don't process as right/wrong
        if (isLastQuestion) {
            this.lastQuestionSelection = `option${index + 1}`;
            // Set state for last question without scoring logic but enable continue button
            this.questionStates.set(this.currentSet, {
                isClicked: true,
                capturedAnswer: true, // Treat as answered for navigation
                capturedIndex: index,
                wrongAttempts: 0,
            });
            // Set the flags needed for continue button to appear
            this.isAnswerRevealed = true;
            this.timeodOutReveal = true;
            // Add to answered questions so navigation works properly
            this.answeredQuestions.add(this.currentSet);
            return;
        }
        // Get current state or create new one
        const currentState = this.questionStates.get(this.currentSet) || {
            isClicked: false,
            capturedAnswer: false,
            capturedIndex: 0,
            wrongAttempts: 0,
        };
        // Check if this is a True/False question (2 options) or multiple choice
        const currentQuestion = this.qnaset[this.currentSet];
        const totalOptions = option.totalOptions || Object.keys(currentQuestion).filter(key => key.startsWith('option')).length;
        const isTrueFalse = totalOptions === 2;
        if (!option.isCorrect) {
            // Update wrong attempts
            const newWrongAttempts = currentState.wrongAttempts + 1;
            this.wrongAttempts = newWrongAttempts;
            // Save updated wrong attempts to question state
            this.questionStates.set(this.currentSet, {
                ...currentState,
                isClicked: true,
                capturedIndex: index,
                wrongAttempts: newWrongAttempts,
            });
            // For True/False: reveal answer immediately after first wrong attempt
            // For Multiple Choice: reveal after 2 wrong attempts
            if ((isTrueFalse && newWrongAttempts >= 1) || (!isTrueFalse && newWrongAttempts >= 2)) {
                this.incorrectAnsTimeout = setTimeout(() => {
                    this.handleRevealAnswer();
                }, 1000);
            }
        }
        else {
            // Answer is correct
            this.questionStates.set(this.currentSet, {
                ...currentState,
                isClicked: true,
                capturedAnswer: true,
                capturedIndex: index,
            });
        }
        // Allowing re-attempt after wrong answer
        if (this.isAnswerRevealed && option.isCorrect && !this.answeredQuestions.has(this.currentSet)) {
            this.score++;
            this.answeredQuestions.add(this.currentSet);
        }
        else if (!this.answeredQuestions.has(this.currentSet)) {
            // If not answered yet
            if (option.isCorrect) {
                this.correctAnsTimeout = setTimeout(() => {
                    this.timeodOutReveal = true;
                }, 1000);
                this.score++;
                this.answeredQuestions.add(this.currentSet);
            }
        }
    };
    handleRevealAnswer = () => {
        this.capturedAnswer = true;
        this.isAnswerRevealed = true;
        this.timeodOutReveal = true;
        this.revealedQuestions.add(this.currentSet);
        const currentState = this.questionStates.get(this.currentSet) || {
            isClicked: true,
            capturedAnswer: true,
            capturedIndex: 0,
            wrongAttempts: 2,
        };
        this.questionStates.set(this.currentSet, {
            ...currentState,
            isClicked: true,
            capturedAnswer: true,
        });
    };
    // Helper to set state for answered or revealed question
    setAnsweredStateForCurrent() {
        this.isClicked = true;
        this.isAnswerRevealed = true;
        this.capturedAnswer = true;
        this.timeodOutReveal = true;
        const question = this.qnaset[this.currentSet];
        const options = Object.entries(question).filter(([key]) => key.startsWith('option'));
        // For questions without correct_answer (like the last demographic question), use saved state
        if (!question.correct_answer) {
            const savedState = this.questionStates.get(this.currentSet);
            this.capturedIndex = savedState ? savedState.capturedIndex : -1;
        }
        else {
            const correctIdx = options.findIndex(([key]) => key === question.correct_answer);
            this.capturedIndex = correctIdx !== -1 ? correctIdx : -1;
        }
    }
    handleProceedToPreviousQuestion = () => {
        if (this.currentSet > 0) {
            this.currentSet--;
            if (this.viewAnswers) {
                this.setViewAnswersState(this.currentSet);
            }
            else if (this.answeredQuestions.has(this.currentSet) || this.revealedQuestions.has(this.currentSet)) {
                this.setAnsweredStateForCurrent();
            }
            else {
                const savedState = this.questionStates.get(this.currentSet);
                if (savedState) {
                    this.isClicked = savedState.isClicked;
                    this.capturedAnswer = savedState.capturedAnswer;
                    this.capturedIndex = savedState.capturedIndex;
                    this.wrongAttempts = savedState.wrongAttempts;
                    // For the last question (demographic), preserve the revealed state
                    const isLastQuestion = this.currentSet === this.totalSets - 1;
                    if (isLastQuestion && savedState.capturedAnswer) {
                        this.timeodOutReveal = true;
                        this.isAnswerRevealed = true;
                    }
                    else {
                        this.timeodOutReveal = false;
                        this.isAnswerRevealed = false;
                    }
                }
                else {
                    this.resetQuizState();
                }
            }
            this.qnaset = [...this.qnaset];
        }
        else if (this.currentSet === 0) {
            this.isInitial = true;
        }
    };
    handleProceedQuiz = () => {
        this.handleProceedToPreviousQuestion();
    };
    //  reveals entire answer set on click of view all answers
    setViewAnswersState(questionIndex) {
        this.isClicked = true;
        this.isAnswerRevealed = true;
        this.capturedAnswer = true;
        // const options = Object.entries(question).filter(([key]) => key.startsWith('option'));
        // this.capturedIndex = options.findIndex(([key]) => isCorrectAns(key, correctAnswerKey));
        this.currentSet = questionIndex;
    }
    // reset quiz
    resetQuizState() {
        this.isClicked = false;
        this.isAnswerRevealed = false;
        this.capturedAnswer = false;
        this.capturedIndex = -1;
        this.timeodOutReveal = false;
    }
    handleProceedToNextQuestion = (skipLastQuestion = false) => {
        clearTimeout(this.correctAnsTimeout);
        clearTimeout(this.incorrectAnsTimeout);
        //  if it's the last question
        if (this.currentSet >= this.totalSets - 1) {
            if (skipLastQuestion) {
                this.lastQuestionSelection = 'skip';
            }
            if (this.viewAnswers) {
                this.viewAnswers = false;
                this.isQuizCompleted = true;
            }
            else {
                this.isQuizCompleted = true;
            }
            return;
        }
        this.currentSet++;
        if (this.viewAnswers) {
            this.setViewAnswersState(this.currentSet); // Update for the next question
        }
        else if (this.answeredQuestions.has(this.currentSet) || this.revealedQuestions.has(this.currentSet)) {
            this.setAnsweredStateForCurrent();
        }
        else {
            const savedState = this.questionStates.get(this.currentSet);
            if (savedState) {
                this.isClicked = savedState.isClicked;
                this.capturedAnswer = savedState.capturedAnswer;
                this.capturedIndex = savedState.capturedIndex;
                this.wrongAttempts = savedState.wrongAttempts;
                // For the last question (demographic), preserve the revealed state
                const isLastQuestion = this.currentSet === this.totalSets - 1;
                if (isLastQuestion && savedState.capturedAnswer) {
                    this.timeodOutReveal = true;
                    this.isAnswerRevealed = true;
                }
                else {
                    this.timeodOutReveal = false;
                    this.isAnswerRevealed = false;
                }
            }
            else {
                this.resetQuizState();
            }
        }
        this.qnaset = [...this.qnaset];
    };
    handleViewAnswers = () => {
        this.currentSet = 0;
        this.viewAnswers = true;
        this.isQuizCompleted = false;
        this.setViewAnswersState(this.currentSet);
    };
    handleRestartQuiz = () => {
        // Reset all quiz state
        this.isInitial = false;
        this.isClicked = false;
        this.capturedAnswer = false;
        this.capturedIndex = 0;
        this.isAnswerRevealed = false;
        this.isQuizCompleted = false;
        this.score = 0;
        this.answeredQuestions = new Set();
        this.revealedQuestions = new Set();
        this.viewAnswers = false;
        this.wrongAttempts = 0;
        this.questionStates = new Map();
        this.timeodOutReveal = false;
        this.lastQuestionSelection = '';
        this.currentSet = 0;
        // Clear any timeouts
        clearTimeout(this.correctAnsTimeout);
        clearTimeout(this.incorrectAnsTimeout);
    };
    render() {
        return this.isInitial ? (h(InitialCard, { quizTitle: this.quiztitle, quizDescription: this.fetchStatus.error ? 'Error occurred, please try again later!' : this.quizdescription, handleProceedQuiz: this.getQuizData, isLoading: this.fetchStatus.isLoading, btnTitle: this.fetchStatus.isLoading ? 'Loading' : this.fetchStatus.error ? 'Try again' : 'Start the quiz' })) : (h("div", { class: "quiz-parent__container" }, this.isQuizCompleted ? (h(ResultCard, { pyBtnTitle: "Take the quiz again", syBtnTitle: "Find a trial", result: `You answered ${this.score} out of ${this.scorableQuestions} correctly!`, handleRevealAllAnswers: this.handleViewAnswers, handleRestartQuiz: this.handleRestartQuiz, customText: this.getCustomTextForLastQuestion(this.lastQuestionSelection), syBtnUrl: this.trialUrl })) : (h(QnACard, { structure: this.qnaset[this.currentSet], clickHandle: this.handleOptionClick, isClicked: this.isClicked, capturedAnswer: this.capturedAnswer, handleRevealAnswer: this.handleRevealAnswer, capturedIndex: this.capturedIndex,
            // Pass a custom handler for last question skip/continue logic
            handleProceedToNextQuestion: (skip) => this.handleProceedToNextQuestion(skip), isAnswerRevealed: { isAnsRevealed: this.isAnswerRevealed, moreThanOneWrongAttempt: this.wrongAttempts >= 2, timeodOutReveal: this.timeodOutReveal }, status: `${this.currentSet + 1}/${this.totalSets}`, handleProceedQuiz: this.handleProceedQuiz, isMobile: this.isMobile, isLastQuestion: this.currentSet === this.totalSets - 1 }))));
    }
    static get style() { return beaconQuizCss; }
}, [257, "beacon-quiz", {
        "qnaset": [8],
        "test": [1],
        "quiztitle": [1],
        "quizdescription": [1],
        "url": [1],
        "trialUrl": [1, "trial-url"],
        "isInitial": [32],
        "isClicked": [32],
        "capturedAnswer": [32],
        "capturedIndex": [32],
        "isAnswerRevealed": [32],
        "isQuizCompleted": [32],
        "score": [32],
        "answeredQuestions": [32],
        "revealedQuestions": [32],
        "viewAnswers": [32],
        "wrongAttempts": [32],
        "questionStates": [32],
        "timeodOutReveal": [32],
        "fetchStatus": [32],
        "isMobile": [32],
        "lastQuestionSelection": [32]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["beacon-quiz", "button-component"];
    components.forEach(tagName => { switch (tagName) {
        case "beacon-quiz":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, QuizCardComponent);
            }
            break;
        case "button-component":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}
defineCustomElement$1();

const BeaconQuiz = QuizCardComponent;
const defineCustomElement = defineCustomElement$1;

export { BeaconQuiz, defineCustomElement };
//# sourceMappingURL=beacon-quiz.js.map

//# sourceMappingURL=beacon-quiz.js.map