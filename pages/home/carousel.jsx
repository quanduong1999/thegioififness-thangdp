import React from "react";
import { Image } from "react-bootstrap";

const Carousel = () => {
  return (
    <body>
      <header>
        <div className="slider">
          <div className="slider-img">
            <ul id="ul-parent">
              <li className="banner-li">
                <Image src="/adv2.jpg" className="banner-li-img" />
              </li>
              <li className="banner-li">
                <Image src="/adv3.jpg" className="banner-li-img" />
              </li>
              <li className="banner-li">
                <Image src="/adv4.jpg" className="banner-li-img" />
              </li>
              <li className="banner-li">
                <Image src="/adv5.jpg" className="banner-li-img" />
              </li>
            </ul>
          </div>
        </div>
      </header>
    </body>
  );
};

export default Carousel;
