import { p as proxyCustomElement, H, c as createEvent, h } from './index.js';
import { a as CrossIcon } from './p-CRE7AF9B.js';

const chipComponentCss = ".chip{display:inline-flex;padding:var(--lds-g-spacing-100) var(--lds-g-spacing-100) var(--lds-g-spacing-100) var(--lds-g-spacing-150);justify-content:center;align-items:center;box-sizing:border-box;background:var(--lds-g-color-neutral-base-010);font-family:inherit;gap:var(--lds-g-spacing-100, 8px)}.chip.rounded{border-radius:100px}.chip-label{color:var(--lds-g-color-neutral-base-100);font-family:var(--lds-g-font-family-sans-serif, Ringside);font-size:var(--lds-g-font-size-neg-1, 14px);font-style:normal;font-weight:var(--lds-g-font-style-serif-regular);line-height:var(--lds-g-font-line-height-1);white-space:nowrap}.chip-label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%;display:block}.chip-icon{background:transparent;border:none;cursor:pointer;padding:0 4px;display:flex;align-items:center}.chip-icon .cross-icon{fill:var(--lds-g-color-neutral-base-100)}.chip.selectable.selected{background:var(--lds-g-color-neutral-base-060)}.chip.selectable.selected .chip-label{color:var(--lds-g-color-neutral-base-000)}.chip.selectable.selected .cross-icon{fill:var(--lds-g-color-neutral-base-000)}.color-swatch{display:flex;width:21px;height:16px;aspect-ratio:21/16;overflow:hidden;align-items:stretch;box-sizing:border-box;border-radius:var(--lds-g-radius-neg-2)}.swatch-color{flex:1 1 0;height:100%}@media (max-width: 1024px){.chip{display:flex;height:40px !important;padding:var(--lds-g-spacing-150) var(--lds-g-spacing-200);justify-content:center;align-items:center;gap:var(--lds-g-spacing-150, 12px);background:var(--lds-g-color-neutral-base-010);font-family:inherit}.chip-label{font-size:var(--lds-g-font-size-base, 16px);line-height:var(--lds-g-font-line-height-1);font-family:var(--lds-g-font-family-sans-serif, Ringside);font-style:normal;font-weight:var(--lds-g-font-style-serif-regular);color:var(--lds-g-color-neutral-base-100)}}";

const ChipComponent = /*@__PURE__*/ proxyCustomElement(class ChipComponent extends H {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.__attachShadow();
        this.chipClose = createEvent(this, "chipClose");
        this.chipSelect = createEvent(this, "chipSelect");
    }
    label;
    rounded = true;
    height = '32px';
    showIcon = false;
    chipClose;
    selectable = false;
    selected = false;
    chipSelect;
    colors;
    maxWidth;
    handleClose = (e) => {
        e.stopPropagation();
        this.chipClose.emit();
    };
    handleSelect = () => {
        if (!this.selectable)
            return;
        this.selected = !this.selected;
        this.chipSelect.emit(this.selected);
    };
    getColors() {
        if (!this.colors)
            return [];
        return this.colors.split(',').map(c => c.trim());
    }
    renderIcon() {
        if (!this.showIcon)
            return null;
        return (h("button", { class: "chip-icon", onClick: this.handleClose, "aria-label": "Remove", type: "button", tabindex: 0 }, h(CrossIcon, { className: "cross-icon" })));
    }
    render() {
        return (h("div", { key: '9533eb2fa59db0652859255698755683efaafb38', class: {
                chip: true,
                rounded: this.rounded,
                selectable: this.selectable,
                selected: this.selected,
            }, style: {
                height: this.height,
                width: 'auto',
                cursor: this.selectable ? 'pointer' : 'default',
                ...(this.maxWidth
                    ? { maxWidth: this.maxWidth, width: '100%', minWidth: '0' }
                    : { width: 'auto' })
            }, onClick: this.handleSelect, tabindex: this.selectable ? 0 : undefined, "aria-pressed": this.selectable ? String(this.selected) : undefined }, this.getColors().length === 3 && (h("div", { key: 'ce06967cbb57ec4a3798dd4d0d1810c8585ecb3a', class: "color-swatch" }, this.getColors().map(color => (h("div", { class: "swatch-color", style: { background: color } }))))), h("span", { key: '42c6cdce7e341382326709955f2626673cbdacea', class: "chip-label" }, this.label), !this.selectable && this.renderIcon()));
    }
    static get style() { return chipComponentCss; }
}, [257, "chip-component", {
        "label": [1],
        "rounded": [4],
        "height": [1],
        "showIcon": [4, "show-icon"],
        "selectable": [4],
        "selected": [1540],
        "colors": [1],
        "maxWidth": [1, "max-width"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["chip-component"];
    components.forEach(tagName => { switch (tagName) {
        case "chip-component":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, ChipComponent);
            }
            break;
    } });
}
defineCustomElement();

export { ChipComponent as C, defineCustomElement as d };
//# sourceMappingURL=p-C1N_AfGR.js.map

//# sourceMappingURL=p-C1N_AfGR.js.map