import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import CenteredLoader from '../../CenteredLoader'
import Checkbox from '../../Checkbox'
import { collectionToArray } from '../../../constants/utils'
import { getMapDispatchToProps } from '../../../reducers/curriedFirebase'

class UserList extends Component {
  constructor(props) {
    super(props)

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)

    this.tableColumns = [
      { Header: 'User name', accessor: 'username' },
      {
        Header: 'Activated',
        id: 'isActive',
        width: 70,
        accessor: d => (
          <div style={{ textAlign: 'center' }}>
            <Checkbox handleCheckboxChange={this.handleCheckboxChange} isChecked={d.isActive} isSimple label={d.uid} />
          </div>
        ),
      },
      { id: 'roles', Header: 'Roles', accessor: d => Object.keys(d.roles).join(', ') },
    ]
    this.tableSort = [
      {
        id: 'username',
      },
    ]
  }

  componentDidMount() {
    if (!this.props.ready) {
      this.props.loadUsers()
    }
  }

  handleCheckboxChange(uid) {
    this.props.loadUser(uid, false).then(user => {
      // console.log(user)
      const newUserState = { ...user, isActive: !user.isActive }
      const { uid } = user
      delete newUserState.uid
      // console.log(newUserState)
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

const EnhanchedUserList = connect(mapStateToProps, mapDispatchToProps)(UserList)

export default EnhanchedUserList
