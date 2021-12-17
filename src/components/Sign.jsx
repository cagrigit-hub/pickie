import { Form, Button, Card, Alert } from "react-bootstrap";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../style/sign.scss";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import {getDatabase, ref, set} from "firebase/database"

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
      const errorCode = error.code;
      const errorMessage = error.message;
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


