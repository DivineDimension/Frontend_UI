// import firebase from "firebase";
// const firebaseConfig = {
//   apiKey: "AIzaSyAO4wbrKi0PAhuBJFqyDqbUBaPBDpp6WxU",
//   authDomain: "elebase-a74f1.firebaseapp.com",
//   databaseURL: "https://elebase-a74f1-default-rtdb.firebaseio.com",
//   projectId: "elebase-a74f1",
//   storageBucket: "elebase-a74f1.appspot.com",
//   messagingSenderId: "997660922195",
//   appId: "1:997660922195:web:d8f59a7601468e6b56d1a6",
//   measurementId: "G-5K30X0BXKQ"
// };

// const fireDb = firebase.initializeApp(firebaseConfig);
// export default fireDb;  

// import firebase from "firebase";
// import { initializeApp } from "firebase/database";
// import { getAnalytics } from "firebase/analytics";

import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAws76eFwxqhseRnYa5kvy4d8-rU7c5HC4",
  authDomain: "aptosnft-4290b.firebaseapp.com",
  databaseURL: "https://aptosnft-4290b-default-rtdb.firebaseio.com",
  projectId: "aptosnft-4290b",
  storageBucket: "aptosnft-4290b.appspot.com",
  messagingSenderId: "392501360912",
  appId: "1:392501360912:web:ea609db1dd671c70468d95",
  measurementId: "G-YVMSJWEC2P"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb;  