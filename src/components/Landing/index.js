import React from 'react'
import { Card, CardBody } from 'reactstrap'
import PageTitle from '../PageTitle'
import PageWrapper from '../PageWrapper'

const LandingPage = () => (
  <React.Fragment>
    <PageTitle title="Fida IMU Key Indicator Reports" />
    <PageWrapper>
      <Card className="p-4">
        <CardBody>
          <h2>Welcome</h2>
          <p>This reporting tool aims to help missionaries and the people in Fida headquarters.</p>
        </CardBody>
      </Card>
    </PageWrapper>
  </React.Fragment>
)

export default LandingPage
