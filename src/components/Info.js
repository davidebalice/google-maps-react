import React from "react";
import github from "../assets/img/github2.png";

const Info = () => {
  return (
    <div className="infoContainer">
      React implemetation of Google Maps Api with search function. Click to
      accommodations to discover position on map.
      <br />
      <a
        href="https://github.com/davidebalice/google-maps-react"
        rel="noreferrer"
        target="_blank"
      >
        <img src={github} alt="github logo" className="github" />
      </a>
    </div>
  );
};

export default Info;
