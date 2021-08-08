import React from "react";
import { Image } from "react-bootstrap";

const Carousel = () => {
  return (
    <body>
      <header>
        <div className="slider">
          <div className="slider-img">
            <ul id="ul-parent">
              <li>
                <Image src="/adv2.jpg" />
              </li>
              <li>
                <Image src="/adv3.jpg" />
              </li>
              <li>
                <Image src="/adv4.jpg" />
              </li>
              <li>
                <Image src="/adv5.jpg" />
              </li>
            </ul>
          </div>
        </div>
      </header>
    </body>
  );
};

export default Carousel;
