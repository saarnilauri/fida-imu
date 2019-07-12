import React from 'react'
import { Container, Col, Row } from 'reactstrap'
import PropTypes from 'prop-types'

const PageWrapper = props => (
  <Container fluid className="py-2">
    <Row className="py-2">
      <Col md="12">{props.children}</Col>
    </Row>
  </Container>
)

PageWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string,
  ]),
}

export default PageWrapper
