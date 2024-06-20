import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Model from "./components/Model";
import Highlights from "./components/Highlights";

import * as Sentry from "@sentry/react";

const App = () => {
  // Das ist der fehlerhafte Code, um Sentry zu testen:
  //   return <button onClick={() => methodDoesNotExist()}>Break the world</button>;

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
