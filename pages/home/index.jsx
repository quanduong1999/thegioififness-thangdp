import React from "react";
import Carousel from "./carousel"
import Course from "./course";
import ListSchedule from "./listSchedule";
import Place from "./place";

function Home() {
  return (
    <div className="home">
      <Carousel />
      <Course />
      <Place />
      <ListSchedule />
    </div>
  );
}

export default Home;
