import { Router } from "@material-ui/icons";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { Alert, Button, Card, CardColumns } from "react-bootstrap";
import { spaAPI } from "../api/spa/spa";

const Spa = () => {
  const Router = useRouter();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [spaData, setSpaData] = useState([]);

  useEffect(() => {
    spaAPI
      .getSpa()
      .then((res) => {
        // console.log(res);
        setSpaData(res.data);
      })
      .catch((err) => console.log(err));
  });

  const showDetail = (id) => (e) => {
    // console.log(id)
    Router.push(`/spa/detailSpa/${id}`)
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
        Danh sách cơ sở sức khỏe và làm đẹp
      </h2>
      <CardColumns className="home-teacher-content">
        {spaData.map((spa) => (
          <Card key={spa.id} className="home-teacher-card place-click">
            <Card.Img
              className="home-teacher-img"
              variant="top"
              src={spa.image}
              onClick={showDetail(spa.id)}
            />
            <Card.Body>
              <Card.Title>{spa.name}</Card.Title>
              <Card.Text>{spa.diachi} </Card.Text>
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

export default Spa;
