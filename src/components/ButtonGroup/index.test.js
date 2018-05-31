import React from "react";
import ReactDOM from "react-dom";
import ButtonGroup from "./index";

const buttons = [
  {
    color: "primary",
    onClick: () => {},
    title: "test",
    type: "submit"
  }
];

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ButtonGroup buttons={buttons} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
