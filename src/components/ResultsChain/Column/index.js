import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardBody, Col, CardHeader } from 'reactstrap'
import FontAwesome from 'react-fontawesome'
import ItemToMeasure from './ItemToMeasure'

const ResultsChainColumn = props => (
  <React.Fragment>
    <Col xs="12" sm="6" md="3">
      <Card>
        <CardHeader className={`text-white text-center ${props.bgClass}`}>
          {props.title} {!props.noArrow && <FontAwesome name="arrow-right" />}
        </CardHeader>
        <CardBody>
          <ItemToMeasure contentHeight={props.topContentHeight} onResize={props.onResizeTop}>
            {props.children[0]}
          </ItemToMeasure>
        </CardBody>
        <CardHeader className="bg-light text-left text-dark">{props.midTitle}</CardHeader>
        <CardBody className="small-padding">
          <ItemToMeasure contentHeight={props.midContentHeight} onResize={props.onResizeMid}>
            {props.children[1]}
          </ItemToMeasure>
        </CardBody>
        <CardHeader className="bg-secondary text-white text-left">{props.botTitle}</CardHeader>
        <CardBody>
          <div style={{ height: props.botContentHeight }}>
            <ItemToMeasure contentHeight={props.botContentHeight} onResize={props.onResizeBot}>
              {props.children[2]}
            </ItemToMeasure>
          </div>
        </CardBody>
      </Card>
    </Col>
  </React.Fragment>
)

ResultsChainColumn.defaultProps = {
  bgClass: 'bg-dark',
  botTitle: 'Assumptions',
  noArrow: false,
}

ResultsChainColumn.propTypes = {
  bgClass: PropTypes.string,
  botContentHeight: PropTypes.number.isRequired,
  botTitle: PropTypes.string,
  children: PropTypes.array,
  midContentHeight: PropTypes.number.isRequired,
  midTitle: PropTypes.string.isRequired,
  noArrow: PropTypes.bool,
  onResizeBot: PropTypes.func.isRequired,
  onResizeMid: PropTypes.func.isRequired,
  onResizeTop: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  topContentHeight: PropTypes.number.isRequired,
}

export default ResultsChainColumn
