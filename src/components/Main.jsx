
import Authenticated from "./Authenticated"
import NotAuthenticated from "./Notauthenticated"
import {onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import {auth,} from "../firebase.js"

export default function Main(){
    
    const [authed,setAuth] = useState(null);
    const [userInfo , setUser] = useState(null);
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