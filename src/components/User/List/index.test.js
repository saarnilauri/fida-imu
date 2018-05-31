import React from "react";
import ReactDOM from "react-dom";
import { UserList } from "./index";

// const fbConfig = {}
const intlMock = {
  formatMessage: object => {
    return object.id;
  }
};

const loadmock = () => {};

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<UserList intl={intlMock} loadUsers={loadmock} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
