import { p as proxyCustomElement, H, c as createEvent, h } from './index.js';

const sheetComponentCss = ":host{display:block}.sheet-overlay{position:fixed;inset:0;background:var(--lds-g-color-palette-transparent-black-070);z-index:10;opacity:0;pointer-events:none;transition:opacity .3s}.sheet-overlay.active{opacity:1;pointer-events:auto}.sheet{position:absolute;left:50%;bottom:0;transform:translate(-50%, 100%);width:100%;height:95vh;min-height:180px;border-radius:var(--lds-g-radius-4) var(--lds-g-radius-4) 0 0;background:var(--lds-g-color-neutral-base-000);box-shadow:0 -2px 24px rgba(0, 0, 0, .08);transition:transform 0.32s cubic-bezier(.4, 0, .2, 1);will-change:transform;padding-bottom:env(safe-area-inset-bottom, 16px);padding-top:var(--lds-g-spacing-300);overflow-y:auto;-webkit-overflow-scrolling:touch}.sheet--open{transform:translate(-50%, 0)}.sheet__close{position:absolute;top:16px;right:16px;border:none;background:transparent;font-size:2rem;cursor:pointer;z-index:10}@media (min-width: 1025px){.sheet-overlay{display:none !important}}";

const SheetComponent$1 = /*@__PURE__*/ proxyCustomElement(class SheetComponent extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.__attachShadow();
        this.sheetClosed = createEvent(this, "sheetClosed");
    }
    open = false;
    sheetClosed;
    get el() { return this; }
    handleOverlayClick = (e) => {
        // Only close if overlay (not sheet) is clicked
        if (e.target.classList.contains('sheet-overlay')) {
            this.close();
        }
    };
    close = () => {
        this.open = false;
        this.sheetClosed.emit();
    };
    onOpenChange(newV) {
        document.body.classList.toggle('sheet-component-open', newV);
    }
    disconnectedCallback() {
        document.body.classList.remove('sheet-component-open');
    }
    render() {
        return (h("div", { key: '8ea941d871bfebc43e456c9abcd6fc703eb7720c', class: {
                'sheet-overlay': true,
                'active': this.open,
            }, onClick: this.handleOverlayClick, "aria-hidden": !this.open }, h("div", { key: '9a29fd80d66207249aa9fc291e8164b10975f740', class: {
                'sheet': true,
                'sheet--open': this.open
            }, tabindex: "-1" }, h("slot", { key: 'f489722883f5abc795c3def4ff4c7df690a95cc2' }))));
    }
    static get watchers() { return {
        "open": ["onOpenChange"]
    }; }
    static get style() { return sheetComponentCss; }
}, [257, "sheet-component", {
        "open": [1540]
    }, undefined, {
        "open": ["onOpenChange"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["sheet-component"];
    components.forEach(tagName => { switch (tagName) {
        case "sheet-component":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SheetComponent$1);
            }
            break;
    } });
}
defineCustomElement$1();

const SheetComponent = SheetComponent$1;
const defineCustomElement = defineCustomElement$1;

export { SheetComponent, defineCustomElement };
//# sourceMappingURL=sheet-component.js.map

//# sourceMappingURL=sheet-component.js.map