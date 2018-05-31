import React from "react";
import ReactDOM from "react-dom";
import ErrorMsg from "./index";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ErrorMsg error="test" />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders without crashing if error not assigned", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ErrorMsg error={null} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
