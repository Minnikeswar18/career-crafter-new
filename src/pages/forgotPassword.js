import { AckModal , ACK_TYPE} from "./components/ackModal";
import LogoHeader from "./components/logoHeader";
import axios from 'axios';
import { useState } from 'react';

function ForgotPassword() {
    const [showAck, setShowAck] = useState(false);
    const [ackMessage, setAckMessage] = useState('');
    const [ackType, setAckType] = useState('');
    const handleCloseAck = () => setShowAck(false);
    const handleShowAck = () => setShowAck(true);

    const sendAck = async(message , type) => {
        setAckMessage(message);
        setAckType(type);
        handleShowAck();
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        axios.post(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/auth/resetpassword`, {email})
        .then((response) => {
            sendAck("Otp sent successfully to your email" , ACK_TYPE.SUCCESS);
        })
        .catch((error) => {
            sendAck(error.response.data , ACK_TYPE.ERROR);
        });
    }

    return (
        <div className="d-flex flex-column" style={{ height: "100vh" }}>
            <AckModal message={ackMessage} handleCloseAck={handleCloseAck} showAck={showAck} ackType={ackType}/>
            <LogoHeader />
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card border-0 shadow rounded-3 my-5">
                        <div className="card-body p-4 p-sm-5 d-flex flex-column align-items-center">
                            <h5 className="card-title text-center mb-4 fw-medium fs-5">Enter email to receive otp to reset password</h5>
                            <form style={{ "min-width": "50%" }} onSubmit={handleSubmit}>
                                <div className="form-floating mb-4">
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        name ="email"
                                        required
                                    />
                                    <label htmlFor="floatingInput">Email address</label>
                                </div>
                                <div className="d-grid">
                                    <button
                                        className="btn btn-success btn-login text-uppercase fw-bold"
                                        type="submit"
                                    >
                                        Send Otp
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

export default ForgotPassword;