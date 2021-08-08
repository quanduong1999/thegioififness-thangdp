import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Row, Col, Modal, InputGroup, FormControl } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { courseAPI } from "../api/course/course";
import { Button } from "react-bootstrap";
import Cookies from "js-cookie";
import { useRouter } from "next/dist/client/router";
import { profilesAPI } from "../api/profiles/profiles";

const Course = () => {
  const [courseData, setCourseData] = useState([]);
  const [lgShow, setLgShow] = useState(false);
  const [idCourse, setIdCourse] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [gia, setGia] = useState();
  const initCourse = { amount: 0 };
  const [amountData, setAmountData] = useState(initCourse);
  const { amount } = amountData;
  const token = Cookies.get("token");
  const Router = useRouter();
  const [sodutk, setSoDuTk] = useState();
  useEffect(() => {
    courseAPI
      .getAllCourse()
      .then((res) => {
        // console.log(res.data);
        setCourseData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (token) {
      profilesAPI.getProfiles().then((res) => {
        setSoDuTk(res.data.xu);
      });
    }
  }, []);

  const buyCourse = (idCourse, gia, sodutk) => (e) => {
    // console.log(idCourse)
    const body = {
      course: idCourse,
    };
    console.log(body);
    if (!token) {
      setMessage("Hãy đăng nhập để mua khóa học");
    } else {
      if (sodutk < gia) {
        setMessage("Bạn cần nạp thêm tiền");
      } else {
        courseAPI
          .buyCourse(body)
          .then((res) => {
            // console.log(res.data.url);
            // Router.push(res.data.url);
            setSuccess("Tạo khóa học thành công, Check mã ở gmail");
            setMessage("Tạo khóa học thành công, Check mã ở gmail");
          })
          .catch((err) => {
            console.log(err);
            setMessage("Tạo khóa học không thành công");
          });
      }
    }
  };

  return (
    <div className="course">
      <div id="cards_landscape_wrap-2">
        <div className="container">
          <h1>Danh sách các khóa tập</h1>
          <div className="row">
            {courseData.map((course) => (
              <div
                key={course.id}
                className="col-xs-12 col-sm-6 col-md-3 col-lg-3 course-click"
              >
                {/* <a href=""> */}
                <div className="card-flyer">
                  <div className="text-box">
                    <div className="image-box">
                      <Image src={course.image} alt="" />
                    </div>
                    <div className="text-container">
                      <h6>{course.tenkhoahoc}</h6>
                      <p>{course.thongtinthem}</p>
                    </div>
                    <div className="text-container">
                      <h3>Giá</h3>
                      <h3>{course.gia}</h3>
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      setLgShow(true);
                      setIdCourse(course.id);
                      setGia(course.gia);
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
                        onClick={buyCourse(idCourse, gia, sodutk)}
                      >
                        Mua khóa học
                      </Button>{" "}
                      <div className="buycourse-login">
                        <p>{message}</p>
                        {/* <p>{success}</p> */}
                      </div>
                    </Modal.Body>
                  </Modal>
                </div>
                {/* </a> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
