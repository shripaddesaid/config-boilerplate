import { h, p as proxyCustomElement, H } from './index.js';
import { i as isCorrectAns } from './p-BCZFNITE.js';
import { G as GreenCheckIcon, R as RedCrossIcon, B as BackIcon } from './p-CRE7AF9B.js';
import { d as defineCustomElement$2 } from './p-BPUpDc6t.js';

const defaultQuestionSet = {
    data: [
        {
            question: 'What is sleep apnea?',
            option1: 'A type of insomnia',
            option2: 'A condition where breathing will stop and start during sleep',
            option3: 'A disorder caused by sleeping too much',
            option4: 'A type of narcolepsy',
            correct_answer: 'option2',
            explanation: 'Sleep apnea occurs due to disruptions in the normal breathing process during sleep, typically caused by either physical airway obstruction (obstructive sleep apnea) or problems in the brain’s regulation of breathing (central sleep apnea).',
        },
        {
            sub_header: 'Myth or Fact',
            question: 'Everyone who snores has OSA',
            option1: 'Myth',
            option2: 'Fact',
            correct_answer: 'option1',
            explanation: 'Not everyone who snores has OSA. However, loud, persistent snoring, especially with other symptoms like breathing interruptions, could be a sign of OSA.',
        },
        {
            question: 'Which of these is NOT a common symptom of sleep apnea?',
            requiresHighlight: true,
            highlight: "NOT",
            option1: 'Choking or gasping for air',
            option2: 'Feeling tired throughout the day',
            option3: 'Frequent leg cramps',
            option4: 'Difficulty concentrating',
            correct_answer: 'option3',
            explanation: 'While leg cramps can occur for other reasons, they’re not a typical symptom of sleep apnea.',
        },
        {
            sub_header: 'Myth or Fact',
            question: 'The only way to get diagnosed with sleep apnea is to do a sleep test in a lab.',
            option1: 'Myth',
            option2: 'Fact',
            correct_answer: 'option1',
            explanation: 'Sleep apnea screenings have come a long way. You can participate in a sleep test in-person at a clinic, or from the comfort of your own home.',
        },
        {
            question: 'What are some potential health risks of untreated sleep apnea?',
            option1: 'High blood pressure',
            option2: 'Heart disease',
            option3: 'Stroke',
            option4: 'All of the above',
            correct_answer: 'option4',
            explanation: 'Untreated sleep apnea can increase the risk of serious health problems like high blood pressure, heart disease, and stroke. Early detection and treatment are key.',
        },
        {
            sub_header: 'Myth or Fact',
            question: 'A CPAP machine is the only treatment for sleep apnea.',
            option1: 'Myth',
            option2: 'Fact',
            correct_answer: 'option1',
            explanation: 'There are multiple ways to treat sleep apnea. Behavior and lifestyle changes, in addition to medical devices, weight reduction, oral appliances, and medicine are just some of the ways that sleep apnea can be treated.',
        },
    ],
};

const InitialCard = ({ handleProceedQuiz, quizTitle, quizDescription, isLoading, btnTitle }) => {
    return (h("div", { class: "parent-container initial-side-card d-flex" }, h("div", { class: "d-flex flex-row justify-content-start gap-3", "aria-labelledby": "initial-label" }, h("div", { class: "parent-container-child initial-side-card" }, h("div", { class: "parent-container__content" }, h("h2", { class: "parent-container_child__header mb-0" }, quizTitle), h("p", { class: "parent-container_child__paragraph" }, quizDescription)), h("div", { class: "parent-container_child__button" }, h("button-component", { label: "Take the quiz", isLoading: isLoading, onBtnClick: () => handleProceedQuiz(), btnId: "initial-quiz-start" }, btnTitle))), h("div", { class: "parent-container__right___column" }))));
};

const ResultCard = ({ pyBtnTitle, syBtnTitle, result, handleRevealAllAnswers }) => {
    return (h("div", { class: "parent-container initial-side-card d-flex final-card" }, h("div", { class: "d-flex flex-row justify-content-start gap-3", "aria-labelledby": "initial-label" }, h("div", { class: "parent-container-child" }, h("div", { class: "parent-container__content" }, h("h2", { class: "parent-container_child__header mb-0" }, result), h("p", { class: "parent-container_child__paragraph" }, "Scroll to learn more about signs, symptoms, diagnosis, and treatment of sleep apnea.\u00A0 If you think you may be experiencing symptoms, talk to a provider now.")), h("div", { class: "parent-container_child__button" }, h("button-component", { label: pyBtnTitle, onBtnClick: () => {
            window.location.href = 'https://lillydirect.lilly.com/sleep-apnea#take-action-section';
        }, btnId: "find-care-for-sleep-apnea" }, pyBtnTitle), h("div", { class: "osa-toast mt-2" }, h("button-component", { label: syBtnTitle, onBtnClick: handleRevealAllAnswers, isbtnprimary: "No", isArrow: false, btnId: "view-correct-answers" }, syBtnTitle)))), h("div", { class: "parent-container__right___column" }))));
};

const renderFeedback = ({ isClicked, capturedAnswer, isAnswerRevealed, structure, handleRevealAnswer }) => {
    return (h(h.Fragment, null, isClicked && capturedAnswer && isAnswerRevealed.timeodOutReveal && (h("div", { class: "feedback-wrapper" }, h("div", { class: "feedback-message" }, h("span", { class: "feedback-icon" }, h(GreenCheckIcon, { className: "feedback-icon__img", strokeColor: "#025676" })), h("span", { class: "feedback-wrapper__text d-flex align-items-center", role: "alert" }, h("span", null, isAnswerRevealed.isAnsRevealed ? 'The correct answer is:' : 'That’s right!'))))), !capturedAnswer && isClicked && (h("div", { class: "feedback-wrapper" }, h("div", { class: "feedback-message" }, h("span", { class: "feedback-icon" }, h("span", { class: "d-flex align-items-center" }, h(RedCrossIcon, { className: "feedback-icon__img", strokeColor: "#CE1562" }))), h("span", { class: "feedback-wrapper__text d-flex align-items-center font-bold small", role: "alert" }, isAnswerRevealed.moreThanOneWrongAttempt ? ('Not quite') : (h("span", null, "Try again or\u00A0", h("button", { type: "button", "aria-label": "see the answer", class: "nonRoutingLink btn p-0 text-decoration-underline fc-neutral-black c-fs-16 c-fw-400 c-lh-125", onClick: () => handleRevealAnswer() }, h("span", { class: "d-flex feedback-wrapper__text answer" }, "see the answer")))))))), isClicked && capturedAnswer && isAnswerRevealed.timeodOutReveal && h("p", { class: "explanation-text" }, structure?.explanation)));
};
const renderHighlightedWord = (question, word) => {
    const parts = question.split(new RegExp(`\\b${word}\\b`, 'g'));
    const matches = question.match(new RegExp(`\\b${word}\\b`, 'g')) || [];
    return (h("span", null, parts.map((part, idx) => (h("span", { key: idx }, part, idx < matches.length && (h("strong", null, word)))))));
};
const QnACard = ({ structure, clickHandle, isClicked, capturedAnswer, handleRevealAnswer, capturedIndex, handleProceedToNextQuestion, isAnswerRevealed, status, handleProceedQuiz, isMobile, }) => {
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
            const isCorrect = isCorrectAns(key, structure.correct_answer);
            clickHandle({ text: value, isCorrect }, idx);
        }
    };
    // Mobile feedback logic
    const isCorrectMobile = isMobile && isClicked && capturedAnswer && isAnswerRevealed.timeodOutReveal;
    const isIncorrectMobile = isMobile && !capturedAnswer && isClicked;
    return (h("div", { class: "quiz-container" }, h("div", { class: "stats-wrapper" }, status), h("div", { class: "quiz-container__content" }, h("div", { class: "content-wrapper" }, h("div", { class: "left-column" }, h("legend", { id: "question-label", class: `mb-0 ${!isMobile && "pb-1"} ${structure?.sub_header ? 'mt-0' : ""}` }, h("strong", { class: "question_label__sub_header" }, structure.sub_header), h("br", null), structure?.requiresHighlight
        ? renderHighlightedWord(structure?.question, structure?.highlight || '')
        : structure?.question), h("div", { class: "feedback-desktop" }, renderFeedback({
        isClicked,
        capturedAnswer,
        isAnswerRevealed,
        structure,
        handleRevealAnswer,
    }))), h("div", { class: "right-column" }, h("form", { class: "question-form", "aria-labelledby": "question-label" }, h("fieldset", null, h("div", { class: "options-wrapper" }, isCorrectMobile && (h("div", { class: "feedback-mobile" }, h("div", { class: "feedback-wrapper" }, h("div", { class: "feedback-message" }, h("span", { class: "feedback-icon" }, h(GreenCheckIcon, { className: "feedback-icon__img", strokeColor: "#025676" })), h("span", { class: "feedback-wrapper__text d-flex align-items-center", role: "alert" }, h("span", null, isAnswerRevealed.isAnsRevealed ? 'The correct answer is:' : 'That’s right!')))))), optionEntries.map(([key, value], index) => {
        const isCorrect = isCorrectAns(key, structure.correct_answer);
        const checked = capturedIndex === index;
        return (h("label", { class: `option-label option_quiz-${isAnswerRevealed.timeodOutReveal
                ? isCorrect
                    ? 'correct clicked'
                    : isMobile ? 'dp' : ''
                : checked && isCorrect
                    ? isClicked
                        ? 'correct clicked'
                        : ''
                    : checked && !isCorrect && isClicked
                        ? 'incorrect clicked'
                        : ''}`, tabIndex: 0, "aria-label": value, ref: el => (optionRefs[index] = el), onKeyDown: e => {
                if (!isAnswerRevealed.timeodOutReveal)
                    handleKeyDown(e, index);
            }, id: `quiz-option-${index + 1}`, onClick: () => {
                if (!isAnswerRevealed.timeodOutReveal)
                    clickHandle({ text: value, isCorrect, totalOptions: optionEntries.length }, index);
            }, key: key, style: isAnswerRevealed.timeodOutReveal ? { pointerEvents: 'none' } : {} }, h("span", { class: "label-span" }, value)));
    }), isCorrectMobile && h("p", { class: "explanation-text" }, structure?.explanation)))), isIncorrectMobile && (h("div", { class: "feedback-mobile incorrect" }, h("div", { class: "feedback-wrapper" }, h("div", { class: "feedback-message" }, h("span", { class: "feedback-icon" }, h("span", { class: "d-flex align-items-center" }, h(RedCrossIcon, { className: "feedback-icon__img", strokeColor: "#CE1562" }))), h("span", { class: "feedback-wrapper__text d-flex align-items-center font-bold small", role: "alert" }, isAnswerRevealed.moreThanOneWrongAttempt ? ('Not quite') : (h("span", null, "Try again or\u00A0", h("button", { type: "button", "aria-label": "see the answer", class: "nonRoutingLink btn p-0 text-decoration-underline fc-neutral-black c-fs-16 c-fw-400 c-lh-125", onClick: () => handleRevealAnswer() }, h("span", { class: "d-flex feedback-wrapper__text answer" }, "see the answer"))))))))), h("div", { class: "feedback-mobile", style: { display: 'none' } }))), h("div", { class: "navigation-wrapper" }, h("div", { class: "button-container" }, h("div", { class: "osa-toast__back" }, h("button", { type: "button", "aria-label": "back", class: `back-button${isMobile && capturedAnswer && isClicked && isAnswerRevealed.timeodOutReveal ? ' mobile-hide-when-continue' : ''}`, onClick: () => handleProceedQuiz() }, h("span", { class: "bck-arrow" }, h(BackIcon, { className: "bck-arrow__icon" })), h("span", null, "Back"))), capturedAnswer && isClicked && isAnswerRevealed.timeodOutReveal && (h("button-component", { label: "Continue", onBtnClick: () => handleProceedToNextQuestion() }, "Continue")))))));
};

const sleepApneaQuizCss = "* {\r\n  box-sizing: border-box;\r\n  padding: 0;\r\n  font-family: var(--lds-g-font-family-sans-serif);\r\n  letter-spacing: normal;\r\n}\r\n\r\nbody {\r\n  background-color: #f5f7fa;\r\n  color: #2c2c2c;\r\n  line-height: 1.5;\r\n}\r\n\r\n.parent-container {\r\n  width: 100%;\r\n  flex-direction: column;\r\n  justify-content: start;\r\n  align-items: center;\r\n  max-width: 1440px;\r\n}\r\n\r\n.d-flex {\r\n  display: flex;\r\n}\r\n\r\n.flex-row {\r\n  flex-direction: row;\r\n}\r\n\r\n.justify-content-start {\r\n  justify-content: flex-start;\r\n}\r\n\r\n.gap-3 {\r\n  gap: 1rem !important;\r\n}\r\n\r\n.parent-container_child__header {\r\n  font-family: var(--lds-g-font-family-sans-serif);\r\n  font-weight: var(--lds-g-font-style-bold);\r\n  font-size: var(--lds-g-spacing-600);\r\n  line-height: var(--lds-g-font-line-height-18);\r\n  letter-spacing: -2;\r\n}\r\n\r\n.parent-container_child__paragraph {\r\n  font-family: var(--lds-g-font-family-sans-serif);\r\n  font-weight: var(--lds-g-font-style-regular);\r\n  font-size: var(--lds-g-font-size-3);\r\n  line-height: var(--lds-g-spacing-400);\r\n  letter-spacing: 0%;\r\n}\r\n\r\n.parent-container_child__span {\r\n  display: block;\r\n  margin-bottom: 1.5rem;\r\n  font-family: var(--lds-g-font-family-sans-serif);\r\n  font-weight: var(--lds-g-font-weight-400);\r\n  font-size: var(--lds-g-spacing-300);\r\n  line-height: 120%;\r\n  letter-spacing: -2%;\r\n}\r\n\r\n.parent-container-child{\r\n  min-width: 533px;\r\n}\r\n\r\n.parent-container.final-card .parent-container-child,\r\n.parent-container.initial-side-card .parent-container-child {\r\n  flex-grow: 12;\r\n}\r\n\r\n.parent-container .parent-container-child {\r\n  flex: 1 1;\r\n}\r\n\r\n.parent-container .parent-container__right___column {\r\n  flex: 1 1;\r\n}\r\n\r\n.parent-container .parent-container-child legend {\r\n  font-family: var(--lds-g-font-family-sans-serif);\r\n  font-size: 20px;\r\n  line-height: var(--lds-g-spacing-300);\r\n  font-weight: var(--lds-g-spacing-400);\r\n}\r\n\r\n.pb-1{\r\n  padding-bottom: 1rem;\r\n}\r\n\r\n.pb-4 {\r\n  padding-bottom: 1.5rem !important;\r\n}\r\n\r\n.mb-0 {\r\n  margin-bottom: 0 !important;\r\n}\r\n\r\n.mt-0 {\r\n  margin-top: 0 !important;\r\n}\r\n\r\n.mt-2 {\r\n  margin-top: var(--lds-g-spacing-200) !important;\r\n}\r\n\r\n.parent-container_child__button {\r\n  display: flex;\r\n  flex-direction: column;\r\n  margin-top: var(--lds-g-spacing-400);\r\n}\r\n\r\n.parent-container_child__button .osa-toast {\r\n  margin-top: 0;\r\n}\r\n\r\n.answer {\r\n  text-decoration: underline;\r\n  font-family: var(--lds-g-font-family-sans-serif)\r\n}\r\n\r\nb,\r\nstrong {\r\n  font-weight: bolder;\r\n}\r\n\r\n/* Styles for QnA */\r\nfieldset {\r\n  padding: 0;\r\n  margin: 0;\r\n  font: inherit;\r\n  font-size: 100%;\r\n  vertical-align: baseline;\r\n  border: 0;\r\n}\r\n\r\nspan {\r\n  padding: 0;\r\n  margin: 0;\r\n  font: inherit;\r\n  font-size: 100%;\r\n  vertical-align: baseline;\r\n  border: 0;\r\n}\r\n\r\n.option_quiz-correct.clicked {\r\n  border: 2px solid var(--lds-g-color-palette-blue-070);\r\n  color: var(--lds-g-color-palette-blue-070);\r\n  font-family: var(--lds-g-font-family-sans-serif)\r\n}\r\n\r\n.option_quiz-incorrect.clicked {\r\n  border: 2px solid var(--lds-g-color-palette-pink-060);\r\n  color: var(--lds-g-color-palette-pink-060);\r\n  font-family: var(--lds-g-font-family-sans-serif);\r\n}\r\n\r\n.option_quiz-dp {\r\n  display: none !important;\r\n}\r\n\r\ninput[type='checkbox'],\r\ninput[type='radio'] {\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n}\r\n\r\nbutton,\r\ninput,\r\noptgroup,\r\nselect,\r\ntextarea {\r\n  margin: 0;\r\n  font-family: inherit;\r\n  font-size: inherit;\r\n  line-height: inherit;\r\n}\r\n\r\na,\r\nbutton,\r\ninput,\r\nselect,\r\ntextarea {\r\n  -webkit-tap-highlight-color: transparent;\r\n}\r\n\r\n.container-lg,\r\n.container-xxl {\r\n  width: 100%;\r\n  padding-right: calc(var(--lds-g-spacing-300) * 0.5);\r\n  padding-left: calc(var(--lds-g-spacing-0) * 0.5);\r\n  margin-right: auto;\r\n  margin-left: auto;\r\n}\r\n\r\n.row {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  margin-top: calc(-1 * var(--lds-g-spacing-0));\r\n  margin-right: calc(-0.5 * var(--lds-g-spacing-300));\r\n  margin-left: calc(-0.5 * var(--lds-g-spacing-0));\r\n}\r\n\r\n.small {\r\n  font-size: 17px;\r\n}\r\n\r\n.font-bold {\r\n  font-weight: 700;\r\n}\r\n\r\n.p-0 {\r\n  padding: var(--lds-g-spacing-0) !important;\r\n}\r\n\r\n.d-block {\r\n  display: block !important;\r\n}\r\n\r\n.py-2 {\r\n  padding-top: var(--lds-g-spacing-100) !important;\r\n  padding-bottom: var(--lds-g-spacing-100) !important;\r\n}\r\n\r\n.py-4 {\r\n  padding-top: var(--lds-g-spacing-300) !important;\r\n  padding-bottom: var(--lds-g-spacing-300) !important;\r\n}\r\n\r\n.btn {\r\n  display: inline-block;\r\n  padding: var(--lds-g-spacing-100) var(--lds-g-spacing-100);\r\n  font-family: var(--lds-g-font-family-sans-serif);\r\n  font-size: var(--lds-g-spacing-200);\r\n  font-weight: var(--lds-g-font-style-serif-regular);\r\n  line-height: var(--lds-g-font-line-height-015);\r\n  color: #212529;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  cursor: pointer;\r\n  -webkit-user-select: none;\r\n  -moz-user-select: none;\r\n  user-select: none;\r\n  border: 1px solid transparent;\r\n  border-radius: var(--lds-g-spacing-100);\r\n  background-color: transparent;\r\n  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\r\n}\r\n\r\n.p-4 {\r\n  padding: var(--lds-g-spacing-300) !important;\r\n}\r\n\r\n.px-0 {\r\n  padding-right: var(--lds-g-spacing-0) !important;\r\n  padding-left: var(--lds-g-spacing-0) !important;\r\n}\r\n\r\n.ms-2 {\r\n  margin-left: var(--lds-g-spacing-100) !important;\r\n}\r\n\r\n.align-items-center {\r\n  align-items: center !important;\r\n}\r\n\r\n.parent-container__content {  \r\n  gap: var(--lds-g-spacing-300);\r\n}\r\n\r\n.row {\r\n  margin-right: 0;\r\n  margin-left: 0;\r\n}\r\n\r\n.quiz-parent__container{\r\n  display: flex;\r\n  justify-content: center;\r\n  width: 100%;\r\n}\r\n\r\n.quiz-container {\r\n  max-width: 100%;\r\n  padding: var(--lds-g-spacing-400) var(--lds-g-spacing-1600);\r\n  position: relative;\r\n  display: flex;\r\n  flex-direction: column;\r\n  min-height: calc(100vh - var(--lds-g-spacing-1500));\r\n  max-height: 100%;\r\n  padding-bottom: var(--lds-g-spacing-200); \r\n}\r\n\r\n.quiz-container__content {\r\n  width: 100%;\r\n  flex: 1 1 auto;\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.navigation-wrapper {\r\n  margin-top: auto;\r\n  width: 100%;\r\n}\r\n\r\n.stats-wrapper {\r\n  font-family: var(--lds-g-font-family-sans-serif);\r\n  font-size: 14px;\r\n  font-weight: var(--lds-g-font-style-serif-regular);\r\n  line-height: var(--lds-g-font-line-height-2);\r\n  color: var(--lds-g-color-neutral-base-100);\r\n  text-transform: uppercase;\r\n  margin-bottom: var(--lds-g-spacing-400);\r\n}\r\n\r\n/* Question styles */\r\n.question-label {\r\n  font-size: var(--lds-g-spacing-400);\r\n  font-weight: 600;\r\n  margin-bottom: var(--lds-g-spacing-400);\r\n  color: #1A1A1A;\r\n}\r\n\r\n.question_label__sub_header{\r\n  font-weight: var(--lds-g-font-style-bold);\r\n  display: inline-block;\r\n  padding-bottom: var(--lds-g-spacing-150);\r\n}\r\n\r\n/* Options styles */\r\n.options-wrapper {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: var(--lds-g-spacing-300);\r\n  margin-top: var(--lds-g-spacing-200);\r\n  width: 100%;\r\n}\r\n\r\n.option-label {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: flex-start;\r\n  padding: var(--lds-g-spacing-300);\r\n  border-radius: var(--lds-g-radius-1);\r\n  border: 1px solid var(--lds-g-color-palette-stone-030);\r\n  cursor: pointer;\r\n  transition: all 0.2s ease;\r\n  text-align: center;\r\n  font-size: 1.125rem;\r\n  width: 100%;\r\n  position: relative;\r\n}\r\n\r\n.option-label:hover,\r\n.option-label:focus {\r\n  background: var(--lds-g-color-neutral-base-010);\r\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\r\n  outline: none;\r\n}\r\n\r\n.option-label input {\r\n  position: absolute;\r\n  opacity: 0;\r\n  cursor: pointer;\r\n  height: 0;\r\n  width: 0;\r\n}\r\n\r\n/* Feedback message */\r\n.feedback-message {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: var(--lds-g-spacing-100)\r\n  /* margin: var(--lds-g-spacing-300) var(--lds-g-spacing-0); */\r\n}\r\n\r\n.feedback-icon {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n}\r\n\r\n.feedback-icon__img{\r\n  height: var(--lds-g-spacing-300);\r\n  width: var(--lds-g-spacing-300);\r\n  display: block;\r\n}\r\n\r\n/* GreenCheckIcon - correct answers (stroke color) */\r\n.feedback-icon__img path {\r\n  stroke: #025676;\r\n}\r\n\r\n/* RedCrossIcon - incorrect answers (stroke color) */\r\n/* The incorrect feedback has an extra span wrapper around the icon */\r\n.feedback-icon span .feedback-icon__img path,\r\n.incorrect .feedback-icon__img path {\r\n  stroke: #CE1562;\r\n}\r\n\r\n.feedback-wrapper__text {\r\n  font-family: var(--lds-g-font-family-sans-serif);\r\n  font-weight: var(--lds-g-font-style-bold);\r\n  font-size: var(--lds-g-font-size-2);\r\n  line-height: var(--lds-g-font-line-height-8);\r\n  letter-spacing: 0%\r\n}\r\n\r\n.explanation-text {\r\n  font-size: var(--lds-g-font-size-2);\r\n  font-weight: var(--lds-g-font-weight-400);\r\n  line-height: var(--lds-g-font-line-height-8);\r\n  /* margin: var(--lds-g-spacing-300) var(--lds-g-spacing-0) var(--lds-g-spacing-500) var(--lds-g-spacing-0); */\r\n  color: var(--lds-g-color-neutral-base-100);\r\n  text-align: justify;\r\n  padding-top: var(--lds-g-spacing-150);\r\n  margin: var(--lds-g-spacing-0);\r\n}\r\n\r\n.back-button {\r\n  background: none;\r\n  border: none;\r\n  cursor: pointer;\r\n  font-size: var(--lds-g-spacing-200);\r\n  /* padding-top: 0.5rem 0; */\r\n  padding-top: var(--lds-g-spacing-200);\r\n  font-weight: var(--lds-g-font-style-bold);\r\n  font-size: var(--lds-g-spacing-250);\r\n  line-height: var(--lds-g-spacing-300);\r\n  letter-spacing: 0%;\r\n  text-align: center;\r\n}\r\n\r\n.back-button:focus-visible {\r\n  outline: 2px solid var(--lds-g-color-neutral-base-070);\r\n  outline-offset: 2px;\r\n  padding-top: var(--lds-g-spacing-0) ;\r\n}\r\n\r\n.bck-arrow {\r\n  padding-right: var(--lds-g-spacing-100);\r\n}\r\n\r\n.bck-arrow path {\r\n  stroke: #191919;\r\n}\r\n\r\n.button-container {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  /* margin-top: 2rem; */\r\n}\r\n\r\n.content-wrapper {\r\n  font-size: var(--lds-g-spacing-400);\r\n  line-height: 10.6px;\r\n  letter-spacing: -.72px;\r\n  /* gap: 20rem; */\r\n}\r\n\r\n.options-wrapper label {\r\n  font-size: var(--lds-g-spacing-300);\r\n  font-weight: var(--lds-g-font-weight-400);\r\n  line-height: 120%;\r\n  letter-spacing: 0%;\r\n}\r\n\r\n.left-column legend {\r\n  font-family: var(--lds-g-font-family-sans-serif);\r\n  margin-top: -2rem;\r\n  font-weight: var(--lds-g-font-weight-400);\r\n  font-size: var(--lds-g-font-size-6);\r\n  line-height: var(--lds-g-font-line-height-15);\r\n  letter-spacing: -2%;\r\n}\r\n\r\n.label-span {\r\n  font-family: var(--lds-g-font-family-sans-serif);\r\n  font-weight: var(--lds-g-font-weight-400);\r\n  font-size: var(--lds-g-spacing-300);\r\n  line-height: var(--lds-g-spacing-400);\r\n  text-align: start\r\n}\r\n\r\n.feedback-desktop {\r\n  display: block;\r\n  padding-top: var(--lds-g-spacing-400);\r\n}\r\n\r\n.feedback-mobile {\r\n  display: none;\r\n}\r\n\r\n/* Keeps only one btn visible for mobile*/\r\n@media (max-width: 991px) {\r\n  .mobile-hide-when-continue {\r\n    display: none !important;\r\n  }\r\n  \r\n  .mobile-full-width {\r\n    width: 100% !important;\r\n    display: block;\r\n  }\r\n  \r\n  .parent-container {\r\n    flex-direction: column;\r\n    padding: var(--lds-g-spacing-300);\r\n  }\r\n\r\n  .parent-container-child,\r\n  .parent-container__right___column {\r\n    flex: 1 1 100%;\r\n    width: 100%;\r\n    margin-bottom: var(--lds-g-spacing-200);\r\n  }\r\n  \r\n  .parent-container-child {\r\n    min-width: 295px;\r\n  }\r\n  \r\n  .parent-container_child__header {\r\n    font-size: var(--lds-g-font-size-6);\r\n    line-height: var(--lds-g-font-line-height-15);\r\n    padding-bottom: var(--lds-g-spacing-250);\r\n  }\r\n  \r\n  .parent-container_child__paragraph {\r\n    font-size: var(--lds-g-font-size-2);\r\n    line-height: var(--lds-g-font-line-height-6);\r\n    margin-top: 0;\r\n  }\r\n  \r\n  .parent-container_child__button {\r\n    position: fixed;\r\n    bottom: var(--lds-g-spacing-200);\r\n    width: auto;\r\n    left: 50%;\r\n    transform: translateX(-50%);\r\n    display: flex;\r\n    flex-direction: column;\r\n    margin-top: 0;\r\n  }\r\n  \r\n  .parent-container_child__button .osa-toast {\r\n    margin-top: 0;\r\n  }\r\n  \r\n  .parent-container.initial-side-card {\r\n    padding: 0 0 0 var(--lds-g-spacing-300);\r\n  }\r\n  \r\n  .container-lg {\r\n    padding-right: var(--lds-g-spacing-200);\r\n    padding-left: var(--lds-g-spacing-200);\r\n    width: 80%;\r\n  }\r\n  \r\n  .options-wrapper {\r\n    width: 100%;\r\n    gap: var(--lds-g-spacing-150);\r\n  }\r\n  \r\n  .content-wrapper {\r\n    gap: var(--lds-g-spacing-300);\r\n    display: flex;\r\n    flex-direction: column;\r\n  }\r\n  \r\n  .option-label {\r\n    font-size: var(--lds-g-spacing-200);\r\n    line-height: 1.4;\r\n    padding: var(--lds-g-spacing-250);\r\n  }\r\n  \r\n  .left-column legend {\r\n    font-size: var(--lds-g-font-size-2);\r\n    line-height: var(--lds-g-font-line-height-6);\r\n  }\r\n  \r\n  .left-column, .right-column {\r\n    max-width: 100%;\r\n  }\r\n  \r\n  .label-span {\r\n    font-size: var(--lds-g-font-size-base);\r\n    line-height: var(--lds-g-font-line-height-5);\r\n  }\r\n  \r\n  .feedback-wrapper__text {\r\n    font-size: var(--lds-g-font-size-base);\r\n    line-height: var(--lds-g-font-line-height-5);\r\n  }\r\n  \r\n  .explanation-text {\r\n    font-size: var(--lds-g-font-size-base);\r\n    line-height: var(--lds-g-font-line-height-5);\r\n    text-align: justify;\r\n  }\r\n  \r\n  .parent-container_child__span {\r\n    font-size: var(--lds-g-font-size-base);\r\n  }\r\n  \r\n  .stats-wrapper {\r\n    font-size: var(--lds-g-sizing-4);\r\n    line-height: var(--lds-g-font-line-height-1);\r\n    margin-top: var(--lds-g-spacing-minus-200);\r\n  }\r\n  \r\n  .back-button {\r\n    display: flex;\r\n    font-size: var(--lds-g-spacing-200);\r\n    line-height: 20px;\r\n    align-items: center;\r\n  }\r\n  \r\n  .bck-arrow svg {\r\n    display: block;\r\n  }\r\n  \r\n  .feedback-icon__img {\r\n    height: var(--lds-g-spacing-200);\r\n    width: var(--lds-g-spacing-200);\r\n  }\r\n  \r\n  .feedback-desktop {\r\n    display: none !important;\r\n  }\r\n  \r\n  .feedback-mobile {\r\n    display: block !important;\r\n  }\r\n  \r\n  .feedback-mobile.incorrect {\r\n    padding-top: 5%;\r\n  }\r\n  \r\n  .quiz-container {\r\n    padding: var(--lds-g-spacing-300);\r\n  }\r\n  \r\n  .question-label {\r\n    font-size: var(--lds-g-spacing-350);\r\n    margin-bottom: var(--lds-g-spacing-300);\r\n  }\r\n  \r\n  .option-label {\r\n    padding: var(--lds-g-spacing-250);\r\n  }\r\n  \r\n  .explanation-text {\r\n    margin: var(--lds-g-spacing-250) var(--lds-g-spacing-0) var(--lds-g-spacing-400) var(--lds-g-spacing-0);\r\n    margin-top: var(--lds-g-spacing-0);\r\n  }\r\n  \r\n  .button-container {\r\n    justify-content: center;\r\n  }\r\n  \r\n  .quiz-container__content {\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: space-between;\r\n  }\r\n  \r\n  .osa-toast__back {\r\n    display: flex;\r\n    justify-content: center;\r\n    padding-top: var(--lds-g-spacing-400);\r\n  }\r\n  \r\n  .quiz-container {\r\n    max-width: 100%;\r\n  }\r\n}\r\n\r\n@media (max-width: 576px) {\r\n  .parent-container {\r\n    padding: var(--lds-g-spacing-400);\r\n    overflow-x: hidden;\r\n  }\r\n\r\n  .parent-container__content {\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: space-between;\r\n    gap: var(--lds-g-spacing-0);\r\n    margin-bottom: 70%;\r\n  }\r\n}\r\n\r\n@media (min-width: 1024px) {\r\n  .quiz-container {\r\n    display: flex;\r\n    flex-direction: column;\r\n    max-width: 1440px;\r\n    margin: 0;\r\n  }\r\n\r\n  .content-wrapper {\r\n    display: flex;\r\n    flex-direction: row;\r\n    justify-content: space-between;\r\n    gap: var(--lds-g-spacing-2000);\r\n  }\r\n\r\n  .left-column {\r\n    max-width: 40%;\r\n  }\r\n\r\n  .right-column {\r\n    max-width: 60%;\r\n  }\r\n  \r\n  .parent-container .parent-container-child legend {\r\n    font-size: var(--lds-g-font-size-5);\r\n    line-height: var(--lds-g-font-line-height-11);\r\n    letter-spacing: -0.72px;\r\n  }\r\n\r\n  /* .parent-container.final-card {\r\n    padding-left: 10%;\r\n  } */\r\n  \r\n  .parent-container.final-card .parent-container-child,\r\n  .parent-container.initial-side-card .parent-container-child {\r\n    flex-grow: 1;\r\n    padding-top: var(--lds-g-sizing-12);\r\n    padding-left: var(--lds-g-sizing-12);\r\n  }\r\n  \r\n  .container, .container-lg {\r\n    max-width: 960px;\r\n  }\r\n  \r\n  .btn {\r\n    line-height: var(--lds-g-spacing-300) !important;\r\n  }\r\n  \r\n  .options-wrapper {\r\n    max-width: var(--lds-g-sizing-15);\r\n    min-width: var(--lds-g-sizing-14);\r\n    padding-bottom: var(--lds-g-spacing-200);\r\n  }\r\n}\r\n\r\n";

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
    quiztitle = 'How much do you know about sleep apnea?';
    quizdescription = 'Take this quick quiz to learn more about sleep apnea and feel empowered to talk to a provider if you are experiencing symptoms.';
    url;
    isInitial = true;
    isClicked = false;
    capturedAnswer = false;
    capturedIndex = 0;
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
    totalSets = 0;
    currentSet = 0;
    correctAnsTimeout;
    incorrectAnsTimeout;
    componentWillLoad() {
        this.qnaset = this.qnaset || defaultQuestionSet;
        this.totalSets = this.qnaset.length;
        this.viewAnswers = false;
        this.questionStates = new Map();
    }
    componentDidLoad() {
        window.addEventListener('resize', this.handleResize);
    }
    disconnectedCallback() {
        window.removeEventListener('resize', this.handleResize);
    }
    handleResize = () => {
        this.isMobile = window.innerWidth <= 991;
    };
    getQuizData = () => {
        const { data } = defaultQuestionSet;
        this.qnaset = data;
        this.totalSets = data.length;
        this.isInitial = false;
    };
    handleOptionClick = (option, index) => {
        this.capturedAnswer = option.isCorrect;
        this.isClicked = true;
        this.capturedIndex = index;
        // Get current state or create new one
        const currentState = this.questionStates.get(this.currentSet) || {
            isClicked: false,
            capturedAnswer: false,
            capturedIndex: 0,
            wrongAttempts: 0,
        };
        if (!option.isCorrect) {
            // Update wrong attempts
            const newWrongAttempts = option.totalOptions === 2 ? option.totalOptions : currentState.wrongAttempts + 1;
            this.wrongAttempts = newWrongAttempts;
            // Save updated wrong attempts to question state
            this.questionStates.set(this.currentSet, {
                ...currentState,
                isClicked: true,
                capturedIndex: index,
                wrongAttempts: newWrongAttempts,
            });
            if (newWrongAttempts >= 2) {
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
        const correctIdx = options.findIndex(([key]) => key === question.correct_answer);
        this.capturedIndex = correctIdx !== -1 ? correctIdx : 0;
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
                    this.timeodOutReveal = false;
                    this.isAnswerRevealed = false;
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
        this.capturedIndex = 0;
        this.timeodOutReveal = false;
    }
    handleProceedToNextQuestion = () => {
        clearTimeout(this.correctAnsTimeout);
        clearTimeout(this.incorrectAnsTimeout);
        //  if it's the last question
        if (this.currentSet >= this.totalSets - 1) {
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
                this.timeodOutReveal = false;
                this.isAnswerRevealed = false;
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
    render() {
        return this.isInitial ? (h(InitialCard, { quizTitle: this.quiztitle, quizDescription: this.fetchStatus.error ? 'Error occurred, please try again later!' : this.quizdescription, handleProceedQuiz: this.getQuizData, isLoading: this.fetchStatus.isLoading, btnTitle: this.fetchStatus.isLoading ? 'Loading' : this.fetchStatus.error ? 'Try again' : 'Take the quiz' })) : (h("div", { class: "quiz-parent__container" }, this.isQuizCompleted ? (h(ResultCard, { pyBtnTitle: "Find care for sleep apnea", syBtnTitle: "View correct answers", result: `You got ${this.score}/${this.totalSets}`, handleRevealAllAnswers: this.handleViewAnswers })) : (h(QnACard, { structure: this.qnaset[this.currentSet], clickHandle: this.handleOptionClick, isClicked: this.isClicked, capturedAnswer: this.capturedAnswer, handleRevealAnswer: this.handleRevealAnswer, capturedIndex: this.capturedIndex, handleProceedToNextQuestion: this.handleProceedToNextQuestion, isAnswerRevealed: { isAnsRevealed: this.isAnswerRevealed, moreThanOneWrongAttempt: this.wrongAttempts >= 2, timeodOutReveal: this.timeodOutReveal }, status: `${this.currentSet + 1}/${this.totalSets}`, handleProceedQuiz: this.handleProceedQuiz, isMobile: this.isMobile }))));
    }
    static get style() { return sleepApneaQuizCss; }
}, [257, "sleep-apnea-quiz", {
        "qnaset": [8],
        "test": [1],
        "quiztitle": [1],
        "quizdescription": [1],
        "url": [1],
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
        "isMobile": [32]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sleep-apnea-quiz", "button-component"];
    components.forEach(tagName => { switch (tagName) {
        case "sleep-apnea-quiz":
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

const SleepApneaQuiz = QuizCardComponent;
const defineCustomElement = defineCustomElement$1;

export { SleepApneaQuiz, defineCustomElement };
//# sourceMappingURL=sleep-apnea-quiz.js.map

//# sourceMappingURL=sleep-apnea-quiz.js.map