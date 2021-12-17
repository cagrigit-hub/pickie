import "../style/header.scss"
import { getAuth, signOut } from "firebase/auth";
import {initializeApp} from "firebase/app"
import {auth} from "../firebase.js";
function Headers({authed}) {
    function handleClick(){
        signOut(auth).then(() => {
        // Sign-out successful.
        }).catch((error) => {
        // An error happened.
        });
    
    }
    

    if (authed){
        return <div className="header container">
        <div className="left">
            <span className="left-span"> <a className="logo" href="/" > pickie </a> </span>
        </div>
        <div className="right">
            <span onClick={handleClick} className="right-span righto"> <a href="/" style={{"width":"60px"}}> Sign Out </a> </span>
            
        </div>
    </div>
    }
    else{
    return <div className="header container">
        <div className="left">
            <span className="left-span"> <a className="logo" href="/" > pickie </a> </span>
        </div>
        <div className="right">
            <span className="right-span righto"> <a href="/register"> Register </a> </span>
            <span className="right-span " style={{"width":"60px"}}> <a href="/login"> Log In </a> </span>
        </div>
    </div>
    }
}
export default Headers;
