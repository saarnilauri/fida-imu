import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Label } from "reactstrap";
import uuid from "uuid";
import Checkbox from "../Checkbox";

const roles = [
  "missionary",
  "admin",
  "joti",
  "communications",
  "partner",
  "church",
  "church"
];

const UserRoles = props => (
  <FormGroup>
    <div>
      <Label>User roles</Label>
    </div>
    <div>
      {roles.map(role => (
        <Checkbox
          isChecked={props.roles[role]}
          label={role}
          handleCheckboxChange={props.handleCheckboxChange}
          key={uuid()}
        />
      ))}
    </div>
  </FormGroup>
);

UserRoles.defaultProps = {
  roles: {}
};

UserRoles.propTypes = {
  handleCheckboxChange: PropTypes.func.isRequired,
  roles: PropTypes.object
};

export default UserRoles;
