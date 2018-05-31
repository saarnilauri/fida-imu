import React from "react";
import PropTypes from "prop-types";
import ButtonGroup from "../ButtonGroup";

const EditAndRemove = props => (
  <ButtonGroup
    buttons={[
      {
        icon: "pencil",
        titleAttr: props.editTitleAttr,
        onClick: props.onClickEdit
      },
      {
        icon: "trash",
        titleAttr: props.removeTitleAttr,
        onClick: props.onClickRemove
      }
    ]}
  />
);

EditAndRemove.propTypes = {
  editTitleAttr: PropTypes.string,
  removeTitleAttr: PropTypes.string,
  onClickEdit: PropTypes.func.isRequired,
  onClickRemove: PropTypes.func.isRequired
};

export default EditAndRemove;
