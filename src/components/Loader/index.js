import React from "react";
import oval from "./oval.svg";

const Loader = () => (
  <div styles={{ margin: 20 }}>
    <img src={oval} alt="Loading..." />
  </div>
);

export default Loader;
