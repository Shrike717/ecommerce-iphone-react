import React, { useRef } from "react";
import { chipImg, frameImg, frameVideo } from "../utils";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { animateWithGsap } from "../utils/animations";

gsap.registerPlugin(ScrollTrigger);

const HowItWorks = () => {
  // Referenz zum Video-Element
  const videoRef = useRef();

  // Animationen mit GSAP
  useGSAP(() => {
    // Animation für das Chip-Bild
    gsap.from("#chip", {
      // Konfiguriert den ScrollTrigger, der die Animation auslöst
      scrollTrigger: {
        trigger: "#chip", // Das Element, das den ScrollTrigger auslöst
        start: "20% bottom", // Startet die Animation, wenn 20% des Viewports über dem unteren Rand des Triggers sind
        toggleActions: "restart reverse restart reverse", // Hier setzen wir die Toggle Actions, wenn das Element betreten oder verlassen wird. In diesem Fall wird die Animation neu gestartet, wenn das Element betreten wird und rückwärts abgespielt, wenn das Element verlassen wird.
      },
      opacity: 0, // Startet die Animation mit einer Deckkraft von 0 (vollständig transparent)
      scale: 2, // Startet die Animation mit einer Skalierung von 2 (doppelt so groß wie die normale Größe)
      duration: 2, // Dauer der Animation in Sekunden
      ease: "power2.inOut", // Verwendet eine "power2.inOut"-Easing-Funktion für einen sanften Start und Ende der Animation
    });

    // Das ist die Animation für das Video. Da diese etwas anders ist als die anderen Animationen, werden wir sie hier direkt programmieren.
    gsap.to("#gameVideo", {
      scrollTrigger: {
        // Hier setzen wir den Scroll Trigger
        trigger: "#gameVideo", // Hier setzen wir den Trigger auf das Target Element
        toggleActions: "play pause reverse restart", // Hier setzen wir die Toggle Actions. In diesem Fall wird die Animation abgespielt, wenn das Element betreten wird und pausiert, wenn das Element verlassen wird.
        start: "top bottom",
      },
      onComplete: () => {
        videoRef.current.play();
      },
    });

    // Animation für den Text
    animateWithGsap(".g_fadeIn", {
      // Konfiguriert die Animationseigenschaften
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.inOut",
    });
  }, []);

  return (
    <section className="common-padding">
      {/* common-padding: Setzt allgemeinen Abstand um den Abschnitt */}
      <div className="screen-max-width">
        {/* screen-max-width: Begrenzt die maximale Breite des Inhalts auf die Breite des Bildschirms */}
        {/* Bild Chip */}
        <div id="chip" className="flex-center w-full my-20">
          {/* flex-center: Zentriert Elemente flexibel, w-full: Setzt die Breite auf 100%, my-20: Setzt den vertikalen Abstand */}
          <img src={chipImg} alt="Chip" width={180} height={180} />
        </div>

        {/* Grosse Überschrift */}
        <div className="flex flex-col items-center">
          {/* flex flex-col: Erstellt eine flexible Spaltenstruktur, items-center: Zentriert die Elemente horizontal */}
          <h2 className="hiw-title">
            {/* hiw-title: Definiert den Stil für die Überschrift, z.B. Größe, Gewicht */}
            A17 Pro Chip
            <br />A monster win for gaming
          </h2>

          {/* Subtext */}
          <p className="hiw-subtitle">
            {/* hiw-subtitle: Definiert den Stil für den Untertext, z.B. Größe, Farbe */}
            It's here. the biggest redesign in the history of Apple GPUs.
          </p>
        </div>

        {/* Video */}
        {/* Video Container */}
        <div className="mt-10 md:mt-20 mb-14">
          {/* mt-10: Setzt den oberen Abstand, md:mt-20: Setzt den oberen Abstand auf mittleren Bildschirmgrößen, mb-14: Setzt den unteren Abstand */}
          <div className="relative h-full flex-center">
            {/* relative: Setzt die Positionierung relativ, h-full: Setzt die Höhe auf 100% */}
            <div className="overflow-hidden">
              {/* overflow-hidden: Verhindert das Überlaufen des Inhalts */}
              <img
                src={frameImg}
                alt="Frame"
                className="bg-transparent relative z-10"
                // bg-transparent: Setzt den Hintergrund auf transparent, relative: Setzt die Positionierung relativ, z-10: Setzt die Z-Index-Position
              />
            </div>
            <div className="hiw-video">
              {/* hiw-video: Definiert den Stil für das Video, z.B. Größe, Position */}
              {/* pointer-events-none: Deaktiviert Ereignisse der Mauszeigerinteraktion */}
              <video
                id="gameVideo"
                className="pointer-events-none"
                src={frameVideo}
                type="video/mp4"
                playsInline
                preload="none"
                muted
                autoPlay
                ref={videoRef}
              />
            </div>
          </div>

          {/* Video Subtext */}
          <p className="text-gray font-semibold text-center mt-3">
            {/* text-gray: Setzt die Textfarbe auf Grau, font-semibold: Setzt die Schriftstärke, text-center: Zentriert den Text, mt-3: Setzt den oberen Abstand */}
            Honkai Star Rail
          </p>
        </div>
        {/*  */}
        {/* Texte */}
        <div className="hiw-text-container">
          {/* hiw-text-container: Definiert den Stil für den Textcontainer, z.B. Layout, Abstände */}
          <div className=" flex flex-1 justify-center flex-col">
            {/* flex: Aktiviert Flexbox, flex-1: Flex-Item wächst und schrumpft, justify-center: Zentriert die Inhalte horizontal, flex-col: Flex-Container in Spaltenrichtung */}
            {/*  */}
            <p className="hiw-text g_fadeIn">
              {/* hiw-text: Definiert den Stil für den Text, z.B. Größe, Farbe, g_fadeIn: Fügt eine Einblendanimation hinzu */}
              A17 Pro is an entirely new class of iPhone chip that delivers our{" "}
              <span className="text-white">
                {/* text-white: Setzt die Textfarbe auf Weiß */}
                best graphics performance by far.
              </span>
            </p>

            {/* Wiederholt das Styling für einen konsistenten Look */}
            <p className="hiw-text g_fadeIn">
              Mobile{" "}
              <span className="text-white">
                {/* text-white: Setzt die Textfarbe auf Weiß */}
                games will look and feel so immersive{" "}
              </span>
              , with incredibly detailed environments and characters.
            </p>
          </div>

          <div className=" flex-1 flex justify-center flex-col g_fadeIn">
            {/* flex-1: Flex-Item wächst und schrumpft, flex: Aktiviert Flexbox, justify-center: Zentriert die Inhalte horizontal, flex-col: Flex-Container in Spaltenrichtung, g_fadeIn: Fügt eine Einblendanimation hinzu */}
            <p className="hiw-text">New</p>
            <p className="hiw-bigtext">
              {/* hiw-bigtext: Definiert den Stil für größeren Text, z.B. Größe, Gewicht */}
              Pro-class GPU
            </p>
            <p className="hiw-text">with 6 cores</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
