import firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyDDLeoJCQgm7xZuccfqeZ8wMmL_Cov5oqU",
    authDomain: "jwt1-262708.firebaseapp.com",
    databaseURL: "https://jwt1-262708.firebaseio.com",
    projectId: "jwt1-262708",
    storageBucket: "jwt1-262708.appspot.com",
    messagingSenderId: "175444826255",
    appId: "1:175444826255:web:149ad2dcedec9ad85db8fa"
  };
  // Initialize Firebase
  const Firebase=firebase.initializeApp(firebaseConfig);
  export default Firebase