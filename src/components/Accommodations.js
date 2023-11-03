import { useState, useEffect } from "react";
import "../App.css";

const Accommodations = ({ map, markers, handleMarkerClick }) => {
  return (
    <div className="colAccommodations">
      <>
        {map &&
          markers &&
          markers.map(({ title, address, photo, lat, lng, description }, i) => (
            <div
              key={i}
              onClick={() => {
                handleMarkerClick(
                  i,
                  lat,
                  lng,
                  title,
                  address,
                  photo,
                  description
                );
              }}
              className="card"
            >
              <div className="imgContanier">
                <img src={photo} alt={title} className="img" />
              </div>
              <div className="textContanier">
                <div className="title">{title}</div>
                <div className="address">
                  <strong>Address: </strong>
                  {address}
                </div>
                <div className="description">{description}</div>
              </div>
            </div>
          ))}
      </>
    </div>
  );
};

export default Accommodations;
