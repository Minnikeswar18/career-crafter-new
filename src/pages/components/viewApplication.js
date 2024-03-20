import { Modal } from "react-bootstrap";
import Tag from "./tag";

function ViewApplication({ application, showApplication, handleClose }) {
    const applicant = application.appliedBy;
    return (
        <Modal show={showApplication} onHide={handleClose} size='lg' backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Application Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form >
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" value={applicant.firstName} readOnly />
                        <label htmlFor="company-name">Applicant First Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" value={applicant.lastName} readOnly />
                        <label htmlFor="company-name">Applicant Last Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" value={applicant.email} readOnly />
                        <label htmlFor="company-name">Applicant Email</label>
                    </div>
                    <div className="form-floating mb-3">
                        <textarea className="form-control" value={applicant.userBio} id="floatingTextarea2" ref={(textarea) => { if (textarea) { textarea.style.height = `${textarea.scrollHeight}px`; } }} readOnly></textarea>
                        <label htmlFor="floatingTextarea2">Applicant Bio</label>
                    </div>
                    <div className="form-floating mb-3">
                        <textarea className="form-control" value={applicant.userAbout} id="floatingTextarea2" ref={(textarea) => { if (textarea) { textarea.style.height = `${textarea.scrollHeight}px`; } }} readOnly></textarea>
                        <label htmlFor="floatingTextarea2">Applicant About</label>
                    </div>
                    <div className="form-floating mb-3">
                        <textarea className="form-control" value={application.startDate} id="floatingTextarea2" ref={(textarea) => { if (textarea) { textarea.style.height = `${textarea.scrollHeight}px`; } }} readOnly></textarea>
                        <label htmlFor="floatingTextarea2">Available Date</label>
                    </div>

                    {applicant.userSkills.length === 0 ?
                        <div className="form-floating mb-3">
                            <textarea className="form-control" value={"Not Disclosed"} id="floatingTextarea2" ref={(textarea) => { if (textarea) { textarea.style.height = `${textarea.scrollHeight}px`; } }} readOnly>
                            </textarea>
                            <label htmlFor="floatingTextarea2">Applicant Skills</label>
                        </div>
                        :
                        <div className="skills-div mb-3">
                            <label className="skills-label ps-3 mb-2 fw-light">Applicant Skills</label>
                            <div className="d-flex flex-row flex-wrap">
                                {applicant.userSkills.map((skill, index) => {
                                    return <Tag key={index} content={skill} />
                                })}
                            </div>
                        </div>
                    }
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

export default ViewApplication;