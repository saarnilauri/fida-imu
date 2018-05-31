import React from "react";
import ReactDOM from "react-dom";
import PasswordChangeForm from "./index";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<PasswordChangeForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
