
import Main from "./components/Main";

import "./style/app.scss"
require('dotenv').config()
function App() {
  return (
  <div className="app">
    <div className="sections">
    <Main />
    </div>
  </div> 
  )
}

export default App;
