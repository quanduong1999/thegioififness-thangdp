import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Modal, Image, Alert } from "react-bootstrap";
import { placeAPI } from "../api/place/place";
import { profilesAPI } from "../api/profiles/profiles";
import Cookies from "js-cookie";
import { scheduleAPI } from "../api/schedule/schedule";

const ListSchedule = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [lgShow, setLgShow] = useState(false);
  const [idschedule, setIdSchedule] = useState("");
  const [gia, setGia] = useState();
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [sodutk, setSoDuTk] = useState();
  const token = Cookies.get("token");

  useEffect(() => {
    scheduleAPI
      .getAllSchedule()
      .then((res) => {
        console.log(res);
        setScheduleData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (token) {
      profilesAPI.getProfiles().then((res) => {
        console.log(res);
        setSoDuTk(res.data.xu);
      });
    }
  }, []);

  const buyschedule = (idschedule, gia, sodutk) => (e) => {
    e.preventDefault();
    const body = {
      schedule: idschedule,
    };
    console.log(body);
    if (!token) {
      setShow(true);
      setMessage("Hãy đăng nhập để mua khóa học");
    } else {
      if (sodutk < gia) {
        setShow(true);
        setMessage("Bạn cần nạp thêm tiền");
      } else {
        scheduleAPI
          .buyScheduleAPI(body)
          .then((res) => {
            setShow(true)
            setMessage("Tạo khóa học thành công, Check mã ở gmail");
          })
          .catch((err) => {
            console.log(err);
            setShow(true);
            setMessage("Tạo khóa học không thành công");
          });
      }
    }
  };

  return (
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
                      <h3>{schedule.gia}</h3>
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
                        onClick={buyschedule(idschedule, gia, sodutk)}
                      >
                        Mua Lịch Tập
                      </Button>{" "}
                      <div className="buyschedule-login">
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListSchedule;
