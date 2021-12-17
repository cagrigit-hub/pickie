
import "../style/main.scss";
import "react-bootstrap";
import {useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import { getDatabase , update} from "firebase/database";
import {ref, onValue} from "firebase/database";
import {app} from "../firebase.js"



function Authenticated({authed,userInfo}){
    
    const [data,setData] = useState({"title" : "Scarface",
    "trailer" : "https://www.youtube.com/watch?v=7pQQHnqBa2E",
    "id" : 0,
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
    
    
    function watched(){
        const db = getDatabase(app);
        update(ref(db,"users/" + userInfo + "/watched/" + data.id),{"watched" : "true"});
        handleClick(0);
    };

    function handleClick(val){
        if (val >= 249){return 1;}
        const numberOfUsers = 250;
        const randomIndex = Math.floor(Math.random() * numberOfUsers);
        const database = getDatabase(app);
        const watched = ref(database,"users/" + userInfo + "/watched/" + randomIndex);
        onValue(watched,(snapshot) =>{
            const info = snapshot.val()
            if (info.watched === "true"){
                handleClick(val+1)
            }
            else{
                const starCountRef = ref(database, 'movies/');
                onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                setData(data[randomIndex])
            });}
        })
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
            <div className="bot">
                <button id="handler" onClick={() =>{handleClick(0)}}>PICK IT</button>

                <button id="watched" onClick={() =>{watched()}}>I Already Watched This</button>

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
