import { r as registerInstance, c as createEvent, a as getElement, h } from './index-DClFOSUP.js';
import { P as PlusIcon, M as MinusIcon, a as SlidersHorizontalIcon, b as CaretCircleUpIcon, A as ArrowIcon } from './Svg-DC38Oo0s.js';

const buttonComponentCss = ".button_container{display:inline-block;justify-content:center;align-items:center;gap:8px;padding:12px 24px;border:initial;text-decoration:none;font-weight:300;border-radius:32px}.btn{font-family:var(--lds-g-font-family-sans-serif, Ringside);font-weight:var(--lds-g-font-style-serif-regular);font-style:normal;color:var(--lds-g-color-neutral-base-000);line-height:var(--lds-g-font-line-height-5);border:none}.disabled{color:var(--text-text-disabled, #6A6A6A);background-color:var(--surface-surface-disabled, #F0F0F0)}.active{background-color:var(--lds-g-color-palette-red-060);cursor:pointer}.secondary{color:var(--lds-color-secondary-100);background-color:var(--lds-g-color-neutral-base-000);border:1.5px solid var(--lds-g-color-palette-red-060);color:var(--lds-g-color-palette-red-060)}.btn.primary-button.active:hover{background-color:var(--lds-g-color-palette-red-070)}.btn.secondary-button.active:hover{background-color:rgba(249, 238, 237, 0.23)}.btn.primary-button.active:focus{outline:3px solid var(--lds-g-color-neutral-base-070);outline-offset:3px}.btn.secondary-button.active:focus{outline:3px solid var(--lds-g-color-neutral-base-070);outline-offset:3px}._button_content__bRCou{display:flex;justify-content:center;align-items:center;gap:12px}.c-fs-16{font-size:var(--lds-g-font-size-2)}.loader{width:28px;height:28px;border:3px solid var(--lds-g-color-neutral-base-070);border-bottom-color:var(--lds-g-color-palette-red-060);border-radius:50%;display:inline-block;box-sizing:border-box;animation:rotation 1s linear infinite}@keyframes rotation{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@media only screen and (min-width: 992px){.c-fs-lg-20{font-size:20px}}@media only screen and (max-width: 991px){.btn{width:100%;white-space:nowrap}.btn.icon-only{width:auto;padding:var(--lds-g-spacing-150, 12px);aspect-ratio:1 / 1;border-radius:50%}}@media only screen and (min-width: 992px){.btn{width:auto;min-width:204px;max-width:100%;white-space:normal;word-wrap:break-word;min-height:var(--lds-g-spacing-500)}}@media (width <= 768px){.c-fs-16{font-size:var(--lds-g-spacing-200);line-height:var(--lds-g-font-line-height-3)}}.primary-button .button-icon path{stroke:var(--lds-g-color-neutral-base-000, white)}.secondary-button .button-icon path{stroke:var(--lds-g-color-palette-red-060)}.primary-button .caret-circle-up-icon path{fill:var(--lds-g-color-neutral-base-000, white);stroke:none}.secondary-button .caret-circle-up-icon path{fill:var(--lds-g-color-palette-red-060);stroke:none}.disabled .button-icon path{stroke:var(--text-text-disabled, #6A6A6A)}.disabled .caret-circle-up-icon path{fill:var(--text-text-disabled, #6A6A6A);stroke:none}";

const ButtonComponent = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
    get el() { return getElement(this); }
    type = 'button';
    btndisabled;
    isbtnprimary;
    role = 'button';
    label;
    tabNumber = 0;
    optionalStyles = {};
    isLoading = false;
    optionalClass = '';
    isArrow = true;
    iconType = 'arrow';
    iconPosition = 'right';
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
    hasTextContent = false;
    componentWillLoad() {
        this.btndisabled = this.btndisabled || 'No';
        this.isbtnprimary = this.isbtnprimary || 'Yes';
    }
    componentDidRender() {
        // Use componentDidRender instead of componentDidLoad to ensure slotted content is fully rendered
        // Only update state if the value has changed to prevent unnecessary re-renders
        const hasText = this.el.textContent?.trim().length > 0;
        if (this.hasTextContent !== hasText) {
            this.hasTextContent = hasText;
        }
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
    renderIcon() {
        const iconClassName = 'button-icon';
        if (this.isArrow === false) {
            // Only show non-arrow icons when explicitly set
            if (this.iconType === 'plus') {
                return h(PlusIcon, { className: iconClassName });
            }
            if (this.iconType === 'minus') {
                return h(MinusIcon, { className: iconClassName });
            }
            if (this.iconType === 'slidershorizontal') {
                return h(SlidersHorizontalIcon, { className: iconClassName });
            }
            if (this.iconType === 'caretcircleup') {
                return h(CaretCircleUpIcon, { className: `${iconClassName} caret-circle-up-icon` });
            }
            // For 'none' or 'arrow' iconType, respect the isArrow=false and show nothing
            return null;
        }
        // Allow other icon types when isArrow is true
        if (this.iconType === 'plus') {
            return h(PlusIcon, { className: iconClassName });
        }
        if (this.iconType === 'minus') {
            return h(MinusIcon, { className: iconClassName });
        }
        if (this.iconType === 'slidershorizontal') {
            return h(SlidersHorizontalIcon, { className: iconClassName });
        }
        if (this.iconType === 'caretcircleup') {
            return h(CaretCircleUpIcon, { className: `${iconClassName} caret-circle-up-icon` });
        }
        if (this.iconType === 'none') {
            return null;
        }
        return h(ArrowIcon, { className: iconClassName });
    }
    render() {
        const isDisabled = this.btndisabled === 'Yes' || this.isLoading;
        const isIconOnly = !this.hasTextContent && !this.isLoading;
        const buttonClass = `button_container btn ${this.isbtnprimary === 'No' ? 'secondary' : 'primary'}-button ${this.isbtnprimary === 'No' && 'secondary'} ${isDisabled ? 'disabled' : 'active'} ${isIconOnly ? 'icon-only' : ''} ${this.optionalClass}`;
        const iconElement = this.isLoading ? (h("span", { class: "loader" })) : (this.renderIcon());
        return (h("button", { key: 'a80d07dda9d337b555fe3a42154cd260881990ab', type: this.type, class: buttonClass, "aria-label": this.label, disabled: isDisabled, role: this.role, tabindex: isDisabled ? -1 : this.tabNumber, ariaDisabled: isDisabled ? 'true' : null, ariaLabel: this.label, onClick: event => this.handleClick(event), onFocus: event => this.btnFocus.emit(event), onBlur: event => this.btnBlur.emit(event), onMouseOver: event => this.btnMouseOver.emit(event), onMouseOut: event => this.btnMouseOut.emit(event), onMouseEnter: event => this.btnMouseEnter.emit(event), onMouseLeave: event => this.btnMouseLeave.emit(event), onKeyUp: event => this.btnKeyUp.emit(event), onKeyDown: event => this.handleKeyDown(event), style: { ...this.optionalStyles }, id: this.btnId }, h("span", { key: '84136b6fe9331b65d110e0442244dc307dc9d72d', class: "_button_content__bRCou" }, this.iconPosition === 'left' && iconElement, this.hasTextContent && (h("span", { key: 'dd23c10cca95abade8f858e2cdafdedc5f14d970', class: "c-fs-16 c-fs-lg-20" }, h("slot", { key: 'ebe9b59b9da0a063b04b63d9a7ca10c4f8df4e6f' }))), this.iconPosition === 'right' && iconElement)));
    }
};
ButtonComponent.style = buttonComponentCss;

export { ButtonComponent as button_component };
//# sourceMappingURL=button-component.entry.js.map
