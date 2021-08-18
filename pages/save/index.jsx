import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CardColumns, Card, Button } from "react-bootstrap";
import { saveAPI } from "../api/save/save";
import withAuth from "../HOC/withAuth";

const Save = () => {
  const Router = useRouter();
  const [savePlaceData, setSavePlaceData] = useState([]);

  useEffect(() => {
    saveAPI
      .getLovePlace()
      .then((res) => {
        console.log(res.data)
        setSavePlaceData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const showDetail = (id) => (e) => {
    // console.log(id)
    Router.replace(`home/detailplace/${id}`);
  };

  const deletePlace = (id) => (e) => {
    // console.log(id)
    saveAPI.getUnLove(id)
      .then(res=>{
        // console.log(res)
        window.location.reload();
      })
      .catch(err=>console.log(err))
  }

  return (
    <div className="save-place">
      <div className="container home-teacher">
        <h2 className="home-teacher-title">Danh sách phòng tập đã lưu</h2>
        <CardColumns className="home-teacher-content">
          {savePlaceData.map((place) => (
            <Card key={place.id} className="home-teacher-card place-click">
              <Card.Img
                className="home-teacher-img"
                variant="top"
                src={place.place==null?"":place.place.image}
                onClick={showDetail(place.place==null?"":place.place.id)}
              />
              <Card.Body>
                <Card.Title>{place.place==null?"":place.place.name}</Card.Title>
                <Card.Text>{place.place==null?"":place.place.diachi} </Card.Text>
              </Card.Body>
              <Button variant="danger" onClick={deletePlace(place.place==null?"":place.place.id)}>Xóa</Button>
            </Card>
          ))}
        </CardColumns>
      </div>
    </div>
  );
};

export default withAuth(Save);
