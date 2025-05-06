import React from "react";
import classes from "./Hero.module.css";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  return (
    <section className={classes.hero}>
      <h1 className={classes.title}>Welcome to Trackr</h1>
      <p className={classes.subtitle}>
        Track and manage your issues efficiently.
      </p>
      <div className={classes.buttonContainer}>
        <Link to="/register" className={classes.button}>
          Register
        </Link>
        <Link to="/login" className={classes.button}>
          Login
        </Link>
      </div>
    </section>
  );
};

export default Hero;