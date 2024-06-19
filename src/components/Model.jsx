import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ModelView from "./ModelView";
import { yellowImg } from "../utils";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from "../constants";

// Das ist die übergeordnete Komponente für die 3-D Modelle. Hier können wir die verschiedenen Modelle und Größen auswählen.
const Model = () => {
  // Dieser State setzt die aktuelle iPhone Größe, die wir zeigen wollen:
  const [size, setSize] = useState("small");
  // Dieser State wacht über die ganzen Details, die wir für die verschiedenen iPhone Models haben:
  const [model, setModel] = useState({
    title: "iPhone 15 Pro in Natural Titanium",
    color: ["#8F8A81", "#FFE7B9", "#6F6C64"], // Das Sind Farben, die wir im mesh benutzen
    img: yellowImg, // Hiermit setzen wir die Textur für das iPhone 15 Pro. Das sind die Displays.
  });

  // Wir brauchen zwei Refs für die zwei verschiedenen iPhone Größen, die wir zeigen wollen:
  // Das sind Camera Controls für unsere  Model View
  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();

  // Das sind die Refs für die zwei verschiedenen iPhone Modelle, die wir zeigen wollen:
  // Das ist für die Modelle selbst:
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  // Hiermit verfolgen wir die Rotation des Models:
  // Das ist dass wie immer die Werte der Rotation wissen, wenn wir mit der Maus die iPhones drehen
  const [smallRotation, setSmallRotation] = useState([0]);
  const [largeRotation, setLargeRotation] = useState([0]);

  // Animation for the heading
  useGSAP(() => {
    gsap.to("#heading", {
      y: 0, // Bewegt das Element auf der y-Achse nach oben zurück auf 0
      opacity: 1,
    });
  }, []);
  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading">
          Take a closer look.
        </h1>

        {/* Das ist der Container für unser Model */}
        <div className="mt-5 flex flex-col items-center">
          {/* Dieser Container schafft den Platz, um das Modell darin zu präsentieren */}
          <div className="relative h-[75vh] w-full overflow-hidden md:h-[90vh]">
            {/* Diese Komponente rendert das kleine Model */}
            <ModelView
              index={1} // Das ist der Index, den wir für die Modelle benutzen
              groupRef={small} // Das ist die Ref für das kleine iPhone
              gsapType="view1" // Das ist der Typ, den wir für die Animation benutzen. Das ist das Target, das wir in der gsap Animation benutzen
              controlRef={cameraControlSmall} // Das ist die Ref für die Camera Controls
              setRotationState={setSmallRotation} // Das ist die Funktion, die die Rotation für das kleine iPhone setzt
              item={model} // Das ist das Model, das wir rendern wollen
              size={size} // Das ist die Größe des Models
            />
            {/* Diese Komponente rendert das grosse Model */}
            <ModelView
              index={2} // Das ist der Index, den wir für die Modelle benutzen
              groupRef={large} // Das ist die Ref für das kleine iPhone
              gsapType="view2" // Das ist der Typ, den wir für die Animation benutzen. Das ist das Target, das wir in der gsap Animation benutzen
              controlRef={cameraControlLarge} // Das ist die Ref für die Camera Controls
              setRotationState={setLargeRotation} // Das ist die Funktion, die die Rotation für das kleine iPhone setzt
              item={model} // Das ist das Model, das wir rendern wollen
              size={size} // Das ist die Größe des Models
            />

            {/* Hier setzen wir die Canvas Komponente. Das ist die Bühne für die 3-D Animation. */}
            <Canvas
              className="size-full"
              // Das Element wird zusätzlich inline gestylt, um sicherzustellen, dass es spezifische Stile direkt erhält, die seine Positionierung und Größe betreffen. Hier sind die Gründe für die einzelnen Stile:
              style={{
                position: "fixed", // Sorgt dafür, dass das Canvas-Element relativ zum Viewport positioniert wird, was bedeutet, dass es immer an derselben Stelle auf dem Bildschirm bleibt, auch wenn gescrollt wird.
                top: 0,
                bottom: 0,
                left: 0,
                right: 0, // Diese Stile dehnen das Element aus, sodass es den gesamten Viewport bedeckt, unabhängig von der Größe des Bildschirms.
                overflow: "hidden", // Verhindert, dass Inhalte außerhalb des Elements sichtbar sind, was bei einem Vollbild-Canvas nützlich sein kann, um sicherzustellen, dass keine Scrollbars erscheinen.
              }}
              // Hier stellen wir den Zugang zur Event Quelle her, die wir für die Animation benutzen
              eventSource={document.getElementById("root")} // Das ist hilfreich, um mit dem jeweiliggen Model interagieren zu können.
            >
              {/* Diese Komponente von Drei Ermöglicht es mehrere Ansichten eines Models im gleichen Canvas zu rendern. Das erlaubt uns die Models zu animieren. */}
              <View.Port />
            </Canvas>
          </div>

          {/* Hier setzen wir die Buttons, um zwischen den verschiedenen iPhone Farben und Größen zu wechseln */}
          <div className="mx-auto w-full">
            <p className="mb-5 text-center text-sm font-light">{model.title}</p>

            <div className="flex-center">
              <ul className="color-container">
                {models.map((item, i) => (
                  <li
                    key={i}
                    className="mx-2 size-6 cursor-pointer rounded-full"
                    style={{ backgroundColor: item.color[0] }}
                    onClick={() => setModel(item)} // Hiermit setzen wir das Model, das wir zeigen wollen. Das blaue, gelbe etc..
                  ></li>
                ))}
              </ul>

              {/* Das sind die Buttons für die zwei Größen */}
              <button className="size-btn-container">
                {sizes.map(({ label, value }) => (
                  <span
                    key={label}
                    className="size-btn"
                    style={{
                      // size ist das State mit der aktuell gewählten Größe
                      backgroundColor: size === value ? "white" : "transparent",
                      color: size === value ? "black" : "white",
                    }}
                    onClick={() => setSize(value)} // Hiermit setzen wir die Größe des Models. Das kleine oder das große
                  >
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
