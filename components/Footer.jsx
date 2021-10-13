import React from "react";
import { BiHomeCircle, BiUserCircle } from "react-icons/bi";
import { AiOutlineMail, AiFillPhone } from "react-icons/ai";
import {Button,FormControl, InputGroup} from 'react-bootstrap'

function Footer() {
  return (
    <div className="footers">
      <footer className="page-footer font-small blue pt-4">
        <div className="container text-center text-md-left">
          <div className="row">
            <div className="col-md-3 mb-md-0 mb-3"></div>

            <div className="col-md-3 mb-md-0 mb-3">
              <h5 className="text-uppercase">Liên hệ</h5>
              <ul className="list-unstyled footer-ul">
                <li>
                  <a href="#!">
                    <BiHomeCircle style={{marginRight: "10px"}}/>
                    <span>Địa chỉ : 18 Đồng Xuân - Hà Nội</span>
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <AiOutlineMail style={{marginRight: "10px"}} />
                    <span>thegioififness@gmail.com</span>
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <AiFillPhone style={{marginRight: "10px"}} />
                    <span>0349236789</span>
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <BiUserCircle style={{marginRight: "10px"}} />
                    <span>Mã số thuế: 0109619013</span>
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <BiHomeCircle style={{marginRight: "10px"}} />
                    <span>FaceBook: Thegioififness</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-md-3 mb-md-0 mb-3">
              <h5 className="text-uppercase">Thông tin</h5>
              <ul className="list-unstyled footer-ul">
                <li>
                  <a href="#!">Trang chủ</a>
                </li>
                <li>
                  <a href="#!">Giới thiệu</a>
                </li>
                <li>
                  <a href="#!">Liên hệ</a>
                </li>
              </ul>
            </div>

            <div className="col-md-3 mb-md-0 mb-3">
              <h5 className="text-uppercase">Đăng ký nhận thông báo</h5>
              <ul className="list-unstyled footer-ul">
                <li>
                  <InputGroup className="mb-3">
                    <FormControl
                      placeholder=""
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                    />
                    <Button variant="outline-secondary" id="button-addon2" className="footer-dangky">
                      Đăng ký
                    </Button>
                  </InputGroup>
                </li>
                <li>
                  <a href="#!">Đăng ký để nhận thông báo mới nhất về các sự kiên đang chạy</a>
                </li>
                
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-copyright text-center py-3">
          thegioififness@gmail.com
        </div>
      </footer>
    </div>
  );
}

export default Footer;
