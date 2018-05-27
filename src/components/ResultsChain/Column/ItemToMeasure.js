import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Measure from 'react-measure'
// import { updateByPropertyName } from '../../../constants/utils'

class ItemToMeasure extends Component {
  constructor(props) {
    super(props)
    this.onResize = this.onResize.bind(this)
  }

  onResize(contentRect) {
    if (this.props.onResize) {
      this.props.onResize(contentRect)
    }
  }

  render() {
    return (
      <div style={{ height: `${this.props.contentHeight}px` }}>
        <Measure bounds onResize={this.onResize}>
          {({ measureRef }) => <div ref={measureRef}>{this.props.children}</div>}
        </Measure>
      </div>
    )
  }
}

ItemToMeasure.propTypes = {
  onResize: PropTypes.func.isRequired,
  contentHeight: PropTypes.number,
  children: PropTypes.object,
}

export default ItemToMeasure
