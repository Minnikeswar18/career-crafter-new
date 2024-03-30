import '../styles/myHiringPage.scss';
import BaseHeader from './components/baseHeader';
import checkJwt from '../helpers/jwt';
import { ACK_TYPE, AckModal } from './components/ackModal';
import InviteList from './components/inviteList';
import Loader from './components/loader';
import PopupLoader from './components/popupLoader';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const INVITATION_STATUS = {
  ACCEPTED: 1,
  PENDING: 0,
  REJECTED: -1,
}

function MyHiringPage() {

  const navigate = useNavigate();

  const [showAck, setShowAck] = useState(false);
  const [ackMessage, setAckMessage] = useState('');
  const [ackType, setAckType] = useState('');

  const handleCloseAck = () => setShowAck(false);
  const handleShowAck = () => setShowAck(true);

  const [loading, setLoading] = useState(true);
  const [invitations, setInvitations] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  const sendAck = (type, message) => {
    setAckType(type);
    setAckMessage(message);
    handleShowAck();
  }

  const onLoad = async () => {
    try {
      const allInvitations = await axios.get(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/hire/getInvitations`);
      setInvitations(allInvitations.data);
      setLoading(false);
    }
    catch (error) {
      setLoading(false);
      sendAck(ACK_TYPE.ERROR, 'Error fetching invitations');
    }
  }

  useEffect(() => {
    checkJwt().then(async (response) => {
      if (!response) {
        navigate('/');
      }
      await onLoad();
    });
  }, []);

  const sendChatInvite = (invitation) => {
    setShowLoader(true);
    const dest = {
      inviteeUsername: invitation.inviteeUsername,
      inviteeEmail: invitation.inviteeEmail,
    }
    axios.post(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/hire/inviteToChat`, dest)
      .then(async (response) => {
        setShowLoader(false);
        sendAck(ACK_TYPE.SUCCESS, "Chat invite sent successfully");
      })
      .catch((error) => {
        setShowLoader(false);
        sendAck(ACK_TYPE.ERROR, error.response.data);
      });
  }

  const deleteInvitation = async (invitationId) => {
    axios.delete(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/hire/deleteInvitation/${invitationId}`)
      .then(async (response) => {
        await onLoad();
        sendAck(ACK_TYPE.SUCCESS, "Invitation deleted successfully");
      })
      .catch((error) => {
        sendAck(ACK_TYPE.ERROR, "Error deleting invitation");
      });
  }

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <BaseHeader />
      <PopupLoader showLoader={showLoader} />
      <AckModal showAck={showAck} message={ackMessage} ackType={ackType} handleCloseAck={handleCloseAck} />
      <h1 className='hiring-heading page-heading'>Your Hirings</h1>
      <div className="tabs">
        <input type="radio" id="tab1" name="tab-control" defaultChecked="tab1" />
        <input type="radio" id="tab2" name="tab-control" />
        <input type="radio" id="tab3" name="tab-control" />
        <ul className='hiring-ul'>
          <li title="Approved">
            <label htmlFor="tab1" role="button">
              <svg viewBox="0 0 24 24" className='mb-1'>
                <path d="M14,2A8,8 0 0,0 6,10A8,8 0 0,0 14,18A8,8 0 0,0 22,10H20C20,13.32 17.32,16 14,16A6,6 0 0,1 8,10A6,6 0 0,1 14,4C14.43,4 14.86,4.05 15.27,4.14L16.88,2.54C15.96,2.18 15,2 14,2M20.59,3.58L14,10.17L11.62,7.79L10.21,9.21L14,13L22,5M4.93,5.82C3.08,7.34 2,9.61 2,12A8,8 0 0,0 10,20C10.64,20 11.27,19.92 11.88,19.77C10.12,19.38 8.5,18.5 7.17,17.29C5.22,16.25 4,14.21 4,12C4,11.7 4.03,11.41 4.07,11.11C4.03,10.74 4,10.37 4,10C4,8.56 4.32,7.13 4.93,5.82Z" />
              </svg>
              <br />
              <span className='tab-heading'>Approved Invites</span>
            </label>
          </li>
          <li title="Pending Invites">
            <label htmlFor="tab2" role="button">
              <svg viewBox="0 0 24 24" className='mb-1'>
                <path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z" />
              </svg>
              <br />
              <span className='tab-heading'>Pending Invites</span>
            </label>
          </li>
          <li title="Rejected Invites">
            <label htmlFor="tab3" role="button">
              <svg viewBox="0 0 24 24" className='mb-1'>
                <path d="M6.71,6.71,5.29,5.29,12,12l-6.71,6.71,1.42,1.42L12,13.41l6.71,6.71,1.42-1.42L13.41,12l6.71-6.71-1.42-1.42L12,10.59,5.29,3.88Z" />
              </svg>
              <br />
              <span className='tab-heading'>Rejected Invites</span>
            </label>
          </li>
        </ul>
        <div className="slider">
          <div className="indicator" />
        </div>
        <div className="content">
          <section>
            {
              invitations.filter(invitation => invitation.status === INVITATION_STATUS.ACCEPTED).length > 0
                ?
                invitations.filter(invitation => invitation.status === INVITATION_STATUS.ACCEPTED).map((invitation, index) => <InviteList invitation={invitation} key={index} sendChatInvite={sendChatInvite} />)
                :
                <h3 className='mt-4 page-heading'>No data found</h3>}
          </section>

          <section>
            {invitations.filter(invitation => invitation.status === INVITATION_STATUS.PENDING).length > 0
              ?
              invitations.filter(invitation => invitation.status === INVITATION_STATUS.PENDING).map((invitation, index) => <InviteList invitation={invitation} key={index} deleteInvitation={deleteInvitation} />)
              :
              <h3 className='mt-4 page-heading'>No data found</h3>}
          </section>

          <section>
            {invitations.filter(invitation => invitation.status === INVITATION_STATUS.REJECTED).length > 0
              ?
              invitations.filter(invitation => invitation.status === INVITATION_STATUS.REJECTED).map((invitation, index) => <InviteList invitation={invitation} key={index} />)
              :
              <h3 className='mt-4 page-heading'>No data found</h3>}
          </section>
        </div>
      </div>
    </>
  );
}

export default MyHiringPage;