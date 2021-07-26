import React from "react";
import { useState } from "react";
import { useEffect, useRef } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Form, FormControl } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Image } from "react-bootstrap";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import { BiMap, BiUserCircle } from "react-icons/bi";
import { FaSave, FaMoneyCheckAlt } from "react-icons/fa";
import { Modal } from "react-bootstrap";

function Header(props) {
  const [lgShow, setLgShow] = useState(false);
  const token = cookie.get("token");
  const Router = useRouter();

  const logout = () => {
    cookie.remove("token");
    Router.replace("/");
  };

  return (
    <div className="container header">
      <Navbar
        bg="light"
        expand="lg"
        className="header-navbar"
        style={{ backgroundColor: "white !important" }}
      >
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Image src="/logo.jpg" className="header-logo" />
          <Nav className="mr-auto header-menu-list">
            <Nav.Link href="/" className="header-menu-list-li">
              <p className="header-text">Trang chủ</p>
            </Nav.Link>
            <Nav.Link href="/about" className="header-menu-list-li">
              <p className="header-text">Giới Thiệu</p>
            </Nav.Link>
            <Nav.Link href="/contact-us" className="header-menu-list-li">
              <p className="header-text">Liên Hệ</p>
            </Nav.Link>
          </Nav>

          <Nav className="mr-auto header-menu-list-right">
            <Nav.Link href="/" className="header-menu-list-right-li">
              <BiMap className="header-icons"/>
              <p className="header-text">Check-In</p>
            </Nav.Link>
            <Nav.Link href="/" className="header-menu-list-right-li">
              <FaSave className="header-icons"/>
              <p className="header-text">Lưu</p>
            </Nav.Link>
           <Nav.Link href="/" className="header-menu-list-right-li">
              <FaMoneyCheckAlt className="header-icons"/>
              <p className="header-text">Ví điện tử</p>
            </Nav.Link>
            {!token ? (
              <Nav.Link href="/login" className="header-menu-list-right-li">
                <BiUserCircle className="header-icons" />
                <p className="header-text">Đăng nhập</p>
              </Nav.Link>
            ) : (
              <NavDropdown
              title="User"
              id="basic-nav-dropdown"
              className="header-user"
            >
              <NavDropdown.Item href="/profiles">Profiles</NavDropdown.Item>
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Button
        variant="danger"
        className="header-search"
        onClick={() => setLgShow(true)}
      >
        Tìm kiếm theo khu vực
      </Button>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Large Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>...</Modal.Body>
      </Modal>
    </div>
  );
}

export default Header;
