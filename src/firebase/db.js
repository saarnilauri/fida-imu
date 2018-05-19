import { db } from './firebase'

// User API

export const doCreateUser = (id, username, email, roles = { missionary: true }) =>
  db.ref(`users/${id}`).set({
    username,
    email,
    roles,
    descriptionHtml: '',
  })

export const onceGetUsers = () => db.ref('users').once('value')
export const onceGetUserNameById = id => db.ref(`users/${id}`).once('value').username

export const onceGetUserById = id => db.ref(`users/${id}`).once('value')
export const writeUserData = (id, name, email, descriptionHtml, roles) =>
  db.ref(`users/${id}`).set({
    username: name,
    email,
    descriptionHtml,
    roles,
  })
