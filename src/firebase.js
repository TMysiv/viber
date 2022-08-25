import {initializeApp} from "firebase/app";
import {getAuth} from 'firebase/auth';
import {collection, getFirestore} from 'firebase/firestore';

const app = initializeApp({
    apiKey: "AIzaSyAUSl3M1YYw4SUP3vnqVMSx45RObB16tAk",
    authDomain: "viber-react.firebaseapp.com",
    projectId: "viber-react",
    storageBucket: "viber-react.appspot.com",
    messagingSenderId: "304721856880",
    appId: "1:304721856880:web:8023a4427d3888dcabe7b5"
});

export const auth = getAuth(app);
export const firestore = getFirestore(app);

export const usersFromDb = collection(firestore, 'users');
export const messagesFromDb = collection(firestore, 'messages');


