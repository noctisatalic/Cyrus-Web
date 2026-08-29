/* CyrusWeb Global Custom Cursor */

(() => {
  "use strict";

  const cursor = document.querySelector(".cursor");
  const ring = document.querySelector(".cursor-ring");

  if (!cursor || !ring) return;

  let pointerX = window.innerWidth / 2;
  let pointerY = window.innerHeight / 2;

  let ringX = pointerX;
  let ringY = pointerY;

  function moveDot(x, y) {
    pointerX = x;
    pointerY = y;

    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
  }

  window.addEventListener(
    "pointermove",
    (event) => {
      if (
        event.pointerType !== "mouse" &&
        event.pointerType !== "pen" &&
        event.pointerType !== "touch"
      ) {
        return;
      }

      moveDot(event.clientX, event.clientY);
    },
    { passive: true }
  );

  function animateRing() {
    ringX += (pointerX - ringX) * 0.15;
    ringY += (pointerY - ringY) * 0.15;

    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;

    requestAnimationFrame(animateRing);
  }

  animateRing();

  document
    .querySelectorAll(
      "a, button, .service-card, .price-card, .testimonial-card"
    )
    .forEach((element) => {
      element.addEventListener("pointerenter", (event) => {
        if (
          event.pointerType === "mouse" ||
          event.pointerType === "pen"
        ) {
          ring.classList.add("active");
        }
      });

      element.addEventListener("pointerleave", () => {
        ring.classList.remove("active");
      });
    });

  window.addEventListener(
    "pointerdown",
    (event) => {
      if (
        event.pointerType === "touch" &&
        window.innerWidth >= 769
      ) {
        moveDot(event.clientX, event.clientY);
        ring.classList.add("active");
      }
    },
    { passive: true }
  );

  window.addEventListener(
    "pointerup",
    (event) => {
      if (event.pointerType === "touch") {
        ring.classList.remove("active");
      }
    },
    { passive: true }
  );

  window.addEventListener("pointercancel", () => {
    ring.classList.remove("active");
  });
})();
