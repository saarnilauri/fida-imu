import { db } from './firebase'

// User API

export const doCreateUser = (id, username, email, roles = { missionary: true }) => {
  const data = {
    username,
    email,
    roles,
    countries: [],
    churches: [],
    isActive: false,
    description: '',
  }
  db.ref(`users/${id}`).set(data)
  db.ref(`userProfiles/${id}`).set(data)
}

export const onceGetUsers = () => db.ref('users').once('value')
export const onceGetUserNameById = id => db.ref(`users/${id}`).once('value').username

export const onceGetUserById = id => db.ref(`users/${id}`).once('value')
export const writeUserData = (id, name, email, description, roles, countries, churches) =>
  db.ref(`users/${id}`).set({
    username: name,
    email,
    description,
    roles,
    countries,
    churches,
  })
