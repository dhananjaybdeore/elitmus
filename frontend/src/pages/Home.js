import React from "react";
import Navbar from "../components/Navbar";
import "../stylesheets/Home.scss";

import { Link } from "react-router-dom";

function Home({}) {
  return (
    <>
      <Navbar />
      <div className="scenario__div">
        <p>
          A treasure hunter has made a mind-blowing discovery while mining.
          <br /> They found an ancient weapon that's believed to be hundreds of
          years old! It's said to be super important in the treasure hunt
          they're on.
          <br /> But wait, there's a catch - the hunter needs to find out the
          name of this weapon <br /> It's not going to be easy, but the treasure
          hunter is determined to crack the code and unlock the secrets that
          this weapon holds.
        </p>
        <Link to="/clue1">
          {/* <a href="Clue1.js"> */}
          <span>Help the hunter to find name of this weapon</span>
        </Link>
        {/* </a> */}
      </div>
    </>
  );
}
export default Home;
