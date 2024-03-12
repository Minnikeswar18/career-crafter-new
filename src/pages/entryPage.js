import '../styles/entryPage.css'
import { useState,useEffect } from 'react'
import Header from './components/baseHeader';
import loginImg from '../assets/img/entry_page.png'
import signupImg from '../assets/img/signup_page.png'
import axios from 'axios';
import checkJwt from '../helpers/jwt';
import AckModal from './components/ackModal';
import { useNavigate } from 'react-router-dom';

const ACK_TYPE = {
    SUCCESS : 'success',
    ERROR : 'danger',
    WARNING : 'warning'
}

function EntryPage() {

    useEffect(() => {
        checkJwt().then((isJwtValid) => {
            if(isJwtValid) {
              navigate('/home');
            }
        }
        );
    });

    const [isLogin, setIsLogin] = useState(true);
    const [showAck, setShowAck] = useState(false);
    const [ackMessage, setAckMessage] = useState('');
    const [ackType, setAckType] = useState('');

    const handleShowAck = () => setShowAck(true);
    const handleCloseAck = () => setShowAck(false);
    
    const navigate = useNavigate();

    const sendAck = (message , type) => {
        setAckMessage(message);
        setAckType(type);
        handleShowAck();
    }

    const handleLogin = (event) => {
        event.preventDefault();

        const formData =  new FormData(event.target)
        const data = Object.fromEntries(formData.entries())

        axios.post(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/auth/login`, data)
        .then((response) => {
            localStorage.setItem('jwt', response.data.token);
            window.location.href = '/home';
        }).catch((error) => {
            console.log(error);
            sendAck(error.response.data, ACK_TYPE.ERROR);
        });
    }

    const handleSignup = async (event) => {
        event.preventDefault();
        const formData =  new FormData(event.target)
        const data = Object.fromEntries(formData.entries())
        data.isRecruiter = data.isRecruiter !== undefined ;
        try{
            await axios.post(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/auth/register`, data);
            sendAck('Account created and verification email sent successfully', ACK_TYPE.SUCCESS);
            setIsLogin(true);
        }
        catch(error){
            sendAck(error.response.data, ACK_TYPE.ERROR);
        }
    }

    const toggle = () => {
        setTimeout(() => {
            setIsLogin(!isLogin);
        } , 300);
    }

    return (
        <div className="entry-page">
            <AckModal showAck={showAck} message={ackMessage} ackType={ackType} handleCloseAck ={handleCloseAck}/>
            <Header/>
            <div className="entry-content">
                <div className="container">
                    <input type="checkbox" id="flip" />
                    <div className="cover">
                        <div className="front">
                        <img className="backImg" src={isLogin ? loginImg : signupImg} alt=""></img>
                        </div>
                    </div>
                    <div className="forms">
                        <div className="form-content">
                        <div className="login-form">
                            <div className="title">Login</div>
                            <form action="#" onSubmit={handleLogin}>
                            <div className="input-boxes">
                                <div className="input-box">
                                <i className="fas fa-envelope" />
                                <input type="email" name = 'email' placeholder="Enter your email" required={true} />
                                </div>
                                <div className="input-box">
                                <i className="fas fa-lock" />
                                <input
                                    name = 'password'
                                    type="password"
                                    placeholder="Enter your password"
                                    required={true}
                                />
                                </div>
                                <div className="text">
                                <a href="#">Forgot password?</a>
                                </div>
                                <div className="button input-box">
                                <input type="submit" defaultValue="Submit" />
                                </div>
                                <div className="text sign-up-text">
                                Don't have an account? <label htmlFor="flip" onClick={toggle}>Sigup now</label>
                                </div>
                            </div>
                            </form>
                        </div>
                        <div className="signup-form">
                            <div className="title">Signup</div>
                            <form onSubmit={handleSignup}>
                            <div className="input-boxes">
                                <div className="input-box">
                                <i className="fas fa-user" />
                                <input type="text" name='username' placeholder="Enter Username" required={true} />
                                </div>
                                <div className="input-box">
                                <i className="fas fa-envelope" />
                                <input type="email" name='email' placeholder="Enter your email" required={true} />
                                </div>
                                <div className="input-box">
                                <i className="fas fa-lock" />
                                <input
                                    name='password'
                                    type="password"
                                    placeholder="Enter your password"
                                    required={true}
                                />
                                </div>
                                <div className="input-box">
                                <i className="fas fa-lock" />
                                <input
                                    name='confirmPassword'
                                    type="password"
                                    placeholder="Confirm your password"
                                    required={true}
                                />
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" name='isRecruiter' type="checkbox" value="" id="flexCheckDefault"></input>
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        I am a recruiter
                                    </label>
                                </div>
                                <div className="button input-box">
                                <input type="submit" defaultValue="Sumbit" />
                                </div>
                                <div className="text sign-up-text">
                                Already have an account? <label htmlFor="flip" onClick={toggle}>Login now</label>
                                </div>
                            </div>
                            </form>
                        </div>
                        </div>
                    </div>
                </div>  
            </div>
        </div>
    );
}

export default EntryPage;
