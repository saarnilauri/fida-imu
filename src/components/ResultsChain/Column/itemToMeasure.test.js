import React from "react";
import ReactDOM from "react-dom";
import ItemToMeasure from "./ItemToMeasure";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ItemToMeasure onResize={() => {}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
