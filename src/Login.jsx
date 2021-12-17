import Header from "./components/Header";
import Loginn from "./components/Login";
import Footer from "./components/Footer";
import "./style/app.scss"
function Login() {
  return (
   <div className="login">
      <Header />
      <Loginn />
      <Footer />
   </div>
  )
}

export default Login;