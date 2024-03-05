import React from 'react';
import {Modal} from 'react-bootstrap';
import AckModal from './ackModal';
import '../../styles/components/addJobForm.css';

function AddJobForm({addjobform}) {

  const [showForm, setShowForm] = React.useState(false);
  const handleCloseForm = () => setShowForm(false);
  const handleShowForm = () => setShowForm(true);
  
  const [showAck, setShowAck] = React.useState(false);
  const handleCloseAck = () => setShowAck(false);
  const handleShowAck = () => setShowAck(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    addjobform(event , handleCloseForm , handleShowAck);
  }

  return (
    <>
      <div className="floating-icon" onClick={handleShowForm}>
        <h1>+</h1>
      </div>

      <Modal show={showForm} onHide={handleCloseForm} size='lg' backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Create a new vacancy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={(event) => handleSubmit(event)}>
            <div className="form-floating mb-3">
                <input type = "hidden" name="company" value={"Microsoft"}/>
                <input type="text" className="form-control" placeholder="Company" value={'Microsoft'} disabled/>
                <label htmlFor="company-name">Company</label>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" name ="jobRole" placeholder="Job Role" required/>
                <label htmlFor="job-role">Job Role</label>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" name ="jobLocation" placeholder="Job Location" required/>
                <label htmlFor="job-location">Job Location</label>
            </div>
            <select className="form-select mb-3" aria-label="Default select example" name='workMode' defaultValue="Select work mode" required>
                <option disabled >Select work mode</option>
                <option value="WFO">Work from Office</option>
                <option value="WFH">Work from Home</option>
                <option value="Hybrid">Hybrid</option>
            </select>
            <select className="form-select mb-3" aria-label="Default select example" name='workType' id='work-type' defaultValue="Select work type">
                <option disabled >Select work type</option>
                <option value="1">Part Time</option>
                <option value="2">Full Time</option>
            </select>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" name="salary" placeholder="Salary"/>
                <label htmlFor="salary">Salary</label>
            </div>
            <div className="form-floating mb-3">
                <textarea className="form-control" name="jodDescription" placeholder="Job Description" id="floatingTextarea2" style={{height: '200px'}} required></textarea>
                <label htmlFor="floatingTextarea2">Job Description</label>
            </div>
            <div className="form-floating mb-3">
                <textarea className="form-control" name="keyResponsibilites" 
                placeholder="Key Responsibilties" id="floatingTextarea2" style={{height: '100px'}}></textarea>
                <label htmlFor="floatingTextarea2">Key Responsibilties</label>
            </div>
          <div className="d-flex flex-row justify-content-end">
          <button className="btn btn-secondary me-3" onClick={handleCloseForm}>
            Close
          </button>
          <button className="btn btn-primary me-3" type='submit'>
            Submit
          </button>
          </div>
        </form> 
        </Modal.Body>
      </Modal>
      <AckModal message='Job added successfully' handleCloseAck={handleCloseAck} showAck={showAck} ackType='success'/>      
    </>
  );
}

export default AddJobForm;

//TODO: JD should be min 200 characters length