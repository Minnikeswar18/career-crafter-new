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
                    <input type = "hidden" name="company"/>
                    <input type="text" className="form-control" value={job.companyName} readOnly/>
                    <label htmlFor="company-name">Company Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" value={job.jobTitle} readOnly/>
                    <label htmlFor="job-role">Job Role</label>
                </div>
                <div className="input-group mb-3">
                <label className="input-group-text grey-bg" for="inputGroupSelect01">Work Mode</label>
                    <input className="form-select" id="inputGroupSelect01" value={job.jobMode} readOnly></input>
                </div>
                <div className="input-group mb-3">
                <label className="input-group-text grey-bg" for="inputGroupSelect01">Work Type</label>
                    <input className="form-select" id="inputGroupSelect01" value={job.jobType} readOnly></input>
                </div>
                <div className="input-group mb-3">
                <label className="input-group-text grey-bg" for="inputGroupSelect01">Job Scope</label>
                    <input className="form-select" id="inputGroupSelect01" value={job.jobScope} readOnly></input>
                </div>
                <div className="input-group mb-3">
                <label className="input-group-text grey-bg" for="inputGroupSelect01">Required Experience</label>
                    <input className="form-select" id="inputGroupSelect01" value={job.jobExperience} readOnly></input>
                </div>
                <div className="input-group mb-3">
                <label className="input-group-text grey-bg" for="inputGroupSelect01">Salary type</label>
                    <input className="form-select" id="inputGroupSelect01" value={job.salaryType} readOnly></input>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control"value ={job.jobSalary}  readOnly/>
                    <label htmlFor="salary">Salary (INR)</label>
                </div>
                <div className="form-floating mb-3">
                    <textarea className="form-control"  value={job.jobDescription} id="floatingTextarea2" ref={(textarea) => { if (textarea) { textarea.style.height = `${textarea.scrollHeight}px`;}}} readOnly></textarea>
                    <label htmlFor="floatingTextarea2">Job Description</label>
                </div>
                <div className="form-floating mb-3">
                    <textarea className="form-control" value={job.jobSkills} id="floatingTextarea2" ref={(textarea) => { if (textarea) { textarea.style.height = `${textarea.scrollHeight}px`; } }} readOnly>

                    </textarea>
                    <label htmlFor="floatingTextarea2">Skills Required</label>
                </div>
                    {/* <label htmlFor="floatingTextarea2 ml">Skills Required (Comma seperated)</label>
                <div className="form-floating mb-3">
                    <span class="badge text-bg-secondary mx-2">Secondary</span>
                    <span class="badge text-bg-secondary mx-2">Secondary</span>
                    <span class="badge text-bg-secondary mx-2">Secondary</span>
                </div> */}
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