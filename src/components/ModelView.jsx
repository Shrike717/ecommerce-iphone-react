import React, { Suspense } from "react";
import Lights from "./Lights";
import Iphone from "./Iphone";
import { View, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import Loader from "./Loader";

// Hier werden die Models selbst gerendert
const ModelView = ({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  size,
  item,
}) => {
  return (
    // Hier setzen wir den View Port für die Models. In diesem Bereich wird das 3-D Model gerendert
    <View
      index={index} // Das ist der Index, den wir für die Modelle benutzen. 0 ist das kleine Model, 1 ist das große Model
      id={gsapType} // Das ist der Typ, den wir für die Animation benutzen. Das ist das Target, das wir in der gsap Animation benutzen
      // eslint-disable-next-line tailwindcss/no-unnecessary-arbitrary-value
      //   className={`size-full border-2 border-red-500 ${index === 2 ? "right-[-100%]" : ""}`}
      className={`size-full  absolute ${index === 2 ? "right-[-100%]" : ""}`}
    >
      {/* Hier setzen wir ein allgemeines Licht auf die gesamte Szene */}
      <ambientLight intensity={0.3} />{" "}
      {/* Das ist das Licht, das gleichmässig von allen Seiten kommt */}
      {/* Hier setzen wir eine Kamera. Diese simuliert das menschliche Auge. */}
      <PerspectiveCamera
        makeDefault // Das ist die Kamera, die wir als Standard setzen
        position={[0, 0, 4]} // Das ist die Position der Kamera
      />
      {/*  Hier kommen die von Adrian gesetzten diversen Lichtquellen, die ein Handy am besten beleuchten */}
      <Lights />
      {/* Das sind die OrbitControls, damit wir das Modell anfassen können */}
      <OrbitControls
        makeDefault // Das definiert dass diese Art von Controls zum Interagieren  die Standard Controls sind
        ref={controlRef} // Das ist die Ref für die Camera Controls
        enableZoom={false} // Das deaktiviert das Zoomen
        enablePan={false} // Das deaktiviert das Verschieben
        rotateSpeed={0.4} // Das ist die Geschwindigkeit, mit der wir das Modell drehen
        target={new THREE.Vector3(0, 0, 0)} // Das ist das Ziel, auf das die Kamera gerichtet ist
        onEnd={() => setRotationState([controlRef.current.getAzimuthalAngle()])} // Das ist die Funktion mit der wir ermitteln, wie das Modell momentan gedreht ist. Brauchen wir weil die Rotation zurückgesetzt wird, wenn wir das Modell wechseln
      />
      <group
        ref={groupRef}
        name={`${index === 1} ? "small" : "large"`}
        position={[0, 0, 0]}
      >
        {/* Hier setzen wir einen Loader solange das 3-D Modell lädt. Funktioniert nur mit dem Html Element von Three */}
        <Suspense fallback={<Loader />}>
          <Iphone
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]} // Das ist die Größe des Models
            item={item} // Das enthält alle Informationen zum Model
            size={size} // Das ist die Größe des Models
          />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;
