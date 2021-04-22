import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from "firebase";
import reportWebVitals from './reportWebVitals';



const firebaseConfig = {
    apiKey: "AIzaSyAMECXylfaNvMwvmK0X006CbEjoRAIZ63I",
    authDomain: "note-project-bb9d5.firebaseapp.com",
    projectId: "note-project-bb9d5",
    storageBucket: "note-project-bb9d5.appspot.com",
    messagingSenderId: "640310835908",
    appId: "1:640310835908:web:fa883e5a5770461528a791",
    measurementId: "G-WC5NGFQEFT"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore()
export default db


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
