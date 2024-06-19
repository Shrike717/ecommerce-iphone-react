import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { heroVideo, smallHeroVideo } from "../utils";

const Hero = () => {
  // State für das Video-Quell-Element. Verwendet `smallHeroVideo` als Standardwert, wenn die Bildschirmbreite kleiner als 760px ist, andernfalls `heroVideo`.
  const [videoSrc, setVideoSrc] = useState(
    window.innerWidth < 760 ? smallHeroVideo : heroVideo
  );

  // Überprüft die Bildschirmbreite und aktualisiert den Video-Quellpfad entsprechend
  const handleVideoSrcSet = () => {
    if (window.innerWidth < 760) {
      setVideoSrc(smallHeroVideo);
    } else {
      setVideoSrc(heroVideo);
    }
  };

  // Fügt ein useEffect hinzu, um das Video-Quell-Element zu aktualisieren, wenn die Bildschirmbreite geändert wird
  useEffect(() => {
    //  Wann immer die Bildschirmgröße geändert wird, wird `handleVideoSrcSet` aufgerufen
    window.addEventListener("resize", handleVideoSrcSet);
    // Entfernt das Event-Listener, um Speicherlecks zu vermeiden. Ein Speicherleck tritt auf, wenn ein Event-Listener nicht entfernt wird und weiterhin im Speicher gehalten wird, auch wenn das Element nicht mehr existiert.
    return () => {
      window.removeEventListener("resize", handleVideoSrcSet);
    };
  }, [window.innerWidth]);

  // Animation für das Erscheinen des Hero-Titels und des CTA-Elements
  useGSAP(() => {
    // Errzeugt ein neues Tween, das die Opazität des Elements mit der ID `hero` von 0 auf 1 über einen Zeitraum von 1,5 Sekunden ändert
    gsap.to("#hero", { opacity: 1, delay: 2 });
    gsap.to("#cta", { opacity: 1, y: -50, delay: 3 });
  }, []);

  return (
    /*
- `nav-height`: Diese Klasse ist nicht standardmäßig in Tailwind CSS enthalten und deutet auf eine benutzerdefinierte Utility-Klasse hin, die wahrscheinlich die Höhe des Navigationsbereichs festlegt.
- `relative`: Setzt die Positionierung des Elements auf `relative`, was bedeutet, dass es relativ zu seiner normalen Position positioniert werden kann. Andere Elemente können absolut zu diesem Element positioniert werden.
- `w-full`: Setzt die Breite des Elements auf 100% des Elternelements.
- `bg-black`: Setzt die Hintergrundfarbe des Elements auf Schwarz.
*/
    <section className="nav-height relative w-full bg-black ">
      {/*
      - `flex`: Wendet ein Flexbox-Layout an, was bedeutet, dass die Kinder des Elements in einer Spalte (wegen `flex-col`) angeordnet werden.
      - `h-5/6`: Setzt die Höhe des Elements auf 5/6 (83.33%) der Höhe des Elternelements.
      - `w-full`: Setzt die Breite des Elements auf 100% des Elternelements.
      - `flex-col`: Ordnet die Kinder des Flex-Containers in einer vertikalen Spalte an.
      - `items-center`: Zentriert die Kinder des Flex-Containers horizontal in der Mitte des Containers.
      */}
      <div className=" flex-center h-5/6 w-full flex-col">
        {/* hero-title enthält opacity-0 als Ausgangspunkt für die Animation */}
        <p id="hero" className="hero-title">
          iPhone 15 Pro
        </p>
        {/*
        - `w-9/12`: Setzt die Breite des Elements auf 75% (9/12) des Elternelements. Dies ist die Standardbreite.
        - `md:w-10/12`: Wendet eine Medienabfrage an, die die Breite des Elements auf 83.33% (10/12) des Elternelements ändert, wenn die Bildschirmbreite die "md" (Medium) Schwelle erreicht oder überschreitet.
        */}
        <div className="w-9/12 md:w-10/12">
          <video
            // - `pointer-events-none`: Deaktiviert die Maus- und Touch-Events auf dem Video-Element, sodass es nicht interaktiv ist.
            className="pointer-events-none"
            autoPlay
            muted
            playsInline={true}
            key={videoSrc}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>

      <div
        id="cta"
        /*
        - `flex`: Wendet ein Flexbox-Layout an, was bedeutet, dass die Kinder des Elements in einer Spalte (wegen `flex-col`) angeordnet werden.
        - `translate-y-20`: Verschiebt das Element um 20 Einheiten entlang der Y-Achse nach unten. Die genaue Maßeinheit hängt von der Konfiguration ab, in Tailwind CSS entspricht dies standardmäßig 5rem (80px).
        - `flex-col`: Ordnet die Kinder des Flex-Containers in einer vertikalen Spalte an.
        - `items-center`: Zentriert die Kinder des Flex-Containers horizontal in der Mitte des Containers.
        - `opacity-0`: Setzt die Deckkraft (Opazität) des Elements auf 0, macht es also vollständig transparent.
        */
        className="flex translate-y-20 flex-col items-center opacity-0"
      >
        <a href="#highlights" className="btn">
          Buy
        </a>
        <p className="text-xl font-normal">From €199 / month or €999</p>
      </div>
    </section>
  );
};

export default Hero;
