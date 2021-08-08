import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Row, Image, Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import { detailPlaceAPI } from "../../api/detailplace/detailplace";
import Cookies from "js-cookie";
import { profilesAPI } from "../../api/profiles/profiles";
import { courseAPI } from "../../api/course/course";
import { scheduleAPI } from "../../api/schedule/schedule";
import { feedbackAPI } from "../../api/feedback/feedback";

const DetailPlace = () => {
  const Router = useRouter();
  const { idPlace } = Router.query;
  const [courseData, setCourseData] = useState([]);
  const [place, setPlace] = useState({});
  const [lgShow, setLgShow] = useState(false);
  const [idCourse, setIdCourse] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [gia, setGia] = useState();
  const initCourse = { amount: 0 };
  const [amountData, setAmountData] = useState(initCourse);
  const { amount } = amountData;
  const token = Cookies.get("token");
  const initContent = {content:""}
  const [contentData, setContentData] = useState(initContent);
  const {content} = contentData

  const [scheduleData, setScheduleData] = useState([]);
  const [idschedule, setIdSchedule] = useState("");

  const [sodutk, setSoDuTk] = useState(0);

  useEffect(() => {
    if (token) {
      profilesAPI.getProfiles().then((res) => {
        setSoDuTk(res.data.xu);
      });
    }else{

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
            setMessage("Tạo khóa học thành công");
          })
          .catch((err) => {
            console.log(err);
            setMessage("Tạo khóa học không thành công");
          });
      }
    }
  };

  useEffect(() => {
    detailPlaceAPI
      .getCourseByPlace(idPlace)
      .then((res) => {
        // console.log(res.data);
        setCourseData(res.data);
        setPlace(res.data[0].place);
      })
      .catch((err) => console.log(err));
  },[]);

  useEffect(() => {
    detailPlaceAPI
      .getScheduleByPlace(idPlace)
      .then((res) => {
        console.log(res);
        setScheduleData(res.data);
      })
      .catch((err) => console.log(err));
  },[]);

  const buySchedule = (idschedule, gia, sodutk) => (e) => {
    e.preventDefault();
    const body = {
      schedule: idschedule,
    };
    console.log(body);
    if (!token) {
      setMessage("Hãy đăng nhập để mua khóa học");
    } else {
      if (sodutk < gia) {
        setMessage("Bạn cần nạp thêm tiền");
      } else {
        scheduleAPI
          .buyScheduleAPI(body)
          .then((res) => {
            setMessage("Tạo khóa học thành công");
          })
          .catch((err) => {
            console.log(err);
            setMessage("Tạo khóa học không thành công");
          });
      }
    }
  };

  const onChangeContent = (e) => {
    const {name, value} = e.target
    setContentData({...contentData,[name]:value})
  }

  const submitFeedback = id => e => {
    e.preventDefault();
    const body = {
      place: id,
      content: content
    }
    if(token){
      feedbackAPI.createFeedback(body)
      .then(res=>{
        console.log(res)
      })
      .catch(err=>console.log(err))
    }else{
      setMessage("Bạn cần đăng nhập")
    }
  } 

  return (
    <div className="detailplace">
      {/* about */}
      <div className="about">
        <div className="about-infor">
          <div className="container">
            <Row>
              <Col sm={5}>
                <Image src={place.image} className="about-img-infor"></Image>
              </Col>
              <Col sm={7}>
                <h1>{place.name}</h1>
                <p>{place.diachi}</p>
                <p>{place.thongtinthem}</p>
              </Col>
            </Row>
          </div>
        </div>
      </div>

      {/* course */}
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
                        <h3>{course.gia === null ? 0 : course.gia}</h3>
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

      {/* Schedule */}
      <div className="course">
        <div id="cards_landscape_wrap-2">
          <div className="container">
            <h1>Danh sách Lịch hẹn </h1>
            <div className="row">
              {scheduleData.map((schedule) => (
                <div
                  key={schedule.id}
                  className="col-xs-12 col-sm-6 col-md-3 col-lg-3"
                >
                  {/* <a href=""> */}
                  <div className="card-flyer">
                    <div className="text-box">
                      <div className="image-box">
                        <Image src={schedule.image} alt="" />
                      </div>
                      <div className="text-container">
                        <h6>{schedule.name}</h6>
                        <p>{schedule.pt}</p>
                      </div>
                      <div className="text-container">
                        <h3>Giá</h3>
                        <h3>{schedule.gia === null ? 0 : schedule.gia}</h3>
                      </div>
                    </div>

                    <Button
                      onClick={() => {
                        setLgShow(true);
                        setIdSchedule(schedule.id);
                        setGia(schedule.gia);
                      }}
                      className="buy"
                    >
                      Mua Lịch Tập
                    </Button>

                    <Modal
                      size="lg"
                      show={lgShow}
                      onHide={() => setLgShow(false)}
                      aria-labelledby="example-modal-sizes-title-lg"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                          Mua Lịch Tập
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body className="model-buy-schedule">
                        <Button
                          variant="danger"
                          className="button-schedule"
                          onClick={buySchedule(idschedule, gia, sodutk)}
                        >
                          Mua Lịch Tập
                        </Button>{" "}
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

      {/* feedback */}
      <div className="feedback">
        <div className="feedback-content container">
          <InputGroup className="mb-3 ">
            <FormControl
              placeholder="Nhập nội dung feedback"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              name="content"
              onChange={onChangeContent}
            />
            <Button variant="outline-secondary" id="button-addon2" onClick={submitFeedback(idPlace)}>
              Submit
            </Button>
          </InputGroup>
        </div>
        <div className="feedback-getcontent container">
              {message}
        </div>
      </div>
    </div>
  );
};

export default DetailPlace;
