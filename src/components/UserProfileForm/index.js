import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withFirebase } from 'react-redux-firebase'
import { Button, Label } from 'reactstrap'
import { toast } from 'react-toastify'
import Fontawesome from 'react-fontawesome'
import { db } from '../../firebase'
import { updateByPropertyName, setStateValue } from '../../constants/utils'
import { UsernameField } from '../FormElement/FormFields'
import FormContent from '../FormContent'
import EnhachedCountrySelect from '../Country/Select'
import ChurchSelect from '../Church/Select'
import Editor from '../Editor'
import Loader from '../Loader'
import UserRoles from './UserRoles'
import ErrorMsg from '../ErrorMsg'

const INITIAL_STATE = {
  username: '',
  description: null,
  error: null,
  roles: {},
  isLoaded: false,
  notice: null,
  countries: false,
  churches: false,
}

class UserProfileForm extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.handleSelectCountriesChange = this.handleSelectCountriesChange.bind(
      this,
    )
    this.handleSelectChurchesChange = this.handleSelectChurchesChange.bind(this)
    this.state = { ...INITIAL_STATE }
  }

  componentWillMount = () => {
    this.selectedCheckboxes = new Set()
  }

  componentDidMount() {
    const { formatMessage } = this.props
    if (this.props.authUser) {
      db.onceGetUserById(this.props.authUser.uid)
        .then(snap => {
          if (snap.val()) {
            const newState = snap.val()
            Object.keys(newState.roles).forEach(role => {
              this.selectedCheckboxes.add(role)
            })
            this.setState(() => newState)
          }
          this.setState(updateByPropertyName('isLoaded', true))
        })
        .catch(err => {
          this.setState(updateByPropertyName('error', err))
          toast.error(formatMessage({ id: 'error.occured' }), {
            position: toast.POSITION.TOP_CENTER,
          })
        })
    }
  }

  onChange(value) {
    this.setState(updateByPropertyName('description', value))
  }

  onSubmit = event => {
    const { formatMessage } = this.props
    let roles = {}

    this.selectedCheckboxes.forEach(item => {
      const temp = {}
      temp[item] = true
      roles = Object.assign(roles, temp)
    })

    const { username, email, description, countries, churches } = this.state
    // const updatedDescriptionHtml = description ? description.toString('html') : descriptionHtml

    db.writeUserData(
      this.props.authUser.uid,
      username,
      email,
      description,
      roles,
      countries,
      churches,
    )
      .then(() => {
        toast.success(formatMessage({ id: 'account.page.progress.updated' }), {
          position: toast.POSITION.TOP_CENTER,
        })
        this.props.onGetUserProfile({
          username,
          email,
          description,
          roles,
          countries,
          churches,
        })
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error))
      })

    const profile = {
      username,
      email,
      description,
      roles,
      countries,
      churches,
    }
    this.props.firebase.updateProfile(profile)
    event.preventDefault()
  }

  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label)
    } else {
      this.selectedCheckboxes.add(label)
    }
  }

  handleSelectCountriesChange(countries) {
    this.setState(() => ({ countries }))
  }

  handleSelectChurchesChange(churches) {
    this.setState(() => ({ churches }))
  }

  render() {
    const { formatMessage } = this.props
    const {
      username,
      description,
      error,
      isLoaded,
      roles,
      countries,
      churches,
    } = this.state

    const isInvalid = username === ''

    return (
      <div>
        {isLoaded === false && <Loader />}
        {isLoaded === true && (
          <form onSubmit={this.onSubmit}>
            {error && <ErrorMsg error={error.message} />}
            <UsernameField
              value={username}
              onChange={setStateValue('username', this)}
            />
            <div>
              <FormContent
                label={formatMessage({
                  id: 'account.page.profile_description',
                })}
                className="py-2"
              >
                <Editor onChange={this.onChange} content={description} />
              </FormContent>
              <UserRoles
                roles={roles}
                handleCheckboxChange={this.toggleCheckbox}
              />
              <div className="py-2">
                <Label for="123">
                  <Fontawesome name="globe" />{' '}
                  {formatMessage({ id: 'account.page.coutries' })}
                </Label>
                <EnhachedCountrySelect
                  value={countries}
                  onChange={this.handleSelectCountriesChange}
                />
              </div>
              <div className="py-2">
                <Label for="1234">
                  <Fontawesome name="home" />{' '}
                  {formatMessage({ id: 'account.page.churches' })}
                </Label>
                <ChurchSelect
                  value={churches}
                  onChange={this.handleSelectChurchesChange}
                />
              </div>
              <Button disabled={isInvalid} type="submit">
                {formatMessage({ id: 'actions.save' })}
              </Button>
            </div>
          </form>
        )}
      </div>
    )
  }
}

UserProfileForm.propTypes = {
  authUser: PropTypes.object,
  onGetUserProfile: PropTypes.func,
  firebase: PropTypes.object,
  formatMessage: PropTypes.func,
}

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
  profile: state.firebase.profile,
})

const mapDispatchToProps = dispatch => ({
  onGetUserProfile: userProfile =>
    dispatch({ type: 'SET_USER_PROFILE', userProfile }),
})

export default compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(UserProfileForm)
