import '../styles/homePage.css';
import Header from './components/baseHeader';
import JobElement from './components/jobListElement'
import { useEffect, useState } from 'react';
import AddJobForm from './components/addJobForm';
import {AckModal , ACK_TYPE} from './components/ackModal';
import $ from 'jquery';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import checkJwt from '../helpers/jwt';
import Loader from './components/loader';
import PopupLoader from './components/popupLoader';

function HomePage() {
  const [originalJobList, setOriginalJobList] = useState([]);
  const [jobList, setJobList] = useState([]);
  const [sortState , setSortState] = useState(process.env.REACT_APP_INITIAL_SORT_STATE);
  const [showAck, setShowAck] = useState(false);
  const [ackMessage, setAckMessage] = useState('');
  const [ackType, setAckType] = useState('');

  const [loading , setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  
  const handleCloseAck = () => setShowAck(false);
  const handleShowAck = () => setShowAck(true);

  const navigate = useNavigate();

  useEffect(() => {
    checkJwt().then(async(isJwtValid) => {
      if(!isJwtValid) {
        navigate('/entry');
      }
      await onLoad();
    });
  },[]);

  const onLoad = async() => {
    axios.get(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/job/myjobs`)
    .then((response) => {
      setOriginalJobList(response.data);
      setJobList(response.data);
      setLoading(false);
    })
    .catch((error) => {
      setLoading(false);
      sendAck('Error fetching jobs', ACK_TYPE.ERROR);
    });
  }

  const sendAck = async(message , type) => {
    setAckMessage(message);
    setAckType(type);
    handleShowAck();
  }
  
  const addJob = async (event , handleClose) =>{
    if(event) event.preventDefault();
    setShowLoader(true);
    const getJob = (jobData) => {
      const newJob = {
        companyName: jobData.companyName,
        jobTitle: jobData.jobRole,
        jobType: jobData.jobType,
        jobSalary: jobData.salary,
        jobMode: jobData.workMode,
        jobScope : jobData.jobScope,
        jobExperience : jobData.experience,
        salaryType : jobData.salaryType,
        jobDescription : jobData.description,
        jobSkills : jobData.skills ? jobData.skills.split(',').map(skill => skill.trim()) : [],
      }
      return newJob;
    }
    const formData =  new FormData(event.target)
    const data = Object.fromEntries(formData.entries())
    const newJob = getJob(data);

    $('#search-bar').val('');
    
    axios.post(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/job/add`, newJob)
    .then(async(response) => {
      await onLoad();
      handleClose();
      setShowLoader(false);
      sendAck('Job added successfully' , ACK_TYPE.SUCCESS);
    })
    .catch((error) => {
      setShowLoader(false);
      sendAck(error.response.data, ACK_TYPE.ERROR);
    });
  }
  
  const deleteJob = async(jobId) => {
    setShowLoader(true);
    axios.delete(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/job/delete/${jobId}`)
    .then(async(response) => {
        $('#search-bar').val('');
        await onLoad();
        setShowLoader(false);
        sendAck('Job deleted successfully', ACK_TYPE.SUCCESS);
      })
      .catch((error) => {
        setShowLoader(false);
        sendAck('Error deleting the job', ACK_TYPE.ERROR);
      });
  }

  const sortJobs = (index) => {
    let newJobList = jobList;
    $('#' + sortState).removeClass('active');
    if(index === 0){
      newJobList = jobList.sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));
    }
    else if(index === 1){
      newJobList = jobList.sort((a, b) => new Date(a.datePosted) - new Date(b.datePosted));
    }
    else if(index === 2){
      newJobList = jobList.sort((a, b) => a.jobTitle.localeCompare(b.jobTitle));
    }
    else if(index === 3){
      newJobList = jobList.sort((a, b) => b.jobTitle.localeCompare(a.jobTitle));
    }
    setSortState(index);
    $('#' + index).addClass('active');
    setJobList(newJobList);
  }

  const searchJob = () => {
    let searchValue = $('#search-bar').val();
    if(searchValue === ''){
      setJobList(originalJobList);
      return;
    }
    searchValue = searchValue.toLowerCase();
    const newJobList = originalJobList.filter((job) => job.jobTitle.toLowerCase().includes(searchValue)) ;
    setJobList(newJobList);
  }

  if(loading){
    return <Loader/>
  }

  return (
    <div className='home-page'>
      <Header />
      <AddJobForm addjobform={addJob}/>
      <AckModal message = {ackMessage} ackType = {ackType} showAck = {showAck} handleCloseAck = {handleCloseAck}/>
      <PopupLoader showLoader={showLoader}/>
      <h1>Jobs Posted by You</h1>
      <div className='home-page-header'>
        <div className ="dropdown">
          <button className ="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Sort by
          </button>
          <ul className ="dropdown-menu dropdown-menu-dark">
            <li><a id='0' className ="dropdown-item" onClick={() => sortJobs(0)} >Date latest</a></li>
            <li><a id='1' className ="dropdown-item" onClick={() => sortJobs(1)} >Date oldest</a></li>
            <li><a id='2' className ="dropdown-item" onClick={() => sortJobs(2)} >Title ascending</a></li>
            <li><a id='3' className ="dropdown-item" onClick={() => sortJobs(3)} >Title descending</a></li>
          </ul>
        </div>
        <form className="d-flex" role="search">
          <input
            id='search-bar'
            className="form-control"
            type="search"
            placeholder="Search by Job title"
            aria-label="Search"
            onChange={searchJob}
          />
        </form>
      </div>
      <div className='home-page-content'>
        {jobList.map((job, index) =>  <JobElement key={index} index={index} job={job} deleteFunction={deleteJob}/>
        )}
      </div>
    </div>
  );
}

export default HomePage;