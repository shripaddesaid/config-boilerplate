import { r as registerInstance, c as createEvent, a as getElement, h } from './index-DClFOSUP.js';
import { S as SensitiveEyeIcon, E as ExpandIcon, I as ImageErrorIcon } from './Svg-DC38Oo0s.js';
import { M as MOBILE_BREAKPOINT } from './breakpoints-xVQ0t8-X.js';

const imageGalleryCss = ":host{display:block;width:100%;box-sizing:border-box}*,*::before,*::after{box-sizing:border-box}.image-gallery-container{display:flex;padding:var(--lds-g-spacing-0, 0) 0 0 0;flex-direction:column;justify-content:center;align-items:center;gap:var(--lds-g-spacing-400, 32px);flex:1 0 0;width:100%;max-width:100%;margin:0 auto}.results-text{align-self:stretch;color:var(--lds-g-color-neutral-base-100);text-align:center;font-family:var(--lds-g-font-family-sans-serif, Ringside);font-size:var(--lds-g-font-size-base, 16px);font-style:normal;font-weight:var(--lds-g-font-style-serif-regular);line-height:var(--lds-g-font-line-height-5, 1.5rem);margin:0;padding:0}.no-images-state{display:flex;flex-direction:column;align-items:center;padding-top:var(--lds-g-spacing-300, 24px);width:100%}.no-images-state p{color:var(--lds-g-color-neutral-base-100);text-align:center;font-family:var(--lds-g-font-family-sans-serif, Ringside);font-size:var(--lds-g-font-size-2, 20px);font-style:normal;font-weight:var(--lds-g-font-style-serif-regular);line-height:var(--lds-g-font-line-height-8, 1.875rem);margin:0}.no-images-state p:not(:first-child){margin-top:var(--lds-g-spacing-200, 16px)}.gallery-grid{display:grid;row-gap:var(--lds-g-spacing-400, 32px);column-gap:var(--lds-g-spacing-400, 32px);align-self:stretch;grid-template-columns:repeat(3, minmax(0, 1fr));width:100%;margin:0}.desktop-grid{grid-template-columns:repeat(3, minmax(0, 1fr))}.mobile-grid{grid-template-columns:repeat(2, minmax(0, 1fr))}.gallery-item{display:flex;flex-direction:column;align-items:flex-start;gap:var(--lds-g-spacing-150, 10px);flex:1 0 0;align-self:stretch;aspect-ratio:4/3;position:relative;cursor:pointer;border-radius:var(--lds-g-radius-2, 8px);overflow:hidden;outline:2px solid transparent;outline-offset:2px;background:transparent}.gallery-item:hover{z-index:2;cursor:url(\"data:image/svg+xml;utf8,<svg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='24' cy='24' r='24' fill='%23000' fill-opacity='0.4'/><g transform='translate(11,11)'><path d='M17.0003 12.0003C17.0003 12.2655 16.8949 12.5199 16.7074 12.7074C16.5199 12.8949 16.2655 13.0003 16.0003 13.0003H13.0003V16.0003C13.0003 16.2655 12.8949 16.5199 12.7074 16.7074C12.5199 16.8949 12.2655 17.0003 12.0003 17.0003C11.7351 17.0003 11.4807 16.8949 11.2932 16.7074C11.1056 16.5199 11.0003 16.2655 11.0003 16.0003V13.0003H8.00029C7.73507 13.0003 7.48072 12.8949 7.29318 12.7074C7.10564 12.5199 7.00029 12.2655 7.00029 12.0003C7.00029 11.7351 7.10564 11.4807 7.29318 11.2932C7.48072 11.1056 7.73507 11.0003 8.00029 11.0003H11.0003V8.00029C11.0003 7.73507 11.1056 7.48072 11.2932 7.29318C11.4807 7.10564 11.7351 7.00029 12.0003 7.00029C12.2655 7.00029 12.5199 7.10564 12.7074 7.29318C12.8949 7.48072 13.0003 7.73507 13.0003 8.00029V11.0003H16.0003C16.2655 11.0003 16.5199 11.1056 16.7074 11.2932C16.8949 11.4807 17.0003 11.7351 17.0003 12.0003ZM26.7078 26.7078C26.6149 26.8008 26.5046 26.8745 26.3832 26.9249C26.2618 26.9752 26.1317 27.0011 26.0003 27.0011C25.8689 27.0011 25.7387 26.9752 25.6173 26.9249C25.496 26.8745 25.3857 26.8008 25.2928 26.7078L19.0353 20.449C16.8574 22.2631 14.064 23.1677 11.2362 22.9746C8.40838 22.7815 5.76386 21.5057 3.85275 19.4125C1.94164 17.3193 0.911103 14.5698 0.975503 11.7362C1.0399 8.9025 2.19429 6.20274 4.19851 4.19851C6.20274 2.19429 8.9025 1.0399 11.7362 0.975503C14.5698 0.911103 17.3193 1.94164 19.4125 3.85275C21.5057 5.76386 22.7815 8.40838 22.9746 11.2362C23.1677 14.064 22.2631 16.8574 20.449 19.0353L26.7078 25.2928C26.8008 25.3857 26.8745 25.496 26.9249 25.6173C26.9752 25.7387 27.0011 25.8689 27.0011 26.0003C27.0011 26.1317 26.9752 26.2618 26.9249 26.3832C26.8745 26.5046 26.8008 26.6149 26.7078 26.7078ZM12.0003 21.0003C13.7803 21.0003 15.5204 20.4724 17.0004 19.4835C18.4805 18.4946 19.634 17.089 20.3152 15.4444C20.9964 13.7999 21.1746 11.9903 20.8274 10.2445C20.4801 8.49864 19.6229 6.895 18.3642 5.63632C17.1056 4.37765 15.5019 3.52049 13.7561 3.17322C12.0103 2.82595 10.2007 3.00418 8.55614 3.68537C6.9116 4.36656 5.50599 5.52011 4.51706 7.00015C3.52813 8.4802 3.00029 10.2203 3.00029 12.0003C3.00293 14.3864 3.95199 16.6741 5.63925 18.3613C7.3265 20.0486 9.61415 20.9976 12.0003 21.0003Z' fill='white'/></g></svg>\") 24 24, pointer}.gallery-item:focus{outline:none}.gallery-item:focus-visible{outline:3px solid var(--lds-g-color-neutral-base-070, #5d5d5d);outline-offset:2px;border-radius:var(--6xs, 4px);z-index:3}.image-container{position:relative;width:100%;height:100%;flex:1;aspect-ratio:4/3;overflow:hidden;border-radius:var(--lds-g-radius-2, 8px);background:var(--lds-g-color-neutral-10, #f1f3f4)}.image-container.loaded{background:var(--lds-g-color-neutral-10, #f1f3f4) !important;overflow:hidden}.image-container.loading{background:var(--lds-g-color-neutral-base-040, #AFAFAF)}.image-container.loaded:not(.image-error)::before{content:'';position:absolute;top:0;left:0;width:100%;height:100%;border-radius:var(--lds-g-radius-2, 8px);background:linear-gradient(0deg, var(--lds-g-color-palette-transparent-black-030, rgba(0, 0, 0, 0.3)) 0%, var(--lds-g-color-palette-transparent-black-030, rgba(0, 0, 0, 0.3)) 100%), var(--image-url) lightgray 50% / 150% no-repeat;filter:blur(40px);z-index:1}.image-container img{position:relative;width:100%;height:100%;object-fit:contain;object-position:center;display:block;z-index:2;transition:opacity var(--lds-g-motion-duration-medium, 0.3s) var(--lds-g-motion-ease-in-out, ease-in-out);border-radius:var(--lds-g-radius-2, 8px)}.image-container img.loading{display:none}.image-container img.loaded{display:block}.error-state-content{display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;height:100%;gap:var(--lds-g-spacing-100, 8px);z-index:3}.error-icon{width:var(--lds-g-sizing-9, 64px);height:var(--lds-g-sizing-9, 64px);aspect-ratio:1/1;stroke:var(--lds-g-color-neutral-base-060, #6A6A6A);display:flex;align-items:center;justify-content:center}.error-icon svg{width:100%;height:100%}.error-state-text{align-self:stretch;color:var(--lds-g-color-neutral-base-060);text-align:center;font-family:var(--lds-g-font-family-sans-serif);font-size:var(--lds-g-font-size-2, 20px);font-style:normal;font-weight:var(--lds-g-font-style-serif-regular);line-height:var(--lds-g-font-line-height-8, 1.875rem)}.error-retry-button{position:absolute;bottom:12px;left:50%;transform:translateX(-50%);background:none;border:none;cursor:pointer;padding:0;color:var(--lds-g-color-neutral-base-100);text-align:center;font-family:var(--lds-g-font-family-sans-serif);font-size:var(--lds-g-font-size-neg-1, 14px);font-style:normal;font-weight:var(--lds-g-font-style-serif-regular);line-height:var(--lds-g-font-line-height-3, 1.25rem);text-decoration-line:underline;text-decoration-style:solid;text-decoration-skip-ink:none;text-decoration-thickness:4%;text-underline-offset:24%;text-underline-position:from-font}.error-retry-button:hover{opacity:0.8}.error-retry-button:focus{outline:none}.error-retry-button:focus-visible{outline:3px solid var(--lds-g-color-neutral-base-070, #5d5d5d);outline-offset:4px;border-radius:var(--6xs, 4px)}.touch-expand-button{position:absolute;bottom:var(--lds-g-spacing-100, 8px);right:var(--lds-g-spacing-100, 8px);display:none;padding:var(--lds-g-spacing-100, 8px);align-items:flex-end;gap:var(--lds-g-spacing-050, 4px);border-radius:var(--lds-g-radius-full, 50px);background:var(--lds-g-color-palette-transparent-black-020, rgba(0, 0, 0, 0.2));z-index:3}.expand-icon{width:16.5px;height:16.5px;flex-shrink:0;fill:var(--lds-g-color-neutral-base-000, white)}@media (hover: none) and (pointer: coarse){.touch-expand-button{display:flex}}@media (max-width: 834px){.gallery-grid{row-gap:var(--lds-g-spacing-300, 24px);column-gap:var(--lds-g-spacing-300, 24px)}.results-text{font-size:var(--lds-g-typography-body-medium-font-size, 18px);line-height:var(--lds-g-typography-body-medium-line-height, 27px)}}@media (max-width: 834px){.gallery-grid{row-gap:var(--lds-g-spacing-200, 16px);column-gap:var(--lds-g-spacing-200, 16px)}.results-text{font-size:var(--lds-g-typography-body-small-font-size, 16px);line-height:var(--lds-g-typography-body-small-line-height, 24px)}}.gallery-item.loading{cursor:default}.gallery-item:has(.error-state-content){cursor:default}.sensitive-image{position:absolute !important;top:0;left:0;width:100%;height:100%}.sensitive-overlay{position:absolute;top:0;left:0;width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:4}.sensitive-blur{position:absolute;top:0;left:0;width:100%;height:100%;border-radius:var(--lds-g-radius-2, 8px);background:var(--lds-g-color-palette-transparent-black-030, rgba(0, 0, 0, 0.3));filter:blur(0px);z-index:1}.sensitive-eye-text-container{position:relative;display:flex;flex-direction:column;align-items:center;gap:var(--lds-g-spacing-050, 4px);z-index:2}.sensitive-eye-icon{width:var(--lds-g-sizing-9, 64px);height:var(--lds-g-sizing-9, 64px);aspect-ratio:1/1;color:var(--lds-g-color-neutral-base-000, white);fill:var(--lds-g-color-neutral-base-000, white)}.sensitive-text{align-self:stretch;color:var(--lds-g-color-neutral-base-000, white);text-align:center;font-family:var(--lds-g-font-family-sans-serif, Ringside);font-size:var(--lds-g-font-size-2, 20px);font-style:normal;font-weight:var(--lds-g-font-style-serif-regular);line-height:var(--lds-g-font-line-height-8, 1.875rem)}.sensitive-action-text{position:absolute;bottom:12px;left:50%;transform:translateX(-50%);display:flex;height:24px;flex-direction:column;justify-content:center;flex-shrink:0;color:var(--lds-g-color-neutral-base-000, white);text-align:center;font-family:var(--lds-g-font-family-sans-serif, Ringside);font-size:var(--lds-g-font-size-base, 16px);font-style:italic;font-weight:var(--lds-g-font-style-serif-regular);line-height:var(--lds-g-font-line-height-5, 1.5rem);z-index:2}@media (max-width: 834px){.sensitive-eye-icon{width:24px;height:24px}.sensitive-text{font-family:var(--lds-g-font-family-sans-serif, Ringside);font-size:var(--lds-g-font-size-neg-1, 14px);font-style:normal;font-weight:var(--lds-g-font-style-serif-regular);line-height:var(--lds-g-font-line-height-3, 1.25rem)}.sensitive-action-text{font-size:var(--lds-g-font-size-neg-1, 14px);line-height:var(--lds-g-font-line-height-3, 1.25rem);height:20px;bottom:8px}.error-icon{width:24px;height:24px}.error-state-text{font-size:var(--lds-g-font-size-neg-1, 14px);line-height:var(--lds-g-font-line-height-3, 1.25rem)}.error-retry-button{font-size:var(--lds-g-font-size-neg-2, 12px);line-height:var(--lds-g-font-line-height-2, 1.125rem)}}";

const ImageGallery = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.imageClick = createEvent(this, "imageClick");
    }
    get el() { return getElement(this); }
    // Props
    images = [];
    initialImageCount = 12;
    displayedImageCount;
    // TODO: Should only be able to configure "image results" part. variables should always be there
    resultsTextTemplate;
    optionalClass = '';
    galleryId = 'image-gallery';
    noImagesContent;
    sensitiveImageText;
    seePhotoText;
    imageLoadFailedText;
    reloadButtonText;
    // State
    isMobile = typeof window !== 'undefined' ? window.innerWidth <= MOBILE_BREAKPOINT : false;
    // Events
    imageClick;
    // Track image loading/error state
    imageLoadStatus = {};
    imageRetryCount = {};
    focusedImageIndex = 0;
    resizeListener;
    galleryGridRef;
    componentWillLoad() {
        if (!this.displayedImageCount) {
            this.displayedImageCount = this.initialImageCount;
        }
        this.setupResizeListener();
    }
    componentDidLoad() {
        if (typeof window !== 'undefined') {
            this.isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
            window.addEventListener('resize', this.resizeListener);
        }
    }
    watchImagesHandler(newImages) {
        if (newImages && newImages.length > 0) {
            // Ensure displayed count doesn't exceed available images
            this.displayedImageCount = Math.min(this.displayedImageCount || this.initialImageCount, newImages.length);
        }
        if (newImages && this.galleryGridRef) {
            this.galleryGridRef.scrollTop = 0;
        }
    }
    disconnectedCallback() {
        if (typeof window !== 'undefined' && this.resizeListener) {
            window.removeEventListener('resize', this.resizeListener);
        }
    }
    setupResizeListener() {
        this.resizeListener = () => {
            this.isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
        };
    }
    handleImageClick = (image, index) => {
        this.imageClick.emit({ image, index });
    };
    getResultsText() {
        if (!this.images || this.images.length === 0) {
            return '';
        }
        return this.resultsTextTemplate
            .replace('{current}', this.displayedImageCount.toString())
            .replace('{total}', this.images.length.toString());
    }
    // Shuffle Animation
    positions = new Map();
    capturePositions() {
        if (!this.galleryGridRef)
            return;
        const items = this.galleryGridRef.querySelectorAll('.gallery-item');
        items.forEach((item) => {
            const key = item.getAttribute('data-key');
            if (key) {
                this.positions.set(key, item.getBoundingClientRect());
            }
        });
    }
    playShuffleAnimation() {
        if (!this.galleryGridRef)
            return;
        // Respect user's motion preferences
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            this.positions.clear();
            return;
        }
        const items = this.galleryGridRef.querySelectorAll('.gallery-item');
        items.forEach((item) => {
            const key = item.getAttribute('data-key');
            if (!key)
                return;
            const prev = this.positions.get(key);
            const next = item.getBoundingClientRect();
            if (prev) {
                const dx = prev.left - next.left;
                const dy = prev.top - next.top;
                if (dx !== 0 || dy !== 0) {
                    item.animate([
                        { transform: `translate(${dx}px, ${dy}px)` },
                        { transform: 'translate(0, 0)' }
                    ], {
                        duration: 350,
                        easing: 'cubic-bezier(0.33, 1, 0.68, 1)'
                    });
                }
            }
        });
        this.positions.clear();
    }
    componentWillUpdate() {
        // Capture positions before update for shuffling animation
        this.capturePositions();
    }
    componentDidUpdate() {
        this.playShuffleAnimation();
    }
    handleImageLoad = (id) => {
        this.imageLoadStatus = { ...this.imageLoadStatus, [id]: 'loaded' };
        this.imageRetryCount = { ...this.imageRetryCount, [id]: 0 };
    };
    handleImageError = (id) => {
        const currentRetries = this.imageRetryCount[id] || 0;
        const maxRetries = 3;
        if (currentRetries < maxRetries) {
            this.imageRetryCount = { ...this.imageRetryCount, [id]: currentRetries + 1 };
            this.imageLoadStatus = { ...this.imageLoadStatus, [id]: 'loading' };
            // Delay the retry slightly to avoid immediate failure
            setTimeout(() => {
                const imgElement = this.el.shadowRoot?.querySelector(`img[data-image-id="${id}"]`);
                if (imgElement) {
                    const originalSrc = imgElement.src;
                    imgElement.src = '';
                    setTimeout(() => {
                        imgElement.src = originalSrc;
                    }, 100);
                }
            }, 500);
        }
        else {
            this.imageLoadStatus = { ...this.imageLoadStatus, [id]: 'error' };
        }
    };
    handleRetryClick = (id, imageSrc) => {
        this.imageRetryCount = { ...this.imageRetryCount, [id]: 0 };
        this.imageLoadStatus = { ...this.imageLoadStatus, [id]: 'loading' };
        setTimeout(() => {
            const imgElement = this.el.shadowRoot?.querySelector(`img[data-image-id="${id}"]`);
            if (imgElement) {
                imgElement.src = imageSrc;
            }
        }, 100);
    };
    handleImageKeyDown = (event, image, index) => {
        const key = event.key;
        // Handle Escape to exit gallery focus
        if (key === 'Escape') {
            event.preventDefault();
            event.target.blur();
            return;
        }
        // Handle Enter and Space for interaction
        if (key === 'Enter' || key === ' ') {
            event.preventDefault();
            this.handleImageClick(image, index);
            return;
        }
        // Handle Arrow key navigation within the gallery
        if (key.startsWith('Arrow')) {
            event.preventDefault();
            const displayedImages = this.images.slice(0, this.displayedImageCount);
            const totalImages = displayedImages.length;
            const cols = this.isMobile ? 2 : 3;
            let newIndex = index;
            switch (key) {
                case 'ArrowRight':
                    newIndex = Math.min(index + 1, totalImages - 1);
                    break;
                case 'ArrowLeft':
                    newIndex = Math.max(index - 1, 0);
                    break;
                case 'ArrowDown':
                    newIndex = Math.min(index + cols, totalImages - 1);
                    break;
                case 'ArrowUp':
                    newIndex = Math.max(index - cols, 0);
                    break;
            }
            if (newIndex !== index) {
                this.focusedImageIndex = newIndex;
                // Focus the new image
                setTimeout(() => {
                    const galleryItems = this.el.shadowRoot?.querySelectorAll('.gallery-item');
                    if (galleryItems && galleryItems[newIndex]) {
                        galleryItems[newIndex].focus();
                    }
                }, 0);
            }
        }
    };
    renderImageGrid() {
        const displayedImages = this.images.slice(0, this.displayedImageCount);
        return (h("div", { class: `gallery-grid ${this.isMobile ? 'mobile-grid' : 'desktop-grid'}`, "aria-label": `Image gallery with ${this.displayedImageCount} images.`, ref: el => (this.galleryGridRef = el) }, displayedImages.map((image, index) => {
            const key = image.id || index;
            const status = this.imageLoadStatus[key] || 'loading';
            // Determine which image variant to use based on container size
            // Thumbnail: 160x120, Standard: 308x231, Full: 936x702
            let src = image.urlFull;
            if (this.galleryGridRef) {
                const gridCols = this.isMobile ? 2 : 3;
                const displayWidth = this.galleryGridRef.offsetWidth / gridCols;
                if (displayWidth <= 160 && image.urlThumbnail) {
                    src = image.urlThumbnail;
                }
                else if (displayWidth <= 308 && image.urlStandard) {
                    src = image.urlStandard;
                }
                // For displayWidth > 308, we already have urlFull as default
            }
            return (h("div", { key: key, "data-key": key, class: `gallery-item${status === 'loading' ? ' loading' : ''}`, tabindex: "0", onClick: () => status === 'loaded' && this.handleImageClick(image, index), onKeyDown: (e) => status === 'loaded' && this.handleImageKeyDown(e, image, index), onFocus: () => { this.focusedImageIndex = index; }, "aria-label": `${image.alt}${image.sensitive ? `, ${this.sensitiveImageText.toLowerCase()}` : ''}${status === 'loading' ? ', loading' : status === 'error' ? ', failed to load' : ', loaded'}.` }, h("div", { class: `image-container${status === 'error' ? ' image-error' : ''}${status === 'loaded' ? ' loaded' : ''}${status === 'loading' ? ' loading' : ''}`, style: {
                    '--image-url': status !== 'error' ? `url(${src})` : ''
                } }, status !== 'error' && !image.sensitive && (h("img", { src: src, alt: image.alt, "data-image-id": image.id, class: `${status === 'loaded' ? 'loaded' : 'loading'}`, onLoad: () => this.handleImageLoad(image.id), onError: () => this.handleImageError(image.id) })), status !== 'error' && image.sensitive && (h("div", null, h("img", { src: src, alt: image.alt, "data-image-id": image.id, class: `${status === 'loaded' ? 'loaded' : 'loading'} sensitive-image`, style: { opacity: status === 'loaded' ? '0' : '1' }, onLoad: () => this.handleImageLoad(image.id), onError: () => this.handleImageError(image.id) }), status === 'loaded' && (h("div", { class: "sensitive-overlay" }, h("div", { class: "sensitive-blur" }), h("div", { class: "sensitive-eye-text-container" }, h(SensitiveEyeIcon, { className: "sensitive-eye-icon" }), h("div", { class: "sensitive-text" }, this.sensitiveImageText)), h("div", { class: "sensitive-action-text" }, this.seePhotoText))))), status === 'loaded' && !image.sensitive && (h("div", { class: "touch-expand-button" }, h(ExpandIcon, { className: "expand-icon" }))), status === 'error' && (h("div", { class: "error-state-content" }, h(ImageErrorIcon, { className: "error-icon" }), h("div", { class: "error-state-text" }, this.imageLoadFailedText), h("button", { type: "button", class: "error-retry-button", tabindex: "0", onClick: (e) => {
                    e.stopPropagation();
                    this.handleRetryClick(key, src);
                }, onKeyDown: (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.stopPropagation();
                        e.preventDefault();
                        this.handleRetryClick(key, src);
                    }
                }, "aria-label": "Retry loading image" }, this.reloadButtonText))))));
        })));
    }
    render() {
        const hasImages = this.images && this.images.length > 0;
        return (h("div", { key: 'b95056b56530d688ed53501060cdde64336e48bc', class: `image-gallery-container ${this.optionalClass}`, id: this.galleryId, role: "region", "aria-label": "Image gallery" }, hasImages ? ([
            this.renderImageGrid(),
            h("div", { class: "results-text", "aria-live": "polite", "aria-atomic": "true" }, this.getResultsText())
        ]) : (h("div", { class: "no-images-state", innerHTML: this.noImagesContent?.innerHTML }))));
    }
    static get watchers() { return {
        "images": ["watchImagesHandler"]
    }; }
};
ImageGallery.style = imageGalleryCss;

export { ImageGallery as image_gallery };
//# sourceMappingURL=image-gallery.entry.js.map
