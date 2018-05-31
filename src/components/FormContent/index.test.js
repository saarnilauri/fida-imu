import React from "react";
import ReactDOM from "react-dom";
import FormContent from "./index";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<FormContent label="fi">Test</FormContent>, div);
  ReactDOM.unmountComponentAtNode(div);
});
