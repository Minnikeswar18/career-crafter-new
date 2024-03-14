import {useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import $ from 'jquery';

import BaseHeader from './components/baseHeader';
import ProfileList from './components/profileList';
import InviteForm from './components/inviteForm';
import {AckModal , ACK_TYPE} from './components/ackModal';
import checkJwt from '../helpers/jwt';
import Loader from './components/loader';

import '../styles/hiringPage.css';

function HiringPage(){
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showAck, setShowAck] = useState(false);
  const [ackMessage, setAckMessage] = useState('');
  const [ackType, setAckType] = useState('');
  const [invitee, setInvitee] = useState({});
  const [inviter, setInviter] = useState({});
  const [loading, setLoading] = useState(true);

  const handleCloseForm = () => setShowForm(false);
  const handleShowForm = () => setShowForm(true);

  const handleCloseAck = () => setShowAck(false);
  const handleShowAck = () => setShowAck(true);

  const navigate = useNavigate();

  const onLoad = async() => {
    try{
      const allProfiles = await axios.get(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/hire/getFreelancers`);
      setProfiles(allProfiles.data);
      setFilteredProfiles(allProfiles.data);
      setTimeout(()=> setLoading(false) , 1000);
    }
    catch(error){
      sendAck(ACK_TYPE.ERROR, 'Error fetching profiles');
    }
  }

  useEffect(() => {
    checkJwt().then(async(response) => {
      if(!response) {
        navigate('/entry');
      }
      setInviter(response);
      await onLoad();
    });
  },[]);

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
                for(let userSkill of profile.userSkills) {
                    if (userSkill.toLowerCase().includes(skill.toLowerCase())){
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

  const handleInvite = async(event , invitee) =>{
    event.preventDefault();

    const formData =  new FormData(event.target)
    const data = Object.fromEntries(formData.entries())
    data.inviteeEmail = invitee.email;
    data.inviteeUsername = invitee.username;
    try{
      await axios.post(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/hire/invite`, {invitee, invitation : data});
      handleCloseForm();
      sendAck(ACK_TYPE.SUCCESS, 'Invitation sent successfully');
    }
    catch(error){
      sendAck(ACK_TYPE.ERROR, error.response.data);
    }
  }

  const sendAck = (type, message) => {
    setAckMessage(message);
    setAckType(type);
    handleShowAck();
  }

  if(loading){
    return <Loader />
  }

  return(
    <div className='hiring-main'>
        <AckModal showAck={showAck} handleCloseAck={handleCloseAck} ackType={ackType} message = {ackMessage} />
        <BaseHeader />
        <InviteForm invitee={invitee} inviter={inviter} showForm = {showForm} handleCloseForm={handleCloseForm} handleSubmit={handleInvite}/>
        <h1 className='title mt-4 mb-5'>Discover Freelancers</h1>
        <div className="hiring-main-div">
            <div className='filter-div'>
                <form className="d-flex mb-4" role="search">
                    <input
                        id='search-username'
                        className="form-control"
                        type="search"
                        placeholder="Search by Username (Eg : johndoe)"
                        aria-label="Search"
                        onChange ={searchFunc}
                    />
                </form>
                <form className="d-flex mb-4" role="search">
                    <input
                        id='search-skill'
                        className="form-control"
                        type="search"
                        placeholder="Search by Skill (Eg : React)" 
                        aria-label="Search"
                        onChange ={searchFunc}
                    />
                </form>
                <form className="d-flex" role="search">
                    <input
                        id='search-title'
                        className="form-control"
                        type="search"
                        placeholder="Search by Title (Eg : Data Scientist)"
                        aria-label="Search"
                        onChange ={searchFunc}
                    />
                </form>
            </div>
            <div className='list-div'>
                {filteredProfiles.map((profile, index) => {
                  return <ProfileList key={index} profile={profile} handleShowInviteForm = {generateInviteForm}/>
                })}
            </div>
        </div>
    </div>
)};

export default HiringPage;