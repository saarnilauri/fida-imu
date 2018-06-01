import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'reactstrap'
import { injectIntl } from 'react-intl'

import Card from '../../Card'
import PageTitle from '../../PageTitle'
import PageWrapper from '../../PageWrapper'
import EnhanchedUserList from '../List'

const UserAdminPage = props => {
  const { formatMessage } = props.intl
  return (
    <React.Fragment>
      <PageTitle title={formatMessage({ id: 'user.list.page.title' })} />
      <PageWrapper>
        <Row>
          <Col sm="12" md="8">
            <Card noPadding title={formatMessage({ id: 'user.list.page.subtitle' })}>
              <EnhanchedUserList />
            </Card>
          </Col>
        </Row>
      </PageWrapper>
    </React.Fragment>
  )
}

UserAdminPage.propTypes = {
  intl: PropTypes.object,
}

export default injectIntl(UserAdminPage)
