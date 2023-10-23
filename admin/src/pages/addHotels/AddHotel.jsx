import React, { useState } from "react";

import "./AddHotel.css";

const AddHotel = () => {
  const [error, setError] = useState(false);
  const [formValues, setFormValues] = useState({});



  const hanleChhang = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(validate(formValues));
  };

  const validate = (values) => {
    if (
      !values.name ||
      !values.city ||
      !values.type ||
      !values.rooms ||
      !values.address ||
      !values.distance ||
      !values.photos ||
      !values.title ||
      !values.decs ||
      !values.featured ||
      !values.cheapestPrice
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="container">
      <div className="addRoom__container">
        <div className="addRoomInfo">
          <div className="addRoomInfo__board">
            <div className="addRoomInfo__board-title">
              <h2>Add New Hotels</h2>
            </div>

            <div className="addRoomInfo__board-table">
              <form className="form" onClick={handleSubmit}>
                <div className="form-control">
                  <div className="input-label">
                    <label htmlFor="">Name</label>
                  </div>
                  <input type="text" name="name" onChange={hanleChhang}></input>
                </div>

                <div className="form-control">
                  <div className="input-label">
                    <label htmlFor="">Type</label>
                  </div>
                  <input type="text" name="type" onChange={hanleChhang}></input>
                </div>

                <div className="form-control">
                  <div className="input-label">
                    <label htmlFor="">City</label>
                  </div>
                  <input type="text" name="city" onChange={hanleChhang}></input>
                </div>

                <div className="form-control">
                  <div className="input-label">
                    <label htmlFor="">Address</label>
                  </div>
                  <input
                    type="text"
                    name="address"
                    onChange={hanleChhang}
                  ></input>
                </div>

                <div className="form-control">
                  <div className="input-label">
                    <label htmlFor="">Distance From City Center</label>
                  </div>
                  <input
                    type="text"
                    name="distance"
                    onChange={hanleChhang}
                  ></input>
                </div>

                <div className="form-control">
                  <div className="input-label">
                    <label htmlFor="">Title</label>
                  </div>
                  <input
                    type="text"
                    name="Title"
                    onChange={hanleChhang}
                  ></input>
                </div>

                <div className="form-control">
                  <div className="input-label">
                    <label htmlFor="">Description</label>
                  </div>
                  <input type="text" name="decs" onChange={hanleChhang}></input>
                </div>

                <div className="form-control">
                  <div className="input-label">
                    <label htmlFor="">Price</label>
                  </div>
                  <input
                    type="text"
                    name="cheapestPrice"
                    onChange={hanleChhang}
                  ></input>
                </div>

                <div className="form-control">
                  <div className="input-label">
                    <label htmlFor="">Featured</label>
                  </div>
                  <select name="featured" id="featured" onChange={hanleChhang}>
                    <option hidden>Select Yes and No</option>
                    <option value={true}>YES</option>
                    <option value={false}>No</option>
                  </select>
                </div>

                <div className="form-control-room">
                  <div className="input-label">
                    <label htmlFor="">Rooms</label>
                  </div>
                  <textarea
                    name="rooms"
                    id="rooms"
                    cols="20"
                    rows="3"
                    placeholder="Give comma between rooms title."
                    onChange={hanleChhang}
                  ></textarea>
                </div>
                <div className="form-control">
                  <button className="add-button" type="submit">
                    Add Hotel
                  </button>
                </div>
              </form>
            </div>
            <div className="error">
              {error && (
                <span className="error">Must Enter All Information!</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHotel;
