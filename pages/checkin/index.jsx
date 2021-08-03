import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { placeAPI } from "../api/place/place";
import { Button } from "react-bootstrap";
import { checkInAPI } from "../api/checkin/checkin";

const CheckIn = () => {
  const Router = useRouter();
  const [message, setMessage] = useState("");
  const [selectPlace, setSelectPlace] = useState([]);
  const [idPlace, setIdPlace] = useState("");

  useEffect(() => {
    placeAPI
      .getAllPlace()
      .then((res) => {
        // console.log(res)
        setSelectPlace(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChangePlace = (e) => {
    //   console.log(e.target.value)
    setIdPlace(e.target.value);
  };

  const handleSubmitCheckIn = (e) => {
    e.preventDefault();
    const body = {
      code: "1234",
      place: idPlace,
    };
    checkInAPI
      .checkIn(body)
      .then((res) => {
        console.log(res);
        
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="checkin">
      <div className="container">
        <h5 className="checkin-h5">Hãy chọn địa điểm để nhận mã CheckIn</h5>
        <div className="checkin-select">
          <select
            name="place"
            className="checkin-select-place"
            onChange={handleChangePlace}
          >
            <option selected disabled>
              Choose an option
            </option>
            {selectPlace.map((place) => (
              <option key={place.id} value={place.id}>{place.diachi}</option>
            ))}
          </select>
        </div>
        <div className="checkin-submit-place">
          <Button
            variant="danger"
            className="checkin-submit-place-button"
            onClick={handleSubmitCheckIn}
          >
            Check In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckIn;
