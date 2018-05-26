import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Alert, Label } from 'reactstrap'
import { toast } from 'react-toastify'
import Fontawesome from 'react-fontawesome'
import { db } from '../../firebase'
import { updateByPropertyName, setStateValue } from '../../constants/utils'
import { UsernameField } from '../FormElement/FormFields'
import FormContent from '../FormContent'
import CountrySelect from '../Country/Select'
import Editor from '../Editor'
import Loader from '../Loader'
import UserRoles from './UserRoles'

const INITIAL_STATE = {
  username: '',
  descriptionHtml: null,
  error: null,
  roles: {},
  isLoaded: false,
  notice: null,
  countries: false,
}

class UserProfileForm extends Component {
  static propTypes = {
    authUser: PropTypes.object,
    onGetUserProfile: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.handleSelectCountriesChange = this.handleSelectCountriesChange.bind(this)
    // this.onSetRoleValue = this.onSetRoleValue.bind(this)
    this.state = { ...INITIAL_STATE }
  }

  componentWillMount = () => {
    this.selectedCheckboxes = new Set()
  }

  componentDidMount() {
    if (this.props.authUser) {
      db
        .onceGetUserById(this.props.authUser.uid)
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
          toast.error('Error occured!', {
            position: toast.POSITION.TOP_CENTER,
          })
        })
    }
  }

  onChange(value) {
    this.setState(updateByPropertyName('description', value))
  }

  onSubmit = event => {
    let roles = {}

    this.selectedCheckboxes.forEach(item => {
      const temp = {}
      temp[item] = true
      roles = Object.assign(roles, temp)
    })

    // console.log(roles)

    const { username, email, description, descriptionHtml, countries } = this.state
    const updatedDescriptionHtml = description ? description.toString('html') : descriptionHtml

    db
      .writeUserData(this.props.authUser.uid, username, email, updatedDescriptionHtml, roles, countries)
      .then(() => {
        toast.success('Profile updated!', {
          position: toast.POSITION.TOP_CENTER,
        })
        this.props.onGetUserProfile({ username, email, descriptionHtml: updatedDescriptionHtml, roles, countries })
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error))
      })

    event.preventDefault()
  }

  handleSelectCountriesChange(countries) {
    this.setState(() => ({ countries }))
  }

  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label)
    } else {
      this.selectedCheckboxes.add(label)
    }
  }

  render() {
    const { username, descriptionHtml, error, isLoaded, roles, countries } = this.state

    const isInvalid = username === ''

    return (
      <div>
        {isLoaded === false && <Loader />}
        {isLoaded === true && (
          <form onSubmit={this.onSubmit}>
            {error && (
              <div className="py-2">
                <Alert color="danger">{error.message}</Alert>
              </div>
            )}
            <UsernameField value={username} onChange={setStateValue('username', this)} />
            <div>
              <FormContent label="Profile description" className="py-2">
                <Editor onChange={this.onChange} content={descriptionHtml} />
              </FormContent>
              <UserRoles roles={roles} handleCheckboxChange={this.toggleCheckbox} />
              <div className="py-2">
                <Label for="123">
                  <Fontawesome name="globe" /> Coutries
                </Label>
                <CountrySelect value={countries} onChange={this.handleSelectCountriesChange} />
              </div>
              <Button disabled={isInvalid} type="submit">
                Save your profile
              </Button>
            </div>
          </form>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
})

const mapDispatchToProps = dispatch => ({
  onGetUserProfile: userProfile => dispatch({ type: 'SET_USER_PROFILE', userProfile }),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileForm)
