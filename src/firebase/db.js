import { db } from './firebase'

// User API

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  })

export const onceGetUsers = () => db.ref('users').once('value')
export const onceGetUserNameById = id =>
  db.ref(`users/${id}`).once('value').username
// Other db APIs ...
