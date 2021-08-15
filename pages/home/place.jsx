import { Router } from "@material-ui/icons";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { Card, CardColumns, Button } from "react-bootstrap";
import { placeAPI } from "../api/place/place";
import Cookies from "js-cookie";

function Place() {
  const Router = useRouter();
  const [placeData, setPlaceData] = useState([]);
  const [message, setMessage] = useState("");
  const token = Cookies.get("token");
  useEffect(() => {
    placeAPI
      .getAllPlace()
      .then((res) => {
        // console.log(res);
        setPlaceData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const showDetail = id => e => {
    // console.log(id)
    Router.replace(`home/detailplace/${id}`)
  }

  const lovePlace = id => e => {
    const body = {
      placeid: id
    }
    if(!token){
      setMessage("Hãy đăng nhập để Lưu")
    }else{
      placeAPI.lovePlace(body)
        .then(res => {
          console.log(res)
          Router.replace("/save");
        })
        .catch(err=>console.log(err))
    }
  }

  return (
    <div className="container home-teacher">
      <h2 className="home-teacher-title">Danh sách phòng tập</h2>
      <CardColumns className="home-teacher-content">
        {placeData.map((place) => (
         <Card key={place.id} className="home-teacher-card place-click">
             <Card.Img
              className="home-teacher-img"
              variant="top"
              src={place.image}
              onClick={showDetail(place.id)}
            />
            <Card.Body>
              <Card.Title>{place.name}</Card.Title>
              <Card.Text>
                {place.diachi}{" "}
              </Card.Text>
              <Button variant="danger" onClick={lovePlace(place.id)}>Lưu</Button>
            </Card.Body>
          </Card>
        ))}
      </CardColumns>
    </div>
  );
}

export default Place;
