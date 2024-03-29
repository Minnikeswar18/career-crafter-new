import '../../styles/components/applicationList.css';
import { useState } from 'react';
import ViewApplication from './viewApplication';

const APPLICATION_STATUS = {
    ACCEPTED: 1,
    PENDING: 0,
    REJECTED: -1,
}

function ApplicationList({ application, rejectApplication, acceptApplication, sendChatInvite }) {
    const [showApplication, setShowApplication] = useState(false);
    const handleShowApplication = () => setShowApplication(true);
    const handleCloseApplication = (event) => {
        if (event) event.preventDefault();
        setShowApplication(false);
    }

    const getDate = (date) => {
        if (!(date instanceof Date)) {
            date = new Date(date);
        }
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        return formattedDate;
    }

    application.startDate = getDate(application.startDate);

    return (
        <div className='application-list-main shadow'>
            <ViewApplication application={application} showApplication={showApplication} handleClose={handleCloseApplication} />
            <div className="application-details">
                <h5 className='work-type'> <b>Applied by : </b> {application.appliedBy.firstName} </h5>
                <h5 className='job-id'> <b>Applied on : </b> {getDate(application.appliedAt)} </h5>
            </div>
            <div className="application-actions">
                <div className='application-buttons'>
                    <button type="button" className="btn btn-primary" onClick={handleShowApplication}>View</button>

                    {application.status === APPLICATION_STATUS.PENDING
                        &&
                        <button type="button" onClick={() => acceptApplication(application._id)} className="btn btn-success">Accept</button>}
                    {
                        application.status === APPLICATION_STATUS.PENDING
                        &&
                        <button type="button" onClick={() => rejectApplication(application._id)} className="btn btn-danger">Reject</button>}
                    {
                        application.status === APPLICATION_STATUS.ACCEPTED
                        &&
                        <button type="button" onClick={() => sendChatInvite(application.appliedBy)} className="btn btn-warning">Invite to chat</button>}
                </div>
            </div>
        </div>
    );
}

export default ApplicationList;