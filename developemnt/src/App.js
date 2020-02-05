import React from 'react';
import './App.css';
import Map from './Map'
import Login from './Login'
import SignUp from './Signup'
import { Redirect, BrowserRouter, Link } from "react-router-dom";
import Img from './Images/think.jpeg'
function App() {
  return (
    // something just added
    <div style={{ backgroundColor: "#f6f5f1", height: "700px", padding: "50px 50px" }}>
      <ul style={{
        display: "flex", justifyContent: "space-around"
      }}>
        <li style={{ boxShadow: "5px 10px 18px grey", backgroundColor: "rgb(0,244,180)" }}><Link to="/signup" style={{ fontSize: "90px", padding: "5px 5px" }}>SignUp</Link></li>
        <li style={{ boxShadow: "5px 10px 18px grey", backgroundColor: "rgb(0,244,180)" }}><Link to="/login" style={{ fontSize: "90px", padding: "5px 5px" }}>Login</Link></li>
      </ul>
    </div>
  );
}

export default App;
