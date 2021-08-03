import React, { useEffect } from "react";
import { useState } from "react";
import { Card, CardColumns, Button } from "react-bootstrap";
import { placeAPI } from "../api/place/place";

function Place() {
  const [placeData, setPlaceData] = useState([]);
  useEffect(() => {
    placeAPI
      .getAllPlace()
      .then((res) => {
        // console.log(res);
        setPlaceData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="container home-teacher">
      <h2 className="home-teacher-title">Danh sách phòng tập</h2>
      <CardColumns className="home-teacher-content">
        {placeData.map((place) => (
          <Card key={place.id} className="home-teacher-card">
            <Card.Img
              className="home-teacher-img"
              variant="top"
              src="/place/about1.jpg"
            />

            <Card.Body>
              <Card.Title>{place.name}</Card.Title>
              <Card.Text>
                {place.diachi}{" "}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}

      </CardColumns>
    </div>
  );
}

export default Place;
