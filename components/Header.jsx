import React from "react";
import { useState } from "react";
import { useEffect, useRef } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Form, FormControl } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { Card, CardColumns } from "react-bootstrap";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import { BiMap, BiUserCircle, BiFootball } from "react-icons/bi";
import { FaSave, FaMoneyCheckAlt } from "react-icons/fa";
import { CgGirl } from "react-icons/cg";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { Modal } from "react-bootstrap";
import { searchAPI } from "../pages/api/search/search";
import { Link } from "@material-ui/core";

function Header(props) {
  const [lgShow, setLgShow] = useState(false);
  const [search, setSearch] = useState("");
  const [dataSearch, setDataSearch] = useState([]);
  const [tinh, setTinh] = useState([]);
  const [idTinh, setIdTinh] = useState();
  const [nameTinh, setNameTinh] = useState("");
  const [huyen, setHuyen] = useState([]);
  const [idHuyen, setIdHuyen] = useState();
  const [nameHuyen, setNameHuyen] = useState("");
  const [xa, setXa] = useState([]);
  const [idXa, setIdXa] = useState("");
  const [nameXa, setNameXa] = useState("");
  const token = cookie.get("token");
  const [check, setCheck] = useState(false);
  const Router = useRouter();
  const [category, setCategory] = useState("place");

  const logout = () => {
    cookie.remove("token");
    Router.replace("/");
  };

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
    setXa([]);
    setHuyen([]);
    searchAPI
      .getHuyen(idTinh)
      .then((res) => {
        // console.log(res)
        setHuyen(res.data.results);
      })
      .catch((err) => console.log(err));

    searchAPI
      .getTinhById(idTinh)
      .then((res) => {
        setNameTinh(res.data.name);
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

    searchAPI
      .getHuyenById(idHuyen)
      .then((res) => {
        setNameHuyen(res.data.name);
      })
      .catch((err) => console.log(err));
  }, [idHuyen]);

  const handleChangeXa = (e) => {
    setIdXa(e.target.value);
  };

  useEffect(() => {
    searchAPI
      .getXaById(idXa)
      .then((res) => {
        setNameXa(res.data.name);
      })
      .catch((err) => console.log(err));
  }, [idXa]);

  useEffect(() => {
    if (nameTinh == null) {
      setNameTinh("");
    }
    if (nameHuyen == null) {
      setNameHuyen("");
    }
    if (nameXa == null) {
      setNameXa("");
    }
    // console.log(nameXa + " " + nameHuyen + " " + nameTinh);
    setSearch(nameXa + " " + nameHuyen + " " + nameTinh);
  }, [nameTinh, nameHuyen, nameXa]);

  const handleChangePlace = (e) => {
    setCategory(e.target.value);
  };

  const searchPlace = (e) => {
    searchAPI
      .searchDiaDiem(search)
      .then((res) => {
        if (category == "sport") {
          // console.log(res.data.sport);
          // console.log(category)
          setDataSearch(res.data.sport);
        } else if (category == "spa") {
          // console.log(res.data.spa);
          // console.log(category)
          setDataSearch(res.data.spa);
        } else {
          // console.log(res.data.place);
          // console.log(category)
          setDataSearch(res.data.place);
        }
        setCheck(true);
      })
      .catch((err) => console.log(err));
  };

  const showDetail = (id) => (e) => {
    // console.log(id)
    if (category == "sport") {
      Router.replace(`../../sport/detailSport/${id}`);
    } else if (category == "spa") {
      Router.replace(`../../spa/detailSpa/${id}`);
    } else {
      Router.replace(`home/detailplace/${id}`);
    }
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
          <Link href="/" style={{ width: "11%" }}>
            <Image src="/logo.jpg" className="header-logo" />
          </Link>
          {/* 
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
          </Nav> */}

          <Nav className="mr-auto header-menu-list-right">
            <Nav.Link href="/spa" className="header-menu-list-right-li">
              <CgGirl className="header-icons" />
              <p className="header-text">Sức khỏe và làm đẹp</p>
            </Nav.Link>
            <Nav.Link href="/sport" className="header-menu-list-right-li">
              <BiFootball className="header-icons" />
              <p className="header-text">Thể thao và giải trí</p>
            </Nav.Link>
            <Nav.Link href="/online" className="header-menu-list-right-li">
              <HiOutlineDesktopComputer className="header-icons" />
              <p className="header-text">Khóa học online</p>
            </Nav.Link>
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
                <option selected>Chọn 1 Huyện</option>
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
                  onChange={handleChangeXa}
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

              <div className="place-xa">
                <select
                  name="xa"
                  className="checkin-select-place"
                  onChange={handleChangePlace}
                >
                  <option selected disabled>
                    Chọn thể loại
                  </option>
                  <option value="place">Cơ sở phòng tập</option>
                  <option value="spa">Cơ sở sức khỏe và làm đẹp</option>
                  <option value="sport">Cơ sở thể thao và giải trí</option>
                </select>
              </div>
            </div>
          </div>
          <div className="get-all-place">
            <Button
              variant="danger"
              className="button-place"
              onClick={searchPlace}
            >
              Tìm Kiếm
            </Button>{" "}
          </div>
          {check ? (
            <>
              <CardColumns className="home-teacher-content">
                {dataSearch.map((place) => (
                  <Card
                    key={place.id}
                    className="home-teacher-card place-click"
                  >
                    <Card.Img
                      className="home-teacher-img"
                      variant="top"
                      src={place.image}
                      onClick={showDetail(place.id)}
                    />
                    <Card.Body>
                      <Card.Title>{place.name}</Card.Title>
                      <Card.Text>{place.diachi} </Card.Text>
                      <Button
                        variant="danger"
                        //  onClick={lovePlace(place.id)}
                      >
                        Lưu
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
              </CardColumns>
            </>
          ) : (
            ""
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Header;
