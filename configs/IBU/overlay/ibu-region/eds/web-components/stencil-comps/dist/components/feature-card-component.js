import { p as proxyCustomElement, H, c as createEvent, h } from './index.js';
import { d as defineCustomElement$2 } from './p-BPUpDc6t.js';

const featureCardComponentCss = ".feature-card-container,.container-lg{max-width:100vw;box-sizing:border-box}.d-flex{display:flex}.mx-auto{margin-right:auto;margin-left:auto}.overflow-hidden{overflow:hidden !important}.bgr-white{background-color:var(--lds-g-color-neutral-base-000)}.container-lg{width:100%;padding-right:calc(var(--lds-g-spacing-300) * .5);padding-left:calc(var(--lds-g-spacing-0) * .5);margin-right:auto;margin-left:auto}.feature-card-container{width:100%;padding:var(--lds-g-spacing-300);box-sizing:border-box}.bgr-neutral-stone{background-color:var(--lds-g-color-palette-stone-005)}.rounded-5{border-radius:var(--lds-g-spacing-400)}.feature-card-container .feature-card-content{flex-direction:column;flex-wrap:wrap;align-items:center}.feature-card-container .feature-card-content__left{font-family:var(--lds-g-font-family-sans-serif);gap:0.4rem}.feature-card-container .feature-card-content__left .feature-card-content__left__sub___content{flex:1 1}.feature-card-content__left___header{font:var(--lds-g-typography-ringside-heading-5-default)}.feature-card-content__left__paragraph,.feature-card-container .feature-card-content__left .feature-card-content__left__sub___content{flex:1 1}.feature-card-container .feature-card-content__left p{font-size:var(--lds-g-spacing-200);line-height:var(--lds-g-spacing-300);font-weight:200}.feature-card-btn__container{flex-shrink:1}@media only screen and (min-width: 0){.feature-card-container .feature-card-content__left{flex-direction:column}}@media only screen and (min-width: 992px){.feature-card-container .feature-card-content__left{flex-direction:row;align-items:center;gap:var(--lds-g-spacing-1600)}}";

const FeatureCardComponent$1 = /*@__PURE__*/ proxyCustomElement(class FeatureCardComponent extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.__attachShadow();
        this.featureButtonClicked = createEvent(this, "featureButtonClicked");
    }
    featureButtonClicked;
    btntitle = 'Take the quiz';
    quiztitle = 'How much do you know about sleep apnea?';
    quizdescription = 'Take this quick quiz to learn more about sleep apnea and feel empowered to talk to a provider if you are experiencing symptoms.';
    buttonAriaLabel = 'Click to take the quiz';
    buttonEvents = {};
    isMounted = true;
    handleButtonClick = () => {
        this.featureButtonClicked.emit();
    };
    render() {
        return (h("div", { key: '0cb95651b83a0a4c2ca05fa16408e4380fa64b3b', class: "bgr-white overflow-hidden", style: { display: this.isMounted ? 'block' : 'none' } }, h("section", { key: '4e6a2834eea06de011f21443b356c5d1d075f579', class: "container-lg mx-auto", "aria-label": this.quiztitle }, h("div", { key: 'd89aa5bf001a383ccdd22706e9d1134bd080b70b', class: "rounded-5 bgr-neutral-stone feature-card-container", "aria-label": "" }, h("div", { key: '3006e6a81e086002508abcbb0d8aa6592574651f', class: "d-flex feature-card-content" }, h("div", { key: '824a72ff33f3469d26f4b84ea8d0327268435dff', class: "d-flex feature-card-content__left" }, h("div", { key: 'd3f0ee1e261aecf7bb7f53896892cd772a674cf3', class: "feature-card-content__left__sub___content" }, h("h2", { key: 'b19112e0020ea2acd32ae13e89dd7a22ca4492b9', class: "feature-card-content__left___header" }, this.quiztitle)), h("div", { key: '5686237ccdf3b5a28a2cbda8caccb0733720e0db', class: "feature-card-content__left__paragraph" }, h("p", { key: 'cf9aa135cf01adab7290ac002ac6a516d74319e9' }, this.quizdescription)), h("div", { key: '9497e03bd9dc3b480e37f446ecb095b7bc287957', class: "feature-card-btn__container" }, h("button-component", { key: 'f0cc49acdf321cf9e0a2d266470b743e5cea493f', label: this.buttonAriaLabel, onBtnClick: this.handleButtonClick }, this.btntitle))))))));
    }
    static get style() { return featureCardComponentCss; }
}, [257, "feature-card-component", {
        "btntitle": [1],
        "quiztitle": [1],
        "quizdescription": [1],
        "buttonAriaLabel": [1, "button-aria-label"],
        "buttonEvents": [16],
        "isMounted": [4, "is-mounted"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["feature-card-component", "button-component"];
    components.forEach(tagName => { switch (tagName) {
        case "feature-card-component":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, FeatureCardComponent$1);
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

const FeatureCardComponent = FeatureCardComponent$1;
const defineCustomElement = defineCustomElement$1;

export { FeatureCardComponent, defineCustomElement };
//# sourceMappingURL=feature-card-component.js.map

//# sourceMappingURL=feature-card-component.js.map