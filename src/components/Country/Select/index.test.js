import React from "react";
import ReactDOM from "react-dom";
import { CountrySelect } from "./index";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<CountrySelect />, div);
  ReactDOM.unmountComponentAtNode(div);
});
