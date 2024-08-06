import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalUser = (props) => {
    return (
        <>
            <Modal size="lg" show={true} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span>{props.title}</span>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body></Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={props.confirmDeleteUser}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default ModalUser;
