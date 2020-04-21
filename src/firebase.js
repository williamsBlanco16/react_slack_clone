import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/database'
import '@firebase/storage'

var firebaseConfig = {
  apiKey: "AIzaSyAFccpBteMMR-t_NDD4T3a-5hcrAIPhxfI",
  authDomain: "react-slack-clone-96c8b.firebaseapp.com",
  databaseURL: "https://react-slack-clone-96c8b.firebaseio.com",
  projectId: "react-slack-clone-96c8b",
  storageBucket: "react-slack-clone-96c8b.appspot.com",
  messagingSenderId: "1000586208411",
  appId: "1:1000586208411:web:21d0e4c93c1d073ac7923e",
  measurementId: "G-20GSH3FY4V"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;