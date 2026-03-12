import { h, r as registerInstance, a as getElement } from './index-DClFOSUP.js';
import { a as archTypeProvider } from './helpers-BCZFNITE.js';
import { B as BackIcon } from './Svg-DC38Oo0s.js';

const defaultZepQuestionSet = {
    data: [
        {
            question: 'What would you embroider on a garment you\'ve held on to?',
            weight: 1.14,
            option1: 'You\'re not seeing me',
            option1archetype: 'Visibility maker',
            option2: 'Clothes are my quiet armor',
            option2archetype: 'Quiet Force',
            option3: 'My body is not my voice',
            option3archetype: 'Challenger',
            option4: 'If my clothes could talk',
            option4archetype: 'Storyteller',
        },
        {
            question: 'When you give yourself a pep talk, what do you say?',
            weight: 1.22,
            option1: 'Go show the world your shine',
            option1archetype: 'Visibility maker',
            option2: 'Just be your spectacular self',
            option2archetype: 'Storyteller',
            option3: 'Be bold—you\'ve got this',
            option3archetype: 'Challenger',
            option4: 'Take it easy on yourself',
            option4archetype: 'Quiet Force',
        },
        {
            question: 'What\'s one truth you wish more people understood?',
            weight: 1.30,
            option1: 'Obesity is not a choice, it\'s a disease',
            option1archetype: 'Challenger',
            option2: 'Less judgment, more compassion',
            option2archetype: 'Quiet Force',
            option3: 'Everyone deserves to be seen',
            option3archetype: 'Visibility maker',
            option4: 'I deserve to have my story heard',
            option4archetype: 'Storyteller',
        },
        {
            question: 'How do you choose to express something meaningful?',
            weight: 1.16,
            option1: 'I share it on social—I love hearing and speaking with my community',
            option1archetype: 'Visibility maker',
            option2: 'I create something visual or creative—I make what I feel',
            option2archetype: 'Storyteller',
            option3: 'I write it down—it helps me reflect before I share',
            option3archetype: 'Challenger',
            option4: 'I talk to someone close—I keep it close and personal',
            option4archetype: 'Quiet Force',
        },
        {
            question: 'What motivates you to share your experiences?',
            weight: 1.18,
            option1: 'To connect with others who need to hear it',
            option1archetype: 'Storyteller',
            option2: 'Bringing visibility to what\'s often unseen',
            option2archetype: 'Visibility maker',
            option3: 'To speak up when something needs to be said',
            option3archetype: 'Challenger',
            option4: 'Supporting people i care about in small but meaningful ways',
            option4archetype: 'Quiet Force',
        },
    ],
};
const defaultZeptwoQuestionSet = {
    data: [
        {
            question: 'What would you embroider on a garment to show your support for a loved one?',
            weight: 1.20,
            option1: 'I see the person, not the weight',
            option1archetype: 'Visibility maker',
            option2: 'Everybody deserves to be seen',
            option2archetype: 'Quiet Force',
            option3: 'Unthread the stigma',
            option3archetype: 'Challenger',
            option4: 'We hear you, we’ve got you',
            option4archetype: 'Storyteller',
        },
        {
            question: 'What role do you see yourself playing?',
            weight: 1.16,
            option1: 'Making space for untold stories',
            option1archetype: 'Visibility maker',
            option2: 'Amplify real voices',
            option2archetype: 'Storyteller',
            option3: 'Unlearning my unknown bias',
            option3archetype: 'Challenger',
            option4: 'Helping others feel understood',
            option4archetype: 'Quiet Force',
        },
        {
            question: 'What kind of shifts are you helping create?',
            weight: 1.21,
            option1: 'A culture that listens',
            option1archetype: 'Challenger',
            option2: 'Less judgment, more compassion',
            option2archetype: 'Quiet Force',
            option3: 'More visibility in media and in life',
            option3archetype: 'Visibility maker',
            option4: 'Care that sees the full person',
            option4archetype: 'Storyteller',
        },
        {
            question: 'How do you choose to express something meaningful?',
            weight: 1.13,
            option1: 'I share it on social—I love hearing and speaking with my community',
            option1archetype: 'Visibility maker',
            option2: 'I create something visual or creative—I make what I feel',
            option2archetype: 'Storyteller',
            option3: 'I write it down—it helps me reflect before I share',
            option3archetype: 'Challenger',
            option4: 'I talk to someone close—I keep it close and personal',
            option4archetype: 'Quiet Force',
        },
        {
            question: 'What motivates you to speak up or show support?',
            weight: 1.30,
            option1: 'Connecting with others who might feel alone',
            option1archetype: 'Storyteller',
            option2: 'Helping bring more visibility to overlooked experiences',
            option2archetype: 'Visibility maker',
            option3: 'Challenging stigmas and shifting the conversation',
            option3archetype: 'Challenger',
            option4: 'Showing up in small but meaningful ways for those with obesity',
            option4_archetype: 'Quiet Force',
        },
    ],
};
const archetypes = {
    'Storyteller': {
        name: 'Storyteller',
        description: `You believe stories change hearts and minds. Your power comes from sharing your strength and listening deeply to others. You make it easier for people to say the hard things, and feel seen in the process.`,
        subType: 'As the storyteller, here are a couple of ways you can carry the thread forward:',
        subtypeDescription: 'Share words of support with someone who needs to hear them.',
        carryForward: 'Either share your experience or encourage someone to share their experience with someone who needs to hear it.',
        image: 'https://delivery-p153303-e1585520.adobeaemcloud.com/adobe/assets/urn:aaid:aem:f7aa90e6-4517-4e01-86de-ff62db7690d4/as/Storyteller.avif?assetname=Storyteller.png',
    },
    'Challenger': {
        name: 'Challenger',
        description: `You’re here to challenge the narrative. You call out bias, question assumptions, and push back on the idea that obesity is a choice. You believe unthreading the bias starts when we stop staying silent.`,
        subType: 'As the challenger, here are a couple of ways you can carry the thread forward:',
        subtypeDescription: 'Call out a myth when you hear it. Even a simple “That’s not the full story” plants a seed.',
        carryForward: 'Talk about why obesity isn\'t a choice with someone you know.',
        image: 'https://delivery-p153303-e1585520.adobeaemcloud.com/adobe/assets/urn:aaid:aem:e4af3394-267e-42f1-bcd8-ed20656a6af7/as/Challenger.avif?assetname=Challenger.png',
    },
    'Quiet Force': {
        name: 'Quiet Force',
        description: 'You help others feel seen and understood. You show up with empathy, offer comfort, and help change the story by shifting the way people feel, not just about themselves but about each other.',
        subType: 'As the quiet force, here are a couple of ways you can carry the thread forward:',
        subtypeDescription: 'Offer a compliment that makes someone feel truly seen.',
        carryForward: 'Show empathy. It may change everything, even in the small moments.',
        image: 'https://delivery-p153303-e1585520.adobeaemcloud.com/adobe/assets/urn:aaid:aem:495eb5f5-424f-42d7-bf41-7bfabf5f0615/as/Quietforce.avif?assetname=Quietforce.png',
    },
    'Visibility maker': {
        name: 'Visibility maker',
        description: `You bring what’s hidden into the light. You shed light on your personal experiences and those of others. You know that unthreading the stigma starts with being seen and being heard.`,
        subType: 'As the visibility maker, here are a couple of ways you can carry the thread forward:',
        subtypeDescription: 'Share this quiz with people you know.',
        carryForward: 'Create connection through sharing and listening.',
        image: 'https://delivery-p153303-e1585520.adobeaemcloud.com/adobe/assets/urn:aaid:aem:f4cd3a95-4459-47aa-89a7-386233d649f1/as/Visibilitymaker.avif?assetname=Visibilitymaker.png',
    },
};
const zepQuizStaticConstants = {
    imgDownloadToast: "Image has downloaded"
};

// Utility to dispatch custom events to modal-overlay
function dispatchModalEvent(eventName) {
    if (typeof window !== 'undefined') {
        setTimeout(() => {
            const event = new CustomEvent(eventName, { bubbles: true });
            const host = document.querySelector('modal-overlay');
            if (host)
                host.dispatchEvent(event);
        }, 0);
    }
}

const InitialCard = ({ handleProceedQuiz, handleProceedQuizTwo, quizTitle, isLoading, btnTitle, btnTitleTwo }) => {
    // Dispatch should-unbleed event on mount
    dispatchModalEvent('should-unbleed');
    const announcement = `${quizTitle}. Choose your quiz type: ${btnTitle}${handleProceedQuizTwo ? ` or ${btnTitleTwo}` : ''}`;
    return (h("div", { class: "parent-container initial-side-card d-flex" }, h("div", { role: "status", "aria-live": "polite", "aria-atomic": "true", style: {
            position: 'absolute',
            width: '1px',
            height: '1px',
            padding: '0',
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            whiteSpace: 'nowrap',
            border: '0'
        } }, announcement), h("div", { class: "flex-row justify-content-start gap-3", "aria-labelledby": "initial-label" }, h("div", { class: "parent-container-child initial-side-card" }, h("div", { class: "parent-container__content" }, h("h2", { class: "parent-container_child__header" }, quizTitle)), h("div", { class: "parent-container_child__button" }, h("zepbutton-component", { label: btnTitle, isLoading: isLoading, onBtnClick: () => handleProceedQuiz(), btnId: "initial-quiz-start" }, btnTitle), handleProceedQuizTwo && (h("zepbutton-component", { label: btnTitleTwo || 'Take Quiz 2', isLoading: isLoading, onBtnClick: () => handleProceedQuizTwo(), btnId: "initial-quiz-two-start", class: "mt-3" }, btnTitleTwo || 'Take Quiz 2')))), h("div", { class: "parent-container__right___column" }))));
};

const ResultZepCard = ({ pyBtnTitle, winningArchetypes = [], archetypeData, hasDownloadedImage, onImageDownloaded }) => {
    // Dispatch should-unbleed event on mount
    dispatchModalEvent('should-unbleed');
    // Feedback state for success/error
    let feedback = '';
    // Email validation state
    let emailError = '';
    let emailErrorRef = null;
    // Refs for form and input
    let formRef = null;
    let emailInputRef = null;
    // Archetype mapping for API
    const archetypeMapping = {
        'Storyteller': 'storyteller',
        'Visibility maker': 'maker',
        'Challenger': 'challenger',
        'Quiet Force': 'quiet-force',
    };
    // Email validation helper
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    // Email submit handler (called directly from button click)
    const handleEmailSubmit = async () => {
        console.log('handleEmailSubmit called');
        const form = formRef;
        console.log('Form ref:', form);
        if (!form) {
            console.log('Form ref not found, returning');
            return;
        }
        const emailInput = emailInputRef;
        const errorElement = emailErrorRef;
        console.log('Email input ref:', emailInput);
        if (!emailInput) {
            console.log('Email input ref not found, returning');
            return;
        }
        const emailValue = emailInput.value.trim();
        console.log('Email value:', emailValue);
        // Validate email
        if (!isValidEmail(emailValue)) {
            emailError = 'Invalid email address';
            if (errorElement) {
                errorElement.textContent = emailError;
                errorElement.style.display = 'block';
            }
            console.log('Invalid email format');
            return;
        }
        // Clear error if validation passes
        emailError = '';
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
        // Match JS implementation for payload
        const rawArchetype = sessionStorage.getItem('quizResult') ?? 'storyteller';
        // Map the archetype to API format
        const archetype = archetypeMapping[rawArchetype] || rawArchetype.toLowerCase();
        const payload = {
            firstName: 'firstName',
            lastName: 'lastName',
            email: emailValue,
            phone: null,
            mmn: 'PP-IX-US-4600',
            programProduct: 'ZepBound',
            careProgram: 'US Zepbound Care Program',
            brandSiteUrl: 'https://www.zepbound.lilly.com',
            extAttributes: [
                {
                    extAttribute_archetype: archetype,
                    extAttribute_toc_quiz: 'taken',
                },
            ],
        };
        console.log('Prepared payload:', payload);
        try {
            const EXTERNAL_EMAIL_API_URL = 'https://edg.dev.apps.lilly.com/v1/crm';
            const res = await fetch(EXTERNAL_EMAIL_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (res.ok) {
                feedback = 'Email sent successfully!';
                window.alert(feedback);
                console.log('Email sent successfully');
                form.reset();
            }
            else {
                feedback = 'Failed to send email. Please try again.';
                console.error('Email sending failed with status:', res.status);
                window.alert(feedback);
            }
        }
        catch (err) {
            feedback = 'Error sending email. Please try again.';
            console.error('Error sending email:', err);
            window.alert(feedback);
        }
    };
    let currentArchetype = null;
    if (winningArchetypes.length >= 1) {
        if (Array.isArray(archetypeData) && archetypeData.length > 0) {
            currentArchetype = archTypeProvider(winningArchetypes[0], archetypeData);
        }
        else {
            currentArchetype = archetypes[winningArchetypes[0]];
        }
    }
    // Compose announcement text for screen readers, with image description last
    const resultAnnouncement = winningArchetypes.length >= 1
        ? [
            `Quiz complete! Your result is: The ${winningArchetypes[0]}`,
            currentArchetype?.description,
            currentArchetype?.subType,
            currentArchetype?.subtypeDescription,
            currentArchetype?.carryForward,
            `A button is available to ${pyBtnTitle}`,
            currentArchetype?.image ? `This result includes an illustration representing the ${winningArchetypes[0]} archetype` : null
        ].filter(Boolean).join('. ')
        : 'Complete the quiz to discover your Threadsetter style!';
    return (h("div", { class: "parent-container initial-side-card d-flex final-card", "aria-label": "Quiz Results" }, h("div", { role: "status", "aria-live": "polite", "aria-atomic": "true", style: {
            position: 'absolute',
            width: '1px',
            height: '1px',
            padding: '0',
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            whiteSpace: 'nowrap',
            border: '0',
        } }, resultAnnouncement), h("div", { class: "d-flex justify-content-start parent-main__resulttwo___container", "aria-labelledby": "initial-label", id: "result-card-container" }, h("div", { class: "parent-container-child" }, h("div", { class: "parent-container__content" }, h("h2", { class: "parent-container_child__header" }, "The ", winningArchetypes[0]), winningArchetypes.length >= 1 ? (h("div", null, h("p", { class: "parent-container_child__paragraph" }, currentArchetype?.description), h("p", { class: "parent-container_child__paragraph_bold" }, currentArchetype?.subType), h("p", { class: "parent-container_child__paragraph" }, currentArchetype?.subtypeDescription), h("p", { class: "parent-container_child__paragraph" }, currentArchetype?.carryForward))) : (h("p", { class: "parent-container_child__paragraph" }, "Complete the quiz to discover your Threadsetter style!"))), h("div", { class: "parent-container_child__button result-zep-button" }, h("zepbutton-component", { label: pyBtnTitle, btndisabled: hasDownloadedImage ? 'Yes' : 'No', isArrow: !hasDownloadedImage, optionalStyles: hasDownloadedImage ? { color: '#6A6A6A', backgroundColor: '#E2E2E2' } : {}, onBtnClick: async () => {
            if (currentArchetype?.image) {
                try {
                    const response = await fetch(currentArchetype.image);
                    const blob = await response.blob();
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = winningArchetypes[0] || 'archetype-image.jpg';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                    if (onImageDownloaded)
                        onImageDownloaded(true);
                }
                catch (e) {
                    console.error('Failed to download image', e);
                    if (onImageDownloaded)
                        onImageDownloaded(false);
                }
            }
            else {
                if (onImageDownloaded)
                    onImageDownloaded(false);
            }
        }, btnId: "find-care-for-sleep-apnea" }, hasDownloadedImage ? zepQuizStaticConstants.imgDownloadToast : pyBtnTitle))), h("div", { class: "parent-container__right___column" }, currentArchetype?.image && (h("div", { class: "archetype-image-container" }, h("img", { src: currentArchetype.image, alt: `${currentArchetype.name} archetype illustration`, class: "archetype-image", loading: "lazy" }))))), h("div", { class: "email-yourself-container" }, h("h3", { class: "parent-container_child__email" }, "Email to yourself."), h("p", { class: "parent-container_child__paragraph" }, "Want to have your archetype and social post sent directly to your inbox? Provide your email and you're on your way!"), h("form", { class: "email-yourself-form", autocomplete: "off", id: "email-yourself-form", ref: el => { formRef = el; } }, h("label", { htmlFor: "email", class: "input-box-label" }, "Email (required)"), h("input", { type: "email", name: "email", id: "email", placeholder: "Email", class: "email-yourself-input", required: true, ref: el => { emailInputRef = el; } }), h("p", { class: "email-error-message", style: { color: 'red', fontSize: '14px', marginTop: '4px', display: 'none' }, ref: el => { emailErrorRef = el; }, role: "alert" }), h("zepbutton-component", { label: "Submit", btnId: "email-yourself-submit", onBtnClick: e => {
            console.log('Zepbutton clicked');
            e.preventDefault();
            handleEmailSubmit();
        }, style: { marginTop: '0.5rem' } }, "Submit")))));
};

const renderHighlightedWord = (question, word) => {
    const parts = question.split(new RegExp(`\\b${word}\\b`, 'g'));
    const matches = question.match(new RegExp(`\\b${word}\\b`, 'g')) || [];
    return (h("span", null, parts.map((part, idx) => (h("span", { key: idx }, part, idx < matches.length && h("strong", null, word))))));
};
const QnACard = ({ structure, clickHandle, isClicked, capturedAnswer: _capturedAnswer, capturedIndex, handleProceedToNextQuestion, status, handleProceedQuiz, isMobile, }) => {
    // Always dispatch should-bleed event when QnACard is rendered
    dispatchModalEvent('should-bleed');
    const optionRefs = [];
    const optionEntries = Object.entries(structure).filter(([key]) => key.startsWith('option') && !key.includes('archetype'));
    const focusOption = (idx) => {
        optionRefs[idx] && optionRefs[idx].focus && optionRefs[idx].focus();
    };
    // Dispatch should-bleed event on mount (only once)
    if (typeof window !== 'undefined') {
        // Use a flag to ensure it only fires once per mount
        if (!window.__qna_bleed_fired) {
            window.__qna_bleed_fired = true;
            setTimeout(() => {
                const event = new CustomEvent('should-bleed', { bubbles: true });
                // Find the closest modal-overlay ancestor and dispatch
                const host = document.querySelector('modal-overlay');
                if (host)
                    host.dispatchEvent(event);
            }, 0);
        }
    }
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
            const [, value] = optionEntries[idx];
            clickHandle({ text: value, isCorrect: true, selectedIndex: idx }, idx);
        }
    };
    return (h("div", { class: "quiz-container" }, h("div", { class: "stats-wrapper" }, status), h("div", { class: "quiz-container__content" }, h("div", { class: "content-wrapper" }, h("div", { class: "left-column" }, h("legend", { id: "question-label", class: `mb-0 ${!isMobile && "pb-1"} ${structure?.sub_header ? 'mt-0' : ""}` }, h("strong", { class: "question_label__sub_header" }, structure.sub_header), h("br", null), structure?.requiresHighlight
        ? renderHighlightedWord(structure?.question, structure?.highlight || '')
        : structure?.question), h("div", { class: "feedback-desktop" })), h("div", { class: "right-column" }, h("form", { class: "question-form", "aria-labelledby": "question-label" }, h("fieldset", null, h("div", { class: "options-wrapper" }, optionEntries.map(([, value], idx) => {
        const isSelected = isClicked && capturedIndex === idx;
        return (h("button", { key: idx, ref: (el) => (optionRefs[idx] = el), type: "button", class: `option-button ${isSelected ? 'selected' : ''}`, onClick: () => clickHandle({ text: value, isCorrect: true, selectedIndex: idx }, idx), onKeyDown: (e) => handleKeyDown(e, idx), disabled: false, "aria-label": `option ${idx + 1} of ${optionEntries.length} ${value} ${isSelected ? 'selected' : 'not selected'}` }, h("span", { class: "option-text", "aria-hidden": "true" }, value)));
    })))))), h("div", { class: "navigation-wrapper" }, h("div", { class: "button-container" }, h("div", { class: "osa-toast__back" }, h("button", { id: "back-btn", type: "button", class: `back-button${isMobile && isClicked ? ' mobile-hide-when-continue' : ''}`, onClick: () => handleProceedQuiz(), onFocus: (e) => {
            e.target.setAttribute('aria-hidden', 'false');
        }, onBlur: (e) => {
            e.target.setAttribute('aria-hidden', 'true');
        }, "aria-hidden": "true", "aria-label": "Back" }, h("span", { class: "bck-arrow", "aria-hidden": "true" }, h(BackIcon, { className: "bck-arrow__icon" })), h("span", { "aria-hidden": "true" }, "Back"))), isClicked && (h("zepbutton-component", { label: "Continue", onBtnClick: () => handleProceedToNextQuestion() }, "Continue")))))));
};

const zepboundQuizCss = "*{box-sizing:border-box;padding:0;font-family:var(--lds-g-font-family-sans-serif);letter-spacing:normal}body{background-color:#f5f7fa;color:#2c2c2c;line-height:1.5}.parent-container{width:100%;flex-direction:column;justify-content:start;align-items:center;max-width:1440px}.d-flex{display:flex}.flex-row{flex-direction:row}.flex-row-reverse{flex-direction:row-reverse}.justify-content-start{justify-content:flex-start}.gap-3{gap:1rem !important}.parent-container_child__header{font-family:var(--lds-g-font-family-sans-serif);font-weight:var(--lds-g-font-style-bold);font-size:var(--lds-g-spacing-600);line-height:var(--lds-g-font-line-height-18);letter-spacing:-2;margin:var(--lds-g-spacing-0)}.parent-container_child__email{font-family:var(--lds-g-font-family-sans-serif);font-weight:var(--lds-g-font-style-bold);font-size:32px;line-height:38px;letter-spacing:-2;margin:var(--lds-g-spacing-0)}.email-yourself-input{border-radius:40px;border:1px solid #8A8A8A;background-color:#FFFFFF;width:100%;max-width:704px;height:30px;padding:24px;margin-bottom:48px}.input-box-label{font-size:14px;font-weight:400;font-style:normal;color:#6A6A6A;margin-bottom:8px;line-height:20px}.parent-main__result___container{flex-direction:row-reverse;background-color:#f4fceb;padding:var(--lds-g-spacing-1000) 11rem}.parent-main__resulttwo___container{flex-direction:row-reverse;padding:var(--lds-g-spacing-400) 176px var(--lds-g-spacing-1000);width:1440px;gap:144px}.parent-container_child__subheading{font-family:var(--lds-g-font-family-sans-serif);font-size:var(--lds-g-spacing-400);line-height:var(--lds-g-font-line-height-12);letter-spacing:-2;margin:var(--lds-g-spacing-300) var(--lds-g-spacing-0) var(--lds-g-spacing-300) var(--lds-g-spacing-0)}.parent-container_child__paragraph{font-family:var(--lds-g-font-family-sans-serif);font-weight:var(--lds-g-font-style-regular);font-size:var(--lds-g-font-size-3);line-height:var(--lds-g-spacing-400);letter-spacing:0%}.parent-container_child__paragraph_bold{font-family:var(--lds-g-font-family-sans-serif);font-weight:var(--lds-g-font-weight-900);font-size:var(--lds-g-font-size-3);line-height:var(--lds-g-spacing-400);letter-spacing:0%}.parent-container_child__span{display:block;margin-bottom:1.5rem;font-family:var(--lds-g-font-family-sans-serif);font-weight:var(--lds-g-font-weight-400);font-size:var(--lds-g-spacing-300);line-height:120%;letter-spacing:-2%}.parent-container-child{min-width:533px}.parent-container.final-card .parent-container-child{flex-grow:12}.parent-container.initial-side-card .parent-container-child{flex-grow:12}.parent-container .parent-container-child{flex:1 1}.parent-container .parent-container__right___column{flex:1 1}.parent-container .parent-container-child legend{font-family:var(--lds-g-font-family-sans-serif);font-size:20px;line-height:var(--lds-g-spacing-300);font-weight:var(--lds-g-spacing-400)}.pb-1{padding-bottom:1rem}.pb-4{padding-bottom:1.5rem !important}.mb-0{margin-bottom:var(--lds-g-spacing-300) !important}.mt-0{margin-top:0 !important}.answer{text-decoration:underline;font-family:var(--lds-g-font-family-sans-serif)}b,strong{font-weight:bolder}fieldset{padding:0;margin:0;font:inherit;font-size:100%;vertical-align:baseline;border:0}span{padding:0;margin:0;font:inherit;font-size:100%;vertical-align:baseline;border:0}.option_quiz-correct.clicked{border:2px solid var(--lds-g-color-palette-blue-070);color:var(--lds-g-color-palette-blue-070);font-family:var(--lds-g-font-family-sans-serif)}.option_quiz-incorrect.clicked{border:2px solid var(--lds-g-color-palette-pink-060);color:var(--lds-g-color-palette-pink-060);font-family:var(--lds-g-font-family-sans-serif)}.option_quiz-dp{display:none !important}input[type='checkbox'],input[type='radio']{padding:0;box-sizing:border-box}button,input,optgroup,select,textarea{margin:0;font-family:inherit;font-size:inherit;line-height:inherit}a,button,input,select,textarea{-webkit-tap-highlight-color:transparent}.container-lg,.container-xxl{width:100%;padding-right:calc(var(--lds-g-spacing-300) * 0.5);padding-left:calc(var(--lds-g-spacing-0) * 0.5);margin-right:auto;margin-left:auto}.row{display:flex;flex-wrap:wrap;margin-top:calc(-1 * var(--lds-g-spacing-0));margin-right:calc(-0.5 * var(--lds-g-spacing-300));margin-left:calc(-0.5 * var(--lds-g-spacing-0))}.small{font-size:17px}.font-bold{font-weight:700}.p-0{padding:var(--lds-g-spacing-0) !important}.d-block{display:block !important}.py-2{padding-top:var(--lds-g-spacing-100) !important;padding-bottom:var(--lds-g-spacing-100) !important}.py-4{padding-top:var(--lds-g-spacing-300) !important;padding-bottom:var(--lds-g-spacing-300) !important}.btn{display:inline-block;padding:var(--lds-g-spacing-100) var(--lds-g-spacing-100);font-family:var(--lds-g-font-family-sans-serif);font-size:var(--lds-g-spacing-200);font-weight:var(--lds-g-font-style-serif-regular);line-height:var(--lds-g-font-line-height-015);color:#212529;text-align:center;text-decoration:none;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;user-select:none;border:1px solid transparent;border-radius:var(--lds-g-spacing-100);background-color:transparent;transition:color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out}.p-4{padding:var(--lds-g-spacing-300) !important}.px-0{padding-right:var(--lds-g-spacing-0) !important;padding-left:var(--lds-g-spacing-0) !important}.ms-2{margin-left:var(--lds-g-spacing-100) !important}.align-items-center{align-items:center !important}.parent-container__content{gap:var(--lds-g-spacing-300)}.row{margin-right:0;margin-left:0}.quiz-parent__container{justify-content:center;width:100%;}.quiz-container{max-width:100%;padding:72px 143px;position:relative;display:flex;flex-direction:column;min-height:calc(100vh - var(--lds-g-spacing-1500));max-height:100%;padding-bottom:var(--lds-g-spacing-200)}.quiz-container__content{width:100%;flex:1 1 auto;display:flex;flex-direction:column}.navigation-wrapper{margin-top:auto;width:100%}.stats-wrapper{font-family:var(--lds-g-font-family-sans-serif);font-size:14px;font-weight:var(--lds-g-font-style-serif-regular);line-height:var(--lds-g-font-line-height-2);color:var(--lds-g-color-neutral-base-100);text-transform:uppercase;margin-bottom:var(--lds-g-spacing-400)}.question-label{font-size:var(--lds-g-spacing-400);font-weight:600;margin-bottom:var(--lds-g-spacing-400);color:#1a1a1a}.question-form{width:100%}.question_label__sub_header{font-weight:var(--lds-g-font-style-bold);display:inline-block;padding-bottom:var(--lds-g-spacing-150)}.options-wrapper{display:flex;flex-direction:column;gap:var(--lds-g-spacing-300);margin-top:var(--lds-g-spacing-200);width:100%}.option-label,.option-button{align-items:center;padding:var(--lds-g-spacing-400) var(--lds-g-spacing-500) var(--lds-g-spacing-400) var(--lds-g-spacing-500);border-radius:var(--lds-g-radius-1);border:1px solid var(--lds-g-color-border-3);cursor:pointer;transition:all 0.2s ease;text-align:left;width:100%;position:relative;background:transparent;font-family:inherit}.option-label:hover,.option-label:focus,.option-button:hover,.option-button:focus{background-color:#f4fceb;box-shadow:0 2px 4px rgba(0, 0, 0, 0.05);outline:none}.option-button.selected{background-color:#e4f8cd;border-color:#267e10;box-shadow:0 2px 4px rgba(0, 0, 0, 0.1)}.option-button.selected:hover{background-color:#f4fceb;border-color:#c5c5c5}.option-button:disabled{cursor:default;opacity:0.6}.option-text{font-size:var(--lds-g-spacing-300);font-weight:var(--lds-g-font-weight-400);line-height:120%;letter-spacing:0%;text-align:left;width:440px}.option-label input{position:absolute;opacity:0;cursor:pointer;height:0;width:0}.feedback-message{display:flex;align-items:center;gap:var(--lds-g-spacing-100);}.feedback-icon{display:inline-flex;align-items:center;justify-content:center}.feedback-icon__img{height:var(--lds-g-spacing-300);width:var(--lds-g-spacing-300);display:block}.feedback-icon__img path{stroke:#025676}.feedback-icon span .feedback-icon__img path,.incorrect .feedback-icon__img path{stroke:#CE1562}.feedback-wrapper__text{font-family:var(--lds-g-font-family-sans-serif);font-weight:var(--lds-g-font-style-bold);font-size:var(--lds-g-font-size-2);line-height:var(--lds-g-font-line-height-8);letter-spacing:0%}.explanation-text{font-size:var(--lds-g-font-size-2);font-weight:var(--lds-g-font-weight-400);line-height:var(--lds-g-font-line-height-8);color:var(--lds-g-color-neutral-base-100);text-align:justify;padding-top:var(--lds-g-spacing-150);margin:var(--lds-g-spacing-0)}.back-button{background:none;border:none;cursor:pointer;font-size:var(--lds-g-spacing-200);padding-top:var(--lds-g-spacing-250);font-weight:var(--lds-g-font-style-bold);font-size:var(--lds-g-spacing-250);line-height:var(--lds-g-spacing-300);letter-spacing:0%;text-align:center;}.back-button:focus-visible{outline:2px solid var(--lds-g-color-neutral-base-070);outline-offset:2px;padding-top:var(--lds-g-spacing-0)}.bck-arrow{padding-right:var(--lds-g-spacing-100)}.bck-arrow path{stroke:#191919}.button-container{display:flex;justify-content:space-between;}.content-wrapper{font-size:var(--lds-g-spacing-400);line-height:10.6px;letter-spacing:-0.72px;}.options-wrapper label{font-size:var(--lds-g-spacing-300);font-weight:var(--lds-g-font-weight-400);line-height:120%;letter-spacing:0%}.left-column legend{font-family:var(--lds-g-font-family-sans-serif);margin-top:-2rem;font-weight:var(--lds-g-font-weight-400);font-size:var(--lds-g-font-size-6);line-height:var(--lds-g-font-line-height-15);letter-spacing:-2%}.label-span{font-family:var(--lds-g-font-family-sans-serif);font-weight:var(--lds-g-font-weight-400);font-size:var(--lds-g-spacing-300);line-height:var(--lds-g-spacing-400);text-align:start}.feedback-desktop{display:block;padding-top:var(--lds-g-spacing-400)}.feedback-mobile{display:none}@media (max-width: 991px){.flex-row{flex-direction:column}.option-text{font-size:var(--lds-g-spacing-200)}.mobile-hide-when-continue{display:flex !important;position:static;width:auto;margin-top:var(--lds-g-spacing-200);transform:none;left:auto}.mobile-full-width{width:100% !important;display:block}.parent-container{flex-direction:column;}.parent-container-child,.parent-container__right___column{flex:1 1 100%;width:100%;margin-bottom:var(--lds-g-spacing-200)}.parent-container-child{min-width:295px;position:relative}.parent-container_child__header{font-size:var(--lds-g-font-size-6);line-height:var(--lds-g-font-line-height-15);padding-bottom:var(--lds-g-spacing-250)}.parent-container_child__paragraph{font-size:var(--lds-g-font-size-2);line-height:var(--lds-g-font-line-height-6);margin-top:0}.parent-container_child__button{position:fixed;bottom:var(--lds-g-spacing-200);width:343px;left:50%;transform:translateX(-50%)}.result-zep-button{position:absolute;bottom:-10%}.parent-container.initial-side-card{padding:var(--lds-g-spacing-1600) 1.25rem 0}.container-lg{padding-right:var(--lds-g-spacing-200);padding-left:var(--lds-g-spacing-200);width:80%}.options-wrapper{width:100%;gap:var(--lds-g-spacing-150)}.content-wrapper{gap:var(--lds-g-spacing-300);display:flex;flex-direction:column}.option-label,.option-button{font-size:var(--lds-g-spacing-200);line-height:1.4;padding:var(--lds-g-spacing-250)}.left-column legend{font-size:var(--lds-g-font-size-2);line-height:var(--lds-g-font-line-height-6)}.left-column,.right-column{max-width:100%}.label-span{font-size:var(--lds-g-font-size-base);line-height:var(--lds-g-font-line-height-5)}.feedback-wrapper__text{font-size:var(--lds-g-font-size-base);line-height:var(--lds-g-font-line-height-5)}.explanation-text{font-size:var(--lds-g-font-size-base);line-height:var(--lds-g-font-line-height-5);text-align:justify}.parent-container_child__span{font-size:var(--lds-g-font-size-base)}.stats-wrapper{font-size:var(--lds-g-sizing-4);line-height:var(--lds-g-font-line-height-1);margin-top:var(--lds-g-spacing-minus-200)}.back-button{display:inline-flex;font-size:var(--lds-g-spacing-200);line-height:20px;align-items:center;justify-content:center;padding:var(--lds-g-spacing-250) var(--lds-g-spacing-400);border-radius:var(--lds-g-radius-1);background:var(--lds-g-color-neutral-base-000);color:var(--lds-g-color-neutral-base-100);width:auto;min-width:120px;margin:0;}.bck-arrow svg{display:block}.feedback-icon__img{height:var(--lds-g-spacing-200);width:var(--lds-g-spacing-200)}.feedback-desktop{display:none !important}.feedback-mobile{display:block !important}.feedback-mobile.incorrect{padding-top:5%}.quiz-container{padding:var(--lds-g-spacing-300)}.question-label{font-size:var(--lds-g-spacing-350);margin-bottom:var(--lds-g-spacing-300)}.option-label,.option-button{padding:var(--lds-g-spacing-250)}.explanation-text{margin:var(--lds-g-spacing-250) var(--lds-g-spacing-0) var(--lds-g-spacing-400) var(--lds-g-spacing-0);margin-top:var(--lds-g-spacing-0)}.button-container{justify-content:space-between;flex-direction:column;gap:var(--lds-g-spacing-200)}.quiz-container__content{display:flex;flex-direction:column;justify-content:space-between}.osa-toast__back{display:flex;justify-content:center;padding-top:var(--lds-g-spacing-400);position:static !important;width:100%}.quiz-container{max-width:100%}.parent-main__result___container{flex-direction:column-reverse;background-color:#f4fceb;padding:var(--lds-g-spacing-1000) var(--lds-g-spacing-200) var(--lds-g-spacing-500) var(--lds-g-spacing-200)}.parent-container.final-card{padding:var(--lds-g-spacing-0)}}@media (max-width: 576px){.parent-container{overflow-x:hidden}.parent-container__content{display:flex;flex-direction:column;justify-content:space-between;gap:var(--lds-g-spacing-300)}}@media (min-width: 1024px){.quiz-container{display:flex;flex-direction:column;max-width:1440px;margin:0}.content-wrapper{display:flex;flex-direction:row;justify-content:space-between;gap:var(--lds-g-spacing-2000)}.left-column{max-width:40%}.right-column{max-width:60%}.parent-container .parent-container-child legend{font-size:var(--lds-g-font-size-5);line-height:var(--lds-g-font-line-height-11);letter-spacing:-0.72px}.parent-container.final-card{padding:var(--lds-g-spacing-0);background-color:#f4fceb}.parent-container.initial-side-card .parent-container-child{padding-top:154px;padding-left:10.938rem;padding-right:739px}.email-yourself-container{width:752px;height:510px;padding-top:80px;margin-right:340px;background-color:#f4fceb}.parent-container.final-card .parent-container-child{flex-grow:1;padding-left:0 !important;padding-top:0 !important;padding-right:0 !important;align-content:center}.container,.container-lg{max-width:960px}.btn{line-height:var(--lds-g-spacing-300) !important}.options-wrapper{max-width:var(--lds-g-sizing-15);min-width:var(--lds-g-sizing-14);padding-bottom:var(--lds-g-spacing-200)}}@media (max-width: 991px){.email-yourself-container{padding-top:80px;padding-bottom:80px}}.archetype-title{font-size:var(--lds-g-font-size-5);font-weight:var(--lds-g-font-style-bold);color:var(--lds-g-color-palette-blue-070);margin-bottom:var(--lds-g-spacing-300)}.archetype-name{font-size:var(--lds-g-font-size-4);font-weight:var(--lds-g-font-style-bold);color:var(--lds-g-color-neutral-base-100);margin-bottom:var(--lds-g-spacing-150)}.archetype-result{margin-bottom:var(--lds-g-spacing-400);padding:var(--lds-g-spacing-300);border-left:3px solid var(--lds-g-color-palette-blue-070);background:var(--lds-g-color-neutral-base-005)}.score-summary{border-top:1px solid var(--lds-g-color-palette-stone-030);padding-top:var(--lds-g-spacing-200)}.parent-container_child__button{display:flex;flex-direction:column;gap:var(--lds-g-spacing-300)}.archetype-image-container{display:flex;justify-content:flex-start;align-items:center;height:100%}.archetype-image{max-width:100%;max-height:44rem;width:auto;height:auto;object-fit:contain;box-shadow:0 4px 12px rgba(0, 0, 0, 0.1)}@media (max-width: 1440px){.archetype-image-container{}.archetype-image{max-height:300px}.parent-main__resulttwo___container{flex-direction:column-reverse;padding:var(--lds-g-spacing-600) var(--lds-g-spacing-0) var(--lds-g-spacing-500)}}@media (max-width: 768px){.archetype-image{max-height:100%;width:100%}}";

const ZepboundQuiz = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get el() { return getElement(this); }
    quizDataOne;
    quizDataTwo;
    archetypeData;
    qnaset;
    test;
    quiztitle = 'To personalize your experience, tell us how you connect to this movement:';
    url;
    quiz1ButtonLabel = "I'm on a personal weight journey";
    quiz2ButtonLabel = "I am here to support others facing weight stigma";
    isInitial = true;
    isClicked = false;
    capturedAnswer = false;
    capturedIndex = 0;
    isQuizCompleted = false;
    currentQuizType = 'quiz1';
    // New state to track per-question state
    questionStates = new Map();
    timeodOutReveal = false;
    fetchStatus = { isLoading: false, error: false };
    isMobile = typeof window !== 'undefined' ? window.innerWidth <= 991 : false;
    hasDownloadedImage = false;
    // Internal normalized questions array (do not mutate the @Prop qnaset)
    questions = [];
    // Archetype scoring
    archetypeScores = {
        'Storyteller': 0,
        'Challenger': 0,
        'Quiet Force': 0,
        'Visibility maker': 0,
    };
    winningArchetypes = [];
    liveRegionText = '';
    totalSets = 0;
    currentSet = 0;
    // track last announced set to avoid duplicate announcements
    lastAnnouncedSet = -1;
    componentWillLoad() {
        // Normalize incoming qnaset into an internal `questions` array so we don't mutate props.
        this.quizDataOne = this.quizDataOne || defaultZepQuestionSet.data;
        this.quizDataTwo = this.quizDataTwo || defaultZeptwoQuestionSet.data;
        this.archetypeData = this.archetypeData || {};
        const incoming = this.qnaset;
        if (Array.isArray(incoming)) {
            this.questions = incoming;
        }
        else if (incoming && Array.isArray(incoming.data)) {
            this.questions = incoming.data;
        }
        else {
            // fallback to defaults
            this.questions = this.currentQuizType === 'quiz1' ? this.quizDataOne : this.quizDataTwo;
        }
        this.totalSets = (this.questions && this.questions.length) || 0;
        this.questionStates = new Map();
        this.resetArchetypeScores();
    }
    resetArchetypeScores() {
        this.archetypeScores = {
            'Storyteller': 0,
            'Challenger': 0,
            'Quiet Force': 0,
            'Visibility maker': 0,
        };
        this.winningArchetypes = [];
    }
    componentDidLoad() {
        window.addEventListener('resize', this.handleResize);
        // Announce immediately when component loads
        if (this.isInitial) {
            this.updateLiveRegion(`Welcome to ${this.quiztitle}. Please choose your quiz type: ${this.quiz1ButtonLabel} or ${this.quiz2ButtonLabel}`);
        }
        // If quiz was preloaded, announce first question immediately
        else if (this.questions && this.questions.length > 0) {
            this.announceQuestionAndOptions();
            // Focus the first option to help screen readers
            requestAnimationFrame(() => {
                const firstOption = this.el?.querySelector('.option-button');
                if (firstOption) {
                    firstOption.focus();
                }
            });
        }
    }
    disconnectedCallback() {
        window.removeEventListener('resize', this.handleResize);
    }
    handleResize = () => {
        this.isMobile = window.innerWidth <= 991;
    };
    updateLiveRegion = (text) => {
        // Clear first, then set new text to ensure screen readers announce the change
        this.liveRegionText = '';
        setTimeout(() => {
            this.liveRegionText = text;
        }, 100);
    };
    announceQuestionAndOptions = () => {
        if (!this.questions || !this.questions[this.currentSet])
            return;
        const currentQuestion = this.questions[this.currentSet];
        const questionNumber = this.currentSet + 1;
        const totalQuestions = this.totalSets;
        // Get all options for this question
        const optionEntries = Object.entries(currentQuestion).filter(([key]) => key.startsWith('option') && !key.includes('archetype'));
        const questionText = currentQuestion.question || '';
        const subHeader = currentQuestion.sub_header ? `${currentQuestion.sub_header}. ` : '';
        // Build detailed options text
        const optionsAnnouncement = optionEntries.map(([, value], index) => {
            return `Option ${index + 1}: ${value}`;
        });
        // Create a comprehensive announcement
        const announcementParts = [
            `Question ${questionNumber} of ${totalQuestions}`,
            subHeader,
            questionText,
            'Available options:',
            ...optionsAnnouncement
        ].filter(Boolean);
        // Add navigation hint
        if (this.isClicked && this.capturedIndex >= 0) {
            const selectedOption = optionEntries[this.capturedIndex]?.[1];
            if (selectedOption) {
                announcementParts.push(`Selected option ${this.capturedIndex + 1}: ${selectedOption}`);
                if (this.currentSet < this.totalSets - 1) {
                    announcementParts.push('Use the Continue button to move to the next question');
                }
                else {
                    announcementParts.push('Use the Continue button to see your results');
                }
            }
        }
        // Clear and update to ensure announcement
        this.updateLiveRegion('');
        setTimeout(() => {
            this.updateLiveRegion(announcementParts.join('. '));
        }, 100);
    };
    getQuizData = () => {
        this.questions = this.quizDataOne;
        this.totalSets = this.quizDataOne?.length;
        this.isInitial = false;
        this.currentQuizType = 'quiz1';
        this.resetArchetypeScores();
        // Store selected quiz label in session storage
        try {
            sessionStorage.setItem('zepboundQuizSelectedCTA', this.quiz1ButtonLabel);
        }
        catch (e) { }
        // Announce immediately
        this.announceQuestionAndOptions();
    };
    getQuizDataTwo = () => {
        this.questions = this.quizDataTwo;
        this.totalSets = this.quizDataTwo?.length;
        this.isInitial = false;
        this.currentQuizType = 'quiz2';
        this.resetArchetypeScores();
        // Store selected quiz label in session storage
        try {
            sessionStorage.setItem('zepboundQuizSelectedCTA', this.quiz2ButtonLabel);
        }
        catch (e) { }
        // Announce immediately
        this.announceQuestionAndOptions();
    };
    handleOptionClick = (_option, index) => {
        // For Zepbound quiz, allow changing answers
        this.capturedAnswer = true; // Always true since there's no wrong answer
        this.isClicked = true;
        this.capturedIndex = index;
        // Get current state or create new one
        const currentState = this.questionStates.get(this.currentSet) || {
            isClicked: false,
            capturedAnswer: false,
            capturedIndex: 0,
        };
        // Calculate archetype scoring with weights
        const currentQuestion = this.questions[this.currentSet];
        const questionWeight = +currentQuestion.weight || 1; // Default weight if not specified
        const optionKey = `option${index + 1}`;
        const archetypeKey = `${optionKey}archetype`;
        const selectedArchetype = currentQuestion[archetypeKey];
        // If this question was already answered, subtract the previous weighted score
        if (currentState.isClicked) {
            const previousOptionKey = `option${currentState.capturedIndex + 1}`;
            const previousArchetypeKey = `${previousOptionKey}archetype`;
            const previousArchetype = currentQuestion[previousArchetypeKey];
            if (previousArchetype) {
                this.archetypeScores = {
                    ...this.archetypeScores,
                    [previousArchetype]: this.archetypeScores[previousArchetype] - questionWeight,
                };
            }
        }
        // Add weighted score for the new selection
        if (selectedArchetype) {
            this.archetypeScores = {
                ...this.archetypeScores,
                [selectedArchetype]: this.archetypeScores[selectedArchetype] + questionWeight,
            };
        }
        // Save the state for this question
        this.questionStates.set(this.currentSet, {
            ...currentState,
            isClicked: true,
            capturedAnswer: true, // Always true for Zepbound quiz
            capturedIndex: index,
        });
        // Save question and selected answer to session storage
        const optionEntries = Object.entries(currentQuestion).filter(([key]) => key.startsWith('option') && !key.includes('archetype'));
        try {
            const storedAnswers = JSON.parse(sessionStorage.getItem('zepboundQuizAnswers') || '[]');
            // Save question text and selected answer
            const selectedOptionText = optionEntries[index]?.[1];
            const questionText = currentQuestion.question || '';
            storedAnswers[this.currentSet] = {
                question: questionText,
                selectedAnswer: selectedOptionText,
                questionIndex: this.currentSet,
            };
            sessionStorage.setItem('zepboundQuizAnswers', JSON.stringify(storedAnswers));
        }
        catch (e) {
            // fail silently
        }
        // Announce the selection with more context
        const selectedOptionText = optionEntries[index]?.[1];
        if (selectedOptionText) {
            const optionCount = optionEntries.length;
            const questionNumber = this.currentSet + 1;
            this.updateLiveRegion(`You selected: ${selectedOptionText}. ` +
                `This was option ${index + 1} of ${optionCount} for question ${questionNumber} of ${this.totalSets}. ` +
                `${this.currentSet < this.totalSets - 1 ? 'Click Continue to proceed to the next question.' : 'Click Continue to see your results.'}`);
        }
    };
    handleProceedToPreviousQuestion = () => {
        if (this.currentSet > 0) {
            this.currentSet--;
            const savedState = this.questionStates.get(this.currentSet);
            if (savedState) {
                this.isClicked = savedState.isClicked;
                this.capturedAnswer = savedState.capturedAnswer;
                this.capturedIndex = savedState.capturedIndex;
                this.timeodOutReveal = false;
            }
            else {
                this.resetQuizState();
            }
            // create a shallow copy to trigger re-render if necessary
            this.questions = [...this.questions];
            // Announce the current question after navigation
            setTimeout(() => {
                this.announceQuestionAndOptions();
            }, 300);
        }
        else if (this.currentSet === 0) {
            this.isInitial = true;
            this.currentQuizType = 'quiz1'; // Reset to default
            // Announce reset to initial state for screen reader users
            this.updateLiveRegion('Quiz reset. Choose which quiz you would like to take.');
        }
    };
    handleProceedQuiz = () => {
        this.handleProceedToPreviousQuestion();
    };
    // reset quiz
    resetQuizState() {
        this.isClicked = false;
        this.capturedAnswer = false;
        this.capturedIndex = 0;
        this.timeodOutReveal = false;
    }
    // Calculate winning archetypes based on weighted scores
    calculateWinningArchetypes() {
        const maxScore = Math.max(...Object.values(this.archetypeScores));
        this.winningArchetypes = Object.keys(this.archetypeScores).filter(archetype => this.archetypeScores[archetype] === maxScore);
        // If there's still a tie after weighted scoring, take the first one alphabetically for consistency
        if (this.winningArchetypes.length > 1) {
            this.winningArchetypes = [this.winningArchetypes.sort()[0]];
        }
    }
    handleProceedToNextQuestion = () => {
        // if it's the last question
        if (this.currentSet >= this.totalSets - 1) {
            this.calculateWinningArchetypes();
            this.isQuizCompleted = true;
            // Announce quiz completion
            this.updateLiveRegion('Quiz completed! Your results are now available.');
            // Archetype mapping for API
            const archetypeMapping = {
                'Storyteller': 'storyteller',
                'Visibility maker': 'maker',
                'Challenger': 'challenger',
                'Quiet Force': 'quiet-force',
            };
            // Save winning archetype info to session storage
            try {
                const winningArchetype = this.winningArchetypes[0];
                let archetypeDescription = '';
                let archetypeImage = '';
                let archetypeName = '';
                let archetypeInfo;
                if (this.archetypeData && winningArchetype) {
                    if (Array.isArray(this.archetypeData)) {
                        archetypeInfo = archTypeProvider(winningArchetype, this.archetypeData);
                        if (!archetypeInfo) {
                            archetypeInfo = this.archetypeData.find((item) => item.name === winningArchetype);
                        }
                    }
                    else {
                        archetypeInfo = this.archetypeData[winningArchetype] || {};
                    }
                }
                // Fallback to default archetypes object if needed (missing or empty description/image)
                if ((!archetypeInfo || !archetypeInfo.description || !archetypeInfo.image) &&
                    winningArchetype && archetypes[winningArchetype]) {
                    const fallback = archetypes[winningArchetype];
                    archetypeInfo = {
                        ...archetypeInfo,
                        description: fallback.description,
                        image: fallback.image,
                        name: fallback.name,
                    };
                }
                if (archetypeInfo) {
                    archetypeDescription = archetypeInfo.description || '';
                    archetypeImage = archetypeInfo.image || archetypeInfo.img || '';
                    archetypeName = archetypeInfo.name || winningArchetype;
                }
                // Map the archetype to API format
                const mappedArchetype = archetypeMapping[winningArchetype] || winningArchetype.toLowerCase();
                sessionStorage.setItem('zepboundQuizResult', JSON.stringify({
                    archetype: archetypeName || winningArchetype,
                    description: archetypeDescription,
                    image: archetypeImage,
                }));
                // Store the mapped archetype for API use
                sessionStorage.setItem('quizResult', mappedArchetype);
            }
            catch (e) {
                // fail silently
            }
            return;
        }
        this.currentSet++;
        const savedState = this.questionStates?.get(this.currentSet);
        if (savedState) {
            this.isClicked = savedState.isClicked ?? false;
            this.capturedAnswer = savedState.capturedAnswer ?? false;
            this.capturedIndex = savedState.capturedIndex ?? 0;
            this.timeodOutReveal = false;
        }
        else {
            this.resetQuizState();
        }
        // ensure re-render
        this.questions = [...(this.questions ?? [])];
        // Announce the next question after a short delay
        setTimeout(() => {
            this.announceQuestionAndOptions();
        }, 300);
    };
    componentDidUpdate() {
        // Ensure immediate announcement of any changes
        if (!this.isInitial && this.currentSet !== this.lastAnnouncedSet) {
            this.announceQuestionAndOptions();
            this.lastAnnouncedSet = this.currentSet;
        }
        // Also announce when returning to initial screen
        if (this.isInitial && this.lastAnnouncedSet !== -1) {
            this.updateLiveRegion(`Welcome to ${this.quiztitle}. Please choose your quiz type: ${this.quiz1ButtonLabel} or ${this.quiz2ButtonLabel}`);
            this.lastAnnouncedSet = -1;
        }
    }
    render() {
        return (h("div", { key: '535f0a25544bc83b68949b8cbdfcfe7727914fa9' }, h("div", { key: 'f7872f19ba2bc1e89bbc63b0fd466d4db01309ea', role: "status", "aria-live": "polite", "aria-atomic": "true", style: {
                position: 'absolute',
                width: '1px',
                height: '1px',
                padding: '0',
                margin: '-1px',
                overflow: 'hidden',
                clip: 'rect(0, 0, 0, 0)',
                whiteSpace: 'nowrap',
                border: '0'
            } }, this.liveRegionText), this.isInitial ? (
        // <zep-modal-overlay isopen={true} cardType="initial">
        h(InitialCard, { quizTitle: this.quiztitle, handleProceedQuiz: this.getQuizData, handleProceedQuizTwo: this.getQuizDataTwo, isLoading: this.fetchStatus.isLoading, btnTitle: this.fetchStatus.isLoading ? 'Loading' : this.fetchStatus.error ? 'Try again' : this.quiz1ButtonLabel, btnTitleTwo: this.fetchStatus.isLoading ? 'Loading' : this.fetchStatus.error ? 'Try again' : this.quiz2ButtonLabel })) : (h("div", { class: "quiz-parent__container" }, this.isQuizCompleted ? (h(ResultZepCard, { pyBtnTitle: "Download and share", winningArchetypes: this.winningArchetypes, archetypeData: this.archetypeData, hasDownloadedImage: this.hasDownloadedImage, onImageDownloaded: (val) => { this.hasDownloadedImage = val; } })) : (h(QnACard, { structure: this.questions[this.currentSet], clickHandle: this.handleOptionClick, isClicked: this.isClicked, capturedAnswer: this.capturedAnswer, capturedIndex: this.capturedIndex, handleProceedToNextQuestion: this.handleProceedToNextQuestion, status: `${this.currentSet + 1}/${this.totalSets}`, handleProceedQuiz: this.handleProceedQuiz, isMobile: this.isMobile }))))));
    }
};
ZepboundQuiz.style = zepboundQuizCss;

export { ZepboundQuiz as zepbound_quiz };
//# sourceMappingURL=zepbound-quiz.entry.js.map
