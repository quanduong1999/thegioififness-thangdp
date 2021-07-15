import React from "react";
import { Row, Col } from "react-bootstrap";
import {FaAddressBook} from "react-icons/fa";
import {AiFillPhone} from "react-icons/ai";
import {SiGmail} from "react-icons/si";

function ContactUs() {
  return (
    <div className="contact-us">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8775273257884!2d105.84988491440754!3d21.037585892854075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abb8a236f0d9%3A0x5563a4a6d529d223!2zMTggUC4gVGhhbmggSMOgLCDEkOG7k25nIFh1w6JuLCBIb8OgbiBLaeG6v20sIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1626340475846!5m2!1svi!2s"
        style={{ border: "0", width: "100%", height: "60vh" }}
        loading="lazy"
      ></iframe>
      <Row>
        <Col sm={6}>
          <div className="container d-flex justify-content-center text-center">
            <div className="card px-5 py-5">
              <h1>Contact Us</h1>{" "}
              <span>
                Got a question? We would love to hear from you. Send us a
                message and we will respond as soon as possible
              </span>{" "}
              <input type="text" className="form-control" placeholder="name" />{" "}
              <input type="text" className="form-control" placeholder="phone" />{" "}
              <input type="text" className="form-control" placeholder="email" />{" "}
              <input
                id="date"
                type="text"
                className="form-control"
                placeholder="When can we call you?"
              />{" "}
              <button className="btn btn-success mt-5">
                Send Message{" "}
                <i className="fa fa-long-arrow-right ml-2 mt-1"></i>
              </button>
            </div>
          </div>
        </Col>
        <Col sm={6}>
          <h1>Liên hệ với chúng tôi</h1>
          <p>
            Thế giới fitness là hệ thống chuỗi các câu lạc bộ Fitness tại Việt
            Nam, được thành lập từ những người con đất Việt trẻ tuổi, có lòng
            đam mê với thể thao. Họ mong muốn con người Việt Nam tự nâng cao ý
            thức rèn luyện sức khỏe của bản thân, được sử dụng những dịch vụ tập
            luyện đẳng cấp quốc tế. Trong suốt 5 năm qua, Thế giới fitness đã
            ngày càng khẳng định được vị thế của mình trong giới Fitness và mang
            đến cho hàng trăm ngàn hội viên trải nghiệm tập luyện tuyệt vời trên
            toàn hệ thống
          </p>
          <ul>
            <li>
              <FaAddressBook/>
              <span>Địa chỉ : 18 Đồng Xuân - Hà Nội</span>
            </li>
            <hr />
            <li>
              <AiFillPhone/>
              <span>Số điện thoại :0349236789</span>
            </li>
            <hr />
            <li>
              <SiGmail />
              <span>Gmail: thegioifitness@gmail.com</span>
            </li>
          </ul>
          <div className="contact-calender">
            <h4>Làm việc</h4>
            <p>Thứ 2 đến chủ nhật (9h-21h)</p>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ContactUs;
