import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Col, Row, Badge } from 'reactstrap'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { injectIntl } from 'react-intl'

import ColumnWrapper from '../Column/Wrapper'
import EnhachedEditModeToggleButton from './EditModeToggleButton'
import EnhachedResultsChainSelect from '../Select'
import ResultsChainProperties from '../Properties'
import PageTitle from '../../PageTitle'
import PageWrapper from '../../PageWrapper'
import IndicatorList from '../../IndicatorList' // TODO: replace the mock with a real component
import CenteredLoader from '../../CenteredLoader'
import FlagIcon from '../../FlagIcon'

import {
  findUserItems,
  getSchemaKeys,
  getWordForms,
  updateByPropertyName,
  shouldItRerender,
} from '../../../constants/utils'
import {
  addResultsChainToFirebase,
  loadResultsChains,
  updateResultsChainToFirebase,
} from '../../../reducers/resultschain'

const getInitialState = () => ({
  activityTop: 1,
  activityBot: 1,
  activityMid: 1,
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
})

const Empty = () => (
  <React.Fragment>
    <p style={{ color: '#fff' }}>-</p>
  </React.Fragment>
)
class ResultsChainContainer extends Component {
  constructor(props) {
    super(props)

    this.schema = ['title', 'selectedComponent', 'countries']
    this.state = getInitialState()
    this.cols = ['activity', 'output', 'outcome', 'impact']
    this.colors = { activity: 'dark', output: 'info', outcome: 'success', impact: 'orange' }

    this.save = this.save.bind(this)
    this.handleSelectCountriesChange = this.handleSelectCountriesChange.bind(this)
  }

  componentDidMount() {
    if (!this.props.ready) {
      this.props.loadResultsChains()
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shouldItRerender(nextProps, this.props, nextState, this.state)
  }

  onResizeActivityTop = measures => {
    this.setState(updateByPropertyName('activityTop', measures.bounds.height))
  }
  onResizeActivityMid = measures => {
    this.setState(updateByPropertyName('activityMid', measures.bounds.height))
  }
  onResizeActivityBot = measures => {
    this.setState(updateByPropertyName('activityBot', measures.bounds.height))
  }
  onResizeOutputTop = measures => {
    this.setState(updateByPropertyName('outputTop', measures.bounds.height))
  }
  onResizeOutputMid = measures => {
    this.setState(updateByPropertyName('outputMid', measures.bounds.height))
  }
  onResizeOutputBot = measures => {
    this.setState(updateByPropertyName('outputBot', measures.bounds.height))
  }
  onResizeOutcomeTop = measures => {
    this.setState(updateByPropertyName('outcomeTop', measures.bounds.height))
  }
  onResizeOutcomeMid = measures => {
    this.setState(updateByPropertyName('outcomeMid', measures.bounds.height))
  }
  onResizeOutcomeBot = measures => {
    this.setState(updateByPropertyName('outcomeBot', measures.bounds.height))
  }
  onResizeImpactTop = measures => {
    this.setState(updateByPropertyName('impactTop', measures.bounds.height))
  }
  onResizeImpactMid = measures => {
    this.setState(updateByPropertyName('impactMid', measures.bounds.height))
  }
  onResizeImpactBot = measures => {
    this.setState(updateByPropertyName('impactBot', measures.bounds.height))
  }

  getHighestValue(part) {
    let highestValue = 0
    this.cols.forEach(col => {
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

  handleSelectCountriesChange(countries) {
    this.setState(() => ({ countries }))
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

  selectResultsChain = event => {
    const selValue = event.target.value
    if (selValue !== '__null' && selValue !== '__new') {
      this.updateState(selValue)
    } else {
      const data = {}
      getSchemaKeys(this.state, this.schema).forEach(key => {
        data[key] = ''
      })
      this.setState(() => ({ ...data, uid: '', editMode: true }))
    }
    this.setState(updateByPropertyName('userHasSelected', true))
    event.preventDefault()
  }

  updateState(uid) {
    this.setState(() => ({
      editMode: false,
    }))
    getSchemaKeys(this.state, this.schema).forEach(key => {
      this.setState(updateByPropertyName(key, ''))
    })

    const active = this.props.userResultsChains.find(item => {
      return item.uid === uid
    })
    Object.keys(active).forEach(key => {
      this.setState(updateByPropertyName(key, active[key]))
    })
  }

  render() {
    const { userResultsChains, ready } = this.props
    const { formatMessage } = this.props.intl
    const { editMode, userHasSelected } = this.state
    const view = ready ? (
      <React.Fragment>
        <PageTitle title={formatMessage({ id: 'resultschain.page.title' })} />
        <PageWrapper>
          <Row className="py-2">
            <Col md="4">
              <EnhachedResultsChainSelect resultsChains={userResultsChains} onSelect={this.selectResultsChain} />
            </Col>
            {userHasSelected && (
              <Col md="8" className="text-right">
                <EnhachedEditModeToggleButton editMode={editMode} onClick={this.toggleEditMode} />
              </Col>
            )}
          </Row>
          {userHasSelected && (
            <Row>
              <Col md={editMode ? '9' : '12'}>
                <div className="results-chain">
                  <h1 className="py-4">
                    {this.state.title}{' '}
                    <Badge color="light">
                      {this.state.selectedComponent && (
                        <React.Fragment>
                          <Badge color="primary">
                            {formatMessage({ id: `components.radiolabel.${this.state.selectedComponent}` })}
                          </Badge>
                        </React.Fragment>
                      )}
                      {this.state.countries && (
                        <React.Fragment>
                          {' '}
                          {this.state.countries.map(item => (
                            <React.Fragment key={item.code}>
                              <FlagIcon code={item.code} />{' '}
                            </React.Fragment>
                          ))}
                        </React.Fragment>
                      )}
                    </Badge>
                  </h1>
                  <Row className="no-gutters">
                    {this.cols.map(key => {
                      const wordForms = getWordForms(key)
                      return (
                        <ColumnWrapper
                          sysName={key}
                          midTitle={formatMessage({ id: 'resultschain.column.title.mid' })}
                          bgClass={`bg-${this.colors[key]}`}
                          key={key}
                          noArrow={key === 'impact'}
                          botContentHeight={this.getHighestValue('Bot')}
                          editMode={editMode}
                          midContentHeight={this.getHighestValue('Mid')}
                          onChange={this.handleEditorChange}
                          onResizeBot={this[`onResize${wordForms.capitalized}Bot`]}
                          onResizeMid={this[`onResize${wordForms.capitalized}Mid`]}
                          onResizeTop={this[`onResize${wordForms.capitalized}Top`]}
                          title={formatMessage({ id: `resultschain.column.title.top.${key}` })}
                          botTitle={formatMessage({ id: 'resultschain.column.title.assumptions' })}
                          topContentHeight={this.getHighestValue('Top')}
                          botEditorValue={this.state[`${key}BotEditor`]}
                          topEditorValue={this.state[`${key}TopEditor`]}
                        >
                          <React.Fragment>
                            {key === 'activity' && <Empty />}
                            {key !== 'activity' && <IndicatorList />}
                          </React.Fragment>
                        </ColumnWrapper>
                      )
                    })}
                  </Row>
                </div>
              </Col>
              {editMode && (
                <Col md="3">
                  <ResultsChainProperties
                    countries={this.state.countries}
                    handleSelectCountriesChange={this.handleSelectCountriesChange}
                    onSubmit={this.save}
                    selectedComponent={this.state.selectedComponent}
                    setParentStateValue={this.setPropertiesValues}
                    title={this.state.title}
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

ResultsChainContainer.propTypes = {
  addResultsChainToFirebase: PropTypes.func.isRequired,
  authUser: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  loadResultsChains: PropTypes.func.isRequired,
  ready: PropTypes.bool,
  updateResultsChainToFirebase: PropTypes.func.isRequired,
  userResultsChains: PropTypes.array,
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

export default compose(injectIntl, connect(mapStateToProps, mapDispatchToProps))(ResultsChainContainer)
