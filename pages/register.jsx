import Head from "next/head";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { RegisterAPI } from "./api/auth/register";

const Register = () => {
  const Router = useRouter();
  const initialState = { username: "", phone: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { username, phone, password } = userData;
  const [status, setStatus] = useState();
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      "username": username,
      "password": password,
      "role": "customer",
      "customer": {
        "phonenumber": phone,
      },
    };
    console.log(body);
    RegisterAPI.postRegister(body)
      .then((res) => {
        console.log(res);
        Router.replace("/login");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Head>
        <title>Register Page</title>
      </Head>

      <form className="mx-auto my-4" style={{ maxWidth: "500px" }}>
        <div className="form-group">
          <label htmlFor="name">Name/Email</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="username"
            value={username}
            onChange={handleChangeInput}
          />
        </div>

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
      <p className="my-2">
        Already have an account?{" "}
        <Link href="/login">
          <a style={{ color: "crimson" }}>Login Now</a>
        </Link>
      </p>
    </div>
  );
};

export default Register;
