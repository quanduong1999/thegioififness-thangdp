import React, { useEffect } from "react";
import { useState } from "react";
import { Alert, Button, Image, Modal } from "react-bootstrap";
import { placeAPI } from "../api/place/place";
import Cookies from "js-cookie";
import { profilesAPI } from "../api/profiles/profiles";
import { useRouter } from "next/router";
import { onlineAPI } from "../api/online/online";

const Online = () => {
  const [onlineData, setOnlineData] = useState([]);
  const [lgShow, setLgShow] = useState(false);
  const [idCourse, setIdCourse] = useState("");
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [gia, setGia] = useState("");
  const [sodutk, setSoDuTk] = useState("");
  const token = Cookies.get("token");
  const Router = useRouter();

  useEffect(() => {
    onlineAPI
      .getOnline()
      .then((res) => {
        setOnlineData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (token) {
      profilesAPI.getProfiles().then((res) => {
        console.log(res.data.xu);
        setSoDuTk(res.data.xu);
      });
    }
  }, []);

  const buyCourse = (idCourse, gia, sodutk) => (e) => {
    if (token) {
      if (Number.parseInt(sodutk) >= Number.parseInt(gia)) {
        const body = {
          onlineCourse: idCourse,
        };
        placeAPI
          .buyOnline(body)
          .then((res) => {
            // console.log(res)
            setShow(true);
            setMessage("Mua khoá học thành công");
            Router.push("/checkin");
          })
          .catch((err) => {
            console.log(err);
            setShow(true);
            setMessage("Mua khóa học không thành công");
          });
      } else {
        setShow(true);
        setMessage("Số dư tài khoản không đủ");
        Router.push("/wallet");
      }
    } else {
      setShow(true);
      setMessage("Đăng nhập để mua khóa");
      Router.push("/login");
    }
  };

  const handleClickDetail = (id) => (e) =>{
    // console.log(id)
    Router.push(`/online/detailOnline/${id}`)
  }

  return (
    <div className="course">
      <div id="cards_landscape_wrap-2">
        <div className="container">
          <h1>Danh sách các khóa tập online</h1>
          <div className="row">
            {onlineData.map((onlineList) => (
              <div
                key={onlineList.id}
                className="col-xs-12 col-sm-6 col-md-3 col-lg-3 course-click"
              >
                {/* <a href=""> */}
                <div className="card-flyer">
                  <div className="text-box" style={{cursor:"pointer"}} onClick={handleClickDetail(onlineList.id)}>
                    <div className="image-box">
                      <Image src={onlineList.image} alt="" />
                    </div>
                    <div className="text-container">
                      <h6>{onlineList.tenkhoahoc}</h6>
                      <p style={{ whiteSpace: "pre-wrap" }}>
                        {onlineList.thongtinthem}
                      </p>
                    </div>
                    <div className="text-container">
                      <h3>Giá</h3>
                      <h3>{onlineList.gia}</h3> VNĐ
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      setLgShow(true);
                      setIdCourse(onlineList.id);
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
                        onClick={buyCourse(idCourse, gia, sodutk)}
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Online;
