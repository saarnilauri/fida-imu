import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Alert } from 'reactstrap'
import { toast } from 'react-toastify'
import { db } from '../../firebase'
import FormElement from '../FormElement'
import FormContent from '../FormContent'
import Editor from '../Editor'
import Loader from '../Loader'
import FidaToast from '../FidaToast'

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
})

const INITIAL_STATE = {
  username: '',
  descriptionHtml: null,
  error: null,
  isLoaded: false,
  notice: null,
}

class UserProfileForm extends Component {
  static propTypes = {
    authUser: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.state = { ...INITIAL_STATE }
  }

  componentDidMount() {
    if (this.props.authUser) {
      db
        .onceGetUserById(this.props.authUser.uid)
        .then(snap => {
          if (snap.val()) {
            const newState = snap.val()
            this.setState(newState)
          }
          this.setState(updateByPropertyName('isLoaded', true))
          // console.log(snap.val())
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
    event.preventDefault()
    const { username, email, description } = this.state
    const descriptionHtml = description ? description.toString('html') : ''

    // console.log(username, email, description, descriptionHtml)
    db
      .writeUserData(this.props.authUser.uid, username, email, descriptionHtml)
      .then(() => {
        // toast('Profile updated.')
        toast.success('Profile updated!', {
          position: toast.POSITION.TOP_CENTER,
        })
        // this.setState(updateByPropertyName('notice', 'Updated.'))
        // this.setState(updateByPropertyName('descriptionHtml', descriptionHtml))
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error))
      })
  }

  render() {
    const { username, descriptionHtml, error, isLoaded } = this.state

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
            {
              //   notice && (
              //   <div className="py-2">
              //     <Toast message={notice} />
              //   </div>
              // )
            }
            <FormElement
              className=""
              name="username"
              id="username"
              label="Username"
              value={username}
              onChange={event =>
                this.setState(
                  updateByPropertyName('username', event.target.value),
                )
              }
              type="text"
              placeholder=""
            />

            <div>
              <FormContent label="Profile description" className="py-2">
                <Editor onChange={this.onChange} content={descriptionHtml} />
              </FormContent>
              <Button disabled={isInvalid} type="submit">
                Save your profile
              </Button>
            </div>
          </form>
        )}
        <FidaToast />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
})

export default connect(mapStateToProps)(UserProfileForm)
