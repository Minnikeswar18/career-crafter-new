import { Modal } from 'react-bootstrap';
import '../../styles/components/inviteForm.css';

function InviteForm({ invitee, inviter, showForm, handleCloseForm, handleSubmit }) {
  return (
    <Modal show={showForm} onHide={handleCloseForm} size='lg' backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title className='form-heading'>Invite Freelancer to work</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={(event) => handleSubmit(event, invitee)}>
          <div className="form-floating mb-3">
            <input type="text" className="form-control" value={invitee.username} disabled />
            <label htmlFor="company-name">Invitee</label>
          </div>
          <div className="form-floating mb-3">
            <input type="text" className="form-control" value={inviter.username} disabled />
            <label htmlFor="company-name">Inviter</label>
          </div>
          <div className="form-floating mb-3">
            <input type="text" className="form-control" name="companyName" placeholder="Company Name" required />
            <label htmlFor="company-name">Company Name</label>
          </div>
          <div className="form-floating mb-3">
            <input type="text" className="form-control" name="jobTitle" placeholder="Job Role" required />
            <label htmlFor="job-role">Job Role</label>
          </div>
          <div className="input-group mb-3">
            <label className="input-group-text grey-bg" for="inputGroupSelect01">Work Mode</label>
            <select className="form-select" id="inputGroupSelect01" name='jobMode'>
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
            <label className="input-group-text grey-bg" for="inputGroupSelect01">Salary type</label>
            <select className="form-select" id="inputGroupSelect01" name='salaryType'>
              <option selected value="Hourly rate (/hr)">Hourly rate (/hr)</option>
              <option value="Fixed price">Fixed price</option>
            </select>
          </div>
          <div className="form-floating mb-3">
            <input type="text" className="form-control" name="jobSalary" placeholder="Salary (INR)" required />
            <label htmlFor="salary">Salary (INR)</label>
          </div>
          <div className="form-floating mb-3">
            <textarea className="form-control" name="jobDescription" placeholder="Job Description" id="floatingTextarea2" style={{ height: '150px' }} required></textarea>
            <label htmlFor="floatingTextarea2">Work Description</label>
          </div>
          <div className="d-flex flex-row justify-content-end">
            <button className="btn btn-secondary me-3" onClick={handleCloseForm}>
              Close
            </button>
            <button className="btn btn-success me-3" type='submit'>
              Send Invite
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default InviteForm;

//TODO: JD should be min 200 characters length