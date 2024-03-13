import '../styles/landingPage.css';
import img from '../assets/img/landing_page.png'

import { useNavigate } from 'react-router-dom';
import LogoHeader from './components/logoHeader';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
        <LogoHeader />
        <div className="landing-content">
            <div className="landing-text"> 
                <h2> Welcome to Career Crafter</h2>
                <p> Create your personalized account in minutes, detailing your skills and aspirations. Explore tailored job listings matched to your profile. </p><p> Join us now to embark on your journey to professional success. </p>
                <div className="landing-buttons">
                  <button class='glowing-btn rec' onClick={() => navigate('/entry')}><span class='glowing-txt'>ENTER</span></button>
                </div>
            </div>
            <img src={img} className="landing-bg" alt=''></img>
        </div>
    </div>
  );
}

export default LandingPage;