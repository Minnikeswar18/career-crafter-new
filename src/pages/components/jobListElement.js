import '../../styles/components/JobListElement.css'
import ViewJob from './viewJob';
import { useState } from 'react';

function JobListElement({job , deleteFunction , index , handleShowAck}){
    const [showView, setShowView] = useState(false);
    const handleShowView = () => setShowView(true);
    const handleCloseView = () => setShowView(false);

    async function deleteElement(){
        deleteFunction(index);
        handleShowAck();
    }
    return(
        <div className='element'>
            <ViewJob job={job} show = {showView} handleClose ={handleCloseView}/>
            <div className="main-div">
                <h1 className="main-top">
                    {job.title}
                </h1>
                <div className="main-bottom">
                    <h5 className='job-id'> <b>Date: </b> {job.datePosted} </h5>
                    <h5 className='location'> <b>Location: </b> {job.location} </h5>
                    <h5 className='work-type'> <b>Work Type: </b> {job.workType} </h5>
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