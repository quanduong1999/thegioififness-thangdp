import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  Col,
  Row,
  Image,
  Button,
  Modal,
  InputGroup,
  FormControl,
  Alert,
} from "react-bootstrap";
import StarRatings from "react-star-ratings";
import { sportAPI } from "../../api/sport/sport";
import Cookies from "js-cookie";
import { profilesAPI } from "../../api/profiles/profiles";
import { onlineAPI } from "../../api/online/online";
import Content from "../../../components/ReaMore";

const DetailOnline = () => {
  const token = Cookies.get("token");
  const Router = useRouter();
  const { idOnline } = Router.query;
  console.log(idOnline);
  const [image, setImage] = useState("");
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const initContent = { content: "" };
  const [contentData, setContentData] = useState(initContent);
  const { content } = contentData;
  const [online, setOnline] = useState([]);
  const [star, setStar] = useState("");
  const [getStar, setGetStar] = useState("0");
  const [listFeedback, setListFeedback] = useState([]);

  useEffect(() => {
    onlineAPI
      .getOnlineById(idOnline)
      .then((res) => {
        console.log(res.data[0]);
        setOnline(res.data[0]);
        setImage(res.data[0].image);
        setListFeedback(res.data[0].listFeedback);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [show]);

  const onChangeContent = (e) => {
    const { name, value } = e.target;
    setContentData({ ...contentData, [name]: value });
  };

  const handleStar = (e) => {
    setStar(e.target.value);
  };

  const FeedbackStar = (e) => {
    e.preventDefault();
    const body = {
      online: idOnline,
      star: star,
    };
    if (token) {
      onlineAPI
        .createFeedbackStarOnline(body)
        .then((res) => {
          setShow(true);
          setMessage("Đánh giá thành công");
          // window.location.reload();
        })
        .catch((err) => console.log(err));
    } else {
      setShow(true);
      setMessage("Bạn cần đăng nhập");
      Router.push("/login");
    }
  };

  const submitFeedback = (e) => {
    e.preventDefault();
    const body = {
      online: idOnline,
      content: content,
    };
    if (token) {
      onlineAPI
        .createFeedbackOnline(body)
        .then((res) => {
          setShow(true);
          setMessage("Đánh giá thành công");
          // window.location.reload();
        })
        .catch((err) => console.log(err));
    } else {
      setShow(true);
      setMessage("Bạn cần đăng nhập");
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
                <div className="multi-image">
                  <Image
                    src={image.split(",")[0]}
                    className="about-img-infor"
                  ></Image>
                  <Row>
                    <Col xs={6}>
                      <Image
                        src={image.split(",")[1]}
                        className="about-img-infor"
                      ></Image>
                    </Col>
                    <Col xs={6}>
                      <Image
                        src={image.split(",")[2]}
                        className="about-img-infor"
                      ></Image>
                    </Col>
                  </Row>
                </div>
                <div className="show-start">
                  <h2>Chất lượng</h2>
                  <StarRatings
                    rating={Number.parseInt(
                      online.star == null || online.star === NaN
                        ? "5"
                        : online.star
                    )}
                    starRatedColor="#FFD700"
                    numberOfStars={5}
                    name="rating"
                  />
                </div>
              </Col>
              <Col sm={7}>
                <h1 className="detail-h1">{online.name}</h1>
                <p>{online.tenkhoahoc}</p>
                <p style={{ whiteSpace: "pre-wrap" }}>
                  <Content text={`${online.thongtinthem}`} />
                </p>
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
                      <Button variant="danger" onClick={FeedbackStar}>
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
                  {listFeedback.map((feedback) => (
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
                        </div>
                      </div>
                    </li>
                  ))}
                  ;
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailOnline;
