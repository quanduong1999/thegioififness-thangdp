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
  const [tinh, setTinh] = useState([]);
  const [idTinh, setIdTinh] = useState();
  const [huyen, setHuyen] = useState([]);
  const [idHuyen, setIdHuyen] = useState();
  const [xa, setXa] = useState([]);
  const { search } = userSearch;
  const token = cookie.get("token");
  const Router = useRouter();

  const logout = () => {
    cookie.remove("token");
    Router.replace("/");
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

  useEffect(() => {
    searchAPI
      .getTinh()
      .then((res) => {
        // console.log(res.data.results);
        setTinh(res.data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChangeTinh = (e) => {
    setIdTinh(e.target.value);
  };

  useEffect(() => {
    searchAPI
      .getHuyen(idTinh)
      .then((res) => {
        // console.log(res)
        setHuyen(res.data.results);
      })
      .catch((err) => console.log(err));
  }, [idTinh]);

  const handleChangeHuyen = (e) => {
    setIdHuyen(e.target.value);
  };

  useEffect(() => {
    searchAPI
      .getXa(idHuyen)
      .then((res) => {
        // console.log(res.data.results)
        setXa(res.data.results);
      })
      .catch((err) => console.log(err));
  }, [idHuyen]);

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
            <Nav.Link href="/save" className="header-menu-list-right-li">
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
            <div className="place-tinh">
              <select
                name="tinh"
                className="checkin-select-place"
                onChange={handleChangeTinh}
              >
                <option selected disabled>
                  Chọn 1 Tỉnh/Thành Phố
                </option>
                {tinh.map((tinh) => (
                  <option key={tinh.province_id} value={tinh.province_id}>
                    {tinh.province_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="place-huyen">
              <select
                name="huyen"
                className="checkin-select-place"
                onChange={handleChangeHuyen}
              >
                <option selected disabled>
                  Chọn 1 Huyện
                </option>
                {huyen.map((huyen) => (
                  <option key={huyen.district_id} value={huyen.district_id}>
                    {huyen.district_name}
                  </option>
                ))}
              </select>

              <div className="place-xa">
                <select
                  name="xa"
                  className="checkin-select-place"
                  // onChange={handleChangePlace}
                >
                  <option selected disabled>
                    Chọn 1 Xã
                  </option>
                  {xa.map((xa) => (
                    <option key={xa.ward_id} value={xa.ward_id}>
                      {xa.ward_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="get-all-place">
            <Button variant="danger" className="button-place">
              Tìm Kiếm
            </Button>{" "}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Header;
