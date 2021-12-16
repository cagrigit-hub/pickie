import "../style/header.scss"


function Headers() {
    return <div className="header container">
        <div className="left">
            <span className="left-span"> <a className="logo" href="/" > pickie </a> </span>
        </div>
        <div className="right">
            <span className="right-span"> <a href="/register" style={{"pointer-events": "none"}}> Register </a> </span>
            <span className="right-span" style={{"width":"100px"}}> <a href="/login" style={{"pointer-events": "none"}}> Log In </a> </span>
        </div>
    </div>
}
export default Headers;
