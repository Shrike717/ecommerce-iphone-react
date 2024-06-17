// Importieren der notwendigen Bibliotheken und Dateien
import React, { useEffect, useRef, useState } from "react"; // Grundlegende React-Hooks
import gsap from "gsap"; // GSAP für Animationen
import { useGSAP } from "@gsap/react"; // Ein Hook, um GSAP in React zu verwenden
import { ScrollTrigger } from "gsap/all"; // ScrollTrigger-Plugin für scroll-bezogene Animationen
import { pauseImg, playImg, replayImg } from "../utils"; // Importieren von Bildern für die Steuerungselemente
import { hightlightsSlides } from "../constants"; // Importieren der Daten für die Video-Slides
gsap.registerPlugin(ScrollTrigger); // Registrieren des ScrollTrigger-Plugins bei GSAP

// Komponente VideoCarousel
const VideoCarousel = () => {
  // Verwendung von useRef, um Referenzen zu den Video-Elementen zu speichern
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  // State für die Verwaltung der Video-Informationen
  const [video, setVideo] = useState({
    isEnd: false, // Ob das Video zu Ende ist
    startPlay: false, // Ob das Video abgespielt werden soll
    videoId: 0, // Die ID des aktuellen Videos
    isLastVideo: false, // Ob es sich um das letzte Video handelt
    isPlaying: false, // Ob das Video gerade abgespielt wird
  });

  // State für die Verwaltung geladener Daten
  const [loadedData, setLoadedData] = useState([]);

  // Destructuring des video-States für einfachen Zugriff
  const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

  // Verwendung von useGSAP für Animationen beim Scrollen
  useGSAP(() => {
    // Animation des Sliders beim Eintritt in die Sichtbarkeit
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`, // Bewegung des Sliders basierend auf der videoId
      duration: 2, // Dauer der Animation
      ease: "power2.inOut", // Animationsease
    });

    // Animation für das Abspielen des Videos beim Scrollen
    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video", // Element, das die Animation auslöst
        start: "bottom bottom", // Startpunkt der Animation
        toggleActions: "restart none none none", // Aktionen beim Scrollen
      },
      onComplete: () => {
        // Setzen des States, um das Video abzuspielen
        setVideo((prevVideo) => ({
          ...prevVideo,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);

  // Abspielen des Videos, wenn es bereit ist
  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause(); // Pausieren des Videos
      } else {
        startPlay && videoRef.current[videoId].play(); // Abspielen des Videos
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  // Funktion zum Speichern geladener Metadaten
  const handleLoadedMetaData = (i, e) => setLoadedData((prev) => [...prev, e]);

  // Animation des Fortschrittsbalkens
  useEffect(() => {
    let currentProgress = 0;
    const span = videoSpanRef.current;
    if (span[videoId]) {
      const anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100); // Berechnung des Fortschritts
          if (progress !== currentProgress) {
            currentProgress = progress;
            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? "10vw"
                  : window.innerWidth < 1024
                    ? "10vw"
                    : "4vw", // Anpassung der Breite basierend auf der Fenstergröße
            });
            gsap.to(span[videoId], {
              width: `${currentProgress}%`, // Anpassung der Breite des Fortschrittsbalkens
              backgroundColor: "white", // Farbe des Fortschrittsbalkens
            });
          }
        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px", // Anpassung der Breite nach Abschluss
            });
            gsap.to(span[videoId], {
              backgroundColor: "#afafaf", // Farbe des Fortschrittsbalkens nach Abschluss
            });
          }
        },
      });

      if (videoId === 0) {
        anim.restart(); // Neustart der Animation beim ersten Video
      }

      const animUpdate = () => {
        anim.progress(
          videoRef.current[videoId].currentTime /
            hightlightsSlides[videoId].videoDuration // Aktualisierung des Fortschritts basierend auf der aktuellen Zeit
        );
      };

      if (isPlaying) {
        gsap.ticker.add(animUpdate); // Hinzufügen des Updates zum GSAP-Ticker
      } else {
        gsap.ticker.remove(animUpdate); // Entfernen des Updates vom GSAP-Ticker
      }
    }
  }, [videoId, startPlay]);

  // Funktion zur Verarbeitung verschiedener Videoereignisse
  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end": // Wenn das Video endet
        setVideo((prevVideo) => ({
          ...prevVideo,
          isEnd: true,
          videoId: i + 1, // Wechsel zum nächsten Video
        }));
        break;
      case "video-last": // Wenn das letzte Video erreicht ist
        setVideo((prevVideo) => ({ ...prevVideo, isLastVideo: true }));
        break;
      case "video-reset": // Zurücksetzen zum ersten Video
        setVideo((prevVideo) => ({
          ...prevVideo,
          isLastVideo: false,
          videoId: 0,
        }));
        break;
      case "play": // Abspielen des Videos
      case "pause": // Pausieren des Videos
        setVideo((prevVideo) => ({
          ...prevVideo,
          isPlaying: !prevVideo.isPlaying, // Umschalten des Abspielstatus
        }));
        break;
      default:
        return video;
    }
  };

  // Render-Methode der Komponente
  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} id="slider" className="pr-10 sm:pr-20">
            <div className="video-carousel_container">
              <div className="flex-center flex size-full overflow-hidden rounded-3xl bg-black">
                <video
                  id="video"
                  playsInline={true}
                  preload="auto"
                  muted
                  className={`${list.id === 2 && "translate-x-44"} pointer-events-none`}
                  ref={(el) => (videoRef.current[i] = el)} // Zuweisung des Refs zum Video-Element
                  onEnded={() =>
                    i !== 3
                      ? handleProcess("video-end", i)
                      : handleProcess("video-last")
                  } // Behandlung des Videoendes
                  onPlay={() => {
                    setVideo((prevVideo) => ({
                      ...prevVideo,
                      isPlaying: true,
                    }));
                  }}
                  onLoadedMetadata={(e) => handleLoadedMetaData(i, e)} // Speichern der geladenen Metadaten
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>
              <div className="absolute left-[5%] top-12 z-10">
                {list.textLists.map((text) => (
                  <p key={text} className="text-xl font-medium  md:text-2xl">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex-center relative mt-10">
        <div className="flex-center rounded-full bg-gray-300 px-7 py-5 backdrop-blur">
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              ref={(el) => (videoDivRef.current[i] = el)}
              className="relative mx-2 size-3 cursor-pointer rounded-full bg-gray-200"
            >
              <span
                className="absolute size-full rounded-full"
                ref={(el) => (videoSpanRef.current[i] = el)}
              />
            </span>
          ))}
        </div>
        <button className="control-btn">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={
              isLastVideo
                ? () => handleProcess("video-reset")
                : !isPlaying
                  ? () => handleProcess("play")
                  : () => handleProcess("pause")
            }
          />
        </button>
      </div>
    </>
  );
};

// Exportieren der VideoCarousel-Komponente
export default VideoCarousel;
