import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose'
// import PasswordChangeForm from '../PasswordChange'
import withAuthorization from '../Session/withAuthorization'
import PageTitle from '../PageTitle'
import PageWrapper from '../PageWrapper'
import Card from '../Card'
import UserProfileForm from '../UserProfileForm'

const AccountPage = ({ authUser }) => (
  <div>
    <PageTitle title="User account" />
    <PageWrapper>
      <Card title={`Account details for ${authUser.email}`}>
        {
          // <PasswordChangeForm />
        }
        <UserProfileForm />
      </Card>
    </PageWrapper>
  </div>
)

AccountPage.propTypes = {
  authUser: PropTypes.object,
}

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
})

const authCondition = authUser => !!authUser

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps),
)(AccountPage)
