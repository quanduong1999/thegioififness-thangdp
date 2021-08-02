import React from "react";
import Carousel from "./carousel"
import Course from "./course";
import Place from "./place";

function Home() {
  return (
    <div className="home">
      <Carousel />
      <Course />
      <Place />
    </div>
  );
}

export default Home;
