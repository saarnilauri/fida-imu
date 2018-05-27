import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Card, CardBody } from 'reactstrap'
import withAuthorization from '../Session/withAuthorization'
import { db } from '../../firebase'
import PageWrapper from '../PageWrapper'
import PageTitle from '../PageTitle'

class UsersPage extends Component {
  componentDidMount() {
    const { onSetUsers } = this.props

    db.onceGetUsers().then(snapshot => onSetUsers(snapshot.val()))
  }

  render() {
    const { users } = this.props

    return (
      <div>
        <PageTitle title="Users" />
        <PageWrapper>
          <Card className="p-4">
            <CardBody>{!!users && <UserList users={users} />}</CardBody>
          </Card>
        </PageWrapper>
      </div>
    )
  }
}

UsersPage.propTypes = {
  onSetUsers: PropTypes.func,
  users: PropTypes.object,
}

const UserList = ({ users }) => (
  <div>
    <h2>List of Usernames of Users</h2>
    <ul>{Object.keys(users).map(key => <li key={key}>{users[key].username}</li>)}</ul>
  </div>
)

UserList.propTypes = {
  users: PropTypes.object,
}

const mapStateToProps = state => ({
  users: state.userState.usersCollection,
})

const mapDispatchToProps = dispatch => ({
  onSetUsers: users => dispatch({ type: 'USERS_SET', usersCollection: users }),
})

const authCondition = authUser => !!authUser

export default compose(withAuthorization(authCondition), connect(mapStateToProps, mapDispatchToProps))(UsersPage)
