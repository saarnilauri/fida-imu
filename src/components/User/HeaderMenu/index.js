import React from 'react'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'
import { AppHeaderDropdown } from '@coreui/react'
import { DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import SignOutButton from '../../SignOut'
import userIcon from '../../../assets/img/user.svg'

const UserHeaderMenu = props => (
  <AppHeaderDropdown direction="down">
    <DropdownToggle nav>
      <img src={userIcon} className="img-avatar" alt="" /> {props.user && props.user.email}
    </DropdownToggle>
    <DropdownMenu right style={{ right: 'auto' }}>
      <DropdownItem header tag="div" className="text-center">
        <strong>
          <FormattedMessage id="app.header.dropdown.accountHeader" />
        </strong>
      </DropdownItem>
      <DropdownItem>
        <Link to="account">
          <FontAwesome name="user" /> <FormattedMessage id="app.header.dropdown.profileLink" />
        </Link>
      </DropdownItem>
      <DropdownItem>
        <SignOutButton text={<FormattedMessage id="app.header.dropdown.signout" />} />
      </DropdownItem>
    </DropdownMenu>
  </AppHeaderDropdown>
)

UserHeaderMenu.propTypes = {
  user: PropTypes.object,
}

export default UserHeaderMenu
