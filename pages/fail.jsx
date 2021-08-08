import React from "react";
import { Image } from "react-bootstrap";

const Fail = () => {
  return (
    <div className="fail">
      <div className="container" id="fail" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content" style={{}}>
            <div className="modal-header" style={{}}>
              <h4 className="modal-title text-center" style={{ width: "100%" }}>
                <Image
                  src="https://lh3.googleusercontent.com/-ApBj8d4WL1E/Wp0fJeAD6jI/AAAAAAAAD4M/Dh6l_UiA64kln8PS-1SaDQFuhb9KJL40gCL0BGAYYCw/h100/2018-03-05.png"
                  alt=""
                />
              </h4>
            </div>
            <div className="modal-body">
              <p className="fail-p1">Sorry! your payment failed!</p>
              <p className="fail-p2">
                Transaction ID:&nbsp;
                <strong className="fail-strong">152458258752515</strong>
                <br />
                Payment amount:&nbsp;
                <strong className="fail-strong1">Rs.35000</strong>
                <br />
                If your payment got detucted for above transaction, the same
                shall be credited back to your account in
                <strong className="fail-strong3"> 5 working days</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .modal-content {
          border: none;
          border-radius: 5px;
          box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        }

        .modal-header {
          background: #d75a4a;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
        }

        .fail-p1 {
          text-align: center;
          color: #d75a4a;
          font-size: 24px;
          font-weight: 500;
        }

        .fail-p2 {
          color: #555555;
        }

        .fail-strong {
          font-weight: 500;
          font-size: 16px;
          color: #222222;
        }

        .fail-strong1 {
          font-weight: 500;
          font-size: 16px;
          color: #222222;
        }

        .fail-strong3 {
          font-weight: 500;
          font-size: 15px;
          color: #222222;
        }
      `}</style>
    </div>
  );
};

export default Fail;
