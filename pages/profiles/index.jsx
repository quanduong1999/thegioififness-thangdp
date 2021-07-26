import React, { useEffect } from "react";
import { useState } from "react";
import {profilesAPI} from "../api/profiles/profiles";

const Profies = () => {
  const initUserState = {id:"",name:"",ngaysinh:"",avatar:"", phonenumber: ""};
  const [userData,setUserData] = useState(initUserState);
  const {id,name,ngaysinh,avatar,phonenumber} = userData;
  useEffect(()=>{
    profilesAPI.getProfiles()
    .then(res=>{
      // console.log(res.data)
      setUserData(res.data)
    })
    .catch(err=> console.log(err))
  });
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
            value={userData.name}
          />
          <label htmlFor="name" className="profile-textlabel">
            PhoneNumber
          </label>
          <br />
          <input
            id="name"
            type="text"
            className="profile-input"
            value={userData.phonenumber}
          />
        </div>
        <div className="button-container">
          <button className="profile-button">Lưu Thông Tin</button>
        </div>
      </div>
    </div>
  );
};

export default Profies;
