import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CardGroup, Col, Container, Row } from 'reactstrap'

class PageWrapper extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center animated fadeIn">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>{this.props.children}</CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

PageWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

export default PageWrapper
