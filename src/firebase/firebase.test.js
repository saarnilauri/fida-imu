import { db, auth } from './firebase'

it('firebase db works without crashing', () => {
  const ref = db.ref('myRefUrl')
  ref.on('value', () => {})
})

it('firebase auth works without crashing', () => {
  auth.createUserWithEmailAndPassword('email', 'password')
})
