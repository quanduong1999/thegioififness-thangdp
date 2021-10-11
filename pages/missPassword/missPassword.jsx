import { Link } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import validator from "validator";
import { missPasswordAPI } from "../api/missPassword/missPassword";

const MissPassWord = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const initMissPassword = { username: "" };
  const [missPasswordData, setMissPasswordData] = useState(initMissPassword);
  const { username } = missPasswordData;
  const Router = useRouter();

  const handleChangeEmail = (e) => {
    const { name, value } = e.target;
    setMissPasswordData({ ...missPasswordData, [name]: value });
  };

  const handleMissPassword = (e) => {
    e.preventDefault();
    if (validator.isEmail(username)) {
      const body = {
        email: username,
      };
      missPasswordAPI
        .missPassword(body)
        .then((res) => {
          console.log(res);
          setShow(true);
          setMessage("Check mã code mail");
          Router.replace("/takePassword");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      {show ? (
        <Alert
          variant="danger"
          className="alert-noti"
          onClose={() => setShow(false)}
          dismissible
        >
          <Alert.Heading>{message}</Alert.Heading>
        </Alert>
      ) : (
        ""
      )}
      <form className="mx-auto my-4" style={{ maxWidth: "500px" }}>
        <div className="form-group">
          <label htmlFor="name">Hãy nhập mail của bạn</label>
          <input
            type="email"
            className="form-control"
            id="role"
            name="username"
            value={username}
            pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
            required
            onChange={handleChangeEmail}
          />
        </div>
        <span
          style={{
            fontWeight: "bold",
            color: "red",
          }}
        >
          {show ? (
            <Alert
              variant="danger"
              className="alert-noti"
              onClose={() => setShow(false)}
              dismissible
            >
              <Alert.Heading>{message}</Alert.Heading>
            </Alert>
          ) : (
            ""
          )}
        </span>

        <button
          type="submit"
          className="btn btn-dark w-100"
          onClick={handleMissPassword}
        >
          Lấy mã
        </button>
      </form>
      <div className="login-text-register" style={{ textAlign: "center" }}>
        <p className="my-2">
          Bạn có mật khẩu chưa?{" "}
          <Link href="/register">
            <span style={{ color: "crimson" }}>Đăng ký</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default MissPassWord;
