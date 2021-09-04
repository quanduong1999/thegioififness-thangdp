import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  Col,
  Row,
  Image,
  Button,
  Modal,
  FormControl,
  InputGroup,
  Alert,
} from "react-bootstrap";
import StarRatings from "react-star-ratings";
import { spaAPI } from "../../api/spa/spa";
import Cookies from "js-cookie";
import { SettingsRemoteSharp } from "@material-ui/icons";
import { profilesAPI } from "../../api/profiles/profiles";

const DetailSpa = () => {
  const Router = useRouter();
  const { idSpa } = Router.query;
  const [spa, setSpa] = useState([]);
  const [spaData, setSpaData] = useState([]);
  const [lgShowSpa, setLgShowSpa] = useState(false);
  const [gia, setGia] = useState();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const initPrivateSpa = { name: "", phone: "", timestart: "", timestop: "" };
  const [dataPrivateSpa, setDataPRivateSpa] = useState(initPrivateSpa);
  const { name, phone, timestart, timestop } = dataPrivateSpa;
  const initFeedback = { content: "" };
  const [dataFeedback, setDataFeedback] = useState(initFeedback);
  const { content } = dataFeedback;
  const token = Cookies.get("token");
  const [star, setStar] = useState("");
  const [idCourse, setIdCourse] = useState("");
  const [sodutk, setSoDuTK] = useState("");

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
        // console.log(res);
        setSpaData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChangePrivateSpa = (e) => {
    const { name, value } = e.target;
    setDataPRivateSpa({ ...dataPrivateSpa, [name]: value });
  };

  const handleClickPrivateSpa = (e) => {
    e.preventDefault();
    const body = {
      ten: name,
      sdt: phone,
      timestart: timestart,
      timestop: timestop,
      spaid: idSpa,
    };
    spaAPI
      .createPrivateSpa(body)
      .then((res) => {
        setShow(true);
        setMessage("Bạn đặt lịch thành công");
      })
      .catch((err) => {
        console.log(err);
        setShow(true);
        setMessage("Đặt lịch không thành công");
      });
  };

  const onChangeContent = (e) => {
    const { name, value } = e.target;
    setDataFeedback({ ...dataFeedback, [name]: value });
  };

  const submitFeedback = (e) => {
    e.preventDefault();
    if (token) {
      const body = {
        spa: idSpa,
        content: content,
      };
      spaAPI
        .createFeedbackSpa(body)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          setShow(true);
          setMessage("Tạo feedback không thành công");
        });
    } else {
      setShow(true);
      setMessage("Bạn cần đăng nhập");
      Router.push("/login");
    }
  };

  const handleStar = (e) => {
    setStar(e.target.value);
  };

  const handleSubmitStar = (e) => {
    e.preventDefault();
    if (token) {
      const body = {
        spa: idSpa,
        star: star,
      };
      spaAPI
        .createFeedbackStarSpa(body)
        .then((res) => {
          setShow(true);
          setMessage("Đánh giá thành công");
        })
        .catch((err) => {
          console.log(err);
          setShow(true);
          setMessage("Đánh giá không thành công");
        });
    } else {
      setShow(true);
      setMessage("Đăng nhập để đánh giá");
      Router.push("/login");
    }
  };

  useEffect(() => {
    if (token) {
      profilesAPI.getProfiles().then((res) => {
        console.log(res.data.xu);
        setSoDuTK(res.data.xu);
      });
    }
  }, []);

  const buyCourse = (idCourse, gia, sodutk) => (e) => {
    // console.log(idCourse, gia, sodutk);
    if (token) {
      if (Number.parseInt(sodutk) >= Number.parseInt(gia)) {
        const body = {
          spa: idCourse,
        };
        spaAPI
          .buySpa(body)
          .then((res) => {
            setShow(true);
            setMessage("Mua thành công, Check mail");
          })
          .catch((err) => {
            console.log(err);
            setShow(true);
            setMessage("Mua không thành công");
          });
      } else {
        setShow(true);
        setMessage("Số dư tài khoản không đủ");
      }
    } else {
      setShow(true);
      setMessage("Đăng nhập để mua khóa");
      Router.push("/login");
    }
  };

  return (
    <div className="detailplace">
      <div className="about">
        <div className="about-infor">
          <div className="container">
            <Row className="about_spa_feedbackstar">
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
                      <Button variant="danger" onClick={handleSubmitStar}>
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
                          setIdCourse(dichvu.id);
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
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Private Schedule */}
      <div
        className="container private-schedule"
        style={{ textAlign: "center" }}
      >
        <h1>Lịch hẹn theo gian của bạn</h1>
        <h4>Họ và Tên</h4> <br />
        <InputGroup className="mb-3">
          <FormControl
            placeholder="phone"
            aria-label="Username"
            aria-describedby="basic-addon1"
            name="name"
            onChange={handleChangePrivateSpa}
          />
        </InputGroup>
        <h4>Số điện thoại</h4> <br />
        <InputGroup className="mb-3">
          <FormControl
            placeholder="phone"
            aria-label="Username"
            aria-describedby="basic-addon1"
            name="phone"
            onChange={handleChangePrivateSpa}
          />
        </InputGroup>
        <h4>Thời gian bắt đầu</h4> <br />
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Thời gian bắt đầu"
            aria-label="Username"
            aria-describedby="basic-addon1"
            name="timestart"
            onChange={handleChangePrivateSpa}
          />
        </InputGroup>
        <h4>Thời gian kết thúc</h4> <br />
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Thời gian kết thúc"
            aria-label="Username"
            aria-describedby="basic-addon1"
            name="timestop"
            onChange={handleChangePrivateSpa}
          />
        </InputGroup>
        <Button
          variant="danger"
          style={{ marginBottom: "30px" }}
          onClick={handleClickPrivateSpa}
        >
          Submit
        </Button>
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
              onClick={submitFeedback}
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
                  {spaData.map((feedbacks) =>
                    feedbacks.listFeedback.map((feedback) => (
                      <li key={feedback.id} className="box_result row">
                        <div className="avatar_comment col-md-1">
                          <Image
                            src="https://static.xx.fbcdn.net/rsrc.php/v1/yi/r/odA9sNLrE86.jpg"
                            alt="avatar"
                          />
                        </div>
                        <div className="result_comment col-md-11">
                          <h4></h4>
                          <p>{feedback.content}</p>
                          <div className="tools_comment">
                            <a className="like" href="#">
                              Like
                            </a>
                            <span aria-hidden="true"> · </span>
                            <a className="replay" href="#">
                              Reply
                            </a>
                            {/* <span aria-hidden="true"> · </span>
                            <i className="fa fa-thumbs-o-up"></i>{" "}
                            <span className="count">1</span>
                            <span aria-hidden="true"> · </span>
                            <span>26m</span> */}
                          </div>
                        </div>
                      </li>
                    ))
                  )}
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

export default DetailSpa;
