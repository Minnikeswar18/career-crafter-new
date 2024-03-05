import { Modal } from "react-bootstrap";

function ViewJob({ job , show , handleClose}) {

    return (
        <Modal show={show} onHide={handleClose} size='lg' backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Job Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control border-0" placeholder="Company" value={job.company} readonly />
                        <label htmlFor="company-name">Company</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control border-0" placeholder="Job Role" value={job.title} readonly />
                        <label htmlFor="job-role">Job Role</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control border-0"  placeholder="Job Location" value={job.location} readonly />
                        <label htmlFor="job-location">Job Location</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control border-0" placeholder="Work Mode" value={job.workMode} readonly />
                        <label htmlFor="job-location">Work Mode</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control border-0" placeholder="Work Type" value={job.workType} readonly />
                        <label htmlFor="job-location">Work Type</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control border-0" placeholder="Salary" value={job.salary} readonly />
                        <label htmlFor="salary">Salary</label>
                    </div>
                    <div className="form-floating mb-3">
                        <textarea className="form-control border-0" name="jodDescription" placeholder="Job Description" id="floatingTextarea2" ref={(textarea) => { if (textarea) { textarea.style.height = `${textarea.scrollHeight}px`; } }} readonly>{job.description}</textarea>
                        <label htmlFor="floatingTextarea2">Job Description</label>
                    </div>
                    <div className="form-floating mb-3">
                        <textarea className="form-control border-0" name="keyResponsibilites" placeholder="Key Responsibilities" id="floatingTextarea2" readonly ref={(textarea) => { if (textarea) { textarea.style.height = `${textarea.scrollHeight}px`; } }}>{job.keyResponsibilites}</textarea>
                        <label htmlFor="floatingTextarea2">Key Responsibilities</label>
                    </div>
                    <div className="d-flex flex-row justify-content-end">
                        <button className="btn btn-primary me-3">
                            View applicants
                        </button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default ViewJob;