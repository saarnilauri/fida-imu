import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'
import { Card, CardBody, Col, CardHeader } from 'reactstrap'
import { injectIntl } from 'react-intl'
import camelCase from 'lodash/camelCase'
import deburr from 'lodash/deburr'

import ItemToMeasure from './ItemToMeasure'
import PopoverWrapper from '../../Popover'
import HelpButton from '../../HelpButton'

class ResultsChainColumn extends Component {
  constructor(props) {
    super(props)

    this.state = {
      popoverTarget: `topHeader${camelCase(deburr(props.sysName))}`,
      popoverOpen: false,
    }
    this.toggle = this.toggle.bind(this)
    this.helpClick = this.helpClick.bind(this)
    this.mouseLeave = this.mouseLeave.bind(this)
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen,
    })
  }

  helpClick(event) {
    console.log(event.target.id)
    if (event.target.id) {
      const item = event.target.id.toString()
      const values = item.split('Header')
      this.setState({
        popoverTitle: this.props.intl.formatMessage({
          id: `resultschain.column.popover.title.${values[0]}.${values[1]}`,
        }),
        popoverBody: this.props.intl.formatMessage({
          id: `resultschain.column.popover.body.${values[0]}.${values[1]}`,
        }),
        popoverTarget: event.target.id,
        popoverOpen: !this.state.popoverOpen,
      })
      // setTimeout(() => {
      //   console.log(this.state.popoverTarget)
      //   this.setState(prevState => ({ popoverOpen: !prevState.popoverOpen }))
      // }, 8000)
    }
    event.preventDefault()
  }

  mouseLeave(event) {
    this.setState({
      popoverTarget: event.target.id,
      popoverOpen: !this.state.popoverOpen,
    })
  }

  render() {
    const { props } = this
    const topHeaderId = `topHeader${camelCase(deburr(props.sysName))}`
    const midHeaderId = `midHeader${camelCase(deburr(props.sysName))}`
    const botHeaderId = `botHeader${camelCase(deburr(props.sysName))}`

    return (
      <React.Fragment>
        <Col xs="12" sm="6" md="3">
          <Card>
            <CardHeader className={`text-white text-center ${props.bgClass}`}>
              <span>
                {props.title} {!props.noArrow && <FontAwesome name="arrow-right" />}{' '}
                <HelpButton id={topHeaderId} onClickEvent={this.helpClick} />
              </span>
            </CardHeader>
            <CardBody>
              <ItemToMeasure contentHeight={props.topContentHeight} onResize={props.onResizeTop}>
                {props.children[0]}
              </ItemToMeasure>
            </CardBody>
            <CardHeader className="bg-light text-left text-dark">
              <span>
                {props.midTitle} <HelpButton id={midHeaderId} onClickEvent={this.helpClick} />
              </span>
            </CardHeader>
            <CardBody className="small-padding">
              <ItemToMeasure contentHeight={props.midContentHeight} onResize={props.onResizeMid}>
                {props.children[1]}
              </ItemToMeasure>
            </CardBody>
            <CardHeader className="bg-secondary text-white text-left">
              <span>
                {props.botTitle} <HelpButton id={botHeaderId} onClickEvent={this.helpClick} />
              </span>
            </CardHeader>
            <CardBody>
              <div style={{ height: props.botContentHeight }}>
                <ItemToMeasure contentHeight={props.botContentHeight} onResize={props.onResizeBot}>
                  {props.children[2]}
                </ItemToMeasure>
              </div>
            </CardBody>
          </Card>
        </Col>
        <PopoverWrapper
          target={this.state.popoverTarget}
          placement="right"
          isOpen={this.state.popoverOpen}
          toggle={this.toggle}
          title={this.state.popoverTitle}
        >
          {this.state.popoverBody}
        </PopoverWrapper>
      </React.Fragment>
    )
  }
}

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
  intl: PropTypes.object.isRequired,
  midContentHeight: PropTypes.number.isRequired,
  midTitle: PropTypes.string.isRequired,
  noArrow: PropTypes.bool,
  onResizeBot: PropTypes.func.isRequired,
  onResizeMid: PropTypes.func.isRequired,
  onResizeTop: PropTypes.func.isRequired,
  sysName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  topContentHeight: PropTypes.number.isRequired,
}

export default injectIntl(ResultsChainColumn)
