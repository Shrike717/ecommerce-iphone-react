//
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
