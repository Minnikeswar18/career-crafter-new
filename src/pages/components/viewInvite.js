import { Modal } from "react-bootstrap";

function ViewInvite({ invitation, show, handleClose }) {
    return (
        <Modal show={show} onHide={handleClose} size='lg' backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Invitation Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form >
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" value={invitation.inviteeUsername} readOnly />
                        <label htmlFor="company-name">Invitee</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" value={invitation.inviterUsername} readOnly />
                        <label htmlFor="company-name">Inviter</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" value={invitation.companyName} readOnly />
                        <label htmlFor="company-name">Company Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" value={invitation.jobTitle} readOnly />
                        <label htmlFor="job-role">Job Role</label>
                    </div>
                    <div className="input-group mb-3">
                        <label className="input-group-text grey-bg" for="inputGroupSelect01">Work Mode</label>
                        <input className="form-select" id="inputGroupSelect01" value={invitation.jobMode} readOnly></input>
                    </div>
                    <div className="input-group mb-3">
                        <label className="input-group-text grey-bg" for="inputGroupSelect01">Work Type</label>
                        <input className="form-select" id="inputGroupSelect01" value={invitation.jobType} readOnly></input>
                    </div>
                    <div className="input-group mb-3">
                        <label className="input-group-text grey-bg" for="inputGroupSelect01">Job Scope</label>
                        <input className="form-select" id="inputGroupSelect01" value={invitation.jobScope} readOnly></input>
                    </div>
                    <div className="input-group mb-3">
                        <label className="input-group-text grey-bg" for="inputGroupSelect01">Salary type</label>
                        <input className="form-select" id="inputGroupSelect01" value={invitation.salaryType} readOnly></input>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" value={invitation.jobSalary} readOnly />
                        <label htmlFor="salary">Salary (INR)</label>
                    </div>
                    <div className="form-floating mb-3">
                        <textarea className="form-control" value={invitation.jobDescription} id="floatingTextarea2" ref={(textarea) => { if (textarea) { textarea.style.height = `${textarea.scrollHeight}px`; } }} readOnly></textarea>
                        <label htmlFor="floatingTextarea2">Work Description</label>
                    </div>
                    <div className="d-flex flex-row justify-content-end">
                        <button className="btn btn-secondary me-3" onClick={handleClose}>
                            Close
                        </button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default ViewInvite;