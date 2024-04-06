import '../styles/profilePage.scss';
import BaseHeader from './components/baseHeader';
import { ACK_TYPE, AckModal } from './components/ackModal';
import checkJwt from '../helpers/jwt';
import Loader from './components/loader';
import PopupLoader from './components/popupLoader';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';

function ProfilePage() {

    const onLoad = async () => {
        try {
            const myProfile = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/profile/getProfile`);
            setProfileData(myProfile.data);
            setLoading(false);
        }
        catch (error) {
            setLoading(false);
            sendAck("Error fetching user data", ACK_TYPE.ERROR);
        }
    }
    useEffect(() => {
        checkJwt().then(async (res) => {
            if (!res) navigate('/');
            await onLoad();
        })
    }, []);

    const [showAck, setShowAck] = useState(false);
    const [ackMessage, setAckMessage] = useState('');
    const [ackType, setAckType] = useState(ACK_TYPE.SUCCESS);
    const [profileData, setProfileData] = useState({});
    const [loading, setLoading] = useState(true);
    const [showLoader, setShowLoader] = useState(false);
    const navigate = useNavigate();

    const handleCloseAck = () => setShowAck(false);
    const handleShowAck = () => setShowAck(true);

    const sendAck = (message, type) => {
        setAckMessage(message);
        setAckType(type);
        handleShowAck();
    }

    const changeDetails = (event) => {
        event.preventDefault();
        setShowLoader(true);
        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData.entries())
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/profile/updateProfile`, { profile: data })
            .then(async (response) => {
                await onLoad();
                setShowLoader(false);
                sendAck("Profile updated successfully", ACK_TYPE.SUCCESS);
            })
            .catch((error) => {
                setShowLoader(false);
                sendAck(error.response.data, ACK_TYPE.ERROR);
            });
    }

    const changeEmail = (event) => {
        event.preventDefault();
        setShowLoader(true);
        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData.entries())
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/profile/changeEmail`, { data })
            .then(async (response) => {
                setShowLoader(false);
                sendAck("Email updated successfully , please verify the new email to continue", ACK_TYPE.SUCCESS);
                setTimeout(() => {
                    localStorage.removeItem('jwt');
                    navigate('/');
                }, 1000);
            })
            .catch((error) => {
                setShowLoader(false);
                sendAck(error.response.data, ACK_TYPE.ERROR);
            });
    }

    const changePassword = (event) => {
        event.preventDefault();
        setShowLoader(true);
        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData.entries())
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/profile/changePassword`, { data })
            .then(async (response) => {
                setShowLoader(false);
                sendAck("Password updated successfully", ACK_TYPE.SUCCESS);
            })
            .catch((error) => {
                setShowLoader(false);
                sendAck(error.response.data, ACK_TYPE.ERROR);
            });
    }

    useEffect(() => {
        console.log(profileData);
    }, [profileData]);

    if (loading) {
        return <Loader />
    }

    return (
        <>
            <BaseHeader />
            <AckModal showAck={showAck} message={ackMessage} ackType={ackType} handleCloseAck={handleCloseAck} />
            <PopupLoader showLoader={showLoader} />
            <h1 className='hiring-heading page-heading'>Your Profile</h1>
            <div className="profile-tabs">
                <input className='profile-input' type="radio" id="tab1" name="tab-control" defaultChecked="tab1" />
                <input className='profile-input' type="radio" id="tab2" name="tab-control" />
                <input className='profile-input' type="radio" id="tab3" name="tab-control" />
                <input className='profile-input' type="radio" id="tab4" name="tab-control" />
                <ul className='profile-ul'>
                    <li>
                        <label htmlFor="tab1" role="button">
                            <svg className='profile-svg mb-1' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 128 128">
                                <path d="M 56.599609 21.599609 C 34.099609 21.599609 15.800781 40.100781 15.800781 62.800781 C 15.800781 85.600781 34.099609 104 56.599609 104 C 66.899609 104 76.3 100.09922 83.5 93.699219 L 85.800781 96 L 83.699219 98.199219 C 82.499219 99.399219 82.499219 101.3 83.699219 102.5 L 101.69922 120.69922 C 102.29922 121.29922 103.00078 121.59961 103.80078 121.59961 C 104.60078 121.59961 105.40039 121.29922 105.90039 120.69922 L 113.90039 112.59961 C 115.00039 111.39961 115.00078 109.50039 113.80078 108.40039 L 95.800781 90.199219 C 95.200781 89.599219 94.499219 89.300781 93.699219 89.300781 C 92.899219 89.300781 92.099609 89.599219 91.599609 90.199219 L 89.5 92.400391 L 87.199219 90 C 93.499219 82.7 97.400391 73.200781 97.400391 62.800781 C 97.400391 40.100781 79.099609 21.599609 56.599609 21.599609 z M 56.599609 27.699219 C 75.799609 27.699219 91.400391 43.500391 91.400391 62.900391 C 91.400391 82.300391 75.799609 98 56.599609 98 C 37.399609 98 21.800781 82.300391 21.800781 62.900391 C 21.800781 43.500391 37.399609 27.699219 56.599609 27.699219 z M 56.699219 40.199219 C 47.199219 40.199219 38.7 46.300781 35.5 55.300781 C 35 56.600781 35.699609 58.199609 37.099609 58.599609 C 37.399609 58.699609 37.7 58.800781 38 58.800781 C 39.1 58.800781 40.1 58.1 40.5 57 C 42.9 50.1 49.499219 45.400391 56.699219 45.400391 C 58.099219 45.400391 59.300781 44.200781 59.300781 42.800781 C 59.300781 41.400781 58.099219 40.199219 56.699219 40.199219 z M 37.699219 64.900391 C 36.299219 64.900391 35.099609 66 35.099609 67.5 L 35.099609 67.900391 C 35.199609 69.300391 36.300781 70.5 37.800781 70.5 C 39.200781 70.5 40.400391 69.300391 40.400391 67.900391 L 40.400391 67.599609 C 40.400391 66.099609 39.300781 64.900391 37.800781 64.900391 L 37.699219 64.900391 z M 93.800781 96.599609 L 107.59961 110.59961 L 103.80078 114.40039 L 90 100.40039 L 93.800781 96.599609 z"></path>
                            </svg>
                            <br />
                            <span  className='tab-heading'>View Profile</span>
                        </label>
                    </li>
                    <li title="Delivery Contents">
                        <label htmlFor="tab2" role="button">

                            <svg className='profile-svg mb-1' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 64 64">
                                <path fill="#ed7899" d="M46.2,7.92h9.63a4,4,0,0,1,4,4V17.1a0,0,0,0,1,0,0H42.2a0,0,0,0,1,0,0V11.92a4,4,0,0,1,4-4Z" transform="rotate(45 51.017 12.512)"></path><path fill="#c2cde7" d="M32.5 15.51H55.129999999999995V24.869999999999997H32.5z" transform="rotate(45 43.817 20.19)"></path><path fill="#f9e3ae" d="M17.12 17.45H35.5V57.92999999999999H17.12z" transform="rotate(45 26.318 37.691)"></path><path fill="#f6d397" d="M27.38 21.7H33.74V62.17999999999999H27.38z" transform="rotate(45 30.567 41.941)"></path><path fill="#faefde" d="M5 57L6 46 13 47 14 50 16.92 51.5 19 59 7 59 5 57z"></path><path fill="#faefde" d="M18.88 13.2H25.24V53.67999999999999H18.88z" transform="rotate(45 22.068 33.441)"></path><path fill="#8d6c9f" d="M60.59,15.9a4,4,0,0,0-1.17-2.83L50.93,4.59a4.09,4.09,0,0,0-5.66,0L41,8.83a2,2,0,0,0-2.83,0l-5.66,5.66a2,2,0,0,0,0,2.83l.05.05L5.52,44.4a3,3,0,0,0-.87,1.88L4,54.68l-.7,4.92a1,1,0,0,0,1,1.14H4.4L9.32,60l8.45-.62a3,3,0,0,0,1.9-.87l27.08-27a2,2,0,0,0,2.77,0l5.66-5.66a2,2,0,0,0,0-2.83l4.24-4.24A4,4,0,0,0,60.59,15.9Zm-48.69,32,.58,2.88a1,1,0,0,0,.78.78l2.88.58,1.07,5.34L9.59,58,6,54.41l.61-7.6ZM19,56.35l-1-4.77L34.67,35a1,1,0,0,0-1.41-1.41L16.66,50.17,14.3,49.7l-.47-2.36L27.59,33.58a1,1,0,0,0-1.41-1.41L12.42,45.93,7.75,45,34,18.78,45.32,30.09ZM52.34,25.8h0a1,1,0,0,0-1.41,0l-1.41,1.41a1,1,0,0,0,0,1.41h0L48.1,30h0L34,15.9l1.41-1.41a1,1,0,0,0,1.41,0l1.41-1.41a1,1,0,0,0,0-1.41l1.41-1.41.71.71L53.05,23.68l.71.71ZM58,17.31l-4.24,4.24L42.44,10.24,46.69,6a2,2,0,0,1,2.83,0L58,14.49a2,2,0,0,1,0,2.83Z"></path><path fill="#8d6c9f" d="M40.32 15.19l-1.41 1.41A1 1 0 1 0 40.32 18l1.41-1.41a1 1 0 0 0-1.41-1.41zM43.86 18.73l-1.41 1.41a1 1 0 1 0 1.41 1.41l1.41-1.41a1 1 0 0 0-1.41-1.41zM47.39 22.26L46 23.68a1 1 0 1 0 1.41 1.41l1.41-1.41a1 1 0 0 0-1.41-1.41zM31.84 26.51L29 29.33a1 1 0 1 0 1.41 1.41l2.83-2.83a1 1 0 0 0-1.41-1.41z"></path>
                            </svg>
                            <br />
                            <span  className='tab-heading'>Edit Profile</span>
                        </label>
                    </li>
                    <li title="Shipping">
                        <label htmlFor="tab3" role="button">
                            <svg className='profile-svg mb-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" />
                            </svg>
                            <br />
                            <span  className='tab-heading'>Change Email</span>
                        </label>
                    </li>
                    <li title="Returns">
                        <label htmlFor="tab4" role="button">
                            <svg className='profile-svg mb-1' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
                                <path d="M 25 2 C 17.832484 2 12 7.8324839 12 15 L 12 21 L 8 21 C 6.3550302 21 5 22.35503 5 24 L 5 47 C 5 48.64497 6.3550302 50 8 50 L 42 50 C 43.64497 50 45 48.64497 45 47 L 45 24 C 45 22.35503 43.64497 21 42 21 L 38 21 L 38 15 C 38 7.8324839 32.167516 2 25 2 z M 25 4 C 31.086484 4 36 8.9135161 36 15 L 36 21 L 14 21 L 14 15 C 14 8.9135161 18.913516 4 25 4 z M 8 23 L 42 23 C 42.56503 23 43 23.43497 43 24 L 43 47 C 43 47.56503 42.56503 48 42 48 L 8 48 C 7.4349698 48 7 47.56503 7 47 L 7 24 C 7 23.43497 7.4349698 23 8 23 z M 13 34 A 2 2 0 0 0 11 36 A 2 2 0 0 0 13 38 A 2 2 0 0 0 15 36 A 2 2 0 0 0 13 34 z M 21 34 A 2 2 0 0 0 19 36 A 2 2 0 0 0 21 38 A 2 2 0 0 0 23 36 A 2 2 0 0 0 21 34 z M 29 34 A 2 2 0 0 0 27 36 A 2 2 0 0 0 29 38 A 2 2 0 0 0 31 36 A 2 2 0 0 0 29 34 z M 37 34 A 2 2 0 0 0 35 36 A 2 2 0 0 0 37 38 A 2 2 0 0 0 39 36 A 2 2 0 0 0 37 34 z"></path>
                            </svg>
                            <br />
                            <span  className='tab-heading'>Change Password</span>
                        </label>
                    </li>
                </ul>
                <div className="profile-slider">
                    <div className="indicator" />
                </div>
                <div className="content profile-content">
                    <section className='profile-section'>
                        <div className="input-group mb-3">
                            <span className="input-group-text title-span" id="basic-addon1">First Name</span>
                            <input type="text" className="form-control profile-input" value={profileData.firstName} aria-label="Username" aria-describedby="basic-addon1" readOnly />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text title-span" id="basic-addon1">Last Name</span>
                            <input type="text" className="form-control profile-input" value={profileData.lastName} aria-label="Username" aria-describedby="basic-addon1" readOnly />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text title-span" id="basic-addon1">Username</span>
                            <input type="text" className="form-control profile-input" value={profileData.username} aria-label="Username" aria-describedby="basic-addon1" readOnly />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text title-span" id="basic-addon1">Email</span>
                            <input type="text" className="form-control profile-input" value={profileData.email} aria-describedby="basic-addon1" readOnly />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text title-span" id="basic-addon1">Company Name</span>
                            <input type="text" className="form-control profile-input" value={profileData.companyName} aria-describedby="basic-addon1" readOnly />
                        </div>
                    </section>
                    <section className='profile-section'>
                        <form onSubmit={changeDetails}>
                            <div className="input-group mb-3">
                                <span className="input-group-text title-span" id="basic-addon1">First Name</span>
                                <input type="text" className="form-control profile-input" name='firstName' defaultValue={profileData.firstName} aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text title-span" id="basic-addon1">Last Name</span>
                                <input type="text" className="form-control profile-input" name='lastName' defaultValue={profileData.lastName} aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text title-span" id="basic-addon1">Company Name</span>
                                <input type="text" className="form-control profile-input" name='companyName' defaultValue={profileData.companyName} aria-describedby="basic-addon1" />
                            </div>
                            <Button variant="success" type='submit' className="profile-button mt-3">Save details</Button>
                        </form>
                    </section>
                    <section className='profile-section'>
                        <form onSubmit={changeEmail}>
                            <div className="input-group mb-3">
                                <span className="input-group-text title-span" id="basic-addon1">New Email</span>
                                <input type="email" className="form-control profile-input" name='email' aria-label="Username" aria-describedby="basic-addon1" required />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text title-span" id="basic-addon1">Enter your password</span>
                                <input type="password" name='password' className="form-control profile-input" aria-describedby="basic-addon1" required />
                            </div>
                            <Button variant="success" className="profile-button mt-3" type='submit'>Change Email</Button>
                        </form>
                    </section>
                    <section className='profile-section'>
                        <form onSubmit={changePassword}>
                            <div className="input-group mb-3">
                                <span className="input-group-text title-span" id="basic-addon1">Enter new password</span>
                                <input type="password" name='newPassword' className="form-control profile-input" aria-describedby="basic-addon1" required />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text title-span" id="basic-addon1">Confirm new password</span>
                                <input type="password" name="confirmNewPassword" className="form-control profile-input" aria-describedby="basic-addon1" required />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text title-span" id="basic-addon1">Enter current password</span>
                                <input type="password" name='currentPassword' className="form-control profile-input" aria-describedby="basic-addon1" required />
                            </div>
                            <Button variant="success" type='submit' className="profile-button mt-3">Change Password</Button>
                        </form>
                    </section>
                </div>
            </div>
        </>
    );
}

export default ProfilePage;