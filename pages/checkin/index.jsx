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

const CheckIn = () => {
  const Router = useRouter();
  const initCheckIn = { password: "", codeCheck: "" };
  const [checkInData, setCheckInData] = useState(initCheckIn);
  const { password, codeCheck } = checkInData;
  const [message, setMessage] = useState("");
  const [courseData, setCourseData] = useState([]);
  const [scheduleData, setScheduleData] = useState([]);
  const [lgShow, setLgShow] = useState(false);
  const token = Cookies.get("token");
  const [show, setShow] = useState(false);
  const [courseOnline, setCourseOnline] = useState([]);
  const [spaData, setSpaData] = useState([]);
  const [sportData, setSportData] = useState([]);

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
    // console.log(id, password, codeCheck)
    if (codeCheck == "1234") {
      const body = {
        password: password,
      };
      checkInAPI
        .checkIn(id, body)
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
        console.log(res)
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
            <h1>Danh sách các khóa tập đã mua</h1>
            <div className="row">
              {courseData.map((course) => (
                <div
                  key=""
                  className="col-xs-12 col-sm-6 col-md-3 col-lg-3 course-click"
                >
                  <div className="card-flyer">
                    <div className="text-box">
                      <div className="image-box">
                        <Image src={course.course.image} alt="loading..." />
                      </div>
                      <div className="text-container">
                        <h6>{course.course.tenkhoahoc}</h6>
                        <p>{course.course.noidung}</p>
                        <p>{course.course.thongtinthem}</p>
                      </div>
                      <div className="text-container">
                        <h3>Giá</h3>
                        <h3>
                          {course.course.gia == null ? 0 : course.course.gia}
                        </h3>
                      </div>
                      <Button
                        style={{ marginBottom: "7%" }}
                        variant="danger"
                        onClick={() => setLgShow(true)}
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
                            Nhập mật khẩu và Mã Check In
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
            <h1>Danh sách các Schedule đã mua</h1>
            <div className="row">
              {scheduleData.map((schedule) => (
                <div
                  key=""
                  className="col-xs-12 col-sm-6 col-md-3 col-lg-3 course-click"
                >
                  <div className="card-flyer">
                    <div className="text-box">
                      <div className="image-box">
                        <Image src={schedule.schedule.image} alt="loading..." />
                      </div>
                      <div className="text-container">
                        <h6>{schedule.schedule.tenkhoahoc}</h6>
                        <p>{schedule.schedule.noidung}</p>
                        <p>{schedule.schedule.thongtinthem}</p>
                        <p>Start: {schedule.schedule.thoigianbatdau}</p>
                        <p>End: {schedule.schedule.thoigianketthuc}</p>
                      </div>
                      <div className="text-container">
                        <h3>Giá</h3>
                        <h3>{schedule.schedule.gia}</h3>
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
                        onClick={() => setLgShow(true)}
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
                            Nhập mật khẩu và Mã Check In
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
            <h1>Danh sách khóa học Online</h1>
            <div className="row">
              {courseOnline.map((onlineCourse) => (
                <div
                  key=""
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
                        <p>{onlineCourse.onlineCourse.noidung}</p>
                        <p>{onlineCourse.onlineCourse.thongtinthem}</p>
                      </div>
                      <div className="text-container">
                        <h3>Giá</h3>
                        <h3>{onlineCourse.onlineCourse.gia}</h3>
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
                        onClick={() => setLgShow(true)}
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
                            Nhập mật khẩu và Mã Check In
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
            <h1>Danh sách dịch vụ sức khỏe và làm đẹp</h1>
            <div className="row">
              {spaData.map((spaData) => (
                <>
                  {spaData.spa == null ? (
                    ""
                  ) : (
                    <div
                      key=""
                      className="col-xs-12 col-sm-6 col-md-3 col-lg-3 course-click"
                    >
                      <div className="card-flyer">
                        <div className="text-box">
                          <div className="image-box">
                            <Image src={spaData.spa.image} alt="loading..." />
                          </div>
                          <div className="text-container">
                            <h6>{spaData.spa.tendichvu}</h6>
                            <p>{spaData.spa.noidung}</p>
                            <p>{spaData.spa.thongtinthem}</p>
                          </div>
                          <div className="text-container">
                            <h3>Giá</h3>
                            <h3>{spaData.spa.gia}</h3>
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
                            onClick={() => setLgShow(true)}
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
                                Nhập mật khẩu và Mã Check In
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
                                onClick={checkInSpa(spaData.spa.id)}
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

          <div className="container">
            <h1>Danh sách dịch vụ thể thao và giải trí</h1>
            <div className="row">
              {sportData.map((sportData) => (
                <>
                  {sportData.sport == null ? (
                    ""
                  ) : (
                    <div
                      key=""
                      className="col-xs-12 col-sm-6 col-md-3 col-lg-3 course-click"
                    >
                      <div className="card-flyer">
                        <div className="text-box">
                          <div className="image-box">
                            <Image src={sportData.sport.image} alt="loading..." />
                          </div>
                          <div className="text-container">
                            <h6>{sportData.sport.tendichvu}</h6>
                            <p>{sportData.sport.noidung}</p>
                            <p>{sportData.sport.thongtinthem}</p>
                          </div>
                          <div className="text-container">
                            <h3>Giá</h3>
                            <h3>{sportData.sport.gia}</h3>
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
                            onClick={() => setLgShow(true)}
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
                                Nhập mật khẩu và Mã Check In
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
                                onClick={checkInSport(sportData.sport.id)}
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
