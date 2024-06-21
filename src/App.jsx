import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
// import Model from "./components/Model";
// Lazy Loading der Modellkomponente
const Model = React.lazy(() => import("./components/Model"));
import Highlights from "./components/Highlights";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";

import * as Sentry from "@sentry/react";

// Vorladen der Modellkomponente, sobald die App geladen wird
preloadModelComponent();

const App = () => {
  // Das ist der fehlerhafte Code, um Sentry zu testen:
  //   return <button onClick={() => methodDoesNotExist()}>Break the world</button>;

  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Highlights />
      <Model />
      <Features />
      <HowItWorks />
      <Footer />
    </main>
  );
};

// Funktion zum Vorladen der Modellkomponente
function preloadModelComponent() {
  import("./components/Model");
}

export default Sentry.withProfiler(App);
