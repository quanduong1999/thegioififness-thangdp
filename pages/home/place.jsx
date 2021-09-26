import { Router } from "@material-ui/icons";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { Card, CardColumns, Button, Alert } from "react-bootstrap";
import { placeAPI } from "../api/place/place";
import Cookies from "js-cookie";
import { saveAPI } from "../api/save/save";

function Place() {
  const Router = useRouter();
  const [placeData, setPlaceData] = useState([]);
  const [arr, setArr] = useState([]);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [lovePlaces, setLovePlaces] = useState(false);
  const [idLovePlace, setIdLovePlace] = useState([]);
  const token = Cookies.get("token");
  useEffect(() => {
    placeAPI
      .getAllPlace()
      .then((res) => {
        // console.log(res.data);
        setPlaceData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const showDetail = (id) => (e) => {
    // console.log(id)
    Router.replace(`home/detailplace/${id}`);
  };

  const lovePlace = (id) => (e) => {
    const body = {
      place: id,
    };
    if (!token) {
      setShow(true);
      setMessage("Hãy đăng nhập để Lưu");
    } else {
      placeAPI
        .lovePlace(body)
        .then((res) => {
          // console.log(res);
          Router.replace("/save");
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    saveAPI
      .getLovePlace()
      .then((res) => {
        // console.log(res.data);
        setIdLovePlace(res.data);
      })
      .catch((err) => console.log(err));
  },[placeData]);

  useEffect(() => {
    let i;
    let j;
    for (i = 0; i < placeData.length; i++) {
      for (j = 0; j < idLovePlace.length; j++) {
        if (idLovePlace[j].place.id == placeData[i].id) {
          if (arr.length < placeData.length) {
            arr.push({
              id: placeData[i].id,
              check: true,
            });
            break;
          }
        }
        if (j == idLovePlace.length - 1 && arr.length < placeData.length) {
          arr.push({
            id: placeData[i].id,
            check: false,
          });
        }
      }
    }
    setArr(arr);
  },[placeData, idLovePlace]);

  return (
    <div className="container home-teacher">
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
      <h2 className="home-teacher-title">Danh sách phòng tập</h2>
      <CardColumns className="home-teacher-content">
        {placeData.map((place) => (
          <Card key={place.id} className="home-teacher-card place-click">
            <Card.Img
              className="home-teacher-img"
              variant="top"
              src={place.image.split(",")[0]}
              onClick={showDetail(place.id)}
            />
            <Card.Body>
              <Card.Title>{place.name}</Card.Title>
              <Card.Text>{place.diachi} </Card.Text>
              {arr.map((arrs) => (
                <>
                  {arrs.check == true && arrs.id == place.id ? (
                    <Button variant="danger" disabled>
                      Đã Lưu
                    </Button>
                  ) : (
                    ""
                  )}
                  {arrs.check == false && arrs.id == place.id ? (
                    <Button variant="danger" onClick={lovePlace(place.id)}>
                      Lưu
                    </Button>
                  ) : (
                    ""
                  )}
                  {arrs.check == null ? (
                    <Button variant="danger" onClick={lovePlace(place.id)}>
                      Lưu
                    </Button>
                  ) : (
                    ""
                  )}
                </>
              ))}
            </Card.Body>
          </Card>
        ))}
      </CardColumns>
    </div>
  );
}

export default Place;
