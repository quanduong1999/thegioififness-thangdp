import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { FormControl, InputGroup, Modal } from "react-bootstrap";
import { napxuAPI } from "./api/napxu/napxu";
import { profilesAPI } from "./api/profiles/profiles";
import Cookies from "js-cookie";
import withAuth from "./HOC/withAuth";

const Wallet = () => {
  const [xu, setXu] = useState();
  const initCourse = { amount: 0 };
  const [amountData, setAmountData] = useState(initCourse);
  const { amount } = amountData;
  const [lgShow, setLgShow] = useState(false);
  const Router = useRouter();
  const token = Cookies.get("token");
  useEffect(() => {
    if (token) {
      profilesAPI.getProfiles().then((res) => {
        setXu(res.data.xu);
      });
    }
  }, []);

  const handleChangeAmount = (e) => {
    const { name, value } = e.target;
    setAmountData({ ...amountData, [name]: value });
  };

  const handleNapXu = (e) => {
    e.preventDefault();
    const body = {
      amount: amount,
      orderType: "topup",
      orderDescription: "dang thanh toan",
      bankCode: "",
      language: "vn",
    };
    napxuAPI
      .napXuAPI(body)
      .then((res) => {
        // console.log(res);
        Router.replace(res.data.url);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="wallet">
      <div className="card-wallet-wrapper">
        <div className="card-wallet">
          <div className="card-wallet-header"></div>
          <div className="card-wallet-number">
            <p id="p-card-wallet-number">#### #### #### ####</p>
          </div>
          <div className="card-wallet-bottom">
            <div className="card-wallet-name-wrapper">
              <p id="card-wallet-name"></p>
            </div>
            <div className="date-wrapper">
              <p id="card-wallet-month"></p>
              <p>/</p>
              <p id="card-wallet-year"></p>
            </div>
          </div>
        </div>
        <div className="form">
          <h4>Số Xu</h4>
          <h1>{xu}</h1>
          <div className="form-submit">
            <button id="submit" onClick={() => setLgShow(true)}>
              Nạp xu
            </button>
            <Modal
              size="lg"
              show={lgShow}
              onHide={() => setLgShow(false)}
              aria-labelledby="example-modal-sizes-title-lg"
            >
              <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                  Bạn hãy nhập số tiền muốn nạp( lớn hơn 5000)
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="model-buy-course">
                <h2>Nhập số tiền thanh toán</h2>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="nạp xu"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    name="amount"
                    onChange={handleChangeAmount}
                  />
                </InputGroup>
                <button id="submit" onClick={handleNapXu}>
                  Nạp xu
                </button>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Wallet);
