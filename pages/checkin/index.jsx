import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { placeAPI } from "../api/place/place";
import {
  Button,
  Image,
  Modal,
  FormControl,
  InputGroup,
  Alert,
} from "react-bootstrap";
import { checkInAPI } from "../api/checkin/checkin";
import { scheduleAPI } from "../api/schedule/schedule";
import Cookies from "js-cookie";
import withAuth from "../HOC/withAuth";
import { courseAPI } from "../api/course/course";
import { courseOnlineAPI } from "../api/courseOnline/courseOnline";
import { spaAPI } from "../api/spa/spa";
import { sportAPI } from "../api/sport/sport";
import Content from "../../components/ReaMore";

const CheckIn = () => {
  const Router = useRouter();
  const initCheckIn = { password: "", codeCheck: "" };
  const [checkInData, setCheckInData] = useState(initCheckIn);
  const { password, codeCheck } = checkInData;
  const [message, setMessage] = useState("");
  const [courseData, setCourseData] = useState([]);
  const [scheduleData, setScheduleData] = useState([]);
  const [lgShow, setLgShow] = useState(false);
  const [lgShow1, setLgShow1] = useState(false);
  const [lgShow5, setLgShow5] = useState(false);
  const [lgShow3, setLgShow3] = useState(false);
  const [lgShow4, setLgShow4] = useState(false);
  const token = Cookies.get("token");
  const [show, setShow] = useState(false);
  const [courseOnline, setCourseOnline] = useState([]);
  const [spaData, setSpaData] = useState([]);
  const [sportData, setSportData] = useState([]);
  const [idCourse, setIdCourse] = useState("");

  useEffect(() => {
    if (token) {
      scheduleAPI
        .getScheduleBuy()
        .then((res) => {
          console.log(res.data);
          setScheduleData(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    if (token) {
      courseAPI
        .getCourseBuy()
        .then((res) => {
          // console.log(res.data)
          setCourseData(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const handleChangeCheckIn = (e) => {
    const { name, value } = e.target;
    setCheckInData({ ...checkInData, [name]: value });
  };

  const checkIn = (id) => (e) => {
    e.preventDefault();

    if (codeCheck == "1234") {
      const body = {
        password: password,
      };

      checkInAPI
        .checkIn(id, body)
        .then((res) => {
          console.log(res);
          setShow(true);
          setMessage("Check In Thành Công");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          setShow(true);
          setMessage("Bạn nhập password không đúng");
        });
    } else {
      setShow(true);
      setMessage("mã check in của bạn sai");
    }
  };

  const checkInCourse = (e) => {
    e.preventDefault();

    if (codeCheck == "1234") {
      const body = {
        password: password,
      };

      checkInAPI
        .checkIn(idCourse, body)
        .then((res) => {
          console.log(res);
          setShow(true);
          setMessage("Check In Thành Công");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          setShow(true);
          setMessage("Bạn nhập password không đúng");
        });
    } else {
      setShow(true);
      setMessage("mã check in của bạn sai");
    }
  };

  useEffect(() => {
    courseOnlineAPI
      .getBuyOnline()
      .then((res) => {
        setCourseOnline(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const checkInOnline = (id) => (e) => {
    e.preventDefault();
    if (codeCheck == "1234") {
      const body = {
        password: password,
      };
      checkInAPI
        .checkInOnline(id, body)
        .then((res) => {
          console.log(res);
          setShow(true);
          if (res.data.message == "Sai Mk") {
            setMessage("Sai Mật Khẩu");
          } else {
            setMessage("Check In Thành Công");
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
          setShow(true);
          setMessage("Bạn nhập password không đúng");
        });
    } else {
      setShow(true);
      setMessage("Mã Check In của bạn sai");
    }
  };

  useEffect(() => {
    spaAPI
      .getBuySpa()
      .then((res) => {
        setSpaData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const checkInSpa = (id) => (e) => {
    e.preventDefault();
    if (codeCheck == "1234") {
      const body = {
        password: password,
      };
      checkInAPI
        .checkInSpa(id, body)
        .then((res) => {
          console.log(res);
          setShow(true);
          if (res.data.message == "Sai Mk") {
            setMessage("Sai Mật Khẩu");
          } else {
            setMessage("Check In Thành Công");
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
          setShow(true);
          setMessage("Bạn nhập password không đúng");
        });
    } else {
      setShow(true);
      setMessage("Mã Check In của bạn sai");
    }
  };

  useEffect(() => {
    sportAPI
      .getBuySport()
      .then((res) => {
        console.log(res);
        setSportData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const checkInSport = (id) => (e) => {
    e.preventDefault();
    if (codeCheck == "1234") {
      const body = {
        password: password,
      };
      checkInAPI
        .checkInSport(id, body)
        .then((res) => {
          console.log(res);
          setShow(true);
          if (res.data.message == "Sai Mk") {
            setMessage("Sai Mật Khẩu");
          } else {
            setMessage("Check In Thành Công");
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
          setShow(true);
          setMessage("Bạn nhập password không đúng");
        });
    } else {
      setShow(true);
      setMessage("Mã Check In của bạn sai");
    }
  };

  return (
    <div className="checkin">
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
      <div className="course">
        <div id="cards_landscape_wrap-2">
          <div className="container">
            {courseData.length !== 0 ? (
              <h1>Danh sách các khóa tập đã mua</h1>
            ) : (
              <h1>Danh sách các khóa tập đã mua không có</h1>
            )}

            <div className="row">
              {courseData.map((course) => (
                <div
                  key={course.id}
                  className="col-xs-12 col-sm-6 col-md-3 col-lg-3 course-click"
                >
                  <div className="card-flyer">
                    <div className="text-box">
                      <div className="image-box">
                        <Image src={course.course.image} alt="loading..." />
                      </div>
                      <div className="text-container">
                        <h6>{course.course.tenkhoahoc}</h6>
                        <p style={{ whiteSpace: "pre-wrap" }}>
                          {course.course.noidung}
                        </p>
                        <p style={{ whiteSpace: "pre-wrap" }}>
                          <Content text={`${course.course.thongtinthem}`} />
                        </p>
                      </div>
                      <div className="text-container">
                        <h3>Giá</h3>
                        <h3>
                          {course.course.gia == null ? 0 : course.course.gia}{" "}
                          VNĐ
                        </h3>
                      </div>
                      <Button
                        style={{ marginBottom: "7%" }}
                        variant="danger"
                        onClick={() => {
                          setLgShow(true);
                          setIdCourse(course.id);
                        }}
                      >
                        Check In
                      </Button>
                      <Modal
                        size="lg"
                        show={lgShow}
                        onHide={() => setLgShow(false)}
                        aria-labelledby="example-modal-sizes-title-lg"
                      >
                        <Modal.Header closeButton>
                          <Modal.Title id="example-modal-sizes-title-lg">
                            Nhập Mã Check In
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ textAlign: "center" }}>
                          <InputGroup className="mb-3">
                            <FormControl
                              placeholder="Nhập mã Check In"
                              aria-label="Username"
                              aria-describedby="basic-addon1"
                              name="codeCheck"
                              onChange={handleChangeCheckIn}
                            />
                          </InputGroup>
                          <Button
                            style={{ marginBottom: "7%", width: "15%" }}
                            variant="danger"
                            onClick={checkIn(course.id)}
                          >
                            Check Ina
                          </Button>
                        </Modal.Body>
                      </Modal>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="container">
            {scheduleData.length !== 0 ? (
              <h1>Danh sách các Schedule đã mua</h1>
            ) : (
              <h1>Danh sách các Schedule đã mua không có</h1>
            )}
            <div className="row">
              {scheduleData.map((schedule) => (
                <div
                  key={schedule.id}
                  className="col-xs-12 col-sm-6 col-md-3 col-lg-3 course-click"
                >
                  <div className="card-flyer">
                    <div className="text-box">
                      <div className="image-box">
                        <Image src={schedule.schedule.image} alt="loading..." />
                      </div>
                      <div className="text-container">
                        <h6>{schedule.schedule.tenkhoahoc}</h6>
                        <p style={{ whiteSpace: "pre-wrap" }}>
                          {schedule.schedule.noidung}
                        </p>
                        <p style={{ whiteSpace: "pre-wrap" }}>
                          <Content text={`${schedule.schedule.thongtinthem}`} />
                        </p>
                        <p>Start: {schedule.schedule.thoigianbatdau}</p>
                        <p>End: {schedule.schedule.thoigianketthuc}</p>
                      </div>
                      <div className="text-container">
                        <h3>Giá</h3>
                        <h3>{schedule.schedule.gia}</h3> VNĐ
                      </div>
                      {/* <Button
                        style={{ marginBottom: "7%" }}
                        variant="danger"
                        onClick={checkIn(schedule.id)}
                      >
                        Check In
                      </Button> */}
                      <Button
                        style={{ marginBottom: "7%" }}
                        variant="danger"
                        onClick={() => setLgShow1(true)}
                      >
                        Check In
                      </Button>
                      <Modal
                        size="lg"
                        show={lgShow1}
                        onHide={() => setLgShow1(false)}
                        aria-labelledby="example-modal-sizes-title-lg"
                      >
                        <Modal.Header closeButton>
                          <Modal.Title id="example-modal-sizes-title-lg">
                            Nhập Mã Check In
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ textAlign: "center" }}>
                          <InputGroup className="mb-3">
                            <FormControl
                              placeholder="Nhập mã Check In"
                              aria-label="Username"
                              aria-describedby="basic-addon1"
                              name="codeCheck"
                              onChange={handleChangeCheckIn}
                            />
                          </InputGroup>
                          <Button
                            style={{ marginBottom: "7%", width: "15%" }}
                            variant="danger"
                            onClick={checkIn(schedule.id)}
                          >
                            Check In
                          </Button>
                        </Modal.Body>
                      </Modal>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="container">
            {courseOnline.length !== 0 ? (
              <h1>Danh sách khóa học Online</h1>
            ) : (
              <h1>Danh sách khóa học Online không có</h1>
            )}
            <div className="row">
              {courseOnline.map((onlineCourse) => (
                <div
                  key={onlineCourse.id}
                  className="col-xs-12 col-sm-6 col-md-3 col-lg-3 course-click"
                >
                  <div className="card-flyer">
                    <div className="text-box">
                      <div className="image-box">
                        <Image
                          src={onlineCourse.onlineCourse.image}
                          alt="loading..."
                        />
                      </div>
                      <div className="text-container">
                        <h6>{onlineCourse.onlineCourse.tenkhoahoc}</h6>
                        <p style={{ whiteSpace: "pre-wrap" }}>
                          {onlineCourse.onlineCourse.noidung}
                        </p>
                        <p style={{ whiteSpace: "pre-wrap" }}>
                          <Content
                            text={`${onlineCourse.onlineCourse.thongtinthem}`}
                          />
                        </p>
                      </div>
                      <div className="text-container">
                        <h3>Giá</h3>
                        <h3>{onlineCourse.onlineCourse.gia}</h3> VNĐ
                      </div>
                      {/* <Button
                        style={{ marginBottom: "7%" }}
                        variant="danger"
                        onClick={checkIn(schedule.id)}
                      >
                        Check In
                      </Button> */}
                      <Button
                        style={{ marginBottom: "7%" }}
                        variant="danger"
                        onClick={() => setLgShow3(true)}
                      >
                        Check In
                      </Button>
                      <Modal
                        size="lg"
                        show={lgShow3}
                        onHide={() => setLgShow3(false)}
                        aria-labelledby="example-modal-sizes-title-lg"
                      >
                        <Modal.Header closeButton>
                          <Modal.Title id="example-modal-sizes-title-lg">
                            Nhập Mã Check In
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ textAlign: "center" }}>
                          <InputGroup className="mb-3">
                            <FormControl
                              placeholder="Nhập mã Check In"
                              aria-label="Username"
                              aria-describedby="basic-addon1"
                              name="codeCheck"
                              onChange={handleChangeCheckIn}
                            />
                          </InputGroup>
                          <Button
                            style={{ marginBottom: "7%", width: "15%" }}
                            variant="danger"
                            onClick={checkInOnline(onlineCourse.id)}
                          >
                            Check In
                          </Button>
                        </Modal.Body>
                      </Modal>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="container">
            {spaData.length !== 0 ? (
              <h1>Danh sách dịch vụ sức khỏe làm đẹp</h1>
            ) : (
              <h1>Danh sách dịch vụ sức khỏe làm đẹp không có</h1>
            )}
            <div className="row">
              {spaData.map((spaData) => (
                <div
                  key={spaData.key}
                  className="col-xs-12 col-sm-6 col-md-3 col-lg-3 course-click"
                >
                  <div className="card-flyer">
                    <div className="text-box">
                      <div className="image-box">
                        <Image src={spaData.spa.image} alt="loading..." />
                      </div>
                      <div className="text-container">
                        <h6>{spaData.spa.tendichvu}</h6>
                        <p style={{ whiteSpace: "pre-wrap" }}>
                          {spaData.spa.noidung}
                        </p>
                        <p style={{ whiteSpace: "pre-wrap" }}>
                          <Content text={`${spaData.spa.thongtinthem}`} />
                        </p>
                      </div>
                      <div className="text-container">
                        <h3>Giá</h3>
                        <h3>{spaData.spa.gia}</h3> VNĐ
                      </div>
                      {/* <Button
                          style={{ marginBottom: "7%" }}
                          variant="danger"
                          onClick={checkIn(schedule.id)}
                        >
                          Check In
                        </Button> */}
                      <Button
                        style={{ marginBottom: "7%" }}
                        variant="danger"
                        onClick={() => setLgShow4(true)}
                      >
                        Check In
                      </Button>
                      <Modal
                        size="lg"
                        show={lgShow4}
                        onHide={() => setLgShow4(false)}
                        aria-labelledby="example-modal-sizes-title-lg"
                      >
                        <Modal.Header closeButton>
                          <Modal.Title id="example-modal-sizes-title-lg">
                            Nhập Mã Check In
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ textAlign: "center" }}>
                          <InputGroup className="mb-3">
                            <FormControl
                              placeholder="Nhập mã Check In"
                              aria-label="Username"
                              aria-describedby="basic-addon1"
                              name="codeCheck"
                              onChange={handleChangeCheckIn}
                            />
                          </InputGroup>
                          <Button
                            style={{ marginBottom: "7%", width: "15%" }}
                            variant="danger"
                            onClick={checkInSpa(spaData.id)}
                          >
                            Check In
                          </Button>
                        </Modal.Body>
                      </Modal>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="container">
            {sportData.length !== 0 ? (
              <h1>Danh sách dịch vụ thể thao giải trí</h1>
            ) : (
              <h1>Danh sách dịch vụ thể thao giải trí không có</h1>
            )}
            <div className="row">
              {sportData.map((sportData) => (
                <>
                  {sportData.sport == null ? (
                    ""
                  ) : (
                    <div
                      key={sportData.sport.id}
                      className="col-xs-12 col-sm-6 col-md-3 col-lg-3 course-click"
                    >
                      <div className="card-flyer">
                        <div className="text-box">
                          <div className="image-box">
                            <Image
                              src={sportData.sport.image}
                              alt="loading..."
                            />
                          </div>
                          <div className="text-container">
                            <h6>{sportData.sport.tendichvu}</h6>
                            <p style={{ whiteSpace: "pre-wrap" }}>
                              {sportData.sport.noidung}
                            </p>
                            <p style={{ whiteSpace: "pre-wrap" }}>
                              <Content
                                text={`${sportData.sport.thongtinthem}`}
                              />
                            </p>
                          </div>
                          <div className="text-container">
                            <h3>Giá</h3>
                            <h3>{sportData.sport.gia}</h3> VNĐ
                          </div>
                          {/* <Button
                          style={{ marginBottom: "7%" }}
                          variant="danger"
                          onClick={checkIn(schedule.id)}
                        >
                          Check In
                        </Button> */}
                          <Button
                            style={{ marginBottom: "7%" }}
                            variant="danger"
                            onClick={() => setLgShow5(true)}
                          >
                            Check In
                          </Button>
                          <Modal
                            size="lg"
                            show={lgShow5}
                            onHide={() => setLgShow5(false)}
                            aria-labelledby="example-modal-sizes-title-lg"
                          >
                            <Modal.Header closeButton>
                              <Modal.Title id="example-modal-sizes-title-lg">
                                Nhập Mã Check In
                              </Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={{ textAlign: "center" }}>
                              <InputGroup className="mb-3">
                                <FormControl
                                  placeholder="Nhập mã Check In"
                                  aria-label="Username"
                                  aria-describedby="basic-addon1"
                                  name="codeCheck"
                                  onChange={handleChangeCheckIn}
                                />
                              </InputGroup>
                              <Button
                                style={{ marginBottom: "7%", width: "15%" }}
                                variant="danger"
                                onClick={checkInSport(sportData.id)}
                              >
                                Check In
                              </Button>
                            </Modal.Body>
                          </Modal>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(CheckIn);
