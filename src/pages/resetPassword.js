import LogoHeader from "./components/logoHeader";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { AckModal, ACK_TYPE } from "./components/ackModal";
import PopupLoader from "./components/popupLoader";

function ResetPassword() {
    const otp = useParams().otp;

    const [showAck, setShowAck] = useState(false);
    const [ackMessage, setAckMessage] = useState('');
    const [ackType, setAckType] = useState('');
    const [showLoader, setShowLoader] = useState(false);

    const handleCloseAck = () => setShowAck(false);
    const handleShowAck = () => setShowAck(true);

    const sendAck = async (message, type) => {
        setAckMessage(message);
        setAckType(type);
        handleShowAck();
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setShowLoader(true);
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());
        data.otp = otp;
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/changepassword`, data)
            .then((response) => {
                setShowLoader(false);
                sendAck("Password reset successfully", ACK_TYPE.SUCCESS);
                event.target.reset();
            })
            .catch((error) => {
                setShowLoader(false);
                sendAck(error.response.data, ACK_TYPE.ERROR);
            });
    }
    return (
        <div className="d-flex flex-column" style={{ height: "100vh" }}>
            <LogoHeader />
            <AckModal message={ackMessage} handleCloseAck={handleCloseAck} showAck={showAck} ackType={ackType} />
            <PopupLoader showLoader={showLoader} />
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card border-0 shadow rounded-3 my-5">
                        <div className="card-body p-4 p-sm-5 d-flex flex-column align-items-center">
                            <h5 className="card-title text-center mb-4 fw-medium fs-5">Reset your password</h5>
                            <form style={{ "width": "50%" }} onSubmit={handleSubmit}>
                                <div className="form-floating mb-4">
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        required
                                    />
                                    <label htmlFor="floatingInput">Email address</label>
                                </div>
                                <div className="form-floating mb-4">
                                    <input
                                        name="password"
                                        type="password"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        required
                                    />
                                    <label htmlFor="floatingInput">Enter new password</label>
                                </div>
                                <div className="form-floating mb-4">
                                    <input
                                        name="confirmPassword"
                                        type="password"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        required
                                    />
                                    <label htmlFor="floatingInput">Confirm new password</label>
                                </div>
                                <div className="d-grid">
                                    <button
                                        className="btn btn-success btn-login text-uppercase fw-bold"
                                        type="submit"
                                    >
                                        Reset Password
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;