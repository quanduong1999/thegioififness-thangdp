import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { placeAPI } from "../api/place/place";
import { Button, Image } from "react-bootstrap";
import { checkInAPI } from "../api/checkin/checkin";
import { scheduleAPI } from "../api/schedule/schedule";
import Cookies from "js-cookie";
import withAuth from "../HOC/withAuth";
import { courseAPI } from "../api/course/course";

const CheckIn = () => {
  const Router = useRouter();
  const [message, setMessage] = useState("");
  const [courseData, setCourseData] = useState([]);
  const [scheduleData, setScheduleData] = useState([]);
  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      scheduleAPI
        .getScheduleBuy()
        .then((res) => {
          // console.log(res.data);
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

  return (
    <div className="checkin">
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
                        <h3>{course.course.gia}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="container">
            <h1>Danh sách các Schedule đã mua</h1>
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
                        <h3>{course.course.gia}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(CheckIn);
