import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import $ from 'jquery';

import PopupLoader from './components/popupLoader';
import BaseHeader from './components/baseHeader';
import ProfileList from './components/profileList';
import InviteForm from './components/inviteForm';
import { AckModal, ACK_TYPE } from './components/ackModal';
import checkJwt from '../helpers/jwt';
import Loader from './components/loader';

import '../styles/hiringPage.css';

function HiringPage() {
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showAck, setShowAck] = useState(false);
  const [ackMessage, setAckMessage] = useState('');
  const [ackType, setAckType] = useState('');
  const [invitee, setInvitee] = useState({});
  const [inviter, setInviter] = useState({});
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  const handleCloseForm = () => setShowForm(false);
  const handleShowForm = () => setShowForm(true);

  const handleCloseAck = () => setShowAck(false);
  const handleShowAck = () => setShowAck(true);

  const navigate = useNavigate();

  const onLoad = async () => {
    try {
      const allProfiles = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/hire/getFreelancers`);
      setProfiles(allProfiles.data);
      setFilteredProfiles(allProfiles.data);
      setLoading(false);
    }
    catch (error) {
      setLoading(false);
      sendAck(ACK_TYPE.ERROR, 'Error fetching profiles');
    }
  }

  useEffect(() => {
    checkJwt().then(async (response) => {
      if (!response) {
        navigate('/');
      }
      setInviter(response);
      await onLoad();
    });
  }, []);

  const searchFunc = () => {
    const username = $('#search-username').val();
    const skill = $('#search-skill').val();
    const title = $('#search-title').val();

    let allProfiles = profiles;

    if (username !== '') {
      allProfiles = allProfiles.filter(profile => profile.username.toLowerCase().includes(username.toLowerCase()));
    }
    if (skill !== '') {
      allProfiles = allProfiles.filter(profile => {
        for (let userSkill of profile.userSkills) {
          if (userSkill.toLowerCase().includes(skill.toLowerCase())) {
            return true;
          }
        }
        return false;
      });
    }
    if (title !== '') {
      allProfiles = allProfiles.filter(profile => profile.userBio.toLowerCase().includes(title.toLowerCase()));
    }

    setFilteredProfiles(allProfiles);
  }

  const generateInviteForm = (invitee) => {
    setInvitee(invitee);
    handleShowForm();
  }

  const handleInvite = async (event, invitee) => {
    event.preventDefault();
    setShowLoader(true);
    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData.entries())
    data.inviteeEmail = invitee.email;
    data.inviteeUsername = invitee.username;
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/hire/invite`, { inviteeId: invitee._id, invitation: data });
      setShowLoader(false);
      handleCloseForm();
      sendAck(ACK_TYPE.SUCCESS, 'Invitation sent successfully');
    }
    catch (error) {
      setShowLoader(false);
      sendAck(ACK_TYPE.ERROR, error.response.data);
    }
  }

  const sendAck = (type, message) => {
    setAckMessage(message);
    setAckType(type);
    handleShowAck();
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className='hiring-main'>
      <AckModal showAck={showAck} handleCloseAck={handleCloseAck} ackType={ackType} message={ackMessage} />
      <PopupLoader showLoader={showLoader} />
      <BaseHeader />
      <InviteForm invitee={invitee} inviter={inviter} showForm={showForm} handleCloseForm={handleCloseForm} handleSubmit={handleInvite} />
      <h1 className='title mt-4 mb-5 page-heading'>Discover Freelancers</h1>
      <div className="hiring-main-div">
        <div className='filter-div'>
          <form className="d-flex mb-4" role="search">
            <input
              id='search-username'
              className="form-control"
              type="search"
              placeholder="Search by Username (Eg : johndoe)"
              aria-label="Search"
              onChange={searchFunc}
            />
          </form>
          <form className="d-flex mb-4" role="search">
            <input
              id='search-skill'
              className="form-control"
              type="search"
              placeholder="Search by Skill (Eg : React)"
              aria-label="Search"
              onChange={searchFunc}
            />
          </form>
          <form className="d-flex" role="search">
            <input
              id='search-title'
              className="form-control"
              type="search"
              placeholder="Search by Title (Eg : Data Scientist)"
              aria-label="Search"
              onChange={searchFunc}
            />
          </form>
        </div>
        <div className='list-div'>
          {filteredProfiles.map((profile, index) => {
            return <ProfileList key={index} profile={profile} handleShowInviteForm={generateInviteForm} />
          })}
        </div>
      </div>
    </div>
  )
};

export default HiringPage;