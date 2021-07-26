import React from "react";
import Carousel from "./carousel"
import Course from "./course";
import Pt from "./pt";

function Home() {
  return (
    <div className="home">
      <Carousel />
      <Course />
      <Pt />
    </div>
  );
}

export default Home;
