import React from "react";
import { watchImg, rightImg } from "../utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Highlights = () => {
  // This is the GSAP animation for the Highlights component
  useGSAP(() => {
    gsap.to("#title", {
      opacity: 1,
      y: 0,
    });

    gsap.to(".link", {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.25,
    });
  }, []);

  return (
    <section
      id="highlights"
      /*
        - `common-padding`: Eine benutzerdefinierte Klasse, die wahrscheinlich allgemeine Padding-Einstellungen definiert. Die genauen Werte sind nicht spezifiziert, da es sich um eine benutzerdefinierte Klasse handelt.
        - `h-full`: Setzt die Höhe des Elements auf 100% der Höhe des Elternelements.
        - `w-screen`: Setzt die Breite des Elements auf die Breite des Bildschirms, was bedeutet, dass es sich über die gesamte Breite des Bildschirms erstreckt.
        - `overflow-hidden`: Verhindert, dass der Inhalt des Elements über dessen Grenzen hinaus angezeigt wird. Jeglicher Inhalt, der größer als das Element ist, wird abgeschnitten.
      */
      className="common-padding h-full w-screen overflow-hidden bg-zinc"
    >
      {/*
        .screen-max-width: Diese Klasse definiert einen Container mit einer maximalen Breite von 1120px.
        Sie zentriert den Container horizontal innerhalb seines Elternelements durch automatische seitliche Ränder und setzt seine Position auf 'relative'.
        Das bedeutet, dass positionierte Kind-Elemente relativ zu diesem Container positioniert werden können.
      */}
      <div className="screen-max-width">
        <div className="mb-12 w-full items-end justify-between md:flex">
          <h1 id="title" className="section-heading">
            Get the highlights
          </h1>
          <div className=" flex flex-wrap items-end gap-5">
            <p className="link">
              Watch the film
              <img src={watchImg} alt="watch" className="ml-2" />
            </p>
            <p className="link">
              Watch the event
              <img src={rightImg} alt="watch" className="ml-2" />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Highlights;
