import React from "react";
import { Col, Row, Badge, Button, ListGroup, ListGroupItem } from "reactstrap";
import FontAwesome from "react-fontawesome";

const IndicatorList = () => (
  <ListGroup>
    <ListGroupItem>
      <Row className="no-gutters">
        <Col md="7">
          <p>1. Church planting workshops held</p>
        </Col>
        <Col md="2" className="text-center">
          <Badge className="bg-teal">5 / 5</Badge>
        </Col>
        <Col md="3" className="text-right">
          <Button size="sm">
            <FontAwesome name="file-text" />
          </Button>
        </Col>
      </Row>
    </ListGroupItem>
    <ListGroupItem className="bg-gray-100">
      <Row className="no-gutters">
        <Col md="7">
          <p>2. Trainings faciliated by Fida</p>
        </Col>
        <Col md="2" className="text-center">
          <Badge className="bg-teal">3 / 5</Badge>
        </Col>
        <Col md="3" className="text-right">
          <Button size="sm">
            <FontAwesome name="file-text" />
          </Button>
        </Col>
      </Row>
    </ListGroupItem>
  </ListGroup>
);

export default IndicatorList;
