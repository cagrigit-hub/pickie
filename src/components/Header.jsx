import "../style/header.scss"
import { getAuth, signOut } from "firebase/auth";
import {initializeApp} from "firebase/app"

function Headers({authed}) {
    function handleClick(){
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
            <span onClick={handleClick} className="right-span righto"> <a href="/"> Sign Out </a> </span>
            
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
