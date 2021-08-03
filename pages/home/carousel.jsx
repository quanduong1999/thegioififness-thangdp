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
                <Image src="http://uupload.ir/files/vswh_img-1.jpg" />
              </li>
              <li>
                <Image src="http://uupload.ir/files/i97e_img-2.jpg" />
              </li>
              <li>
                <Image src="http://uupload.ir/files/0roy_img-3.jpg" />
              </li>
              <li>
                <Image src="http://uupload.ir/files/f52k_img-4.jpg" />
              </li>
            </ul>
          </div>
        </div>
      </header>
    </body>
  );
};

export default Carousel;
