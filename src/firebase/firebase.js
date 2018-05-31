import * as firebase from "firebase";

// const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig

const config = {
  apiKey: "AIzaSyCHVvuXB_UU8qdB9j7lU74YBmPoLtWOfqo",
  authDomain: "fida-imu-dev.firebaseapp.com",
  databaseURL: "https://fida-imu-dev.firebaseio.com",
  projectId: "fida-imu-dev",
  storageBucket: "fida-imu-dev.appspot.com",
  messagingSenderId: "822662443461"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export { db, auth, config, firebase };
