import React, { Component } from 'react'
import { Col, Row } from 'reactstrap'

import Card from '../../Card'
import PageTitle from '../../PageTitle'
import PageWrapper from '../../PageWrapper'
import EnhanchedUserList from '../List'

class UserAdminPage extends Component {
  render() {
    return (
      <React.Fragment>
        <PageTitle title="User administration" />
        <PageWrapper>
          <Row>
            <Col sm="12" md="9">
              <Card noPadding title="Users">
                <EnhanchedUserList />
              </Card>
            </Col>
          </Row>
        </PageWrapper>
      </React.Fragment>
    )
  }
}

export default UserAdminPage
