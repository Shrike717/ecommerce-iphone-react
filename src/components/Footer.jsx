import React from "react";
import { footerLinks } from "../constants";

const Footer = () => {
  return (
    <footer className="py-5 sm:px-10 px-5">
      {/* Footer-Bereich mit vertikalem Padding von 5 und horizontalem Padding von 5 auf kleinen Bildschirmen und 10 auf größeren Bildschirmen */}
      <div className="screen-max-width">
        {/* Container, der die maximale Breite des Bildschirms nutzt */}
        <div>
          <p className="font-semibold text-gray text-xs">
            {/* Paragraf mit halbfetter Schrift, grauer Farbe und extra kleiner Schriftgröße */}
            More ways to shop
            <span className="underline text-blue">
              {/* Text mit Unterstreichung und blauer Farbe */} Find an Apple
              Store{" "}
            </span>{" "}
            or
            <span className="underline text-blue"> other retailer</span> near
            you.
          </p>
          <p className="font-semibold text-gray text-xs">
            {/* Paragraf mit halbfetter Schrift, grauer Farbe und extra kleiner Schriftgröße */}
            Or call 00800 010 8002.
          </p>
        </div>

        <div className="bg-neutral-700 my-5 h-[1px] w-full" />
        {/* Trennlinie mit neutraler Farbe 700, vertikalem Margin von 5, Höhe von 1 Pixel und voller Breite */}

        {/* Footer Links */}
        <div className="flex md:flex-row flex-col md:items-center justify-between items-center sm:items-start">
          {/* Container für Footer-Links mit flexibler Anordnung: spaltenweise auf kleinen Bildschirmen, zeilenweise mit zentrierten Elementen auf größeren Bildschirmen und Inhalten, die den verfügbaren Raum zwischen ihnen aufteilen */}
          <p className="font-semibold text-gray text-xs ">
            {/* Paragraf mit halbfetter Schrift, grauer Farbe und extra kleiner Schriftgröße */}
            Copyright @ 2024 Apple Inc. All rights reserved.
          </p>
          <div className="bp450:flex flex-row items-center hidden">
            {/* Container für Links mit flexibler Anordnung */}
            {footerLinks.map((link, index) => (
              <p key={link} className="font-semibold text-gray text-xs">
                {/* Paragraf für jeden Link mit halbfetter Schrift, grauer Farbe und extra kleiner Schriftgröße */}
                {link}
                {index !== footerLinks.length - 1 && (
                  <span className="mx-2">|</span>
                )}
              </p>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
