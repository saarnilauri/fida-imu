import React from "react";
import PropTypes from "prop-types";
import Fontawesome from "react-fontawesome";
import { Button } from "reactstrap";
import { injectIntl } from "react-intl";

const EditModeToggleButton = props => {
  const { formatMessage } = props.intl; // Due prettier problem
  /* eslint-disable */ return (
    <Button color="secondary" size="sm" onClick={props.onClick}>
      <Fontawesome name={!props.editMode ? "cog" : "eye"} />{" "}
      {!props.editMode
        ? formatMessage({ id: "actions.edit" })
        : formatMessage({ id: "actions.view" })}{" "}
      {formatMessage({ id: "noun.results_chain" })}
    </Button>
  );
  /* eslint-enable */
};

EditModeToggleButton.propTypes = {
  intl: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired
};

export { EditModeToggleButton };
const EnhachedEditModeToggleButton = injectIntl(EditModeToggleButton);
export default EnhachedEditModeToggleButton;
