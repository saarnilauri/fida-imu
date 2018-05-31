import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { injectIntl } from 'react-intl'
import ReactTable from 'react-table'

import CenteredLoader from '../../CenteredLoader'
import Checkbox from '../../Checkbox'
import { collectionToArray } from '../../../constants/utils'
import { getMapDispatchToProps } from '../../../reducers/curriedFirebase'

class UserList extends Component {
  constructor(props) {
    super(props)

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)

    this.setTableSettings()
  }

  componentDidMount() {
    if (!this.props.ready) {
      this.props.loadUsers()
    }
  }

  setTableSettings() {
    const { formatMessage } = this.props.intl
    this.tableColumns = [
      { Header: formatMessage({ id: 'user.list.table.header.username' }), accessor: 'username' },
      {
        Header: formatMessage({ id: 'user.list.table.header.activated' }),
        id: 'isActive',
        width: 70,
        accessor: d => (
          <div style={{ textAlign: 'center' }}>
            <Checkbox handleCheckboxChange={this.handleCheckboxChange} isChecked={d.isActive} isSimple label={d.uid} />
          </div>
        ),
      },
      {
        id: 'roles',
        Header: formatMessage({ id: 'user.list.table.header.roles' }),
        accessor: d => Object.keys(d.roles).join(', '),
      },
    ]
    this.tableSort = [
      {
        id: 'username',
      },
    ]
  }

  handleCheckboxChange(uid) {
    this.props.loadUser(uid, false).then(user => {
      const newUserState = { ...user, isActive: !user.isActive }
      delete newUserState.uid
      this.props.updateUser(uid, newUserState)
    })
  }

  render() {
    const { ready, data } = this.props
    const view = ready ? (
      <React.Fragment>
        <ReactTable
          data={data}
          columns={this.tableColumns}
          defaultSorted={this.tableSort}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </React.Fragment>
    ) : (
      <CenteredLoader />
    )
    return view
  }
}

UserList.defaultProps = { ready: false }

UserList.propTypes = {
  data: PropTypes.array,
  ready: PropTypes.bool,
  intl: PropTypes.object,
  loadUsers: PropTypes.func,
  loadUser: PropTypes.func,
  updateUser: PropTypes.func,
}

export { UserList }

const mapDispatchToProps = getMapDispatchToProps('user')

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
  data: state.userState.collectionReady === true ? collectionToArray(state.userState.usersCollection) : [],
  ready: state.userState.collectionReady,
  activeUser: state.userState.user,
})

const EnhanchedUserList = compose(injectIntl, connect(mapStateToProps, mapDispatchToProps))(UserList)

export default EnhanchedUserList
