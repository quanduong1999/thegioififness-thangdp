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
import { searchAPI } from "../pages/api/search/search";

function Header(props) {
  const initSearch = { search: "" };
  const [lgShow, setLgShow] = useState(false);
  const [userSearch, setUserSearch] = useState(initSearch);
  const [dataSearch, setDataSearch] = useState([]);
  const { search } = userSearch;
  const token = cookie.get("token");
  const Router = useRouter();

  const logout = () => {
    cookie.remove("token");
    Router.replace("/");
  };

  const handleSearch = (e) => {
    const { name, value } = e.target;
    setUserSearch({ ...userSearch, [name]: value });
    console.log(search);
  };

  useEffect(() => {
    searchAPI
      .searchDiaDiem(search)
      .then((res) => {
        console.log(res.data);
        setDataSearch(res.data);
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response);
        }
      });
  }, [search]);

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
            <Nav.Link href="/checkin" className="header-menu-list-right-li">
              <BiMap className="header-icons" />
              <p className="header-text">Check-In</p>
            </Nav.Link>
            <Nav.Link href="/" className="header-menu-list-right-li">
              <FaSave className="header-icons" />
              <p className="header-text">Lưu</p>
            </Nav.Link>
            <Nav.Link href="/wallet" className="header-menu-list-right-li">
              <FaMoneyCheckAlt className="header-icons" />
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
            Tìm kiếm theo khu vực
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="search-by-place">
            <input
              id="search"
              name="search"
              type="text"
              className="form-control"
              placeholder="Search for name and email......"
              onChange={handleSearch}
            />
          </div>
          <div className="get-all-place">
            <div className="course">
              <div id="cards_landscape_wrap-2">
                <h1>Danh sách các Địa điểm</h1>
                <div className="row">
                  {dataSearch.map((search) => (
                    <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                      <a href="">
                        <div className="card-flyer">
                          <div className="text-box">
                            <div className="image-box">
                              <Image
                                src={search.image}
                                alt=""
                              />
                            </div>
                            <div className="text-container">
                              <h6>{search.diachi}</h6>
                              <p>
                                {search.thongtinthem}
                              </p>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Header;
