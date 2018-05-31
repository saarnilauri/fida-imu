import React from "react";
import PropTypes from "prop-types";
import { CardGroup, Col, Container, Row } from "reactstrap";

const PageWrapper = props => {
  return (
    <div className="app flex-row align-items-center animated fadeIn">
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <CardGroup>{props.children}</CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

PageWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string
  ])
};

export default PageWrapper;
