import "../shared/shared.js";
import "../../../js/navbar.js";
import "../../../js/site-pages.js";
import "../../../scroll-reveal.js";

const proofCounters = document.querySelectorAll(".home-proof-number [data-count]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const counterDuration = 1800;

proofCounters.forEach((counter) => {
    const target = Number(counter.dataset.count);
    if (!Number.isFinite(target)) return;

    if (prefersReducedMotion) {
        counter.textContent = String(target);
        return;
    }

    counter.textContent = "0";
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
        const progress = Math.min((currentTime - startTime) / counterDuration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        counter.textContent = String(Math.round(target * easedProgress));

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    };

    requestAnimationFrame(updateCounter);
});
