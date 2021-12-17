import { Form, Button, Card, Alert } from "react-bootstrap";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../style/sign.scss";
import {createUserWithEmailAndPassword } from "firebase/auth";
import {getDatabase, ref, set} from "firebase/database"
import {auth,app} from "../firebase.js"

export default function Sign() {
  
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }
    const database = getDatabase(app);
    createUserWithEmailAndPassword(auth,emailRef.current.value,passwordRef.current.value)
    .then((userCredential) => {
    // Signed in 
      
      const user = userCredential.user;
      setSuccess("Signed In Successfully.. Now you can log in.")
      setError("")
      for(let i = 0 ; i < 250 ; i++){
        set(ref(database,"users/" + user.uid + "/watched/" + i), {"watched" : "false"})
      }
    // ...
    })
    .catch((error) => {
      /*const errorCode = error.code;
      const errorMessage = error.message;*/
      setError("Failed to Sign Up or You are already Signed Up");
      setSuccess("")
     // ..
    });
    }

  return (
    
    <div className="container cart" style={{"margin-top": "40px"}}>
                <Card >
      <Card.Body>
        <h2 className="text-center mb-4">Sign Up</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" ref={emailRef} required />
          </Form.Group>
          <Form.Group id="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" ref={passwordRef} required />
          </Form.Group>
          <Form.Group id="password-confirm">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control type="password" ref={passwordConfirmRef} required />
          </Form.Group>
          <Button onClick={handleSubmit} className="w-100" style={{"margin-top" : "10px"}} type="submit">
            Sign Up
          </Button>
        </Form>
        <div className="w-100 text-center mt-2">
      Already have an account? <Link to="/login">Log In</Link>
    </div>
      </Card.Body>

    </Card>
  </div>
                
            
 
  
  )
}


