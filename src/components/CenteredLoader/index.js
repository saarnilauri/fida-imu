import React from "react";
import Loader from "../Loader";
import "./style.css";

const CenteredLoader = () => (
  <div className="Aligner">
    <div className="Aligner-item">
      <Loader />
    </div>
  </div>
);

export default CenteredLoader;
