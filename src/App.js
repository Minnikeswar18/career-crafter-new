import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LandingPage from "./pages/landingPage";
import EntryPage from "./pages/entryPage";
import HomePage from "./pages/homePage";
import HiringPage from "./pages/hiringPage.js";
import MyHiringPage from "./pages/myHiringPage.js";
import ProfilePage from './pages/profilePage.js';
import NotFoundPage from './pages/notFoundPage.js';
import ApplicationsPage from './pages/applicationsPage.js';
import ForgotPassword from './pages/forgotPassword.js';
import ResetPassword from './pages/resetPassword.js';
import ChatPage from './pages/chatPage.js';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

function App() {
  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
      </Helmet>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/entry" element={<EntryPage />} />
          <Route path="/home" element={<HomePage /> } />
          <Route path="/hire" element={<HiringPage />} />
          <Route path="/myhirings" element={<MyHiringPage/>} />
          <Route path ="/profile" element={<ProfilePage />} />
          <Route path="/applications/:jobId" element={<ApplicationsPage/>} />
          <Route path="/forgotPassword" element={<ForgotPassword/>} />
          <Route path="/resetPassword/:otp" element={<ResetPassword/>} />
          <Route path="/chat/:username/:roomId" element={<ChatPage/>} />
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
