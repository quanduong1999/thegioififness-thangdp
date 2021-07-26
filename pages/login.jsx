import React, { useEffect } from "react";
import Link from "@material-ui/core/Link";
import { useState } from "react";
import { LoginAPI } from "./api/auth/login";
import { useRouter } from "next/dist/client/router";
import cookie from "js-cookie";

const Login = () => {
  const Router = useRouter();
  const loginState = { username: "", password: ""};
  const [userLogin, setUserLogin] = useState(loginState);
  const { username, password } = userLogin;
  const [message, setMessage] = useState("");

  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    setUserLogin({ ...userLogin, [name]: value });
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    const body = {
      username: username,
      password: password,
      role: "customer",
    };
    await LoginAPI.postLogin(body)
      .then((res) => {
        // console.log(res.data.token)
        cookie.set("token", res.data.token);
      })
      .catch((err) => console.log(err));
    const token = await cookie.get("token");
    console.log(token);
    if (token) {
      Router.replace("/profiles");
    } else {
      setMessage("Bạn đăng nhập chưa thành công");
    }
  };
  return (
    <div>
      <p>{message}</p>
      <form className="mx-auto my-4" style={{ maxWidth: "500px" }}>
        <div className="form-group">
          <label htmlFor="name">Username</label>
          <input
            type="text"
            className="form-control"
            id="role"
            name="username"
            value={username}
            onChange={handleChangeLogin}
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
            onChange={handleChangeLogin}
          />
        </div>

        <button
          type="submit"
          className="btn btn-dark w-100"
          onClick={handleSubmitLogin}
        >
          Đăng Nhập
        </button>
      </form>
      <div className="login-text-register" style={{ textAlign: "center" }}>
        <p className="my-2">
          No have an account?{" "}
          <Link href="/register">
            <span style={{ color: "crimson" }}>Đăng ký</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
