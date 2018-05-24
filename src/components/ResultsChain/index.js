import React from 'react'
import { Card, CardBody, Col, Row, CardHeader, Badge, Button, ListGroup, ListGroupItem } from 'reactstrap'
import FontAwesome from 'react-fontawesome'
import PageTitle from '../PageTitle'
import PageWrapper from '../PageWrapper'

const divStyle = {
  color: 'blue',
  height: '91px',
}

const ResultsChain = () => (
  <React.Fragment>
    <PageTitle title="Results chain" />
    <PageWrapper>
      <div className="animated fadeIn">
        <Row className="no-gutters row-eq-height">
          <Col xs="12" sm="6" md="3">
            <Card>
              <CardHeader className="text-white bg-dark text-center">
                Activities <FontAwesome name="arrow-right" />
              </CardHeader>
              <CardBody>
                <h2>Test paragraph</h2>
                <p>Test paragraph</p>
                <ul>
                  <li>Activity number 1</li>
                  <li>Activity num 2</li>
                  <li>Activity num 3</li>
                  <li>Activity num 4</li>
                </ul>
              </CardBody>
              <CardHeader className="bg-primary text-center">
                <FontAwesome name="arrow-right" />
              </CardHeader>
              <CardBody>
                <div style={divStyle} />
              </CardBody>
              <CardHeader className="bg-secondary text-white text-left">Assumptions</CardHeader>
              <CardBody>
                <ul>
                  <li>Assumtion number 1</li>
                  <li>Assumtion num 2</li>
                  <li>Assumtion num 3</li>
                  <li>Assumtion num 4</li>
                </ul>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="3">
            <Card>
              <CardHeader className="text-white bg-success text-center">
                Output <FontAwesome name="arrow-right" />
              </CardHeader>
              <CardBody>
                <h2>Test paragraph</h2>
                <p>Test paragraph</p>
                <ul>
                  <li>Activity number 1</li>
                  <li>Activity num 2</li>
                  <li>Activity num 3</li>
                  <li>Activity num 4</li>
                </ul>
              </CardBody>
              <CardHeader className="bg-primary text-left">Indicators</CardHeader>
              <CardBody className="small-padding">
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
              </CardBody>
              <CardHeader className="bg-secondary text-white text-left">Assumptions</CardHeader>
              <CardBody>
                <ul>
                  <li>Assumtion number 1</li>
                  <li>Assumtion num 2</li>
                  <li>Assumtion num 3</li>
                  <li>Assumtion num 4</li>
                </ul>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="3">
            <Card>
              <CardHeader className="text-white bg-info text-center">
                Outcome <FontAwesome name="arrow-right" />
              </CardHeader>
              <CardBody>
                <h2>Test paragraph</h2>
                <p>Test paragraph</p>
                <ul>
                  <li>Activity number 1</li>
                  <li>Activity num 2</li>
                  <li>Activity num 3</li>
                  <li>Activity num 4</li>
                </ul>
              </CardBody>
              <CardHeader className="bg-primary text-left">Indicators</CardHeader>
              <CardBody className="small-padding">
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
              </CardBody>
              <CardHeader className="bg-secondary text-white text-left">Assumptions</CardHeader>
              <CardBody>
                <ul>
                  <li>Assumtion number 1</li>
                  <li>Assumtion num 2</li>
                  <li>Assumtion num 3</li>
                  <li>Assumtion num 4</li>
                </ul>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="3">
            <Card>
              <CardHeader className="text-white bg-yellow text-center">Impact</CardHeader>
              <CardBody>
                <h2>Test paragraph</h2>
                <p>Test paragraph</p>
                <ul>
                  <li>Activity number 1</li>
                  <li>Activity num 2</li>
                  <li>Activity num 3</li>
                  <li>Activity num 4</li>
                </ul>
              </CardBody>
              <CardHeader className="bg-primary text-left">Indicators</CardHeader>
              <CardBody className="small-padding">
                <ListGroup>
                  <ListGroupItem>
                    <Row className="no-gutters">
                      <Col md="7">
                        <p>1. Church planting workshops held</p>
                      </Col>
                      <Col md="2" className="text-center">
                        <Badge className="bg-teal">52 / 200</Badge>
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
                        <Badge className="bg-teal">34 / 187</Badge>
                      </Col>
                      <Col md="3" className="text-right">
                        <Button size="sm">
                          <FontAwesome name="file-text" />
                        </Button>
                      </Col>
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </CardBody>
              <CardHeader className="bg-secondary text-white text-left">Assumptions</CardHeader>
              <CardBody>
                <ul>
                  <li>Assumtion number 1</li>
                  <li>Assumtion num 2</li>
                  <li>Assumtion num 3</li>
                  <li>Assumtion num 4</li>
                </ul>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </PageWrapper>
  </React.Fragment>
)

export default ResultsChain
