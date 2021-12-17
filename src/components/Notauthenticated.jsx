
import "../style/main.scss";
import "react-bootstrap";
import {useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
import {ref, onValue} from "firebase/database";




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


function Authenticated({authed}){
    

    const [data,setData] = useState({"title" : "Scarface",
    "plot" : "In 1980 Miami, a determined Cuban immigrant takes over a drug cartel and succumbs to greed.",
    "genre" : "Crime",
    "year" : "1983",
    "imdb" : "8.3",
    "director" : "Brian De Palma",
    "stars" : [ 
        "Al Pacino", 
        "Michelle Pfeiffer", 
        "Steven Bauer"
    ],"poster" : "https://m.media-amazon.com/images/M/MV5BNjdjNGQ4NDEtNTEwYS00MTgxLTliYzQtYzE2ZDRiZjFhZmNlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg"});
    
    function handleClick(){
        const numberOfUsers = 250;
        const randomIndex = Math.floor(Math.random() * numberOfUsers);
        const database = getDatabase(app);
        const starCountRef = ref(database, 'movies/');
        onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        setData(data[randomIndex])
        });
    }
    
    var stars = "";
    if (data.stars){
        let length = data.stars.length-1
        let c = 0;
        data.stars.map((item) =>{
            if (c !== length)
            stars += item + " • "
            else
            stars += item
            c++;
        })
    }
    
    
    return (
    <>
    <Header authed={authed}/>
    <hr></hr>
    <div className="mainn ">
    <div class="container">
            <div class="row">
                <div class="col-lg-6 col-sm-12">
                <div className="left">  
        
                <div className="posterContainer">
                    <img src={data.poster} alt="poster" />
                </div>
                </div>
    </div>
                <div class="col-lg-6 col-sm-12">
                <div className="right">
            <div className="top">
                <div className="title"><h1>{data.title}</h1></div>      
                <div className="plot"><span><p style={{"display": "inline-block","fontFamily":'Bakbak One'}}>Plot:</p> {data.plot}</span></div>
                <div className="director"><span><p style={{"display": "inline-block","fontFamily":'Bakbak One'}}>Director:</p> {data.director}</span></div>
               
                <div className="stars"><span><p style={{"display": "inline-block","fontFamily":'Bakbak One'}}>Stars:</p> {stars}</span></div>
                
                <div className="imdb"><span><p style={{"display": "inline-block","fontFamily":'Bakbak One'}}>IMDB:</p> {data.imdb} </span></div>
                <div className="genre"><span><p style={{"display": "inline-block","fontFamily":'Bakbak One'}}>Genre:</p> {data.genre}</span></div>
                <div className="year"><span><p style={{"display": "inline-block","fontFamily":'Bakbak One'}}>Year:</p> {data.year}</span></div>
            </div>
            <div className={"bot"}>
                <button onClick={handleClick}>PICK IT</button>

                <a href={data.trailer} target = "_blank" className = "button">WATCH TRAILER</a>
               
                
            </div>
            </div>
                </div>
                
            </div>
            </div>
       
        
            
        </div>
        <Footer />
        </>
    )
}

export default Authenticated;
