import React, { useEffect } from "react";
import Link from "@material-ui/core/Link";
import { useState } from "react";
import { useRouter } from "next/dist/client/router";
import cookie from "js-cookie";
import validator from "validator";
import { Alert } from "react-bootstrap";
import { missPasswordAPI } from "./api/missPassword/missPassword";

const TakePassword = () => {
  const Router = useRouter();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const initTakePassword = { username: "", code: "", password: "" };
  const [takePasswordData, setTakePasswordData] = useState(initTakePassword);
  const { username, code, password } = takePasswordData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTakePasswordData({ ...takePasswordData, [name]: value });
  };

  const handleTakePassword = (e) => {
    e.preventDefault();
    if (validator.isEmail(username)) {
      const body = {
        email: username,
        code: code,
        newpw: password,
      };
      missPasswordAPI
        .takePassword(body)
        .then((res) => {
          // console.log(res)
          setShow(true);
          setMessage("Đổi mật khẩu thành công");
          Router.push("/login");
        })
        .catch((err) => {
          console.log(err);
          setShow(true);
          setMessage("Đổi mật khẩu không thành công");
        });
    } else {
      setShow(true);
      setMessage("Email không đúng định dạng");
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
          <label htmlFor="name">Email</label>
          <input
            type="email"
            className="form-control"
            id="role"
            name="username"
            value={username}
            pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
            required
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Mã code</label>
          <input
            type="text"
            className="form-control"
            id="role"
            name="code"
            value={code}
            required
            onChange={handleChange}
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
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-dark w-100"
          onClick={handleTakePassword}
        >
          Submit
        </button>
      </form>
      <div className="login-text-register" style={{ textAlign: "center" }}>
        <p className="my-2">
          Bạn có mật khẩu chưa?{" "}
          <Link href="/register">
            <span style={{ color: "crimson" }}>Đăng ký</span>
          </Link>
          <Link href="/login">
            <span style={{ color: "crimson", marginLeft: "10px" }}>
              Đăng nhập
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default TakePassword;
