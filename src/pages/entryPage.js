import '../styles/entryPage.css'
import { useState } from 'react'
import Header from './components/baseHeader';
import loginImg from '../assets/img/entry_page.png'
import signupImg from '../assets/img/signup_page.png'
import axios from 'axios';
import { useEffect } from 'react';

function EntryPage() {
    const handleLogin = (event) => {
        event.preventDefault();
        const formData =  new FormData(event.target)
        const data = Object.fromEntries(formData.entries())
        axios.post('http://localhost:8000/auth/login', data)
        .then((response) => {
            localStorage.setItem('jwt', response.data.token);
            window.location.href = '/home';
        }).catch((error) => {
            console.log(error);
        });
    }

    const [isLogin, setIsLogin] = useState(true);
    const toggle = () => {
        setTimeout(() => {
            setIsLogin(!isLogin);
        } , 300);
    }

    return (
        <div className="entry-page">
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
                                <input type="text" name = 'email' placeholder="Enter your email" required={true} />
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
                                <input type="submit" defaultValue="Sumbit" />
                                </div>
                                <div className="text sign-up-text">
                                Don't have an account? <label htmlFor="flip" onClick={toggle}>Sigup now</label>
                                </div>
                            </div>
                            </form>
                        </div>
                        <div className="signup-form">
                            <div className="title">Signup</div>
                            <form action="#">
                            <div className="input-boxes">
                                <div className="input-box">
                                <i className="fas fa-user" />
                                <input type="text" placeholder="Enter Username" required="" />
                                </div>
                                <div className="input-box">
                                <i className="fas fa-envelope" />
                                <input type="text" placeholder="Enter your email" required="" />
                                </div>
                                <div className="input-box">
                                <i className="fas fa-lock" />
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    required=""
                                />
                                </div>
                                <div className="input-box">
                                <i className="fas fa-lock" />
                                <input
                                    type="password"
                                    placeholder="Confirm your password"
                                    required=""
                                />
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
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
