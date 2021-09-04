import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Col,
  Row,
  Image,
  Modal,
  Button,
  InputGroup,
  FormControl,
  Alert,
} from "react-bootstrap";
import { detailPlaceAPI } from "../../api/detailplace/detailplace";
import Cookies from "js-cookie";
import { profilesAPI } from "../../api/profiles/profiles";
import { courseAPI } from "../../api/course/course";
import { scheduleAPI } from "../../api/schedule/schedule";
import { feedbackAPI } from "../../api/feedback/feedback";
import { placeAPI } from "../../api/place/place";
import StarRatings from "react-star-ratings";

const DetailPlace = () => {
  const Router = useRouter();
  const { idPlace } = Router.query;
  const [courseData, setCourseData] = useState([]);
  const [place, setPlace] = useState({});
  const [lgShow, setLgShow] = useState(false);
  const [lgShowCourse, setLgShowCourse] = useState(false);
  const [show, setShow] = useState(false);
  const [idCourse, setIdCourse] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [gia, setGia] = useState();
  const initCourse = { amount: 0 };
  const [amountData, setAmountData] = useState(initCourse);
  const { amount } = amountData;
  const token = Cookies.get("token");
  const initContent = { content: "" };
  const [contentData, setContentData] = useState(initContent);
  const { content } = contentData;
  const [changeFeedBack, setChangeFeedBack] = useState("");
  const [feedBackData, setFeedBackData] = useState([]);
  const [submitStars, setSubmitStars] = useState([]);

  const [scheduleData, setScheduleData] = useState([]);
  const [idschedule, setIdSchedule] = useState([]);
  const [star, setStar] = useState();
  const [getStar, setGetStar] = useState();
  const initPrivateSchedule = {phone: "", timeStart: "", timeEnd: ""}
  const [privateScheduleData, setPrivateScheduleData] = useState(initPrivateSchedule);
  const {phone, timeStart, timeEnd} = privateScheduleData;

  const [sodutk, setSoDuTk] = useState(0);

  useEffect(() => {
    if (token) {
      profilesAPI.getProfiles().then((res) => {
        setSoDuTk(res.data.xu);
      });
    } else {
    }
  }, []);

  const buyCourse = (idCourse, gia, sodutk) => (e) => {
    // console.log(idCourse)
    const body = {
      course: idCourse,
    };
    // console.log(body);
    if (!token) {
      setShow(true);
      setMessage("Hãy đăng nhập để mua khóa học");
    } else {
      if (Number.parseInt(sodutk) < Number.parseInt(gia)) {
        setShow(true);
        setMessage("Bạn cần nạp thêm tiền");
      } else {
        courseAPI
          .buyCourse(body)
          .then((res) => {
            // console.log(res);
            // Router.push(res.data.url);
            setShow(true);
            setMessage("Tạo khóa học thành công");
          })
          .catch((err) => {
            console.log(err);
            setShow(true);
            setMessage("Tạo khóa học không thành công");
          });
      }
    }
  };

  useEffect(() => {
    detailPlaceAPI
      .getCourseByPlace(idPlace)
      .then((res) => {
        console.log(res.data);
        setCourseData(res.data);
        // setPlace(res.data[0].place);
      })
      .catch((err) => {
        console.log(err)
        setCourseData([]);
      });
  }, [idPlace]);

  useEffect(() => {
    detailPlaceAPI
      .getScheduleByPlace(idPlace)
      .then((res) => {
        console.log(res.data);
        setScheduleData(res.data);
      })
      .catch((err) => {
        console.log(err)
        setScheduleData([]);
      });
  }, [idPlace]);

  const buySchedule = (idschedule, gia, sodutk) => (e) => {
    e.preventDefault();
    const body = {
      schedule: idschedule,
    };
    // console.log(body);
    if (!token) {
      setShow(true);
      setMessage("Hãy đăng nhập để mua khóa học");
    } else {
      if (Number.parseInt(sodutk) < Number.parseInt(gia)) {
        setShow(true);
        setMessage("Bạn cần nạp thêm tiền");
      } else {
        scheduleAPI
          .buyScheduleAPI(body)
          .then((res) => {
            setShow(true);
            setMessage("Tạo khóa học thành công");
          })
          .catch((err) => {
            // console.log(err);
            setShow(true);
            setMessage("Tạo khóa học không thành công");
          });
      }
    }
  };

  const onChangeContent = (e) => {
    const { name, value } = e.target;
    setContentData({ ...contentData, [name]: value });
  };

  const submitFeedback = (id) => (e) => {
    e.preventDefault();
    const body = {
      place: id,
      content: content,
    };
    if (token) {
      feedbackAPI
        .createFeedback(body)
        .then((res) => {
          // console.log(res);
          setChangeFeedBack(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      setShow(true);
      setMessage("Bạn cần đăng nhập");
    }
  };

  useEffect(() => {
    feedbackAPI
      .getFeedBackId(idPlace)
      .then((res) => {
        // console.log(res);
        setFeedBackData(res.data);
      })
      .catch((err) => console.log(err));
  }, [idPlace, changeFeedBack]);

  const handleStar = (e) => {
    // console.log(e.target.value);
    setStar(e.target.value);
  };

  const submitStar = (id) => (e) => {
    // console.log(id);
    if (token) {
      const body = {
        place: id,
        star: star,
      };
      // console.log(body);
      feedbackAPI
        .createFeedBackStar(body)
        .then((res) => {
          // console.log(res);
          setSubmitStars(res.data);
          setShow(true);
          setMessage("Đánh giá thành công");
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    placeAPI
      .getPlaceById(idPlace)
      .then((res) => {
        console.log(res);
        setPlace(res.data[0]);
        setGetStar(res.data[0].star);
      })
      .catch((err) => console.log(err));
  }, [idPlace]);

  useEffect(() => {
    placeAPI
      .getPlaceById(idPlace)
      .then((res) => {
        // console.log(res.data[0].star);
        setGetStar(res.data[0].star);
      })
      .catch((err) => console.log(err));
  }, [idPlace, submitStars]);

  const handleChangePrivateSchedule = (e) => {
    const {name, value} = e.target
    setPrivateScheduleData({...privateScheduleData, [name]: value});
  }

  const handleSubmitPrivateSchedule = (e) => {
    e.preventDefault();
    const body = {
      sdt: phone,
      placeid: idPlace,
      timestart: timeStart,
      timestop: timeEnd
    }
    scheduleAPI.privateSchedule(body)
      .then(res=>{
        // console.log(res)
        setShow(true)
        setMessage("Tạo lịch thành công")
      })
      .catch(err=>{
        console.log(err)
        setShow(true)
        setMessage("Tạo lịch không thành công")
      })
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
                <div className="show-start">
                  <h2>Chất lượng</h2>
                  <StarRatings
                    rating={Number.parseInt(getStar == null || getStar === NaN ? "5" : getStar)}
                    starRatedColor="#FFD700"
                    numberOfStars={5}
                    name="rating"
                  />
                </div>
              </Col>
              <Col sm={7}>
                <h1>{place.name}</h1>
                <p>{place.diachi}</p>
                <p>{place.thongtinthem}</p>
                <div className="feedback-start">
                  <h2>Đánh giá</h2>
                  <div id="rating">
                    <input
                      type="radio"
                      id="star5"
                      name="rating"
                      value="5"
                      onClick={handleStar}
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
                      onClick={handleStar}
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
                      onClick={handleStar}
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
                      onClick={handleStar}
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
                      onClick={handleStar}
                    />
                    <label
                      className="full"
                      htmlFor="star1"
                      title="Sucks big time - 1 star"
                    ></label>
                    <div>
                      <Button variant="danger" onClick={submitStar(place.id)}>
                        Đánh giá
                      </Button>
                    </div>
                  </div>
                </div>
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
                        setLgShowCourse(true);
                        setIdCourse(course.id);
                        setGia(course.gia);
                      }}
                      className="buy"
                    >
                      Mua khóa học
                    </Button>

                    <Modal
                      size="lg"
                      show={lgShowCourse}
                      onHide={() => setLgShowCourse(false)}
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
                        <div className="buycourse-login"></div>
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
                        <p>{schedule.thongtinthem}</p>
                        <p>Start: {schedule.thoigianbatdau}</p>
                        <p>End: {schedule.thoigianketthuc}</p>
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

      {/* Private Schedule */}
      <div className="container private-schedule" style={{textAlign: "center"}}>
        <h1>Lịch hẹn theo gian của bạn</h1>
        <h4>Số điện thoại</h4> <br />
        <InputGroup className="mb-3">
          <FormControl
            placeholder="phone"
            aria-label="Username"
            aria-describedby="basic-addon1"
            name="phone"
            onChange={handleChangePrivateSchedule}
          />
        </InputGroup>
        <h4>Thời gian bắt đầu</h4> <br />
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Thời gian bắt đầu"
            aria-label="Username"
            aria-describedby="basic-addon1"
            name="timestart"
            onChange={handleChangePrivateSchedule}
          />
        </InputGroup>
        <h4>Thời gian kết thúc</h4> <br />
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Thời gian kết thúc"
            aria-label="Username"
            aria-describedby="basic-addon1"
            name="timeEnd"
            onChange={handleChangePrivateSchedule}
          />
        </InputGroup>
        <Button variant="danger" style={{marginBottom: "30px",}} onClick={handleSubmitPrivateSchedule}>Submit</Button>
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
            <Button
              variant="outline-secondary"
              id="button-addon2"
              onClick={submitFeedback(idPlace)}
            >
              Submit
            </Button>
          </InputGroup>
        </div>
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
        <div className="feedback-getcontent container">
          <div className="container">
            <div className="col-md-12" id="fbcomment">
              <div className="row">
                <ul id="list_comment" className="col-md-12">
                  {feedBackData.map((feedback) => (
                    <li key={feedback.id} className="box_result row">
                      <div className="avatar_comment col-md-1">
                        <Image
                          src="https://static.xx.fbcdn.net/rsrc.php/v1/yi/r/odA9sNLrE86.jpg"
                          alt="avatar"
                        />
                      </div>
                      <div className="result_comment col-md-11">
                        <h4>{feedback.customer.name}</h4>
                        <p>{feedback.content}</p>
                        <div className="tools_comment">
                          <a className="like" href="#">
                            Like
                          </a>
                          <span aria-hidden="true"> · </span>
                          <a className="replay" href="#">
                            Reply
                          </a>
                          <span aria-hidden="true"> · </span>
                          <i className="fa fa-thumbs-o-up"></i>{" "}
                          <span className="count">1</span>
                          <span aria-hidden="true"> · </span>
                          <span>26m</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                {/* <button className="show_more" type="button">
                  Load 10 more comments
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPlace;
