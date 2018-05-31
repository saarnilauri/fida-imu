import React from "react";
import ReactDOM from "react-dom";
import PageWrapper from "./index";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<PageWrapper>Test</PageWrapper>, div);
  ReactDOM.unmountComponentAtNode(div);
});
