import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Col, Row, Input, Label, FormGroup } from 'reactstrap'
import Fontawesome from 'react-fontawesome'

import ColumnWrapper from '../Column/Wrapper'
import ResultsChainProperties from '../Properties'
import PageTitle from '../../PageTitle'
import PageWrapper from '../../PageWrapper'
import IndicatorList from '../../IndicatorList' // TODO: replace the mock with a real component
import CenteredLoader from '../../CenteredLoader'

import { updateByPropertyName, findUserItems } from '../../../constants/utils'
import {
  addResultsChainToFirebase,
  loadResultsChains,
  updateResultsChainToFirebase,
} from '../../../reducers/resultschain'

const getSchemaKeys = (state, schema) =>
  Object.keys(state).filter(key => {
    return key.indexOf('Editor') !== -1 || schema.indexOf(key) !== -1
  })

const Empty = () => (
  <React.Fragment>
    <p style={{ color: '#fff' }}>-</p>
  </React.Fragment>
)
class ResultsChainContainer extends Component {
  static propTypes = {
    addResultsChainToFirebase: PropTypes.func.isRequired,
    updateResultsChainToFirebase: PropTypes.func.isRequired,
    loadResultsChains: PropTypes.func.isRequired,
    authUser: PropTypes.object.isRequired,
    userResultsChains: PropTypes.array,
    ready: PropTypes.bool,
  }

  constructor(props) {
    super(props)

    this.schema = ['title', 'country', 'selectedComponent']

    this.save = this.save.bind(this)

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
      editMode: false,
      userHasSelected: false,
    }
  }

  componentDidMount() {
    // console.log(this.props)
    if (!this.props.ready) {
      this.props.loadResultsChains()
    }
  }

  onResizeActivitiesTop = measures => {
    this.setState(updateByPropertyName('activititesTop', measures.bounds.height))
  }

  onResizeActivitiesMid = measures => {
    this.setState(updateByPropertyName('activititesMid', measures.bounds.height))
  }

  onResizeActivitiesBot = measures => {
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

  setPropertiesValues = key => event => {
    this.setState(updateByPropertyName(key, event.target.value))
  }

  handleEditorChange = (value, editorName) => {
    this.setState(updateByPropertyName(editorName, value))
  }

  save() {
    const cleanProps = getSchemaKeys(this.state, this.schema)
    let data = {}

    cleanProps.forEach(key => {
      data[key] = this.state[key]
    })

    data = {
      ...data,
      users: [this.props.authUser.uid],
    }

    if (this.state.uid) {
      this.props.updateResultsChainToFirebase(this.state.uid, data)
    } else {
      this.props.addResultsChainToFirebase(data)
    }
  }

  toggleEditMode = () => {
    this.setState(prevState => ({
      editMode: !prevState.editMode,
    }))
  }

  selectRS = event => {
    const selValue = event.target.value
    this.setState(() => ({
      editMode: false,
    }))
    getSchemaKeys(this.state, this.schema).forEach(key => {
      this.setState(updateByPropertyName(key, ''))
    })

    if (selValue !== '__null' && selValue !== '__new') {
      const active = this.props.userResultsChains.find(item => {
        return item.uid === selValue
      })
      Object.keys(active).forEach(key => {
        // console.log(key)
        this.setState(updateByPropertyName(key, active[key]))
      })
    } else {
      this.setState(() => ({ uid: '', editMode: true }))
    }
    this.setState(updateByPropertyName('userHasSelected', true))
    event.preventDefault()
  }

  render() {
    // const { loadedResultsChain } = this.state
    // const userChains = findUserItems(this.props.resultsChainCollection, this.props.authUser.uid)

    const view = this.props.ready ? (
      <React.Fragment>
        <PageTitle title="Results chain" />
        <PageWrapper>
          <Row className="py-2">
            <Col md="4">
              <FormGroup inline>
                <Label>Select results chain: </Label>
                <Input type="select" name="select" id="exampleSelect" onChange={this.selectRS}>
                  <option value="__null">Select...</option>
                  <option value="__new">New results chain</option>
                  {this.props.userResultsChains.map(item => (
                    <option key={Math.random() * 1000000} value={item.uid}>
                      {item.title}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            {this.state.userHasSelected && (
              <Col md="8" className="text-right">
                <Button color="secondary" size="sm" onClick={this.toggleEditMode}>
                  <Fontawesome name={!this.state.editMode ? 'cog' : 'eye'} /> {!this.state.editMode ? 'Edit' : 'View'}{' '}
                  results chain
                </Button>
              </Col>
            )}
          </Row>
          {this.state.userHasSelected && (
            <Row>
              <Col md={this.state.editMode ? '9' : '12'}>
                <div className="results-chain">
                  <Row className="no-gutters">
                    {/* Activities */}
                    <ColumnWrapper
                      title="Activities"
                      editMode={this.state.editMode}
                      topEditorValue={this.state.activityTopEditor}
                      topEditorName="activityTopEditor"
                      onChange={this.handleEditorChange}
                      topContentHeight={this.getHighestValue('Top')}
                      onResizeTop={this.onResizeActivitiesTop}
                      onResizeMid={this.onResizeActivitiesMid}
                      onResizeBot={this.onResizeActivitiesBot}
                      midContent={<Empty />}
                      midContentHeight={this.getHighestValue('Mid')}
                      botEditorName="activityBotEditor"
                      botEditorValue={this.state.activityBotEditor}
                      botContentHeight={this.getHighestValue('Bot')}
                    />
                    {/* Output */}
                    <ColumnWrapper
                      title="Output"
                      bgClass="bg-info"
                      editMode={this.state.editMode}
                      topEditorValue={this.state.outputTopEditor}
                      topEditorName="outputTopEditor"
                      onChange={this.handleEditorChange}
                      topContentHeight={this.getHighestValue('Top')}
                      onResizeTop={this.onResizeOutputTop}
                      onResizeMid={this.onResizeOutputMid}
                      onResizeBot={this.onResizeOutputBot}
                      midContent={<IndicatorList />}
                      midContentHeight={this.getHighestValue('Mid')}
                      botEditorName="outputBotEditor"
                      botEditorValue={this.state.outputBotEditor}
                      botContentHeight={this.getHighestValue('Bot')}
                    />

                    {/* Outcome */}
                    <ColumnWrapper
                      title="Outcome"
                      bgClass="bg-success"
                      editMode={this.state.editMode}
                      topEditorValue={this.state.outcomeTopEditor}
                      topEditorName="outcomeTopEditor"
                      onChange={this.handleEditorChange}
                      topContentHeight={this.getHighestValue('Top')}
                      onResizeTop={this.onResizeOutcomeTop}
                      onResizeMid={this.onResizeOutcomeMid}
                      onResizeBot={this.onResizeOutcomeBot}
                      midContent={<IndicatorList />}
                      midContentHeight={this.getHighestValue('Mid')}
                      botEditorName="outcomeBotEditor"
                      botEditorValue={this.state.outcomeBotEditor}
                      botContentHeight={this.getHighestValue('Bot')}
                    />

                    {/* Impact */}
                    <ColumnWrapper
                      title="Impact"
                      bgClass="bg-orange"
                      editMode={this.state.editMode}
                      topEditorValue={this.state.impactTopEditor}
                      topEditorName="impactTopEditor"
                      onChange={this.handleEditorChange}
                      topContentHeight={this.getHighestValue('Top')}
                      onResizeTop={this.onResizeImpactTop}
                      onResizeMid={this.onResizeImpactMid}
                      onResizeBot={this.onResizeImpactBot}
                      midContent={<IndicatorList />}
                      midContentHeight={this.getHighestValue('Mid')}
                      botEditorName="impactBotEditor"
                      botEditorValue={this.state.impactBotEditor}
                      botContentHeight={this.getHighestValue('Bot')}
                    />
                  </Row>
                </div>
              </Col>
              {this.state.editMode && (
                <Col md="3">
                  <ResultsChainProperties
                    onSubmit={this.save}
                    title={this.state.title}
                    country={this.state.country}
                    selectedComponent={this.state.selectedComponent}
                    setParentStateValue={this.setPropertiesValues}
                  />
                </Col>
              )}
            </Row>
          )}
        </PageWrapper>
      </React.Fragment>
    ) : (
      <div>
        <CenteredLoader />
      </div>
    )
    return view
  }
}

const mapDispatchToProps = dispatch => ({
  addResultsChainToFirebase: resultsChain => dispatch(addResultsChainToFirebase(resultsChain)),
  updateResultsChainToFirebase: (uid, resultsChain) => dispatch(updateResultsChainToFirebase(uid, resultsChain)),
  loadResultsChains: () => dispatch(loadResultsChains()),
})

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
  userResultsChains: findUserItems(state.resultsChainState.resultsChainCollection, state.sessionState.authUser.uid),
  ready: state.resultsChainState.collectionReady,
})

export default connect(mapStateToProps, mapDispatchToProps)(ResultsChainContainer)
