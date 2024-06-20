import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

//
export const animateWithGsap = (target, animationProps, scrollProps) => {
  // Hier rufen wir das Basic ggsap.to()
  gsap.to(target, {
    ...animationProps, // Hier können wir die Animationseigenschaften setzen, wie zb. Dauer, Easing Funktion etc.
    scrollTrigger: {
      // Hier setzen wir den Scroll Trigger
      trigger: target, // Hier setzen wir den Trigger auf das Target Element
      toggleActions: "restart reverse restart reverse", // Hier setzen wir die Toggle Actions, wenn das Element betreten oder verlassen wird. In diesem Fall wird die Animation neu gestartet, wenn das Element betreten wird und rückwärts abgespielt, wenn das Element verlassen wird.
      start: "top 85%", // Bedeutet: wenn der top vom Trigger 85% vom top vom View Port entfernt ist, wird die Animation gestartet
      ...scrollProps, // Hier können wir zusätzliche Scroll Props hinzufügen, wie zb. onEnter, onLeave etc.
    },
  });
};

// Das ist die Timeline Animation, die wir in der Model Komponente verwendet haben.
export const animateWithGsapTimeline = (
  timeline,
  rotationRef,
  rotationState,
  firstTarget,
  secondTarget,
  animationProps
) => {
  console.log("[animations.js] firstTarget:", firstTarget);
  // Hier setzen wir die Animation für die Rotation des Models.
  timeline.to(rotationRef.current.rotation, {
    y: rotationState,
    duration: 1,
    ease: "power2.out",
  });
  // Hier setzen wir die Animation für das erste Target. Die Props sind die Animationseigenschaften. ZB. die Dauer, die Easing Funktion etc.
  timeline.to(
    firstTarget,
    {
      ...animationProps,
      ease: "power2.out",
    },
    "<" // Das symbolisiert, dass die Animation gleichzeitig mit der vorherigen Animation startet
  );
  // Hier setzen wir die Animation für das zweite Target. Die Props sind die Animationseigenschaften. ZB. die Dauer, die Easing Funktion etc.
  timeline.to(
    secondTarget,
    {
      ...animationProps,
      ease: "power2.out",
    },
    "<" // Das symbolisiert, dass die Animation gleichzeitig mit der vorherigen Animation startet
  );
};
