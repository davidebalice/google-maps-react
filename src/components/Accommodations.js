import { useState, useEffect } from "react";
import "../App.css";

const Accommodations = ({ map, markers, handleMarkerClick }) => {
  return (
    <div className="colAccommodations">
      <>
        {map &&
          markers &&
          markers.map(({ title, address, photo, lat, lng }, i) => (
            <div
              key={i}
              onClick={() => {
                handleMarkerClick(i, lat, lng, title, address, photo);
              }}
            >
              dsfgdfgdfg
            </div>
          ))}
      </>
    </div>
  );
};

export default Accommodations;
