import { r as registerInstance, c as createEvent, h } from './index-DClFOSUP.js';
import { c as CheckedIcon, d as CrossIcon } from './Svg-DC38Oo0s.js';

const accordionComponentCss = ":host{display:block}.accordion{border-top:2px solid var(--lds-g-color-neutral-base-030);width:100%;box-sizing:border-box;transition:border-color 0.35s cubic-bezier(.55, 0, .1, 1)}.accordion.open{border-top:2px solid var(--lds-g-color-neutral-base-100, #191919)}.accordion-trigger{display:flex;padding:var(--lds-g-spacing-400) var(--lds-g-spacing-0);align-items:flex-start;align-self:stretch;background:none;border:0;width:100%;cursor:pointer}.accordion-trigger:focus{outline:none}.accordion-trigger:focus-visible{outline:2px solid var(--lds-g-color-neutral-base-100, #191919);outline-offset:2px}.accordion:has(.accordion-trigger:hover){border-top:2px solid var(--lds-g-color-neutral-base-100, #191919)}.accordion-trigger--no-bottom-padding{padding-bottom:0 !important}.headline{flex:1 0 0;color:var(--lds-g-color-neutral-base-100);font-family:var(--lds-g-font-family-sans-serif, Ringside);font-size:var(--lds-g-font-size-2, 20px);font-style:normal;font-weight:var(--lds-g-font-style-serif-regular);line-height:var(--lds-g-font-line-height-8, 1.875rem);margin:0;white-space:nowrap}.chevron{display:flex;width:32px;height:32px;min-width:32px;max-width:32px;min-height:32px;max-height:32px;flex-direction:column;justify-content:center;align-items:center;transition:transform 0.3s ease}.chevron.open{transform:rotate(180deg)}.content{width:100%;max-height:0;overflow:hidden;transition:max-height 0.35s cubic-bezier(.55, 0, .1, 1), opacity 0.2s;opacity:0;box-sizing:border-box}.content.open{max-height:100%;opacity:1}.chevron-icon{color:var(--lds-g-color-neutral-base-100, #191919)}.chevron-icon path{fill:var(--lds-g-color-neutral-base-000, #fff);transition:fill 0.18s ease}.accordion:has(.accordion-trigger:hover) .chevron-icon{color:var(--lds-g-color-neutral-base-000, #fff)}.accordion:has(.accordion-trigger:hover) .chevron-icon path{fill:var(--lds-g-color-neutral-base-100, #191919)}.accordion.open .chevron-icon{color:var(--lds-g-color-neutral-base-000, #fff)}.accordion.open .chevron-icon path{fill:var(--lds-g-color-neutral-base-100, #191919)}@media (max-width: 600px){.chevron{width:32px;height:32px}}";

const AccordionComponent = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
};
AccordionComponent.style = accordionComponentCss;

const checkboxComponentCss = ".checkbox-container{display:flex;padding:var(--lds-g-spacing-200, 16px) 0;align-items:center;gap:12px;flex:1 0 0;align-self:stretch}.checkbox-container.focus-visible-wrapper:focus-within{border-radius:var(--6xs, 4px);border:3px solid var(--lds-g-color-neutral-base-070)}.checkbox-container.has-border{position:relative}.checkbox-container.has-border::after{content:'';display:block;position:absolute;left:32px;right:0;bottom:0;border-bottom:1px solid var(--lds-g-color-neutral-base-010)}.checkbox-label{display:flex;flex-direction:column;align-items:flex-start;gap:var(--lds-g-spacing-050, 4px);align-self:stretch}.checkbox-row{display:flex;align-items:center;gap:var(--lds-g-spacing-150, 8px);align-self:stretch}.checkbox-row{display:flex;align-items:flex-start;gap:var(--lds-g-spacing-150, 8px);width:100%}.checkbox-input-wrapper{display:flex;position:relative;width:20px;height:20px;align-items:center;justify-content:center}.checkbox-input{position:absolute;width:20px;height:20px;top:0;left:0;margin:0;appearance:none;border-radius:4px;border:1px solid var(--lds-g-color-neutral-base-060, #d9d9d9);background:var(--lds-g-color-neutral-base-000, #fff);cursor:pointer;outline:none}.checkbox-input:checked{background:var(--lds-g-color-neutral-base-100);border:none}.checkbox-icon{width:16px;height:16px;flex-shrink:0;color:var(--lds-g-color-neutral-base-100, #222);fill:var(--lds-g-color-neutral-base-000, white);pointer-events:none;z-index:1;position:relative}.checkbox-text{align-self:stretch;color:var(--lds-g-color-neutral-base-100, #222);font-family:var(--lds-g-font-family-sans-serif, Ringside);font-size:var(--lds-g-font-size-base, 16px);font-style:normal;font-weight:var(--lds-g-font-style-serif-regular);line-height:var(--lds-g-font-line-height-5, 1.5rem);max-width:100%}.checkbox-text{display:block;flex:1 1 0;min-width:0;white-space:normal;overflow:visible;text-overflow:clip;word-break:break-word}.color-swatch{display:flex;width:32px;height:24px;border-radius:4px;overflow:hidden;align-items:stretch;box-sizing:border-box}.swatch-color{flex:1 1 0;height:100%}";

const CheckboxComponent = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
};
CheckboxComponent.style = checkboxComponentCss;

const chipComponentCss = ".chip{display:inline-flex;padding:var(--lds-g-spacing-100) var(--lds-g-spacing-100) var(--lds-g-spacing-100) var(--lds-g-spacing-150);justify-content:center;align-items:center;box-sizing:border-box;background:var(--lds-g-color-neutral-base-010);font-family:inherit;gap:var(--lds-g-spacing-100, 8px)}.chip.rounded{border-radius:100px}.chip-label{color:var(--lds-g-color-neutral-base-100);font-family:var(--lds-g-font-family-sans-serif, Ringside);font-size:var(--lds-g-font-size-neg-1, 14px);font-style:normal;font-weight:var(--lds-g-font-style-serif-regular);line-height:var(--lds-g-font-line-height-1);white-space:nowrap}.chip-label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%;display:block}.chip-icon{background:transparent;border:none;cursor:pointer;padding:0 4px;display:flex;align-items:center}.chip-icon .cross-icon{fill:var(--lds-g-color-neutral-base-100)}.chip.selectable.selected{background:var(--lds-g-color-neutral-base-060)}.chip.selectable.selected .chip-label{color:var(--lds-g-color-neutral-base-000)}.chip.selectable.selected .cross-icon{fill:var(--lds-g-color-neutral-base-000)}.color-swatch{display:flex;width:21px;height:16px;aspect-ratio:21/16;overflow:hidden;align-items:stretch;box-sizing:border-box;border-radius:var(--lds-g-radius-neg-2)}.swatch-color{flex:1 1 0;height:100%}@media (max-width: 1024px){.chip{display:flex;height:40px !important;padding:var(--lds-g-spacing-150) var(--lds-g-spacing-200);justify-content:center;align-items:center;gap:var(--lds-g-spacing-150, 12px);background:var(--lds-g-color-neutral-base-010);font-family:inherit}.chip-label{font-size:var(--lds-g-font-size-base, 16px);line-height:var(--lds-g-font-line-height-1);font-family:var(--lds-g-font-family-sans-serif, Ringside);font-style:normal;font-weight:var(--lds-g-font-style-serif-regular);color:var(--lds-g-color-neutral-base-100)}}";

const ChipComponent = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
};
ChipComponent.style = chipComponentCss;

export { AccordionComponent as accordion_component, CheckboxComponent as checkbox_component, ChipComponent as chip_component };
//# sourceMappingURL=accordion-component.checkbox-component.chip-component.entry.js.map
