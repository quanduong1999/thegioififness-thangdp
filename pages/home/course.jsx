import React from "react";
import { Row, Col } from "react-bootstrap";
import { Image } from "react-bootstrap";

const Course = () => {
  return (
    <div className="course">
      <div id="cards_landscape_wrap-2">
        <div className="container">
          <h1>Danh sách các khóa tập</h1>
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
              <a href="">
                <div className="card-flyer">
                  <div className="text-box">
                    <div className="image-box">
                      <Image
                        src="https://cdn.pixabay.com/photo/2018/03/30/15/11/deer-3275594_960_720.jpg"
                        alt=""
                      />
                    </div>
                    <div className="text-container">
                      <h6>Title 01</h6>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the industry
                        is standard dummy text ever since the 1500s.
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
              <a href="">
                <div className="card-flyer">
                  <div className="text-box">
                    <div className="image-box">
                      <Image
                        src="https://cdn.pixabay.com/photo/2018/03/30/15/11/deer-3275594_960_720.jpg"
                        alt=""
                      />
                    </div>
                    <div className="text-container">
                      <h6>Title 01</h6>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the industry
                        is standard dummy text ever since the 1500s.
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
              <a href="">
                <div className="card-flyer">
                  <div className="text-box">
                    <div className="image-box">
                      <Image
                        src="https://cdn.pixabay.com/photo/2018/03/30/15/11/deer-3275594_960_720.jpg"
                        alt=""
                      />
                    </div>
                    <div className="text-container">
                      <h6>Title 01</h6>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the industry
                        is standard dummy text ever since the 1500s.
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
              <a href="">
                <div className="card-flyer">
                  <div className="text-box">
                    <div className="image-box">
                      <Image
                        src="https://cdn.pixabay.com/photo/2018/03/30/15/11/deer-3275594_960_720.jpg"
                        alt=""
                      />
                    </div>
                    <div className="text-container">
                      <h6>Title 01</h6>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the industry
                        is standard dummy text ever since the 1500s.
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
