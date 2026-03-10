import { p as proxyCustomElement, H, c as createEvent, h } from './index.js';

const accordionComponentCss = ":host{display:block}.accordion{border-top:2px solid var(--lds-g-color-neutral-base-030);width:100%;box-sizing:border-box;transition:border-color 0.35s cubic-bezier(.55, 0, .1, 1)}.accordion.open{border-top:2px solid var(--lds-g-color-neutral-base-100, #191919)}.accordion-trigger{display:flex;padding:var(--lds-g-spacing-400) var(--lds-g-spacing-0);align-items:flex-start;align-self:stretch;background:none;border:0;width:100%;cursor:pointer}.accordion-trigger:focus{outline:none}.accordion-trigger:focus-visible{outline:2px solid var(--lds-g-color-neutral-base-100, #191919);outline-offset:2px}.accordion:has(.accordion-trigger:hover){border-top:2px solid var(--lds-g-color-neutral-base-100, #191919)}.accordion-trigger--no-bottom-padding{padding-bottom:0 !important}.headline{flex:1 0 0;color:var(--lds-g-color-neutral-base-100);font-family:var(--lds-g-font-family-sans-serif, Ringside);font-size:var(--lds-g-font-size-2, 20px);font-style:normal;font-weight:var(--lds-g-font-style-serif-regular);line-height:var(--lds-g-font-line-height-8, 1.875rem);margin:0;white-space:nowrap}.chevron{display:flex;width:32px;height:32px;min-width:32px;max-width:32px;min-height:32px;max-height:32px;flex-direction:column;justify-content:center;align-items:center;transition:transform 0.3s ease}.chevron.open{transform:rotate(180deg)}.content{width:100%;max-height:0;overflow:hidden;transition:max-height 0.35s cubic-bezier(.55, 0, .1, 1), opacity 0.2s;opacity:0;box-sizing:border-box}.content.open{max-height:100%;opacity:1}.chevron-icon{color:var(--lds-g-color-neutral-base-100, #191919)}.chevron-icon path{fill:var(--lds-g-color-neutral-base-000, #fff);transition:fill 0.18s ease}.accordion:has(.accordion-trigger:hover) .chevron-icon{color:var(--lds-g-color-neutral-base-000, #fff)}.accordion:has(.accordion-trigger:hover) .chevron-icon path{fill:var(--lds-g-color-neutral-base-100, #191919)}.accordion.open .chevron-icon{color:var(--lds-g-color-neutral-base-000, #fff)}.accordion.open .chevron-icon path{fill:var(--lds-g-color-neutral-base-100, #191919)}@media (max-width: 600px){.chevron{width:32px;height:32px}}";

const AccordionComponent = /*@__PURE__*/ proxyCustomElement(class AccordionComponent extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.__attachShadow();
        this.accordionToggle = createEvent(this, "accordionToggle");
    }
    headline = '';
    open = false;
    accordionToggle;
    noBottomPadding = false;
    onToggle = () => {
        this.accordionToggle.emit();
    };
    render() {
        return (h("div", { key: 'b1858e961ecd05d59c1f1d37ab6c3f0c733690e5', class: `accordion${this.open ? ' open' : ''}` }, h("div", { key: 'fb9da0795ec4e0e18e78525ae36ba1c3fe01ee67', class: `accordion-trigger${this.noBottomPadding ? ' accordion-trigger--no-bottom-padding' : ''}`, onClick: this.onToggle, role: "button", tabIndex: 0, "aria-expanded": this.open ? "true" : "false" }, h("h4", { key: 'd5d882424d30837dcb003a9e5f7a47d056f7871c', class: "headline" }, this.headline), h("span", { key: '0a67dcc24951a0cc6864b5b449c8d27ceecd2e48', class: `chevron${this.open ? ' open' : ''}` }, h("svg", { key: '18dc86c03b2ceaf0a0b0ea4df6635e500ea08984', class: "chevron-icon", xmlns: "http://www.w3.org/2000/svg", width: "32", height: "32", viewBox: "0 0 32 32", fill: "none" }, h("path", { key: '1c7abee90a688624d5224a19c2844ffb8e985164', d: "M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" }), h("path", { key: '46d0a1cb016ad4ef0ddc7bb7e900e30d6a75865a', d: "M11 14L16 19L21 14", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" })))), h("div", { key: '2f62ef8598625a85ebdb4e43189ea0d9818ec849', class: `content${this.open ? ' open' : ''}` }, h("slot", { key: 'ff7621fc4c30afff95564f0a06e44496eb79d00a' }))));
    }
    static get style() { return accordionComponentCss; }
}, [257, "accordion-component", {
        "headline": [1],
        "open": [4],
        "noBottomPadding": [4, "no-bottom-padding"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["accordion-component"];
    components.forEach(tagName => { switch (tagName) {
        case "accordion-component":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, AccordionComponent);
            }
            break;
    } });
}
defineCustomElement();

export { AccordionComponent as A, defineCustomElement as d };
//# sourceMappingURL=p-DrVvQKpi.js.map

//# sourceMappingURL=p-DrVvQKpi.js.map