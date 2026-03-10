import { p as proxyCustomElement, H, h } from './index.js';

const disclaimerCss = ":host{display:block;width:100%;box-sizing:border-box}*,*::before,*::after{box-sizing:border-box}.disclaimer-container{padding:var(--lds-g-spacing-300, 24px);align-items:flex-start;align-self:stretch;border-radius:16px;background:var(--Red005---Neutral-Rose-Tint, #FBF5F4);margin:0}.disclaimer-container p{margin:0;padding:0;align-self:stretch;color:var(--lds-g-color-neutral-base-100);font-family:var(--lds-g-font-family-sans-serif, Ringside);font-size:var(--lds-g-font-size-base, 16px);font-style:normal;font-weight:var(--lds-g-font-style-serif-regular);line-height:var(--lds-g-font-line-height-5, 1.5rem)}.disclaimer-container p a{color:var(--lds-g-color-palette-primary-060, #c41e3a) !important;font-family:var(--lds-g-font-family-sans-serif, Ringside);font-size:var(--lds-g-font-size-base, 16px);font-style:normal;font-weight:var(--lds-g-font-style-serif-regular);line-height:var(--lds-g-font-line-height-5, 1.5rem);text-decoration-line:underline !important;text-decoration-style:solid;text-decoration-skip-ink:none;text-decoration-thickness:4%;text-underline-offset:20.5%;text-underline-position:from-font}.disclaimer-container a.red-inline-link,.disclaimer-container p a.red-inline-link{color:var(--lds-g-color-palette-primary-060, #c41e3a) !important;font-family:var(--lds-g-font-family-sans-serif, Ringside);font-size:var(--lds-g-font-size-base, 16px);font-style:normal;font-weight:var(--lds-g-font-style-serif-regular);line-height:var(--lds-g-font-line-height-5, 1.5rem);text-decoration-line:underline !important;text-decoration-style:solid;text-decoration-skip-ink:none;text-decoration-thickness:4%;text-underline-offset:20.5%;text-underline-position:from-font}.disclaimer-container p a:focus-visible,.disclaimer-container a.red-inline-link:focus-visible{outline:3px solid var(--lds-g-color-neutral-base-070, #5d5d5d);outline-offset:4px;border-radius:var(--6xs, 4px)}.disclaimer-container p a:focus:not(:focus-visible),.disclaimer-container a.red-inline-link:focus:not(:focus-visible){outline:none}@media (max-width: 834px){.disclaimer-container{padding:var(--lds-g-spacing-250, 20px)}}@media (max-width: 480px){.disclaimer-container{padding:var(--lds-g-spacing-200, 16px)}}";

const Disclaimer = /*@__PURE__*/ proxyCustomElement(class Disclaimer extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.__attachShadow();
    }
    get el() { return this; }
    content;
    optionalClass = '';
    componentDidLoad() {
        this.ensureLinksAreFocusable();
    }
    componentDidUpdate() {
        this.ensureLinksAreFocusable();
    }
    ensureLinksAreFocusable() {
        if (!this.el.shadowRoot)
            return;
        const links = this.el.shadowRoot.querySelectorAll('a');
        links.forEach((link) => {
            // Ensure link is in tab order
            if (!link.hasAttribute('tabindex')) {
                link.setAttribute('tabindex', '0');
            }
            // Ensure keyboard interaction works
            if (!link.hasAttribute('data-keyboard-enabled')) {
                link.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        link.click();
                    }
                });
                link.setAttribute('data-keyboard-enabled', 'true');
            }
        });
    }
    render() {
        if (!this.content) {
            return null;
        }
        return (h("div", { class: `disclaimer-container ${this.optionalClass}`, role: "note", "aria-label": "Disclaimer", innerHTML: this.content.innerHTML }));
    }
    static get style() { return disclaimerCss; }
}, [257, "disclaimer-component", {
        "content": [16],
        "optionalClass": [1, "optional-class"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["disclaimer-component"];
    components.forEach(tagName => { switch (tagName) {
        case "disclaimer-component":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, Disclaimer);
            }
            break;
    } });
}
defineCustomElement$1();

const DisclaimerComponent = Disclaimer;
const defineCustomElement = defineCustomElement$1;

export { DisclaimerComponent, defineCustomElement };
//# sourceMappingURL=disclaimer-component.js.map

//# sourceMappingURL=disclaimer-component.js.map