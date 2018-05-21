import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Button, Col, Row } from 'reactstrap'

import ResultsChainColumn from '../Column'
import ResultsChainProperties from '../Properties'
import PageTitle from '../../PageTitle'
import PageWrapper from '../../PageWrapper'
import IndicatorList from '../../IndicatorList'
import QuillEditor from '../../QuillEditor'

import { updateByPropertyName } from '../../../constants/utils'

const Empty = () => (
  <React.Fragment>
    <p style={{ color: '#fff' }}>-</p>
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
      editMode: true,
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

  handleEditorChange = (value, editorName) => {
    this.setState(updateByPropertyName(editorName, value))
  }

  toggleEditMode = () => {
    this.setState(prevState => ({
      editMode: !prevState.editMode,
    }))
  }

  render() {
    return (
      <React.Fragment>
        <PageTitle title="Results chain" />
        <PageWrapper>
          <Button onClick={this.toggleEditMode}>Toggle edit mode</Button>
          <Row>
            <Col md="9">
              <div className="results-chain">
                <Row className="no-gutters">
                  {/* Activities */}

                  <ResultsChainColumn
                    title="Activities"
                    topContent={
                      <QuillEditor
                        editMode={this.state.editMode}
                        name="activityTopEditor"
                        onChange={this.handleEditorChange}
                      />
                    }
                    topContentHeight={this.getHighestValue('Top')}
                    onResizeTopContent={this.onResizeActivityTop}
                    onResizeMidContent={this.onResizeActivityMid}
                    onResizeBotContent={this.onResizeActivityBot}
                    midTitle="Indicators"
                    midContent={<Empty />}
                    midContentHeight={this.getHighestValue('Mid')}
                    botContent={
                      <QuillEditor
                        editMode={this.state.editMode}
                        name="activityBotEditor"
                        onChange={this.handleEditorChange}
                      />
                    }
                    botContentHeight={this.getHighestValue('Bot')}
                  />

                  {/* Output */}

                  <ResultsChainColumn
                    title="Output"
                    topContent={
                      <QuillEditor
                        editMode={this.state.editMode}
                        name="outputTopEditor"
                        onChange={this.handleEditorChange}
                      />
                    }
                    bgClass="bg-info"
                    topContentHeight={this.getHighestValue('Top')}
                    onResizeTopContent={this.onResizeOutputTop}
                    onResizeMidContent={this.onResizeOutputMid}
                    onResizeBotContent={this.onResizeOutputBot}
                    midTitle="Indicators"
                    midContent={<IndicatorList />}
                    midContentHeight={this.getHighestValue('Mid')}
                    botContent={
                      <QuillEditor
                        editMode={this.state.editMode}
                        name="activityBotEditor"
                        onChange={this.handleEditorChange}
                      />
                    }
                    botContentHeight={this.getHighestValue('Bot')}
                  />

                  {/* Outcome */}

                  <ResultsChainColumn
                    title="Outcome"
                    topContent={
                      <QuillEditor
                        editMode={this.state.editMode}
                        name="outcomeTopEditor"
                        onChange={this.handleEditorChange}
                      />
                    }
                    bgClass="bg-success"
                    topContentHeight={this.getHighestValue('Top')}
                    onResizeTopContent={this.onResizeOutcomeTop}
                    onResizeMidContent={this.onResizeOutcomeMid}
                    onResizeBotContent={this.onResizeOutcomeBot}
                    midTitle="Indicators"
                    midContent={<IndicatorList />}
                    midContentHeight={this.getHighestValue('Mid')}
                    botContent={
                      <QuillEditor
                        editMode={this.state.editMode}
                        name="OutcomeBotEditor"
                        onChange={this.handleEditorChange}
                      />
                    }
                    botContentHeight={this.getHighestValue('Bot')}
                  />

                  {/* Impact */}

                  <ResultsChainColumn
                    title="Impact"
                    topContent={
                      <QuillEditor
                        editMode={this.state.editMode}
                        name="impactTopEditor"
                        onChange={this.handleEditorChange}
                      />
                    }
                    bgClass="bg-yellow"
                    noArrow
                    topContentHeight={this.getHighestValue('Top')}
                    onResizeTopContent={this.onResizeImpactTop}
                    onResizeMidContent={this.onResizeImpactMid}
                    onResizeBotContent={this.onResizeImpactBot}
                    midTitle="Indicators"
                    midContent={<IndicatorList />}
                    midContentHeight={this.getHighestValue('Mid')}
                    botContent={
                      <QuillEditor
                        editMode={this.state.editMode}
                        name="impactBotEditor"
                        onChange={this.handleEditorChange}
                      />
                    }
                    botContentHeight={this.getHighestValue('Bot')}
                  />
                </Row>
              </div>
            </Col>
            <Col md="3">
              <ResultsChainProperties />
            </Col>
          </Row>
        </PageWrapper>
      </React.Fragment>
    )
  }
}

export default ResultsChainContainer
