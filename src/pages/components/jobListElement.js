import '../../styles/components/JobListElement.css'
import ViewJob from './viewJob';
import { useState } from 'react';

function JobListElement({job , deleteFunction , index}){
    const [showView, setShowView] = useState(false);
    const handleShowView = () => setShowView(true);
    const handleCloseView = () => setShowView(false);

    const getDate = (date) =>{
        if (!(date instanceof Date)) {
            date = new Date(date);
        }
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        return formattedDate;
    }

    async function deleteElement(){
        await deleteFunction(job._id);
    }
    return(
        <div className='element'>
            <ViewJob job={job} show = {showView} handleClose ={handleCloseView}/>
            <div className="main-div">
                <h1 className="main-top">
                    {job.jobTitle}
                </h1>
                <div className="main-bottom">
                    <h5 className='job-id'> <b>Date: </b> {getDate(job.datePosted)} </h5>
                    <h5 className='work-type'> <b>Work Type: </b> {job.jobType} </h5>
                    <h5 className='work-mode'> <b>Work Mode: </b> {job.jobMode} </h5>
                </div>
            </div>
            <div className='buttons'>
                <button type="button" className="btn btn-primary" onClick={handleShowView}>View</button>
                <button type="button" className="btn btn-danger" onClick={deleteElement}>Delete</button>
            </div>
        </div>
    );
}

export default JobListElement;