import React, { useEffect } from "react";
import { useState } from "react";
import { Alert, Button, Image, Modal } from "react-bootstrap";
import { placeAPI } from "../api/place/place";

const CourseOnline = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [placeData, setPlaceData] = useState([]);
  const [lgShow, setLgShow] = useState(false);
  const [gia, setGia] = useState();

  useEffect(() => {
    placeAPI
      .getAllPlace()
      .then((res) => {
        console.log(res);
        setPlaceData(res.data);
      })
      .catch((err) => console.log(err));
  });

  return (
    <div className="course">
      <div id="cards_landscape_wrap-2">
        <div className="container">
          <h1>Danh sách các khóa tập online</h1>
          <div className="row">
            {placeData.map((place) =>
              place.onlineList.map((onlineList) => (
                <div
                  key={onlineList.id}
                  className="col-xs-12 col-sm-6 col-md-3 col-lg-3 course-click"
                >
                  {/* <a href=""> */}
                  <div className="card-flyer">
                    <div className="text-box">
                      <div className="image-box">
                        <Image src={onlineList.image} alt="" />
                      </div>
                      <div className="text-container">
                        <h6>{onlineList.tenkhoahoc}</h6>
                        <p>{onlineList.thongtinthem}</p>
                      </div>
                      <div className="text-container">
                        <h3>Giá</h3>
                        <h3>{onlineList.gia}</h3>
                      </div>
                    </div>

                    <Button
                      onClick={() => {
                        setLgShow(true);
                        //   setIdCourse(course.id);
                        setGia(onlineList.gia);
                      }}
                      className="buy"
                    >
                      Mua khóa học
                    </Button>

                    <Modal
                      size="lg"
                      show={lgShow}
                      onHide={() => setLgShow(false)}
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
                          // onClick={buyCourse(idCourse, gia, sodutk)}
                        >
                          Mua khóa học
                        </Button>{" "}
                        <div className="buycourse-login">
                          {show ? (
                            <Alert
                              variant="danger"
                              className="alert-noti"
                              onClose={() => setShow(false)}
                              dismissible
                            >
                              <Alert.Heading>{message}</Alert.Heading>
                            </Alert>
                          ) : (
                            ""
                          )}
                        </div>
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
  );
};

export default CourseOnline;
