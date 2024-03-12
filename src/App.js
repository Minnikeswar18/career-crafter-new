import LandingPage from "./pages/landingPage";
import EntryPage from "./pages/entryPage";
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "./pages/homePage";
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import HiringPage from "./pages/hiringPage.js";


function App() {
  return (
    <>
      {/* <Helmet>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
      </Helmet>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/entry" element={<EntryPage />} />
          <Route path="/home" element={<HomePage /> } />
        </Routes>
      </Router> */}
      <HiringPage />
    </>
  );
}

export default App;
