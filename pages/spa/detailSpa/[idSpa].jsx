import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { Col, Row, Image, Button, Modal } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import { spaAPI } from "../../api/spa/spa";

const DetailSpa = () => {
  const Router = useRouter();
  const { idSpa } = Router.query;
  const [spa, setSpa] = useState([]);
  const [spaData, setSpaData] = useState([]);
  const [lgShowSpa, setLgShowSpa] = useState(false);
  const [gia, setGia] = useState();

  useEffect(() => {
    spaAPI
      .getSpaById(idSpa)
      .then((res) => {
        console.log(res);
        setSpa(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    spaAPI
      .getSpa()
      .then((res) => {
        console.log(res);
        setSpaData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="detailplace">
      <div className="about">
        <div className="about-infor">
          <div className="container">
            <Row>
              <Col sm={5}>
                <Image src={spa.image} className="about-img-infor"></Image>
                <div className="show-start">
                  <h2>Chất lượng</h2>
                  <StarRatings
                    rating={Number.parseInt(
                      //   getStar == null || getStar === NaN ? "5" : getStar
                      "5"
                    )}
                    starRatedColor="#FFD700"
                    numberOfStars={5}
                    name="rating"
                  />
                </div>
              </Col>
              <Col sm={7}>
                <h1>{spa.name}</h1>
                <p>{spa.diachi}</p>
                <p>{spa.thongtinthem}</p>
                <div className="feedback-start">
                  <h2>Đánh giá</h2>
                  <div id="rating">
                    <input
                      type="radio"
                      id="star5"
                      name="rating"
                      value="5"
                      //   onClick={handleStar}
                    />
                    <label
                      className="full"
                      htmlFor="star5"
                      title="Awesome - 5 stars"
                    ></label>

                    <input
                      type="radio"
                      id="star4"
                      name="rating"
                      value="4"
                      //   onClick={handleStar}
                    />
                    <label
                      className="full"
                      htmlFor="star4"
                      title="Pretty good - 4 stars"
                    ></label>

                    <input
                      type="radio"
                      id="star3"
                      name="rating"
                      value="3"
                      //   onClick={handleStar}
                    />
                    <label
                      className="full"
                      htmlFor="star3"
                      title="Meh - 3 stars"
                    ></label>

                    <input
                      type="radio"
                      id="star2"
                      name="rating"
                      value="2"
                      //   onClick={handleStar}
                    />
                    <label
                      className="full"
                      htmlFor="star2"
                      title="Kinda bad - 2 stars"
                    ></label>

                    <input
                      type="radio"
                      id="star1"
                      name="rating"
                      value="1"
                      //   onClick={handleStar}
                    />
                    <label
                      className="full"
                      htmlFor="star1"
                      title="Sucks big time - 1 star"
                    ></label>
                    <div>
                      <Button variant="danger">Đánh giá</Button>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>

      {/* Dịch vụ */}
      <div className="course">
        <div id="cards_landscape_wrap-2">
          <div className="container">
            <h1>Danh sách các dịch vụ</h1>
            <div className="row">
              {spaData.map((spa) =>
                spa.dichvu.map((dichvu) => (
                  <div
                    key={dichvu.id}
                    className="col-xs-12 col-sm-6 col-md-3 col-lg-3 course-click"
                  >
                    {/* <a href=""> */}
                    <div className="card-flyer">
                      <div className="text-box">
                        <div className="image-box">
                          <Image src={dichvu.image} alt="" />
                        </div>
                        <div className="text-container">
                          <h6>{dichvu.tendichvu}</h6>
                          <p>{dichvu.noidung}</p>
                        </div>
                        <div className="text-container">
                          <h3>Giá</h3>
                          <h3>{dichvu.gia === null ? 0 : dichvu.gia}</h3>
                        </div>
                      </div>

                      <Button
                        onClick={() => {
                            setLgShowSpa(true);
                        //   setIdCourse(course.id);
                          setGia(dichvu.gia);
                        }}
                        className="buy"
                      >
                        Mua khóa học
                      </Button>

                      <Modal
                        size="lg"
                        show={lgShowSpa}
                        onHide={() => setLgShowSpa(false)}
                        aria-labelledby="example-modal-sizes-title-lg"
                      >
                        <Modal.Header closeButton>
                          <Modal.Title id="example-modal-sizes-title-lg">
                            Mua khóa học
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="model-buy-course">
                          <Button
                            variant="danger"
                            className="button-course"
                            //   onClick={buyCourse(idCourse, gia, sodutk)}
                          >
                            Mua khóa học
                          </Button>{" "}
                          <div className="buycourse-login"></div>
                        </Modal.Body>
                      </Modal>
                    </div>
                    {/* </a> */}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailSpa;
