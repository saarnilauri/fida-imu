import React from 'react'
import { Card, CardHeader, CardBody } from 'reactstrap'
import PropTypes from 'prop-types'

const CardWrapper = props => (
  <Card>
    {!props.titleIntheBody && (
      <CardHeader className={props.headerClass}>{props.title}</CardHeader>
    )}
    {!props.noBody && (
      <CardBody style={props.noPadding ? { padding: 0 } : null}>
        {props.titleIntheBody && (
          <h1 className={props.headerClass}>{props.title}</h1>
        )}
        {props.children}
      </CardBody>
    )}
    {props.noBody && <React.Fragment>{props.children}</React.Fragment>}
  </Card>
)

CardWrapper.defaultProps = {
  noPadding: false,
  titleIntheBody: false,
  noBody: false,
}

CardWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string,
  ]),
  headerClass: PropTypes.string,
  noBody: PropTypes.bool,
  noPadding: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  titleIntheBody: PropTypes.bool,
}

export default CardWrapper
