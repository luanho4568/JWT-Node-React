import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { fetchGroup } from "../../services/userService";
import { toast } from "react-toastify";

const ModalUser = (props) => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [group, setGroup] = useState("");

    const [userGroup, setUserGroup] = useState([]);
    useEffect(() => {
        getGroup();
    }, []);
    const getGroup = async () => {
        let response = await fetchGroup();
        if (response && response.data && response.data.EC === 0) {
            setUserGroup(response.data.DT);
        } else {
            toast.error(response.data.EM);
        }
    };
    return (
        <>
            <Modal size="lg" show={true} onHide={props.handleClose} className="modal-user">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span>{props.title}</span>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="content-body row">
                        <div className="col-12 col-sm-6 form-group mb-2">
                            <label>Email: </label>
                            <input type="email" className="form-control" placeholder="Enter Email" />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Phone: </label>
                            <input type="text" className="form-control" placeholder="Enter Phone Number" />
                        </div>
                        <div className="col-12 col-sm-6 form-group mb-2">
                            <label>Username: </label>
                            <input type="text" className="form-control" placeholder="Enter Username" />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Password: </label>
                            <input type="text" className="form-control" placeholder="Enter Password" />
                        </div>
                        <div className="col-12 form-group mb-2">
                            <label>Address: </label>
                            <input type="text" className="form-control" placeholder="Enter Address" />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Group: </label>
                            <select className="form-select">
                                {userGroup.length > 0 &&
                                    userGroup.map((item, index) => {
                                        return (
                                            <option key={`group-${index}`} value={item.id}>
                                                {item.name}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Gender: </label>
                            <select className="form-select">
                                <option defaultValue="">
                                    Select Gender
                                </option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Orther</option>
                            </select>
                        </div>
                    </div>
                </Modal.Body>

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
