import { p as proxyCustomElement, H, c as createEvent, h } from './index.js';
import { C as CheckedIcon } from './p-CRE7AF9B.js';

const checkboxComponentCss = ".checkbox-container{display:flex;padding:var(--lds-g-spacing-200, 16px) 0;align-items:center;gap:12px;flex:1 0 0;align-self:stretch}.checkbox-container.focus-visible-wrapper:focus-within{border-radius:var(--6xs, 4px);border:3px solid var(--lds-g-color-neutral-base-070)}.checkbox-container.has-border{position:relative}.checkbox-container.has-border::after{content:'';display:block;position:absolute;left:32px;right:0;bottom:0;border-bottom:1px solid var(--lds-g-color-neutral-base-010)}.checkbox-label{display:flex;flex-direction:column;align-items:flex-start;gap:var(--lds-g-spacing-050, 4px);align-self:stretch}.checkbox-row{display:flex;align-items:center;gap:var(--lds-g-spacing-150, 8px);align-self:stretch}.checkbox-row{display:flex;align-items:flex-start;gap:var(--lds-g-spacing-150, 8px);width:100%}.checkbox-input-wrapper{display:flex;position:relative;width:20px;height:20px;align-items:center;justify-content:center}.checkbox-input{position:absolute;width:20px;height:20px;top:0;left:0;margin:0;appearance:none;border-radius:4px;border:1px solid var(--lds-g-color-neutral-base-060, #d9d9d9);background:var(--lds-g-color-neutral-base-000, #fff);cursor:pointer;outline:none}.checkbox-input:checked{background:var(--lds-g-color-neutral-base-100);border:none}.checkbox-icon{width:16px;height:16px;flex-shrink:0;color:var(--lds-g-color-neutral-base-100, #222);fill:var(--lds-g-color-neutral-base-000, white);pointer-events:none;z-index:1;position:relative}.checkbox-text{align-self:stretch;color:var(--lds-g-color-neutral-base-100, #222);font-family:var(--lds-g-font-family-sans-serif, Ringside);font-size:var(--lds-g-font-size-base, 16px);font-style:normal;font-weight:var(--lds-g-font-style-serif-regular);line-height:var(--lds-g-font-line-height-5, 1.5rem);max-width:100%}.checkbox-text{display:block;flex:1 1 0;min-width:0;white-space:normal;overflow:visible;text-overflow:clip;word-break:break-word}.color-swatch{display:flex;width:32px;height:24px;border-radius:4px;overflow:hidden;align-items:stretch;box-sizing:border-box}.swatch-color{flex:1 1 0;height:100%}";

const CheckboxComponent = /*@__PURE__*/ proxyCustomElement(class CheckboxComponent extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.__attachShadow();
        this.checkboxChange = createEvent(this, "checkboxChange");
    }
    checked = false;
    label = '';
    disabled = false;
    checkboxChange;
    showBorder = false;
    colors;
    showKeyboardFocus = false;
    getCheckmarkIcon() {
        return (h(CheckedIcon, { className: "checkbox-icon" }));
    }
    onInputChange = (event) => {
        const input = event.target;
        this.checked = input.checked;
        this.checkboxChange.emit(this.checked);
    };
    getColors() {
        if (!this.colors)
            return [];
        return this.colors.split(',').map(c => c.trim());
    }
    componentDidLoad() {
        window.addEventListener('keydown', this.handleGlobalKeyDown);
        window.addEventListener('mousedown', this.handleGlobalMouse);
    }
    disconnectedCallback() {
        window.removeEventListener('keydown', this.handleGlobalKeyDown);
        window.removeEventListener('mousedown', this.handleGlobalMouse);
    }
    handleGlobalKeyDown = (e) => {
        if (e.key === 'Tab') {
            this.showKeyboardFocus = true;
        }
    };
    handleGlobalMouse = () => {
        this.showKeyboardFocus = false;
    };
    render() {
        return (h("div", { key: '93521e0ad60c84ba585376520f984465f3143f77', class: `checkbox-container${this.showBorder ? ' has-border' : ''}${this.showKeyboardFocus ? ' focus-visible-wrapper' : ''}` }, h("label", { key: '3f0a77eb416fb66fe569c7e5c13c5ef324093245', class: "checkbox-label" }, h("div", { key: '7b514ef43ad3e99e9bbd2e0156ed2ae1c143cb70', class: "checkbox-row" }, h("span", { key: '4e9335defb89f55ea9732ab8c18f5194b351c342', class: "checkbox-input-wrapper" }, h("input", { key: 'a3cf9d5fa887e4f16b267e3c660db799d33d19f4', type: "checkbox", checked: this.checked, disabled: this.disabled, onChange: this.onInputChange, class: "checkbox-input" }), this.checked && this.getCheckmarkIcon()), this.getColors().length === 3 && (h("div", { key: '5e053668c90889817a17e3ccc56d8cb3b69dd4cb', class: "color-swatch" }, this.getColors().map(color => (h("div", { class: "swatch-color", style: { background: color } }))))), h("span", { key: '90617e1332fe8cd392fa3301007f4427f822d453', class: "checkbox-text" }, this.label)))));
    }
    static get style() { return checkboxComponentCss; }
}, [257, "checkbox-component", {
        "checked": [1540],
        "label": [1],
        "disabled": [4],
        "showBorder": [4, "show-border"],
        "colors": [1],
        "showKeyboardFocus": [32]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["checkbox-component"];
    components.forEach(tagName => { switch (tagName) {
        case "checkbox-component":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, CheckboxComponent);
            }
            break;
    } });
}
defineCustomElement();

export { CheckboxComponent as C, defineCustomElement as d };
//# sourceMappingURL=p-CHiCYkTy.js.map

//# sourceMappingURL=p-CHiCYkTy.js.map