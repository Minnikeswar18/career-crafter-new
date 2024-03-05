import { Modal } from "react-bootstrap";

function AckModal({message , handleCloseAck , showAck , ackType}) {
    return (
        <Modal show={showAck} onHide={handleCloseAck} size='lg' backdrop="static">
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body >
                <div className={`alert alert-${ackType}`} role="alert">
                    {message}
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default AckModal;
