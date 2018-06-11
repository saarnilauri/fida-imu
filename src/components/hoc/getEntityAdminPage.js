import React, { Component } from 'react'
import forEach from 'lodash/forEach'
import has from 'lodash/has'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { injectIntl } from 'react-intl'
import { Col, Row } from 'reactstrap'

import Card from '../Card'
import PageTitle from '../PageTitle'
import PageWrapper from '../PageWrapper'
import getEntityForm from './getEntityForm'
import getEntityList from './getEntityList'
import { getListMapStateToProps } from './helperFunctions'
import { getMapDispatchToProps } from '../../reducers/curriedFirebase'
import { getWordForms, shouldItRerender } from '../../constants/utils'
import { getEntityListPropTypes } from './EntityPropTypes'

const nameKeyValuesToArray = obj => {
  return Object.keys(obj).map(item => {
    return obj[item].name
  })
}

const mapSourcesToSchema = (sources, schema) => {
  const mappedSchema = Object.assign({}, schema)
  forEach(sources, (source, key) => {
    if (has(schema.properties, key)) {
      mappedSchema.properties[key].enum = Object.keys(source)
      mappedSchema.properties[key].enumNames = nameKeyValuesToArray(source)
    }
  })
  return mappedSchema
}

const getEntityAdminPage = (entity, settings) => {
  const wordForms = getWordForms(entity)
  class EntityListPage extends Component {
    constructor(props) {
      super(props)

      this.state = {
        formData: null,
        editMode: false,
        uid: null,
        data: props.data.lenght > 0 ? props.data : [], // eslint-disable-line
      }
      this.editEntity = this.editEntity.bind(this)
      this.onSubmit = this.onSubmit.bind(this)
      this.cancelEdit = this.cancelEdit.bind(this)
    }

    componentDidMount() {
      if (settings.form.sources) {
        forEach(settings.form.sources, source => {
          const sourceWordForms = getWordForms(source)
          this.props[`load${sourceWordForms.capitalizedPrular}`]()
        })
      }
      // eslint-disable-next-line
      if (!this.props.ready) {
        this.props[`load${wordForms.capitalizedPrular}`]()
      }
    }

    shouldComponentUpdate(nextProps, nextState) {
      return shouldItRerender(nextProps, this.props, nextState, this.state)
    }

    onSubmit(form) {
      const data = {}
      forEach(form.formData, (item, key) => {
        const value = item === undefined ? '' : item
        data[key] = value
      })
      data.username = this.props.userProfile.username // eslint-disable-line

      const { uid } = this.state
      if (uid === null) {
        this.props[`add${wordForms.capitalized}`](data)
      } else {
        this.props[`update${wordForms.capitalized}`](uid, data)
      }
      this.setState(() => ({ formData: null, editMode: false, uid: null }))
    }

    editEntity(uid) {
      const { data } = this.props
      this.setState(() => ({ uid, formData: data.find(item => item.uid === uid), editMode: true }))
    }
    cancelEdit() {
      this.setState(() => ({ formData: null, editMode: false, uid: null }))
    }

    render() {
      const mappedSchema = mapSourcesToSchema(this.props.sources, settings.form.schema) // eslint-disable-line

      const EntityForm = getEntityForm(entity, settings.form, mappedSchema)
      const EntityList = getEntityList(entity, settings.list.settings)

      const { formData, editMode } = this.state
      const { formatMessage } = this.props.intl // eslint-disable-line

      return (
        <React.Fragment>
          <PageTitle title={formatMessage({ id: `${entity}.list.page.header` })} />
          <PageWrapper>
            <Row>
              <Col md="8">
                <Card title={formatMessage({ id: `${entity}.list.page.subheader` })} noPadding>
                  <EntityList edit={this.editEntity} entity={entity} />
                </Card>
              </Col>
              <Col md="4">
                <Card
                  title={
                    editMode
                      ? formatMessage({ id: `${entity}.list.page.form.title.edit` })
                      : formatMessage({ id: `${entity}.list.page.form.title.add_new` })
                  }
                  headerClass={editMode ? 'bg-secondary text-white' : ''}
                >
                  <EntityForm
                    formData={formData}
                    onSubmit={this.onSubmit}
                    editMode={editMode}
                    cancelEdit={this.cancelEdit}
                    sources={this.props.sources} // eslint-disable-line
                  />
                </Card>
              </Col>
            </Row>
          </PageWrapper>
        </React.Fragment>
      )
    }
  }

  EntityListPage.propTypes = getEntityListPropTypes(wordForms)
  const sources = settings.form.sources ? settings.form.sources : []
  const mapStateToProps = getListMapStateToProps(entity, sources)
  const mapDispatchToProps = getMapDispatchToProps(entity, sources)

  return compose(
    injectIntl,
    connect(
      settings.mapStateToProps ? settings.mapStateToProps : mapStateToProps,
      settings.mapDispatchToProps ? settings.mapDispatchToProps : mapDispatchToProps,
    ),
  )(EntityListPage)
}

export default getEntityAdminPage
