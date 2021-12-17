
import Authenticated from "./Authenticated"
import NotAuthenticated from "./Notauthenticated"
import { initializeApp } from 'firebase/app';

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";


export default function Main(){
    
    const [authed,setAuth] = useState(null);
    const [userInfo , setUser] = useState(null);
    const firebaseConfig = {
        apiKey: "AIzaSyAT1QOBWf_UpBvJ2gi9-UeE5QYdBaesEs0",
        authDomain: "moviedata-eacb8.firebaseapp.com",
        databaseURL: "https://moviedata-eacb8-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "moviedata-eacb8",
        storageBucket: "moviedata-eacb8.appspot.com",
        messagingSenderId: "948938628834",
        appId: "1:948938628834:web:1f4c4f2d075e0547ccc8bb"
      };
      const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setAuth(true);
        setUser(user.uid);
        // ...
      } else {
        // User is signed out
        // ...
        setAuth(false);
      }
    });
    {
        if(authed){
            return <Authenticated authed={true} userInfo = {userInfo}/>
        }
        else{
            return <NotAuthenticated authed={false} />
        }
    }
    
}