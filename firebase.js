// Firebase SDK

import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {

getFirestore,
doc,
setDoc,
updateDoc,
getDoc,
onSnapshot

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {

getAuth

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";



// Firebase Configuration

const firebaseConfig = {

apiKey: "AIzaSyBvAmQnV5dOqngawVT7zLPNRRPeaHS0ECM",

authDomain: "smartstreetlight-20a8c.firebaseapp.com",

projectId: "smartstreetlight-20a8c",

storageBucket: "smartstreetlight-20a8c.firebasestorage.app",

messagingSenderId: "22115910401",

appId: "1:22115910401:web:a7ad1da8a2493df5a75100"

};



// Initialize Firebase

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);



// Export

export{

db,

auth,

doc,

setDoc,

updateDoc,

getDoc,

onSnapshot

};