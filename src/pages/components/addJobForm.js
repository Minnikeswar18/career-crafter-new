import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { AckModal } from './ackModal';
import '../../styles/components/addJobForm.css';

function AddJobForm({ addjobform }) {

  const [showForm, setShowForm] = useState(false);
  const handleCloseForm = () => setShowForm(false);
  const handleShowForm = () => setShowForm(true);

  const [showAck, setShowAck] = useState(false);
  const handleCloseAck = () => setShowAck(false);
  const handleShowAck = () => setShowAck(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    addjobform(event, handleCloseForm, handleShowAck);
  }

  return (
    <>
      <div className="floating-icon" onClick={handleShowForm}>
        <h1 className='page-heading'>+</h1>
      </div>

      <Modal show={showForm} onHide={handleCloseForm} size='lg' backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title className='form-heading'>Create a new job opening</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(event) => handleSubmit(event)}>
            <div className="form-floating mb-3">
              <input type="hidden" name="company" />
              <input type="text" className="form-control" name="companyName" placeholder="Company Name" required />
              <label htmlFor="company-name">Company Name</label>
            </div>
            <div className="form-floating mb-3">
              <input type="text" className="form-control" name="jobRole" placeholder="Job Role" required />
              <label htmlFor="job-role">Job Role</label>
            </div>
            <div className="input-group mb-3">
              <label className="input-group-text grey-bg" for="inputGroupSelect01">Work Mode</label>
              <select className="form-select" id="inputGroupSelect01" name='workMode'>
                <option selected value="Work from Office">Work from Office</option>
                <option value="Work from Home">Work from Home</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div className="input-group mb-3">
              <label className="input-group-text grey-bg" for="inputGroupSelect01">Work Type</label>
              <select className="form-select" id="inputGroupSelect01" name='jobType'>
                <option selected value="Part Time">Part Time</option>
                <option value="Full Time">Full Time</option>
                <option value="Performance based FTE">Performance based FTE</option>
              </select>
            </div>
            <div className="input-group mb-3">
              <label className="input-group-text grey-bg" for="inputGroupSelect01">Job Scope</label>
              <select className="form-select" id="inputGroupSelect01" name='jobScope'>
                <option selected value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </div>
            <div className="input-group mb-3">
              <label className="input-group-text grey-bg" for="inputGroupSelect01">Required Experience</label>
              <select className="form-select" id="inputGroupSelect01" name='experience'>
                <option selected value="Fresher (0-2 years)">Fresher (0-2 years)</option>
                <option value="Intermediate (2-5 years)">Intermediate (2-5 years)</option>
                <option value="Expert (5+ years)">Expert (5+ years)</option>
              </select>
            </div>
            <div className="input-group mb-3">
              <label className="input-group-text grey-bg" for="inputGroupSelect01">Salary type</label>
              <select className="form-select" id="inputGroupSelect01" name='salaryType'>
                <option selected value="Hourly rate (/hr)">Hourly rate (/hr)</option>
                <option value="Fixed price">Fixed price</option>
              </select>
            </div>
            <div className="form-floating mb-3">
              <input type="text" className="form-control" name="salary" placeholder="Salary (INR)" required />
              <label htmlFor="salary">Salary (INR)</label>
            </div>
            <div className="form-floating mb-3">
              <textarea className="form-control" name="description" placeholder="Job Description" id="floatingTextarea2" style={{ height: '150px' }} required></textarea>
              <label htmlFor="floatingTextarea2">Job Description</label>
            </div>
            <div className="form-floating mb-3">
              <textarea className="form-control" name="skills"
                placeholder="Skills Required" id="floatingTextarea2" style={{ height: '50px' }}></textarea>
              <label htmlFor="floatingTextarea2">Skills Required (Comma seperated)</label>
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
      <AckModal message='Job added successfully' handleCloseAck={handleCloseAck} showAck={showAck} ackType='success' />
    </>
  );
}

export default AddJobForm;

//TODO: JD should be min 200 characters length