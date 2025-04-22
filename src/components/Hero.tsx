import React from "react";
import classes from "./Hero.module.css";

const Hero: React.FC = () => {
  return (
    <section className={classes.hero}>
      <h1 className={classes.title}>Welcome to Trackr</h1>
      <p className={classes.subtitle}>
        Track and manage your issues efficiently.
      </p>
      <div className={classes.buttonContainer}>
        <button
          className={classes.button}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#0056b3")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#007bff")
          }
        >
          Register
        </button>
        <button
          className={classes.button}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#0056b3")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#007bff")
          }
        >
          Login
        </button>
      </div>
    </section>
  );
};

export default Hero;
