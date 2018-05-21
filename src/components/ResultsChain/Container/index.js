import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Row } from 'reactstrap'

import ResultsChainColumn from '../Column'
import PageTitle from '../../PageTitle'
import PageWrapper from '../../PageWrapper'
import IndicatorList from '../../IndicatorList'

import { updateByPropertyName } from '../../../constants/utils'

const Empty = () => (
  <React.Fragment>
    <p style={{ color: '#fff' }}>-</p>
  </React.Fragment>
)

const Editor = () => (
  <React.Fragment>
    <h2>Test paragraph</h2>
    <p>Test paragraph</p>
    <ul>
      <li>Activity number 1</li>
      <li>Activity num 2</li>
      <li>Activity num 3</li>
      <li>Activity num 4</li>
    </ul>
  </React.Fragment>
)

const Editor3 = () => (
  <React.Fragment>
    <h2>Test paragraph</h2>
    <p>Test paragraph</p>
    <ul>
      <li>Assuption number 1</li>
      <li>Assuption num 2</li>
      <li>Assuption num 3</li>
      <li>Assuption num 4</li>
      <li>Assuption num 5</li>
    </ul>
    <ul>
      <li>Assuption number 1</li>
      <li>Assuption num 2</li>
      <li>Assuption num 3</li>
      <li>Assuption num 4</li>
      <li>Assuption num 5</li>
    </ul>
  </React.Fragment>
)

const Editor4 = () => (
  <React.Fragment>
    <h2>Test paragraph</h2>
    <p>Test paragraph</p>
    <ul>
      <li>Assuption number 1</li>
      <li>Assuption num 2</li>
    </ul>
    <ul>
      <li>Assuption num 5</li>
    </ul>
  </React.Fragment>
)

class ResultsChainContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activititesTop: 1,
      activititesBot: 1,
      activititesMid: 1,
      outputTop: 1,
      outputMid: 1,
      outputBot: 1,
      outcomeTop: 1,
      outcomeMid: 1,
      outcomeBot: 1,
      impactTop: 1,
      impactMid: 1,
      impactBot: 1,
    }
  }

  onResizeActivityTop = measures => {
    this.setState(updateByPropertyName('activititesTop', measures.bounds.height))
  }

  onResizeActivityMid = measures => {
    this.setState(updateByPropertyName('activititesMid', measures.bounds.height))
  }

  onResizeActivityBot = measures => {
    this.setState(updateByPropertyName('activititesBot', measures.bounds.height))
  }

  onResizeOutputTop = measures => {
    this.setState(updateByPropertyName('outputBot', measures.bounds.height))
  }

  onResizeOutputMid = measures => {
    this.setState(updateByPropertyName('outputMid', measures.bounds.height))
  }

  onResizeOutputBot = measures => {
    this.setState(updateByPropertyName('outputBot', measures.bounds.height))
  }

  onResizeOutcomeTop = measures => {
    this.setState(updateByPropertyName('outcomeBot', measures.bounds.height))
  }

  onResizeOutcomeMid = measures => {
    this.setState(updateByPropertyName('outcomeMid', measures.bounds.height))
  }

  onResizeOutcomeBot = measures => {
    this.setState(updateByPropertyName('outcomeBot', measures.bounds.height))
  }

  onResizeImpactTop = measures => {
    this.setState(updateByPropertyName('impactBot', measures.bounds.height))
  }

  onResizeImpactMid = measures => {
    this.setState(updateByPropertyName('impactMid', measures.bounds.height))
  }

  onResizeImpactBot = measures => {
    this.setState(updateByPropertyName('impactBot', measures.bounds.height))
  }

  getHighestValue(part) {
    const cols = ['activitites', 'output', 'outcome', 'impact']

    let highestValue = 0
    cols.forEach(col => {
      const val = this.state[`${col}${part}`]
      highestValue = val > highestValue ? val : highestValue
    })

    return highestValue
  }

  render() {
    return (
      <React.Fragment>
        <PageTitle title="Results chain" />
        <PageWrapper>
          <div className="results-chain">
            <Row className="no-gutters row-eq-height">
              <ResultsChainColumn
                title="Activities"
                topContent={<Editor />}
                topContentHeight={this.getHighestValue('Top')}
                onResizeTopContent={this.onResizeActivityTop}
                onResizeMidContent={this.onResizeActivityMid}
                onResizeBotContent={this.onResizeActivityBot}
                midTitle="Indicators"
                midContent={<Empty />}
                midContentHeight={this.getHighestValue('Mid')}
                botContent={<Editor3 />}
                botContentHeight={this.getHighestValue('Bot')}
              />
              <ResultsChainColumn
                title="Output"
                topContent={<Editor />}
                bgClass="bg-info"
                topContentHeight={this.getHighestValue('Top')}
                onResizeTopContent={this.onResizeOutputTop}
                onResizeMidContent={this.onResizeOutputMid}
                onResizeBotContent={this.onResizeOutputBot}
                midTitle="Indicators"
                midContent={<IndicatorList />}
                midContentHeight={this.getHighestValue('Mid')}
                botContent={<Editor4 />}
                botContentHeight={this.getHighestValue('Bot')}
              />
              <ResultsChainColumn
                title="Outcome"
                topContent={<Editor />}
                bgClass="bg-success"
                topContentHeight={this.getHighestValue('Top')}
                onResizeTopContent={this.onResizeOutcomeTop}
                onResizeMidContent={this.onResizeOutcomeMid}
                onResizeBotContent={this.onResizeOutcomeBot}
                midTitle="Indicators"
                midContent={<IndicatorList />}
                midContentHeight={this.getHighestValue('Mid')}
                botContent={<Editor4 />}
                botContentHeight={this.getHighestValue('Bot')}
              />
              <ResultsChainColumn
                title="Impact"
                topContent={<Editor />}
                bgClass="bg-yellow"
                noArrow
                topContentHeight={this.getHighestValue('Top')}
                onResizeTopContent={this.onResizeImpactTop}
                onResizeMidContent={this.onResizeImpactMid}
                onResizeBotContent={this.onResizeImpactBot}
                midTitle="Indicators"
                midContent={<IndicatorList />}
                midContentHeight={this.getHighestValue('Mid')}
                botContent={<Editor4 />}
                botContentHeight={this.getHighestValue('Bot')}
              />
            </Row>
          </div>
        </PageWrapper>
      </React.Fragment>
    )
  }
}

export default ResultsChainContainer
