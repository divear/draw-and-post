// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,

    authDomain: process.env.REACT_APP_AUTHDOMAIN,

    projectId: process.env.REACT_APP_PROJECT_ID,

    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,

    messagingSenderId: process.env.REACT_APP_SENDERID,

    appId: process.env.REACT_APP_APPID,

    measurementId: process.env.REACT_APP_MESID,
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export { getStorage, ref, app, uploadBytes };
