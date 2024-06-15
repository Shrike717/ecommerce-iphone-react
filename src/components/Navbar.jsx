import React from "react";
import { appleImg, searchImg, bagImg } from "../utils";
import { navLists } from "../constants";

const Navbar = () => {
  return (
    // Hauptcontainer des Navigationsbalkens
    <header className="flex w-full items-center justify-between p-5 sm:px-10">
      {/* Navigationscontainer, passt sich der maximalen Bildschirmbreite an */}
      <nav className="screen-max-width flex w-full">
        <img src={appleImg} alt="Apple" width={14} height={18} />
        {/* Container für Navigationslinks, nur sichtbar auf größeren Bildschirmen */}
        <div className="flex flex-1 justify-center max-sm:hidden">
          {navLists.map((nav, index) => (
            // Navigationslinks mit Hover-Effekt
            /*
            Dieses Styling wendet mehrere Tailwind CSS-Klassen an, um das Layout und das Verhalten der Elemente zu steuern:

            - `flex`: Wendet ein Flexbox-Layout an, was bedeutet, dass die Kinder des Elements in einer Reihe (standardmäßig) angeordnet werden.
            - `items-baseline`: Stellt sicher, dass die Baseline (Grundlinie) der Textinhalte der Kinder übereinstimmt, was für eine konsistente vertikale Ausrichtung sorgt.
            - `gap-7`: Fügt einen Abstand (gap) von 28px (basierend auf der Standardkonfiguration von Tailwind, wo 1 Einheit = 4px) zwischen jedem Kind-Element hinzu.
            - `max-sm:justify-end`: Wendet die Justierung `justify-end` an, wenn die Bildschirmbreite kleiner oder gleich der "small" Breakpoint ist, was bedeutet, dass die Kinder am Ende des Containers ausgerichtet werden.
            - `max-sm:flex-1`: Wendet die Flex-Grow-Eigenschaft mit einem Wert von 1 auf Bildschirmbreiten an, die kleiner oder gleich dem "small" Breakpoint sind, was dem Element erlaubt, verfügbaren Platz innerhalb des Flex-Containers zu füllen.
            */
            <div
              key={nav}
              className="cursor-pointer px-5 text-sm text-gray transition-all hover:text-white"
            >
              {nav}
            </div>
          ))}
        </div>

        <div className="flex items-baseline gap-7 max-sm:flex-1 max-sm:justify-end">
          <img src={searchImg} alt="Search" width={18} height={18} />

          <img src={bagImg} alt="Bag" width={18} height={18} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
