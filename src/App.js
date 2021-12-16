import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import "./style/app.scss"
function App() {
  return (
  <div className="app">
    <Header />
    <hr></hr>
    <div className="sections">
    <Main />
    </div>
    <Footer />
  </div> 
  )
}

export default App;
