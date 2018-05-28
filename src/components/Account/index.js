import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { injectIntl } from 'react-intl'
import PageTitle from '../PageTitle'
import PageWrapper from '../PageWrapper'
import Card from '../Card'
import UserProfileForm from '../UserProfileForm'

// authUser.email
const AccountPage = props => (
  <div>
    <PageTitle title={props.intl.formatMessage({ id: 'account.page.title' })} />
    <PageWrapper>
      <Card title={props.intl.formatMessage({ id: 'account.page.subtitle' }, { name: props.authUser.email })}>
        <UserProfileForm formatMessage={props.intl.formatMessage} />
      </Card>
    </PageWrapper>
  </div>
)

AccountPage.propTypes = {
  authUser: PropTypes.object,
  intl: PropTypes.object,
}

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
})

export default compose(injectIntl, connect(mapStateToProps))(AccountPage)
