import React from 'react'
import PropTypes from 'prop-types'
import Fontawesome from 'react-fontawesome'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { AppHeaderDropdown } from '@coreui/react'
import { DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import { FormattedMessage } from 'react-intl'
import { withRouter } from 'react-router-dom'

import { setLocaleLanguage } from '../../reducers/userLocale'
import LanguageSwitch from '../LanguageSwitch'

const LanguageMenu = props => {
  const { setLocale, history } = props
  return (
    <AppHeaderDropdown direction="down">
      <DropdownToggle nav>
        <LanguageSwitch />
      </DropdownToggle>
      <DropdownMenu right style={{ right: 'auto' }}>
        <DropdownItem header tag="div" className="text-center">
          <strong>
            <FormattedMessage id="app.header.dropdown.language.header" />
          </strong>
        </DropdownItem>
        {['fi', 'en'].map(locale => (
          <DropdownItem key={locale}>
            <a
              href="/"
              onClick={e => {
                e.preventDefault()
                setLocale(locale)
                history.go('/')
              }}
            >
              <span style={{ color: props.locale === locale ? '#368489' : 'gray' }}>
                <Fontawesome name={props.locale === locale ? 'circle' : 'circle-o'} />
              </span>{' '}
              <FormattedMessage id={`app.header.dropdown.language.${locale}`} />
            </a>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </AppHeaderDropdown>
  )
}

LanguageMenu.propTypes = {
  setLocale: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
}

const mapDispatchToProps = dispatch => ({
  setLocale: language => dispatch(setLocaleLanguage(language)),
})

const mapStateToProps = state => ({
  locale: state.userLocaleState.locale,
})

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(LanguageMenu)
