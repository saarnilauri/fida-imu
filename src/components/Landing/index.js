import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import Card from '../Card'
import RecentPrayers from '../Prayer/RecentPrayers'

const LandingPage = () => {
  return (
    <React.Fragment>
      <div className="landing-bg">
        <Row className="full-height d-flex justify-content-center align-items-center">
          <Col md="5" className="fadeIn animated">
            <Card headerClass="bg-primary text-large text-white" title={<FormattedMessage id="app.greeting.title" />}>
              <Row className="d-flex justify-content-between">
                <Col md="8" className="d-flex flex-column align-items-center">
                  <p className="text-dark lead">
                    <FormattedMessage id="app.greeting.body" />
                  </p>
                  <p className="text-dark lead">
                    <Link className="btn btn-primary btn-lg" to="results-chain">
                      <FormattedMessage id="app.greeting.link" />
                    </Link>
                  </p>
                </Col>
                <Col md="4" style={{ minHeight: 220 }}>
                  <img className="img-fluid rounded img-thumbnail" alt="Fida" src="https://goo.gl/E6qM91" />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col md="5">
            <RecentPrayers />
          </Col>
        </Row>
      </div>
    </React.Fragment>
  )
}
export default LandingPage
