import { p as proxyCustomElement, H, c as createEvent, h } from './index.js';

const zepbuttonComponentCss = ".button_container{display:inline-block;justify-content:center;align-items:center;gap:12px;margin:8px 0;padding:6px 12px;border:initial;text-decoration:none;font-weight:300;border-radius:100px}.btn{font-family:var(--lds-g-font-family-sans-serif);font-weight:var(--lds-g-font-style-serif-regular);font-style:normal;color:var(--lds-g-color-neutral-base-000);line-height:var(--lds-g-font-line-height-5);border:none;padding:var(--lds-g-spacing-150) var(--lds-g-spacing-300) var(--lds-g-spacing-150) var(--lds-g-spacing-300)}.active{background-color:#008A26;cursor:pointer}.secondary{color:var(--lds-color-secondary-100);background-color:#008A26;border:2px solid var(--lds-g-color-palette-red-060);color:var(--lds-g-color-palette-red-060)}.btn.primary-button.active:hover{background-color:#008A26}.btn.secondary-button.active:hover{background-color:rgba(249, 238, 237, 0.23)}.btn.primary-button.active:focus{outline:3px solid var(--lds-g-color-neutral-base-070);outline-offset:3px}.btn.secondary-button.active:focus{outline:3px solid var(--lds-g-color-neutral-base-070);outline-offset:3px}._button_content__bRCou{display:flex;justify-content:center;align-items:center;gap:12px}.c-fs-16{font-size:20px}.loader{width:28px;height:28px;border:3px solid var(--lds-g-color-neutral-base-070);border-bottom-color:var(--lds-g-color-palette-red-060);border-radius:50%;display:inline-block;box-sizing:border-box;animation:rotation 1s linear infinite}@keyframes rotation{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@media only screen and (min-width: 992px){.c-fs-lg-20{font-size:20px}}@media only screen and (max-width: 991px){.btn{width:100%}}@media only screen and (min-width: 992px){.btn{width:max-content;min-width:204px;max-width:100%;white-space:normal;word-wrap:break-word;min-height:var(--lds-g-spacing-500)}}@media (width <= 768px){.c-fs-16{font-size:var(--lds-g-spacing-200);line-height:var(--lds-g-font-line-height-3)}}";

const ZepButtonComponent = /*@__PURE__*/ proxyCustomElement(class ZepButtonComponent extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.__attachShadow();
        this.btnClick = createEvent(this, "btnClick");
        this.btnKeyUp = createEvent(this, "btnKeyUp");
        this.btnKeyDown = createEvent(this, "btnKeyDown");
        this.btnFocus = createEvent(this, "btnFocus");
        this.btnBlur = createEvent(this, "btnBlur");
        this.btnMouseOver = createEvent(this, "btnMouseOver");
        this.btnMouseOut = createEvent(this, "btnMouseOut");
        this.btnMouseEnter = createEvent(this, "btnMouseEnter");
        this.btnMouseLeave = createEvent(this, "btnMouseLeave");
    }
    get el() { return this; }
    type = 'button';
    btndisabled;
    isbtnprimary;
    isbtnsecondary;
    role = 'button';
    label;
    tabNumber = 0;
    optionalStyles = {};
    isLoading = false;
    optionalClass = '';
    isArrow = true;
    btnId = 'default-btn-id';
    btnClick;
    btnKeyUp;
    btnKeyDown;
    btnFocus;
    btnBlur;
    btnMouseOver;
    btnMouseOut;
    btnMouseEnter;
    btnMouseLeave;
    componentWillLoad() {
        this.btndisabled = this.btndisabled || 'No';
        this.isbtnprimary = this.isbtnprimary || 'Yes';
    }
    handleClick(event) {
        if (this.btndisabled.toLowerCase() !== 'yes') {
            this.btnClick.emit(event);
        }
    }
    handleKeyDown(event) {
        this.btnKeyDown.emit(event);
        if ((this.btndisabled.toLowerCase() !== 'yes' && event.key === 'Enter') || event.key === ' ') {
            event.preventDefault();
            this.btnClick.emit(new MouseEvent('click', { bubbles: true }));
        }
    }
    render() {
        const isDisabled = this.btndisabled === 'Yes' || this.isLoading;
        const buttonClass = `button_container btn ${this.isbtnprimary === 'No' ? 'secondary' : 'primary'}-button ${this.isbtnprimary === 'No' && 'secondary'} ${!isDisabled && 'active'} ${this.optionalClass}`;
        return (h("button", { key: '5d03572ffcc8387292777305ec786e0f7c96f307', type: this.type, class: buttonClass, "aria-label": this.label, disabled: isDisabled, role: this.role, tabindex: isDisabled ? -1 : this.tabNumber, ariaDisabled: isDisabled ? 'true' : null, ariaLabel: this.label, onClick: event => this.handleClick(event), onFocus: event => this.btnFocus.emit(event), onBlur: event => this.btnBlur.emit(event), onMouseOver: event => this.btnMouseOver.emit(event), onMouseOut: event => this.btnMouseOut.emit(event), onMouseEnter: event => this.btnMouseEnter.emit(event), onMouseLeave: event => this.btnMouseLeave.emit(event), onKeyUp: event => this.btnKeyUp.emit(event), onKeyDown: event => this.handleKeyDown(event), style: { ...this.optionalStyles }, id: this.btnId }, h("span", { key: 'e28844ca814e8e1b92ab7a127c8b8b1d858faf64', class: "_button_content__bRCou" }, h("span", { key: '5bdb04ea4f973599113540b47e3e0c2cb06b7cf0', class: "c-fs-16 c-fs-lg-20" }, h("slot", { key: 'e76aa5ed5c09f2aa607d03bae2706f4e966908b3' })), this.isLoading ? (h("span", { class: "loader" })) : (this.isArrow && (h("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none" }, h("path", { d: "M3.75 12H20.25", stroke: "white", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }), h("path", { d: "M13.5 5.25L20.25 12L13.5 18.75", stroke: "white", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" })))))));
    }
    static get style() { return zepbuttonComponentCss; }
}, [257, "zepbutton-component", {
        "type": [1],
        "btndisabled": [1],
        "isbtnprimary": [1],
        "isbtnsecondary": [1],
        "role": [1],
        "label": [1],
        "tabNumber": [2, "tab-number"],
        "optionalStyles": [16],
        "isLoading": [4, "is-loading"],
        "optionalClass": [1, "optional-class"],
        "isArrow": [4, "is-arrow"],
        "btnId": [1, "btn-id"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["zepbutton-component"];
    components.forEach(tagName => { switch (tagName) {
        case "zepbutton-component":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, ZepButtonComponent);
            }
            break;
    } });
}
defineCustomElement();

export { ZepButtonComponent as Z, defineCustomElement as d };
//# sourceMappingURL=p-DU1UVDQ7.js.map

//# sourceMappingURL=p-DU1UVDQ7.js.map