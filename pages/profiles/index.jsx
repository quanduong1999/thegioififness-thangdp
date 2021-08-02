import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import {profilesAPI} from "../api/profiles/profiles";

const Profies = () => {
  const initUserState = {id:"",name:"",ngaysinh:"",avatar:"", phonenumber: ""};
  const [userData,setUserData] = useState(initUserState);
  const {id,name,ngaysinh,avatar,phonenumber} = userData;
  const Router = useRouter();
  useEffect(()=>{
    profilesAPI.getProfiles()
    .then(res=>{
      console.log(res.data)
      setUserData(res.data)
    })
    .catch(err=> console.log(err))
  },[]);

  const handleChangeUpdataProfile = (e) => {
    const {name, value} = e.target;
    setUserData({...userData,[name]:value})
  }

  const handleUpdataProfile = (e) =>{
    e.preventDefault();
    const body = {
      "name": name,
      "phonenumber": phonenumber
    }

    profilesAPI.updataProfile(body)
      .then(res=>{
        // console.log(res)
        Router.replace("/profiles")
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="profiles">
      <div className="container">
        <h1 className="title">Admin Profiles</h1>

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
            value={phonenumber}
            onChange={handleChangeUpdataProfile}
          />
        </div>
        <div className="button-container">
          <button className="profile-button" onClick={handleUpdataProfile}>Lưu Thông Tin</button>
        </div>
      </div>
    </div>
  );
};

export default Profies;
