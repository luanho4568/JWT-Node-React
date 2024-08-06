import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalDelete(props) {
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm delete user</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Woohoo, are u sure to delete this user : {props.dataModal.email}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>Close</Button>
                    <Button variant="primary" onClick={props.confirmDeleteUser}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDelete;
