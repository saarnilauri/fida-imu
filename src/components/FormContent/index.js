import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Label } from "reactstrap";

const FormContent = ({ id, label, className, children }) => (
  <FormGroup className={className}>
    <Label for={id}>{label}</Label>
    <div id={id}>{children}</div>
  </FormGroup>
);

FormContent.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string
  ])
};

export default FormContent;
