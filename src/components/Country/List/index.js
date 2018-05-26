import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Alert, Button, Col, Row } from 'reactstrap'
import Fontawesome from 'react-fontawesome'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import Card from '../../Card'
import CenteredLoader from '../../CenteredLoader'
import FormElement from '../../FormGroupElement'
import Modal from '../../Modal'
import PageTitle from '../../PageTitle'
import PageWrapper from '../../PageWrapper'
import { updateByPropertyName } from '../../../constants/utils'

import {
  getAddEntityToFirebaseActionCreator,
  getLoadEntityCollectionActionCreator,
  getRemoveEntityFromFirebaseActionCreator,
  getUpdateEntityToFirebaseActionCreator,
} from '../../../reducers/curriedFirebase'

const getSchemaKeys = (state, schema) =>
  Object.keys(state).filter(key => {
    return key.indexOf('Editor') !== -1 || schema.indexOf(key) !== -1
  })

const getCleanState = () => ({
  area: '',
  code: '',
  editMode: false,
  modalIsOpen: false,
  name: '',
  uid: null,
})

class CountryList extends Component {
  static propTypes = {
    addCountry: PropTypes.func,
    data: PropTypes.array,
    loadCountries: PropTypes.func,
    ready: PropTypes.bool,
    removeCountry: PropTypes.func,
    updateCountry: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.schema = ['name', 'area', 'code']

    this.state = {
      area: '',
      code: '',
      data: props.data.lenght > 0 ? props.data : [{ name: 'new...', area: 'new area...' }],
      editMode: false,
      modalIsOpen: false,
      name: '',
      uid: null,
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.cancelEdit = this.cancelEdit.bind(this)

    this.removeCountry = this.removeCountry.bind(this)
    this.cancelRemove = this.cancelRemove.bind(this)
  }

  componentDidMount() {
    if (!this.props.ready) {
      this.props.loadCountries()
    }
  }

  onSubmit(e) {
    const cleanProps = getSchemaKeys(this.state, this.schema)
    const { uid } = this.state
    const data = {}

    cleanProps.forEach(key => {
      data[key] = this.state[key]
    })

    if (uid === null) {
      this.props.addCountry(data)
    } else {
      this.props.updateCountry(uid, data)
    }

    this.setState(getCleanState())

    e.preventDefault()
  }

  cancelEdit() {
    this.setState(getCleanState())
  }

  cancelRemove() {
    this.setState(getCleanState())
  }

  editCountry(uid) {
    const { data } = this.props
    this.setState(() => ({ ...data.find(item => item.uid === uid), editMode: true }))
  }

  promptRemoveCountry(uid) {
    this.setState(() => ({
      uid,
      modalIsOpen: true,
    }))
  }

  removeCountry() {
    const { uid } = this.state
    const { removeCountry } = this.props

    removeCountry(uid)
    this.cancelRemove()
  }

  render() {
    const { area, name, code, error, editMode } = this.state
    const { ready, data } = this.props
    const view = ready ? (
      <React.Fragment>
        <PageTitle title="Countries" />
        <PageWrapper>
          <Row>
            <Col md="9">
              <Card title="Country list" noPadding>
                <ReactTable
                  data={data}
                  columns={[
                    {
                      id: 'flag',
                      width: 30,
                      accessor: d => <span className={`flag-icon flag-icon-${d.code} text-center`} />,
                    },
                    {
                      Header: 'Name',
                      accessor: 'name',
                    },
                    {
                      Header: 'Area',
                      accessor: 'area',
                    },
                    {
                      Header: 'Actions',
                      id: 'edit',
                      width: 100,
                      accessor: d => (
                        <React.Fragment>
                          <Button color="link" onClick={() => this.editCountry(d.uid)}>
                            <Fontawesome name="pencil" />
                          </Button>{' '}
                          <Button color="link" onClick={() => this.promptRemoveCountry(d.uid)}>
                            <Fontawesome name="trash" />
                          </Button>
                        </React.Fragment>
                      ),
                    },
                  ]}
                  defaultSorted={[
                    {
                      id: 'name',
                      desc: false,
                    },
                  ]}
                  defaultPageSize={10}
                  className="-striped -highlight"
                />
              </Card>
            </Col>
            <Col md="3">
              <Card
                title={editMode ? 'Edit country' : 'Add new country'}
                headerClass={editMode ? 'bg-secondary text-white' : ''}
              >
                <form onSubmit={this.onSubmit}>
                  {error && (
                    <div className="py-2">
                      <Alert color="danger">{error.message}</Alert>
                    </div>
                  )}
                  <FormElement
                    onChange={event => this.setState(updateByPropertyName('name', event.target.value))}
                    value={name}
                    name="name"
                    id="name"
                    placeholder="Country name"
                    icon="map-marker"
                  />
                  <FormElement
                    onChange={event => this.setState(updateByPropertyName('area', event.target.value))}
                    value={area}
                    name="area"
                    id="area"
                    placeholder="Region"
                    icon="map"
                  />
                  <FormElement
                    onChange={event => this.setState(updateByPropertyName('code', event.target.value))}
                    value={code}
                    name="code"
                    id="code"
                    placeholder="Country code (ie. fi)"
                    icon="globe"
                  />
                  <Button size="sm" type="submit">
                    {editMode ? 'Save' : 'Add'}
                  </Button>{' '}
                  {editMode && (
                    <Button size="sm" color="light" type="button" onClick={this.cancelEdit}>
                      Cancel
                    </Button>
                  )}
                </form>
              </Card>
            </Col>
          </Row>
        </PageWrapper>
        <Modal
          isOpen={this.state.modalIsOpen}
          action={this.removeCountry}
          cancel={this.cancelRemove}
          title="Are you sure you want to remove"
          className="modal-danger"
          titleIcon="exclamation-circle"
          actionBtnIcon="trash"
          cancelBtnTitle="Cancel"
          actionBtnTitle="Yes, remove"
        >
          Are you sure you want to remove the country?
        </Modal>
      </React.Fragment>
    ) : (
      <CenteredLoader />
    )
    return view
  }
}

const entityName = 'country'

const loadCountries = getLoadEntityCollectionActionCreator(entityName)
const addCountry = getAddEntityToFirebaseActionCreator(entityName)
const updateCountry = getUpdateEntityToFirebaseActionCreator(entityName)
const removeCountry = getRemoveEntityFromFirebaseActionCreator(entityName)

const mapDispatchToProps = dispatch => ({
  addCountry: country => dispatch(addCountry(country, 'Country added...')),
  updateCountry: (uid, resultsChain) => dispatch(updateCountry(uid, resultsChain, 'Country updated...')),
  removeCountry: uid => dispatch(removeCountry(uid, 'Country removed...')),
  loadCountries: () => dispatch(loadCountries('Countries loaded...')),
})

const collectionToArray = collection => Object.keys(collection).map(uid => ({ ...collection[uid], uid }))

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
  data: state.countryState.collectionReady === true ? collectionToArray(state.countryState.countriesCollection) : [],
  ready: state.countryState.collectionReady,
})

export default connect(mapStateToProps, mapDispatchToProps)(CountryList)
