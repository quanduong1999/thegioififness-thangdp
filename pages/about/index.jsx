import React from "react";
import { Row, Col } from "react-bootstrap";
import { Image } from "react-bootstrap";

function About() {
  return (
    <div className="about">
      <div className="about-infor">
        <div className="container">
          <Row>
            <Col sm={5}>
              <Image src="/about/about1.jpg" className="about-img-infor" />
            </Col>
            <Col sm={7}>
              <h1>Thông tin</h1>
              <p>
                Thế giới fitness là hệ thống chuỗi các câu lạc bộ Fitness tại
                Việt Nam, được thành lập từ những người con đất Việt trẻ tuổi,
                có lòng đam mê với thể thao. Họ mong muốn con người Việt Nam tự
                nâng cao ý thức rèn luyện sức khỏe của bản thân, được sử dụng
                những dịch vụ tập luyện đẳng cấp quốc tế. Trong suốt 5 năm qua,
                Thế giới fitness đã ngày càng khẳng định được vị thế của mình
                trong giới Fitness và mang đến cho hàng trăm ngàn hội viên trải
                nghiệm tập luyện tuyệt vời trên toàn hệ thống.
              </p>
            </Col>
          </Row>
        </div>
      </div>
      <div id="cards_landscape_wrap-2">
          
        <div className="container">
        <h1>Đội ngũ phát triển</h1>
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
              <a href="">
                <div className="card-flyer">
                  <div className="text-box">
                    <div className="image-box">
                      <Image
                        src="https://cdn.pixabay.com/photo/2018/03/30/15/11/deer-3275594_960_720.jpg"
                        alt=""
                      />
                    </div>
                    <div className="text-container">
                      <h6>Title 01</h6>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the industry
                        is standard dummy text ever since the 1500s.
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            
            <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
              <a href="">
                <div className="card-flyer">
                  <div className="text-box">
                    <div className="image-box">
                      <Image
                        src="https://cdn.pixabay.com/photo/2018/03/30/15/11/deer-3275594_960_720.jpg"
                        alt=""
                      />
                    </div>
                    <div className="text-container">
                      <h6>Title 01</h6>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the industry
                        is standard dummy text ever since the 1500s.
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
              <a href="">
                <div className="card-flyer">
                  <div className="text-box">
                    <div className="image-box">
                      <Image
                        src="https://cdn.pixabay.com/photo/2018/03/30/15/11/deer-3275594_960_720.jpg"
                        alt=""
                      />
                    </div>
                    <div className="text-container">
                      <h6>Title 01</h6>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the industry
                        is standard dummy text ever since the 1500s.
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
              <a href="">
                <div className="card-flyer">
                  <div className="text-box">
                    <div className="image-box">
                      <Image
                        src="https://cdn.pixabay.com/photo/2018/03/30/15/11/deer-3275594_960_720.jpg"
                        alt=""
                      />
                    </div>
                    <div className="text-container">
                      <h6>Title 01</h6>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the industry
                        is standard dummy text ever since the 1500s.
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
