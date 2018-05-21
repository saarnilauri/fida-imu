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
          <ItemToMeasure contentHeight={props.topContentHeight} onResize={props.onResizeTopContent}>
            {props.topContent}
          </ItemToMeasure>
        </CardBody>
        <CardHeader className="bg-primary text-left">{props.midTitle}</CardHeader>
        <CardBody className="small-padding">
          <ItemToMeasure contentHeight={props.midContentHeight} onResize={props.onResizeMidContent}>
            {props.midContent}
          </ItemToMeasure>
        </CardBody>
        <CardHeader className="bg-secondary text-white text-left">{props.botTitle}</CardHeader>
        <CardBody>
          <div style={{ height: props.botContentHeight }}>
            <ItemToMeasure contentHeight={props.botContentHeight} onResize={props.onResizeBotContent}>
              {props.botContent}
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
  title: PropTypes.string.isRequired,
  noArrow: PropTypes.bool,
  topContentHeight: PropTypes.number.isRequired,
  onResizeTopContent: PropTypes.func.isRequired,
  topContent: PropTypes.object.isRequired,
  midTitle: PropTypes.string.isRequired,
  midContentHeight: PropTypes.number.isRequired,
  onResizeMidContent: PropTypes.func.isRequired,
  midContent: PropTypes.object.isRequired,
  botTitle: PropTypes.string,
  botContentHeight: PropTypes.number.isRequired,
  onResizeBotContent: PropTypes.func.isRequired,
  botContent: PropTypes.object.isRequired,
}

export default ResultsChainColumn
