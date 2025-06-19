const cartContainer = document.querySelector(".cart-container");
const itemImages = document.querySelectorAll(".itemImage");

window.onload = () => {
  setTimeout(() => {
    cartContainer.classList.add("slide-in");
  }, 1000);
};

cartContainer.addEventListener("transitionend", (e) => {
  if (e.propertyName === "transform" && cartContainer.classList.contains("slide-in")) {
    // Start bounce-tip
    cartContainer.classList.add("bounce-tip");

    // Start item tumbles simultaneously
    //const itemImages = document.querySelectorAll(".itemImage");

    itemImages.forEach((item, index) => {
      const firstAnimation = `tumbleItem${index + 1}`;
      const secondAnimation = `tumbleItem${index + 1}_2`;
      const thirdAnimation = `tumbleItem${index + 1}_3`;
      const fourthAnimation = `tumbleItem${index + 1}_4`;

      // First animation
      item.style.animation = `${firstAnimation} 1s cubic-bezier(0.33, 1, 0.68, 1) forwards`;

      // First animation end
      item.addEventListener("animationend", function handleFirst() {
        item.removeEventListener("animationend", handleFirst); // clean up
        item.style.animation = `${secondAnimation} 1s cubic-bezier(0.33, 1, 0.68, 1) forwards`;

        // Second animation end
        item.addEventListener("animationend", function handleSecond() {
          item.removeEventListener("animationend", handleSecond);
          item.style.animation = `${thirdAnimation} 1s cubic-bezier(0.33, 1, 0.68, 1) forwards`;

          // Third animation end
          item.addEventListener("animationend", function handleThird() {
            item.removeEventListener("animationend", handleThird);
            item.style.animation = `${fourthAnimation} 1s cubic-bezier(0.33, 1, 0.68, 1) forwards`;
          }, { once: true });
        }, { once: true });
      }, { once: true });
    });
  }
});
