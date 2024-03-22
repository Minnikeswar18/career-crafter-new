import '../../styles/components/inviteList.css';
import ViewInvite from './viewInvite';
import {useState} from 'react';

const INVITATION_STATUS = {
    ACCEPTED: 1,
    PENDING: 0,
    REJECTED: -1,
}

function InviteList({invitation , deleteInvitation , sendChatInvite}) {
    const[showInvite, setShowInvite] = useState(false);
    const handleShowInvite = () => setShowInvite(true);
    const handleCloseInvite = (event) =>{
        if(event) event.preventDefault();
        setShowInvite(false);
    }

    const getDate = (date) =>{
        if (!(date instanceof Date)) {
            date = new Date(date);
        }
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        return formattedDate;
    }

  return (
    <div className='invite-element shadow'>
        <ViewInvite show={showInvite} handleClose={handleCloseInvite} invitation={invitation}/>
        <div className="main-div">
            <h1 className="main-top">
                {invitation.jobTitle}
            </h1>
            <div className="main-bottom">
                <h5 className='job-id'> <b>Date: </b> {getDate(invitation.createdAt)} </h5>
                <h5 className='work-type'> <b>Invitee: </b> {invitation.inviteeUsername} </h5>
            </div>
        </div>
        <div className='buttons'>
            <button type="button" className="btn btn-primary" onClick={handleShowInvite}>View</button>
            {invitation.status === INVITATION_STATUS.PENDING && <button type="button" className="btn btn-danger" onClick={() => deleteInvitation(invitation._id)}>Delete</button>}
            {invitation.status === INVITATION_STATUS.ACCEPTED && <button type="button" className="btn btn-warning" onClick={() => sendChatInvite(invitation)}>Invite to chat</button>}
        </div>
    </div>
  );
}

export default InviteList;