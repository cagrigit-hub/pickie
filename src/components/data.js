const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/movies")

const Movies = mongoose.model("Movies",{
    "title" : String,
    "plot" : String,
    "genre" : String,
    "year" : String,
    "imdb" : String,
    "director" : String,
    "stars" : Array,
    "trailer_url" : String,
    "poster" : String});



function giveRandomMov(){
    
    var movies =Movies.find({}).exec();
    return movies
        
}

var movies = giveRandomMov();

movies.then((data) =>{
    let x = Math.floor(Math.random() * data.length);
    let datax = data[x]
    return {title:datax.title,plot:datax.plot,genre:datax.genre,year:datax.year,imdb:datax.imdb,director:datax.director,stars:datax.stars,trailer:datax.trailer_url,poster:datax.poster}
    })



