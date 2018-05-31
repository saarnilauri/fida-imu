import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Label } from "reactstrap";
import { injectIntl } from "react-intl";
import uuid from "uuid";
import Fontawesome from "react-fontawesome";
import Radiobutton from "../../Radiobutton";

const components = ["plant", "multiply", "renew"];

const Components = props => (
  <FormGroup>
    <Label>
      <Fontawesome name="cube" /> Strategic components
    </Label>
    <div>
      {components.map(comp => (
        <Radiobutton
          name="components"
          isChecked={props.selected === comp}
          label={comp}
          fieldLabel={props.intl.formatMessage({
            id: `components.radiolabel.${comp}`
          })}
          value={comp}
          onChange={props.onChangeComponent}
          key={uuid()}
        />
      ))}
    </div>
  </FormGroup>
);

Components.propTypes = {
  onChangeComponent: PropTypes.func.isRequired,
  selected: PropTypes.string,
  intl: PropTypes.object.isRequired
};

export default injectIntl(Components);
