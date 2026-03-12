import { r as registerInstance, c as createEvent, a as getElement, h } from './index-DClFOSUP.js';
import { C as CloseIcon } from './Svg-DC38Oo0s.js';

const modalOverlayCss = "*{margin:0;padding:0;box-sizing:border-box}.modal-overlay{position:fixed;top:var(--lds-g-spacing-0, 0);left:var(--lds-g-spacing-0, 0);right:var(--lds-g-spacing-0, 0);bottom:var(--lds-g-spacing-0, 0);background-color:var(--modal-overlay-bg, rgba(0, 0, 0, 0.5));display:flex;justify-content:center;align-items:flex-end;visibility:hidden;opacity:0;transition:opacity 0.3s, visibility 0.5s;z-index:9999}.modal-overlay.active{visibility:visible;opacity:1}.modal{background-color:var(--modal-bg, var(--lds-g-color-neutral-base-000, #FFFFFF));width:100%;max-height:100vh;height:100vh;padding:var(--lds-g-spacing-400, 32px);position:relative;transform:translateY(-100%);transition:transform 0.5s ease-out;overflow:auto}.modal-overlay.active .modal{transform:translateY(0)}.close-btn{position:absolute;top:var(--lds-g-spacing-600, 48px);right:var(--lds-g-spacing-600, 48px);background:none;border:none;font-size:var(--lds-g-spacing-300, 24px);cursor:pointer;color:var(--lds-g-color-neutral-base-100, #191919);z-index:999}.close-icon{max-width:var(--lds-g-spacing-400, 32px);max-height:var(--lds-g-spacing-400, 32px);width:100%;height:100%;display:block}.close-icon path{stroke:var(--close-icon-stroke-color, var(--lds-g-color-neutral-base-100, #191919))}.close-btn:focus{box-shadow:0 0 0 .25rem var(--close-icon-stroke-color, var(--lds-g-color-neutral-base-100, #191919));opacity:1;outline:none}.modal-content{margin-top:var(--lds-g-spacing-200, 16px);width:100%}@media (max-width: 768px){.modal{padding:var(--lds-g-spacing-200, 16px)}h2{font-size:var(--lds-g-spacing-250, 20px)}.close-btn{top:var(--lds-g-spacing-500, 40px);right:var(--lds-g-spacing-400, 32px)}.close-icon{max-width:var(--lds-g-spacing-250, 20px);max-height:var(--lds-g-spacing-250, 20px)}}";

const ModalOverlay = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.modalClosed = createEvent(this, "modalClosed");
    }
    isopen = false;
    bgColor;
    modalClosed;
    get el() { return getElement(this); }
    isMobile = typeof window !== 'undefined' ? window.innerWidth <= 991 : false;
    modalRef;
    shouldBleedBgColor = false;
    lastFocusedElement = null;
    focusableElements = [];
    // Get all focusable elements within the modal
    getFocusableElements() {
        const focusableSelectors = [
            'a[href]',
            'button:not([disabled])',
            'textarea:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            '[tabindex]:not([tabindex="-1"])',
            'area[href]',
            'iframe',
            'object',
            'embed',
            '[contenteditable="true"]'
        ].join(', ');
        const allFocusableElements = [];
        const shadowRoot = this.el.shadowRoot;
        if (!shadowRoot)
            return [];
        // Get focusable elements from shadow DOM (including close button)
        const shadowElements = Array.from(shadowRoot.querySelectorAll(focusableSelectors));
        allFocusableElements.push(...shadowElements);
        // Get focusable elements from slotted content
        const slot = shadowRoot.querySelector('slot');
        if (slot) {
            const assignedElements = slot.assignedElements({ flatten: true });
            assignedElements.forEach(element => {
                // Check if this element has a shadow root (it's a web component)
                if (element.shadowRoot) {
                    const shadowRoot = element.shadowRoot;
                    // Get focusable elements directly in this shadow root
                    const shadowFocusable = shadowRoot.querySelectorAll(focusableSelectors);
                    allFocusableElements.push(...Array.from(shadowFocusable));
                    // Check for nested web components in the shadow root
                    const nestedComponents = shadowRoot.querySelectorAll('*');
                    nestedComponents.forEach((nestedEl) => {
                        if (nestedEl.shadowRoot) {
                            const nestedFocusable = nestedEl.shadowRoot.querySelectorAll(focusableSelectors);
                            allFocusableElements.push(...Array.from(nestedFocusable));
                            // Go one level deeper for deeply nested components
                            const deeperComponents = nestedEl.shadowRoot.querySelectorAll('*');
                            deeperComponents.forEach((deepEl) => {
                                if (deepEl.shadowRoot) {
                                    const deepFocusable = deepEl.shadowRoot.querySelectorAll(focusableSelectors);
                                    allFocusableElements.push(...Array.from(deepFocusable));
                                }
                            });
                        }
                    });
                }
                // Check if the element itself is focusable
                if (element.matches && element.matches(focusableSelectors)) {
                    allFocusableElements.push(element);
                }
                // Get all focusable descendants from light DOM
                const descendants = element.querySelectorAll(focusableSelectors);
                allFocusableElements.push(...Array.from(descendants));
                // Check for nested web components in light DOM
                const allElements = element.querySelectorAll('*');
                allElements.forEach(child => {
                    if (child.shadowRoot) {
                        const shadowFocusable = child.shadowRoot.querySelectorAll(focusableSelectors);
                        allFocusableElements.push(...Array.from(shadowFocusable));
                    }
                });
            });
        }
        // Filter out elements that are not visible
        return allFocusableElements.filter(el => {
            const style = window.getComputedStyle(el);
            return style.display !== 'none' &&
                style.visibility !== 'hidden' &&
                (el.offsetParent !== null || el.getClientRects().length > 0);
        });
    }
    // Focus modal when opened
    handleIsOpenChange(newValue) {
        if (newValue) {
            document.body.classList.add('sleep-apnea__modal-open');
            // Store the currently focused element
            this.lastFocusedElement = document.activeElement;
            // Set focus to the modal after a brief delay to ensure it's rendered
            setTimeout(() => {
                this.focusableElements = this.getFocusableElements();
                if (this.focusableElements.length > 0) {
                    this.focusableElements[0].focus();
                }
            }, 100);
        }
        else {
            document.body.classList.remove('sleep-apnea__modal-open');
            // Restore focus to the previously focused element after a brief delay
            // This allows parent components to set focus if needed
            setTimeout(() => {
                if (this.lastFocusedElement &&
                    document.contains(this.lastFocusedElement) &&
                    typeof this.lastFocusedElement.focus === 'function') {
                    this.lastFocusedElement.focus();
                }
                this.lastFocusedElement = null;
            }, 150);
        }
    }
    componentDidLoad() {
        if (this.isopen) {
            document.body.classList.add('sleep-apnea__modal-open');
        }
        window.addEventListener('resize', this.handleResize);
        // Listen for custom event from QnAZepCard and ResultZepCard
        this.el.addEventListener('should-bleed', this.handleShouldBleed);
        this.el.addEventListener('should-unbleed', this.handleShouldUnbleed);
    }
    disconnectedCallback() {
        document.body.classList.remove('sleep-apnea__modal-open');
        window.removeEventListener('resize', this.handleResize);
        this.el.removeEventListener('should-bleed', this.handleShouldBleed);
        this.el.removeEventListener('should-unbleed', this.handleShouldUnbleed);
    }
    handleResize = () => {
        this.isMobile = window.innerWidth <= 991;
    };
    handleKeyDown(e) {
        if (!this.isopen)
            return;
        if (e.key === 'Escape') {
            this.toggleModal();
            return;
        }
        // Trap focus within modal on Tab key
        if (e.key === 'Tab') {
            // Prevent default and manually manage focus
            e.preventDefault();
            this.focusableElements = this.getFocusableElements();
            if (this.focusableElements.length === 0)
                return;
            const firstElement = this.focusableElements[0];
            const lastElement = this.focusableElements[this.focusableElements.length - 1];
            // Get active element, checking shadow DOM hierarchy
            let activeElement = document.activeElement;
            // If active element is the web component itself, check shadow root
            if (activeElement === this.el && this.el.shadowRoot?.activeElement) {
                activeElement = this.el.shadowRoot.activeElement;
            }
            // Check if active element is within any web component's shadow root
            let checkElement = document.activeElement;
            while (checkElement) {
                if (checkElement.shadowRoot?.activeElement) {
                    activeElement = checkElement.shadowRoot.activeElement;
                    checkElement = activeElement;
                }
                else {
                    break;
                }
            }
            // Find current element's position in focusable elements array
            const currentIndex = this.focusableElements.indexOf(activeElement);
            if (e.shiftKey) {
                // Shift + Tab: moving backwards
                if (currentIndex <= 0) {
                    lastElement.focus();
                }
                else {
                    this.focusableElements[currentIndex - 1].focus();
                }
            }
            else {
                // Tab: moving forwards
                if (currentIndex === -1 || currentIndex >= this.focusableElements.length - 1) {
                    firstElement.focus();
                }
                else {
                    this.focusableElements[currentIndex + 1].focus();
                }
            }
        }
    }
    ;
    handleShouldBleed = () => {
        this.shouldBleedBgColor = true;
    };
    handleShouldUnbleed = () => {
        this.shouldBleedBgColor = false;
    };
    toggleModal = () => {
        document.body.classList.remove('sleep-apnea__modal-open');
        this.modalClosed.emit();
    };
    render() {
        return (h("div", { key: '2e889ed1ccce61380d6e60658f12709d20f4ed9c' }, h("div", { key: '828440208ae56b288725a73c99672a5613087646', class: `modal-overlay ${this.isopen ? 'active' : ''}`, id: "modalOverlay", "aria-hidden": !this.isopen }, h("button", { key: 'f4518f1c1a69de6e4d9045e9568e0960bee06234', type: "button", class: "close-btn", id: "closeModal", onClick: this.toggleModal, tabIndex: 0, onFocus: (e) => {
                e.target.setAttribute('aria-hidden', 'false');
            }, onBlur: (e) => {
                e.target.setAttribute('aria-hidden', 'true');
            }, "aria-hidden": "true", "aria-label": "Close modal", style: {
                position: 'absolute',
                top: '45px',
                right: this.isMobile ? '20px' : '75px',
                zIndex: '9999'
            } }, h(CloseIcon, { key: 'ce330f77d5bed8ebedd95a38245fd4fbcb7f6e90', className: "close-icon", "aria-hidden": "true" })), h("div", { key: 'd4d8664220780fdca85b6fa35e8651d65b5a866c', class: "modal", id: "modal", role: "Quiz dialog", "aria-modal": "true", ref: el => (this.modalRef = el), "aria-hidden": "true", style: { backgroundColor: !this.shouldBleedBgColor ? this.bgColor : 'white' } }, h("div", { key: 'a3efe259eb9aec5719b7b3225cd5e9e41fea8873', class: "modal-content" }, h("slot", { key: '44ac068ec3916a11853be1cb171a876e038cbf20' }))))));
    }
    static get watchers() { return {
        "isopen": ["handleIsOpenChange"]
    }; }
};
ModalOverlay.style = modalOverlayCss;

export { ModalOverlay as modal_overlay };
//# sourceMappingURL=modal-overlay.entry.js.map
