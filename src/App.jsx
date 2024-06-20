import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Model from "./components/Model";
import Highlights from "./components/Highlights";

import * as Sentry from "@sentry/react";

const App = () => {
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Highlights />
      <Model />
    </main>
  );
};

export default Sentry.withProfiler(App);
