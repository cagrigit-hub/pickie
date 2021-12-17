
import { Form, Button, Card, Alert } from "react-bootstrap";
import React, { useRef, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from 'firebase/app';

import "../style/sign.scss";
export default function Loginn(){
    
  const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  
    function handleSubmit(e) {
    e.preventDefault();
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
    const auth = getAuth();
    signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    setSuccess("Succesfully logged in.. Redirecting in 1 seconds..")
    setError("")
    setTimeout(() => { window.location.href = "/" }, 1000);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setSuccess("");
    setError("Failed logged in.. Redirecting..");
    setTimeout(() => { window.location.href = "/login" }, 1000);
    }
  );
  
    }
    return  (
        <div className="container cart" style={{"margin-top": "40px"}}>
                    <Card >
          <Card.Body>
            <h2 className="text-center mb-4">Log In</h2>
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
              <Button onClick={handleSubmit} className="w-100" type="submit" style={{"margin-top" : "10px"}}>
                Log In
              </Button>
            </Form>
          </Card.Body>
    
        </Card>
      </div>
                    
      
      )
    }
    
