import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { Alert, Button, Card, CardColumns } from "react-bootstrap";
import { sportAPI } from "../api/sport/sport";

const Sport = () => {
    const Router = useRouter();
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [sportData, setSportData] = useState([]);

  useEffect(() => {
    sportAPI
      .getSport()
      .then((res) => {
        console.log(res);
        setSportData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const showDetail = (id) => (e) => {
    // console.log(id)
    Router.push(`/sport/detailSport/${id}`);
  };

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
      <h2 className="home-teacher-title">
        Danh sách cơ sở thể thao và giải trí
      </h2>
      <CardColumns className="home-teacher-content">
        {sportData.map((sport) => (
          <Card key={sport.id} className="home-teacher-card place-click">
            <Card.Img
              className="home-teacher-img"
              variant="top"
              src={sport.image}
              onClick={showDetail(sport.id)}
            />
            <Card.Body>
              <Card.Title>{sport.name}</Card.Title>
              <Card.Text>{sport.diachi} </Card.Text>
              {/* {arr.map((arrs) => (
                <>
                  {arrs.check == true && arrs.id == sport.id ? (
                    <Button variant="danger" disabled>
                      Đã Lưu
                    </Button>
                  ) : (
                    ""
                  )}
                  {arrs.check == false && arrs.id == sport.id ? (
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
              ))} */}
            </Card.Body>
          </Card>
        ))}
      </CardColumns>
    </div>
  );
};

export default Sport;
