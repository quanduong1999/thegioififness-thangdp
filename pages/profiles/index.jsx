import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { profilesAPI } from "../api/profiles/profiles";
import Cookies from "js-cookie";

const Profies = () => {
  const initUserState = {
    id: "",
    name: "",
    ngaysinh: "",
    avatar: "",
    phonenumber: "",
  };
  const token = Cookies.get("token")
  const [userData, setUserData] = useState(initUserState);
  const [xu, setXu] = useState();
  const { id, name, ngaysinh, avatar, phonenumber } = userData;
  const Router = useRouter();
  useEffect(() => {
    if(token){
      profilesAPI
      .getProfiles()
      .then((res) => {
        console.log(res.data);
        setUserData(res.data.user);
        setXu(res.data.xu);
      })
      .catch((err) => console.log(err));
    }
    
  }, []);

  const handleChangeUpdataProfile = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleUpdataProfile = (e) => {
    e.preventDefault();
    const body = {
      name: name,
      phonenumber: phonenumber,
    };

    profilesAPI
      .updataProfile(body)
      .then((res) => {
        console.log(res);
        Router.replace("/profiles");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="profiles">
      <div className="container">
        <h1 className="title">Customer Profiles</h1>

        <div className="profile-gird-name">
          <label htmlFor="name" className="profile-textlabel">
            Name
          </label>
          <br />
          <input
            id="name"
            type="text"
            className="profile-input"
            name="name"
            value={name}
            onChange={handleChangeUpdataProfile}
          />
          <label htmlFor="name" className="profile-textlabel">
            PhoneNumber
          </label>
          <br />
          <input
            id="name"
            type="text"
            className="profile-input"
            name="phonenumber"
            value={userData.phonenumber}
            onChange={handleChangeUpdataProfile}
          />
        </div>
        <label htmlFor="name" className="profile-textlabel">
          Số xu
        </label>
        <h1>{xu}</h1>
        <div className="button-container">
          <button className="profile-button" onClick={handleUpdataProfile}>
            Lưu Thông Tin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profies;
