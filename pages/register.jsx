import Head from "next/head";
import Link from "next/link";
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { RegisterAPI } from "./api/auth/register";
import validator from "validator";
import { Alert } from "react-bootstrap";

const Register = () => {
  const Router = useRouter();
  const initialState = { username: "", phone: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { username, phone, password } = userData;
  const [status, setStatus] = useState();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validator.isEmail(username)) {
      const body = {
        username: username,
        password: password,
        role: "customer",
        customer: {
          phonenumber: phone,
        },
      };
      console.log(body);
      RegisterAPI.postRegister(body)
        .then((res) => {
          console.log(res);
          Router.replace("/login");
        })
        .catch((err) => {
          console.log(err)
          setShow(true);
          setMessage("Đăng Ký không thành công")
        });
    } else {
      setShow(true);
      setMessage("Nhập đúng email của bạn");
    }
  };
  return (
    <div>
      <Head>
        <title>Register Page</title>
      </Head>

      <form className="mx-auto my-4" style={{ maxWidth: "500px" }}>
        <div className="form-group">
          <label htmlFor="name">Email</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="username"
            value={username}
            onChange={handleChangeInput}
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
          <label htmlFor="name">Phone</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="phone"
            value={phone}
            onChange={handleChangeInput}
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={password}
            onChange={handleChangeInput}
          />
        </div>

        <button
          type="submit"
          className="btn btn-dark w-100"
          onClick={handleSubmit}
        >
          Register
        </button>
      </form>
      <p className="my-2" style={{textAlign: "center"}}>
        Already have an account?{" "}
        <Link href="/login">
          <a style={{ color: "crimson" }}>Login Now</a>
        </Link>
      </p>
    </div>
  );
};

export default Register;
