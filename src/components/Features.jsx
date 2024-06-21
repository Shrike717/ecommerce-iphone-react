import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { animateWithGsap } from "../utils/animations";
import { explore1Img, explore2Img, exploreVideo } from "../utils";

const Features = () => {
  // Hier erzeugen wir ein ref für unser Video Element, um die Animation zu starten, wenn das Element in den Viewport gelangt.
  const videoRef = useRef();

  // Hier verwenden wir das useGSAP Hook, um die Animationen zu starten, wenn die Elemente in den Viewport gelangen.
  useGSAP(() => {
    // Das ist die Animation für die Sektionsüberschrift
    animateWithGsap("#features_title", {
      y: 50,
      opacity: 1,
    });
    // Das ist die Animation für das Video. Da diese etwas anders ist als die anderen Animationen, werden wir sie hier direkt programmieren.
    gsap.to("#exploreVideo", {
      scrollTrigger: {
        // Hier setzen wir den Scroll Trigger
        trigger: "#exploreVideo", // Hier setzen wir den Trigger auf das Target Element
        toggleActions: "play pause reverse restart", // Hier setzen wir die Toggle Actions. In diesem Fall wird die Animation abgespielt, wenn das Element betreten wird und pausiert, wenn das Element verlassen wird.
        start: "-10% bottom", // Bedeutet: wenn der top vom Trigger 85% vom top vom View Port entfernt ist, wird die Animation gestartet        },
      },
      onComplete: () => {
        videoRef.current.play();
      },
    });

    // Das ist die Animation für die Bilder
    animateWithGsap(
      ".g_grow",
      // Das sind die Animationseigenschaften
      {
        scale: 1,
        opacity: 1,
        ease: "power1",
      },
      // Das sind die Scroll Props
      {
        scrub: 5.5,
      }
    );
    // Das ist die Animation für den Text
    animateWithGsap(
      ".g_text",
      // Das sind die Animationseigenschaften
      {
        y: 0,
        opacity: 1,
        ease: "power2.InOut",
        duration: 1,
      }
    );
  }, []);

  return (
    <section className="h-full common-padding bg-zinc relative overflow-hidden">
      {/* Setzt die Höhe der Sektion auf die volle Höhe des Elternelements, fügt allgemeine Padding hinzu, setzt die Hintergrundfarbe auf Zink, positioniert die Sektion relativ und verhindert das Überlaufen von Inhalten */}

      <div className="screen-max-wdith">
        {/* Möglicher Tippfehler in der Klasse "screen-max-wdith". Sollte wahrscheinlich "screen-max-width" sein, um die maximale Breite des Bildschirms zu definieren. */}

        <div className="mb-12 w-full">
          {/* Setzt den unteren Rand auf 12 Einheiten und die Breite auf 100% des Elternelements */}
          <h1 id="features_title" className="section-heading">
            {/* Verwendet eine benutzerdefinierte Klasse "section-heading" für Styling, das nicht direkt ersichtlich ist, da es außerhalb dieses Codes definiert sein muss */}
            Explore the full story.
          </h1>
        </div>

        {/* Ünerschriften */}
        <div className="flex flex-col justify-center items-center overflow-hidden">
          {/* Erstellt einen flexiblen Container, der seine Kinder vertikal anordnet, zentriert die Kinder sowohl horizontal als auch vertikal und verhindert das Überlaufen von Inhalten */}
          <div className="mt-32 mb-24 pl-24">
            {/* Setzt den oberen Rand auf 32 Einheiten, den unteren Rand auf 24 Einheiten und den linken Padding auf 24 Einheiten */}
            <h2 className="text-5xl lg:text-7xl font-semibold">
              {/* Setzt die Textgröße auf 5xl, ändert sie auf 7xl bei großen Bildschirmen und macht den Text fett */}
              iPhone.
            </h2>
            <h2 className="text-3xl lg:text-7xl font-semibold">
              {/* Wiederholt das Styling für einen konsistenten Look */}
              Forged in titanium.
            </h2>
          </div>

          {/* Video */}
          <div className="flex-center flex-col sm:px-10">
            {/* Zentriert Inhalte, ordnet Kinder vertikal an und setzt horizontalen Padding auf 10 Einheiten bei kleinen Bildschirmen */}
            <div className="relative h-[50vh] w-full flex items-center">
              {/* Positioniert den Container relativ, setzt die Höhe auf 50% des Viewports, die Breite auf 100% des Elternelements und zentriert die Kinder vertikal */}
              {/* Streckt das Video, um den Container vollständig zu bedecken, während das Seitenverhältnis beibehalten wird und das Video zentriert ist */}
              <video
                playsInline
                id="exploreVideo"
                className="w-full h-full object-cover object-center"
                preload="none"
                muted
                autoPlay
                ref={videoRef}
              >
                <source src={exploreVideo} type="video/mp4" />
              </video>
            </div>

            {/* Bilder */}
            <div className="flex flex-col w-full relative">
              {/* Erstellt einen flexiblen Container, der seine Kinder vertikal anordnet, setzt die Breite auf 100% des Elternelements und positioniert den Container relativ */}
              <div className="feature-video-container">
                {/* Verwendet eine benutzerdefinierte Klasse "feature-video-container" für Styling, das nicht direkt ersichtlich ist */}
                <div className="overflow-hidden flex-1 h-[50vh]">
                  {/* Verhindert das Überlaufen von Inhalten, lässt das Element flexibel wachsen und setzt die Höhe auf 50% des Viewports */}
                  <img
                    src={explore1Img}
                    alt="titanium"
                    className="feature-video g_grow"
                  />
                  {/* Verwendet benutzerdefinierte Klassen "feature-video" und "g_grow" für Styling, das nicht direkt ersichtlich ist */}
                </div>
                <div className="overflow-hidden flex-1 h-[50vh]">
                  {/* Wiederholt das Styling für einen konsistenten Look */}
                  <img
                    src={explore2Img}
                    alt="titanium 2"
                    className="feature-video g_grow"
                  />
                </div>
              </div>

              {/* Texte */}
              <div className="feature-text-container">
                {/* Verwendet eine benutzerdefinierte Klasse "feature-text-container" für Styling, das nicht direkt ersichtlich ist */}
                <div className="flex-1 flex-center">
                  {/* Lässt das Element flexibel wachsen und zentriert die Inhalte */}
                  <p className="feature-text g_text">
                    {/* Verwendet benutzerdefinierte Klassen "feature-text" und "g_text" für Styling, das nicht direkt ersichtlich ist */}
                    iPhone 15 Pro is{" "}
                    <span className="text-white">
                      {/* Setzt die Textfarbe auf Weiß */}
                      the first iPhone to feature an aerospace-grade titanium
                      design
                    </span>
                    , using the same alloy that spacecrafts use for missions to
                    Mars.
                  </p>
                </div>

                <div className="flex-1 flex-center">
                  {/* Wiederholt das Styling für einen konsistenten Look */}
                  <p className="feature-text g_text">
                    Titanium has one of the best strength-to-weight ratios of
                    any metal, making these our{" "}
                    <span className="text-white">
                      {/* Setzt die Textfarbe auf Weiß */}
                      lightest Pro models ever.{" "}
                    </span>
                    You'll notice the difference the moment you pick one up.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
