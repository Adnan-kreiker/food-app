import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDi07_RHPrJJnoJlBfYmht83Tt8r4VcI-4',
  authDomain: 'your-recipe-aebc9.firebaseapp.com',
  projectId: 'your-recipe-aebc9',
  storageBucket: 'your-recipe-aebc9.appspot.com',
  messagingSenderId: '130489500870',
  appId: '1:130489500870:web:cbe39c19a2b5e8f6ba43c7',
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

const usersCollection = db.collection('users');
const recipesCollection = db.collection('recipes');

// Initialize Firebase;
export {
  usersCollection,
  recipesCollection,
  auth,
  storage,
  db,
};
