import '../styles/homePage.css';
import Header from './components/baseHeader';
import JobElement from './components/jobListElement'
import { useEffect, useState } from 'react';
import AddJobForm from './components/addJobForm';
import AckModal from './components/ackModal';
import $ from 'jquery';
import axios from 'axios';

const INITIAL_SORT_STATE = 0;

// retrieve jobs from the database
const jobs = [
  {
    title: 'Software Developer',
    location: 'Bangalore',
    workType: 'Full Time',
    workMode: 'Work from Office',
    salary: '10LPA',
    description: 'Develop software',
    keyResponsibilites: 'Develop software',
    datePosted: 'Thu Jun 24 2021',
    company: 'Microsoft'
  },
  {
    title: 'Software Developer',
    location: 'Bangalore',
    workType: 'Full Time',
    workMode: 'Work from Office',
    salary: '10LPA',
    description: 'Develop software',
    keyResponsibilites: 'Develop software',
    datePosted: 'Thu Jun 24 2021',
    company: 'Microsoft'
  },
  {
    title: 'Software Engineer',
    location: 'Chennai',
    workType: 'Full Time',
    workMode: 'Work from Office',
    salary: '12LPA',
    description: 'Develop app',
    keyResponsibilites: 'Develop app',
    datePosted: 'Thu Jun 24 2022',
    company: 'Google'
  }
]

function HomePage() {
  const jwt = localStorage.getItem('jwt');
  const [jobList, setJobList] = useState(jobs);
  const [originalJobList, setOriginalJobList] = useState(jobs);
  const [sortState , setSortState] = useState(INITIAL_SORT_STATE);
  const [showAck, setShowAck] = useState(false);
  const [ackMessage, setAckMessage] = useState('');
  const [ackType, setAckType] = useState('');
  const handleCloseAck = () => setShowAck(false);
  const handleShowAck = () => setShowAck(true);

  const sendAck = async(message, type = "success") => {
    setAckMessage(message);
    setAckType(type);
    handleShowAck();
  }

  const getJob = (jobData) => {
    const newJob = {
      title: jobData.jobRole,
      location: jobData.jobLocation,
      workType: jobData.workType === undefined ? 'Not disclosed' : jobData.workType,
      workMode : jobData.workMode === undefined ? 'Not disclosed' : jobData.workMode,
      salary: jobData.salary === undefined ? 'Not disclosed' : jobData.salary,
      description: jobData.jodDescription,
      keyResponsibilites: jobData.keyResponsibilites === "" ? 'Not disclosed' : jobData.keyResponsibilites,
      datePosted: new Date().toDateString(),
      company : jobData.company
    }
    return newJob;
  }

  const addJob = (event , handleClose , handleShowAck) =>{
    const formData =  new FormData(event.target)
    const data = Object.fromEntries(formData.entries())
    const newJob = getJob(data);

      axios.post(`http://localhost:${process.env.BACKEND_PORT}/job/add`, newJob)
      .then((response) => {
        sendAck('Job added successfully');
      })
      .catch((error) => {
        sendAck(error, 'danger');
      });
    
    setOriginalJobList(prevJobList => [...prevJobList, newJob]);
    //TODO: update job table in the database

    handleClose()
    handleShowAck()
  }
  
  const deleteJob = (index) => {
    const newJobList = jobList.filter((job, i) => i !== index);
    setJobList(newJobList);
  }

  const sortJobs = (index) => {
    let newJobList = jobList;
    $('#' + sortState).removeClass('active');
    if(index === 0){
      newJobList = jobList.sort((a, b) => new Date(a.datePosted) - new Date(b.datePosted));
    }
    else if(index === 1){
      newJobList = jobList.sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));
    }
    else if(index === 2){
      newJobList = jobList.sort((a, b) => a.title.localeCompare(b.title));
    }
    else if(index === 3){
      newJobList = jobList.sort((a, b) => b.title.localeCompare(a.title));
    }
    setSortState(index);
    $('#' + index).addClass('active');
    setJobList(newJobList);
  }

  const searchJob = () => {
    const searchValue = $('#search-bar').val().toLowerCase();
    if(searchValue === ''){
      setJobList(originalJobList);
      return;
    }
    const newJobList = originalJobList.filter((job) => job.title.toLowerCase().includes(searchValue) || job.location.toLowerCase().includes(searchValue)) ;
    setJobList(newJobList);
  }

  useEffect(() => {
    sortJobs(sortState);
    searchJob();
  },[originalJobList]);

  return (
    <div className='home-page'>
      <Header />
      <AddJobForm addjobform={addJob}/>
      <AckModal message = {ackMessage} ackType = {ackType} showAck = {showAck} handleCloseAck = {handleCloseAck}/>
      <h1>Jobs Posted by You</h1>
      <div className='home-page-header'>
        <div className ="dropdown">
          <button className ="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Sort by
          </button>
          <ul className ="dropdown-menu dropdown-menu-dark">
            <li><a id='0' className ="dropdown-item active" onClick={() => sortJobs(0)} href="#">Date oldest</a></li>
            <li><a id='1' className ="dropdown-item" onClick={() => sortJobs(1)} href="#">Date latest</a></li>
            <li><a id='2' className ="dropdown-item" onClick={() => sortJobs(2)} href="#">Role ascending</a></li>
            <li><a id='3' className ="dropdown-item" onClick={() => sortJobs(3)} href="#">Role descending</a></li>
          </ul>
        </div>
        <form className="d-flex" role="search">
          <input
            id='search-bar'
            className="form-control"
            type="search"
            placeholder="Search by Job title/Location"
            aria-label="Search"
            onChange={searchJob}
          />
        </form>
      </div>
      <div className='home-page-content'>
        {jobList.map((job, index) =>  <JobElement key={index} index={index} job={job} deleteFunction={deleteJob} handleShowAck={handleShowAck}/>
        )}
      </div>
    </div>
  );
}

export default HomePage;

// set default sort as date latest