import firebasemock from 'firebase-mock' // eslint-disable-line

const mockauth = new firebasemock.MockAuthentication()
const mockdatabase = new firebasemock.MockFirebase()
const mockstorage = new firebasemock.MockStorage()
const mocksdk = new firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  path => {
    return path ? mockdatabase.child(path) : mockdatabase
  },
  // use null if your code does not use AUTHENTICATION
  () => {
    return mockauth
  },
  // use null if your code does not use FIRESTORE
  () => {
    return null
  },
  // use null if your code does not use STORAGE
  () => {
    return mockstorage
  },
  // use null if your code does not use MESSAGING
  () => {
    return null
  },
)

mocksdk.apps = ['test']

module.exports = mocksdk
