import LandingPage from "./pages/landingPage";
import EntryPage from "./pages/entryPage";
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from "./pages/homePage";
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import axios from 'axios';

var path = require("path");
require("dotenv").config({
  path: "../.env",
});

function App() {

  const checkJwt = () => {
    const jwt = localStorage.getItem('jwt');
    if(jwt) {
      axios.post('http://localhost:8000/auth/verifyjwt', {jwt})
      .then((response) => {
        return true;
      }).catch((error) => {
        console.log(error.response.data);
        localStorage.removeItem('jwt');
        return false;
      });
    }
    return false;
  }

  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
      </Helmet>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/entry" element={checkJwt ? <Navigate to = "/home" />:<EntryPage />} />
          <Route path="/home" element={checkJwt ? <HomePage /> : <Navigate to = "/entry" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
