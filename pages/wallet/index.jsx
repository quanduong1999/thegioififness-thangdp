import React from "react";

const Wallet = () => {
  return (
    <div className="wallet">
      <div className="card-wallet-wrapper">
        <div className="card-wallet">
          <div className="card-wallet-header">
            {/* <img
              src="https://www.flaticon.com/svg/vstatic/svg/3876/3876951.svg?token=exp=1620210594~hmac=542488eebcfe83be4f643f4ff25641b3"
              id="chip"
            />
            <img
              src="https://www.flaticon.com/svg/vstatic/svg/179/179457.svg?token=exp=1620210558~hmac=02461fe05c02d62905eadbb4e60f17a8"
              id="logo"
            /> */}
          </div>
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
          <div className="heading">
            <h2>card number</h2>
          </div>
          <div className="form-card-number">
            <input type="number" id="input-number" />
          </div>
          <div className="heading">
            <h2>card holder</h2>
          </div>
          <div className="form-card-holder">
            <input type="text" id="input-name" />
          </div>
          <div className="heading">
            <h2>expiration date</h2> <h2>cvv</h2>
          </div>
          <div className="form-bottom">
            <input type="number" id="month" placeholder="month" />
            <input type="number" id="year" placeholder="year" />
            <input type="number" id="input-cvv" min="1" max="3" />
          </div>
          <div className="form-submit">
            <button id="submit">submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
