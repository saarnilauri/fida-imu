import React from 'react'
import PropTypes from 'prop-types'
import { Col, FormGroup, Label } from 'reactstrap'
import Checkbox from '../Checkbox'

const roles = ['missionary', 'admin', 'joti', 'communications', 'partner', 'church', 'church']

const UserRoles = props => (
  <FormGroup>
    <Col md="3">
      <Label>User roles</Label>
    </Col>
    <Col md="9">
      {roles.map(role => (
        <Checkbox
          isChecked={props.roles[role]}
          label={role}
          handleCheckboxChange={props.handleCheckboxChange}
          key={Math.random() * 10000}
        />
      ))}
    </Col>
  </FormGroup>
)

UserRoles.propTypes = {
  handleCheckboxChange: PropTypes.func.isRequired,
  roles: PropTypes.object,
}

export default UserRoles
