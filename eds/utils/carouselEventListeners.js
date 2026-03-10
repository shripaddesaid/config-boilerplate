// carouselEventListeners.js
// This module centralizes all event listener logic for the carousel.
// It expects a context object with all necessary state and DOM references.

export function attachCarouselEventListeners({
  ul,
  block,
  isMobile,
  cardNum,
  totalPages,
  updateSharedUIState,
  pushCarouselAnalytics,
  componentName,
  paginationType,
  getCurrentIndex,
  setCurrentIndex,
}) {
  let startX = 0;
  let scrollLeft = 0;
  let isDragging = false;

  ul.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].pageX;
    scrollLeft = ul.scrollLeft;
    ul._startY = e.touches[0].pageY;
  });

  ul.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - startX;
    const y = e.touches[0].pageY - (ul._startY ?? 0);
    if (Math.abs(x) > Math.abs(y)) {
      e.preventDefault(); // Only prevent default for horizontal swipes
      ul.scrollLeft = scrollLeft - x;
    }
    // If vertical movement is greater, do not preventDefault, allow page scroll
  });

  ul.addEventListener("touchend", (e) => {
    if (!isDragging) return;
    isDragging = false;
    const endX = e.changedTouches[0].pageX;
    const x = endX - startX;
    const SWIPE_THRESHOLD = 130;
    if (Math.abs(x) < SWIPE_THRESHOLD) return;

    const cardWidth = ul.querySelector(".cardcontainer")?.offsetWidth || 0;
    const currentIndex = getCurrentIndex();
    let newIndex = currentIndex;
    if (x < 0 && currentIndex < totalPages) {
      newIndex = currentIndex + 1;
    } else if (x > 0 && currentIndex > 0) {
      newIndex = currentIndex - 1;
    }
    if (newIndex !== currentIndex) {
      // Analytics for swipe action
      pushCarouselAnalytics(
        x > 0 ? "Carousel Right" : "Carousel Left",
        x > 0 ? "Next" : "Previous",
        componentName,
      );
      setCurrentIndex(newIndex);
      updateSharedUIState();
    }
  });

  // ... other common listeners like wheel, focusin, click can be added here ...
  ul.addEventListener(
    "wheel",
    (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
      }
    },
    { passive: false },
  );

  ul.addEventListener("focusin", (e) => {
    // Always find the closest .cardcontainer ancestor for any focused element
    const focusedCard = e.target.closest(".cardcontainer");
    if (focusedCard) {
      const cards = Array.from(ul.querySelectorAll(".cardcontainer"));
      const currentIndex = getCurrentIndex();
      const cardIndex = cards.indexOf(focusedCard);
      if (cardIndex !== -1) {
        const newIndex = isMobile
          ? cardIndex
          : Math.max(
              0,
              Math.min(
                totalPages,
                cardIndex - (cardNum > 1 ? Math.floor(cardNum / 2) : 0),
              ),
            );
        if (newIndex !== currentIndex) {
          setCurrentIndex(newIndex);
          updateSharedUIState();
        }
      }
    }
  });

  ul.addEventListener("click", () => {
    ul.focus();
  });

  // Add this inside setupCarousel, after UI elements are created and before DOM assembly

  document.addEventListener("keydown", (e) => {
    const currentIndex = getCurrentIndex();
    if (
      (e.key === "ArrowRight" || e.key === "ArrowLeft") &&
      block.contains(document.activeElement)
    ) {
      const isRightArrow = e.key === "ArrowRight";
      const endPageIndex =
        paginationType === "dots" ? totalPages : totalPages - 1;
      if (isRightArrow && currentIndex < endPageIndex) {
        setCurrentIndex(currentIndex + 1);
      } else if (!isRightArrow && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else {
        return;
      }
      updateSharedUIState();
      // Optionally, scroll the ul if you want to support manual scroll
      // const cardWidth = ul.querySelector(".cardcontainer")?.offsetWidth || 0;
      // ul.scrollLeft = currentIndex * (cardWidth + 20);
    }
  });
}
