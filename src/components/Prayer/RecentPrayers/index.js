import React, { Component } from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { injectIntl } from 'react-intl'
import Fontawesome from 'react-fontawesome'
import { Collapse, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap'
import { getListMapStateToProps } from '../../hoc/helperFunctions'
import { getMapDispatchToProps } from '../../../reducers/curriedFirebase'
import Card from '../../Card'

class RecentPrayers extends Component {
  componentDidMount() {
    this.props.loadPrayers()
    this.setState({ collapse: { 1: false, 2: false, 3: false } })
  }

  render() {
    const { formatMessage } = this.props.intl
    let counter = 1
    return (
      <Card headerClass="bg-secondary text-white" title={formatMessage({ id: 'prayer.recent.card.headder' })}>
        <ListGroup>
          {this.props.data.slice(0, 3).map(prayer => {
            const id = uuid()
            counter += 1
            return (
              <ListGroupItem key={id}>
                <ListGroupItemHeading>
                  <Fontawesome name="comment-o" /> {prayer.name}
                </ListGroupItemHeading>
                <Collapse isOpen={this.state.collapse[counter]}>
                  <ListGroupItemText>{prayer.text}</ListGroupItemText>
                </Collapse>
              </ListGroupItem>
            )
          })}
        </ListGroup>
      </Card>
    )
  }
}

const mapStateToProps = getListMapStateToProps('prayer')
const mapDispatchToProps = getMapDispatchToProps('prayer')

export default compose(injectIntl, connect(mapStateToProps, mapDispatchToProps))(RecentPrayers)
