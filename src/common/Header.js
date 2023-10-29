import React from "react";
import classes from "./Header.module.css";
import logo from "./../assets/img/logo.png";

const Header = () => {
  return (
    <>
      <header className={classes.header}>
        <div className="header-area">
          <div className="main-header header-sticky">
            <div className="container-fluid">
              <div className="row align-items-center">
                <div className="col-xl-2 col-lg-2 col-md-1">
                  <div className={classes.logoContainer}>
                    <img src={logo} alt="db logo" className={classes.logo} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
