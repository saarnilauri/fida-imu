import React, { Component } from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { injectIntl } from 'react-intl'
import Fontawesome from 'react-fontawesome'
import { Collapse, ListGroup, ListGroupItem, ListGroupItemHeading } from 'reactstrap'
import { getListMapStateToProps } from '../../hoc/helperFunctions'
import { getMapDispatchToProps } from '../../../reducers/curriedFirebase'
import Card from '../../Card'

class RecentPrayers extends Component {
  constructor(props) {
    super(props)
    const collapse = {}
    props.data.slice(0, 3).forEach(prayer => {
      collapse[prayer.uid] = false
    })
    this.state = { collapse }
  }

  componentDidMount() {
    this.props.loadPrayers()
  }

  toggle(item) {
    this.setState(previousState => {
      const collapse = Object.assign({}, previousState.collapse, { [item]: !previousState.collapse[item] })
      return { collapse }
    })
  }

  render() {
    const { formatMessage } = this.props.intl
    return (
      <Card noBody headerClass="bg-secondary text-white" title={formatMessage({ id: 'prayer.recent.card.headder' })}>
        <ListGroup>
          {this.props.data.slice(0, 3).map(prayer => {
            const id = uuid()
            return (
              <ListGroupItem key={id}>
                <ListGroupItemHeading onClick={() => this.toggle(prayer.uid)} className="prayer-heading">
                  <Fontawesome name="comment-o" /> {prayer.name}{' '}
                  <span className="collapseToggle">
                    <Fontawesome name={this.state.collapse[prayer.uid] ? 'compress' : 'expand'} />
                  </span>
                </ListGroupItemHeading>
                <Collapse isOpen={this.state.collapse[prayer.uid]}>
                  <div className="list-group-item-text">
                    <blockquote className="blockquote prayer-text">{prayer.text}</blockquote>
                    {!prayer.anonymous && (
                      <footer className="blockquote-footer text-right">
                        <cite title="Source Title">{prayer.person ? prayer.person : prayer.username}</cite>
                      </footer>
                    )}
                  </div>
                </Collapse>
              </ListGroupItem>
            )
          })}
        </ListGroup>
      </Card>
    )
  }
}

RecentPrayers.propTypes = {
  data: PropTypes.array.isRequired,
  intl: PropTypes.object.isRequired,
  loadPrayers: PropTypes.func.isRequired,
}

const mapStateToProps = getListMapStateToProps('prayer')
const mapDispatchToProps = getMapDispatchToProps('prayer')

export default compose(
  injectIntl,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(RecentPrayers)
