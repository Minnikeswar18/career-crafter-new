import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Header from './components/baseHeader';
import InviteForm from './components/inviteForm';
import ProfileList from './components/profileList';
import { AckModal, ACK_TYPE } from './components/ackModal';
import checkJwt from '../helpers/jwt';
import Loader from './components/loader';
import PopupLoader from './components/popupLoader';
import { Dropdown } from 'semantic-ui-react';
import '../styles/jobsPage.css';
import 'semantic-ui-css/semantic.min.css';

function JobsPage() {
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [jobList, setJobList] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [showAck, setShowAck] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [ackMessage, setAckMessage] = useState('');
    const [ackType, setAckType] = useState('');
    const [invitee, setInvitee] = useState({});
    const [inviter, setInviter] = useState({});


    const [loading, setLoading] = useState(true);
    const [showLoader, setShowLoader] = useState(false);

    const handleCloseAck = () => setShowAck(false);
    const handleShowAck = () => setShowAck(true);

    const handleCloseForm = () => setShowForm(false);
    const handleShowForm = () => setShowForm(true);

    const navigate = useNavigate();

    useEffect(() => {
        checkJwt().then(async (response) => {
            if (!response) {
                navigate('/entry');
            }
            setInviter(response);
            await onLoad();
        });
    }, []);

    const handleJobChange = async (event, data) => {
        if (event) event.preventDefault();
        setShowLoader(true);
        const jobId = data.value;
        setSelectedJobId(jobId);
        try {
            const response = await axios.get(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/home/similarProfiles/${jobId}`);
            const profiles = response.data;
            setProfiles(profiles);
            setShowLoader(false);
        } catch (error) {
            setShowLoader(false);
            sendAck('Error fetching profiles', ACK_TYPE.ERROR);
        }
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
            await axios.post(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/hire/invite`, { inviteeId: invitee._id, invitation: data });
            setShowLoader(false);
            handleCloseForm();
            sendAck(ACK_TYPE.SUCCESS, 'Invitation sent successfully');
        }
        catch (error) {
            setShowLoader(false);
            sendAck(ACK_TYPE.ERROR, error.response.data);
        }
    }

    const onLoad = async () => {
        const getDate = (date) => {
            if (!(date instanceof Date)) {
                date = new Date(date);
            }
            const options = { day: '2-digit', month: 'long', year: 'numeric' };
            const formattedDate = date.toLocaleDateString('en-US', options);
            return formattedDate;
        }

        axios.get(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/home/myjobs`)
            .then((response) => {

                const jobs = response.data;
                jobs.forEach((element, index) => {
                    jobs[index] = {
                        id: element._id,
                        datePosted: getDate(element.datePosted),
                        jobTitle: element.jobTitle,
                        companyName: element.companyName,
                    };
                });
                setJobList(jobs);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                sendAck('Error fetching jobs', ACK_TYPE.ERROR);
            });
    }

    const sendAck = async (message, type) => {
        setAckMessage(message);
        setAckType(type);
        handleShowAck();
    }

    if (loading) {
        return <Loader />
    }

    return (
        <div className='home-page'>
            <Header />
            <AckModal message={ackMessage} ackType={ackType} showAck={showAck} handleCloseAck={handleCloseAck} />
            <InviteForm invitee={invitee} inviter={inviter} showForm={showForm} handleCloseForm={handleCloseForm} handleSubmit={handleInvite} />
            <PopupLoader showLoader={showLoader} />
            <h1 className='page-heading'>Top Matching Profiles for your Jobs</h1>
            <div className='home-page-header'>
                <Dropdown
                    fluid
                    search
                    selection
                    options={jobList.map(option => ({
                        key: option.id,
                        value: option.id,
                        text: `${option.jobTitle} at ${option.companyName} (${option.datePosted})`
                    }))}
                    placeholder='Select Job'
                    onChange={handleJobChange}
                />
            </div>
            <div className='home-page-content'>
                {
                    selectedJobId ?
                        profiles.length > 0 ?
                            profiles.map((profile, index) => {
                                return (
                                    <ProfileList key={index} profile={profile} handleShowInviteForm={generateInviteForm} />
                                );
                            })
                            :
                            <div className='home-page-content-empty'>
                                <h2>No profiles found for this job</h2>
                            </div>
                        :
                        <div className='home-page-content-empty'>
                            <h2>Select a job to view matching profiles</h2>
                        </div>
                }
            </div>
        </div>
    );
}

export default JobsPage;