import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { createNewUser, fetchGroup } from "../../services/userService";
import { toast } from "react-toastify";
import _ from "lodash";

const ModalUser = (props) => {
    const { action, dataModalUser } = props;
    const defaultUserData = {
        email: "",
        phone: "",
        username: "",
        password: "",
        address: "",
        gender: "",
        group: "",
    };

    const validInputsDefault = {
        email: true,
        phone: true,
        username: true,
        password: true,
        address: true,
        gender: true,
        group: true,
    };

    const [userData, setUserData] = useState(defaultUserData);
    const [validInputs, setValidInputs] = useState(validInputsDefault);

    const [userGroups, setUserGroups] = useState([]);
    useEffect(() => {
        getGroup();
    }, []);
    useEffect(() => {
        if (action === "UPDATE") {
            setUserData({ ...dataModalUser, group: dataModalUser.Group ? dataModalUser.Group.id : "" , gender : dataModalUser.gender ? dataModalUser.gender : "Male"});
        }
    }, [dataModalUser]);

    useEffect(() => {
        if (action === "CREATE") {
            if (userGroups && userGroups.length > 0) {
                setUserData({ ...userData, group: userGroups[0].id , gender : userData.gender = "Male"});
            }
        }
    }, [action]);
    const getGroup = async () => {
        let response = await fetchGroup();
        if (response && response.data && response.data.EC === 0) {
            setUserGroups(response.data.DT);
            if (response.data.DT && response.data.DT.length > 0) {
                let groups = response.data.DT;
                setUserData({ ...userData, group: groups[0].id });
            }
        } else {
            toast.error(response.data.EM);
        }
    };
    const handleOnchangeInput = (value, name) => {
        let _userData = _.cloneDeep(userData);
        _userData[name] = value;
        setUserData(_userData);
        validInputs[name] = true;
    };
    const checkValidateInputs = () => {
        setValidInputs(validInputsDefault);
        let arr = ["email", "phone", "password", "group"];
        let check = true;
        for (let i = 0; i < arr.length; i++) {
            if (!userData[arr[i]]) {
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[arr[i]] = false;
                setValidInputs(_validInputs);
                toast.error(`Empty input ${arr[i]}`);
                check = false;
                break;
            }
        }
        return check;
    };
    const handleConfirmUser = async () => {
        let check = checkValidateInputs();
        if (check) {
            let response = await createNewUser({ ...userData, groupId: userData["group"] });
            if (response.data && response.data.EC === 0) {
                props.onHide();
                setUserData({ ...defaultUserData, group: userGroups[0].id });
                toast.success(response.data.EM);
            } else {
                toast.error(response.data.EM);
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[response.data.DT] = false;
                setValidInputs(_validInputs);
            }
        }
    };
    const handleCloseUser = () => {
        props.onHide();
        setUserData(defaultUserData);
        setValidInputs(validInputsDefault);
    };
    return (
        <>
            <Modal size="lg" show={props.show} onHide={() => handleCloseUser()} className="modal-user">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span>{action === "CREATE" ? "Create New User" : "Edit a user"}</span>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="content-body row">
                        <div className="col-12 col-sm-6 form-group mb-2">
                            <label>Email: </label>
                            <input
                                disabled={action === "CREATE" ? false : true}
                                type="email"
                                className={validInputs.email ? "form-control" : "form-control is-invalid"}
                                placeholder="Enter Email"
                                value={userData.email}
                                onChange={(e) => handleOnchangeInput(e.target.value, "email")}
                            />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Phone: </label>
                            <input
                                type="text"
                                disabled={action === "CREATE" ? false : true}
                                placeholder="Enter Phone Number"
                                className={validInputs.phone ? "form-control" : "form-control is-invalid"}
                                value={userData.phone}
                                onChange={(e) => handleOnchangeInput(e.target.value, "phone")}
                            />
                        </div>
                        <div className="col-12 col-sm-6 form-group mb-2">
                            <label>Username: </label>
                            <input
                                type="text"
                                className={validInputs.username ? "form-control" : "form-control is-invalid"}
                                value={userData.username}
                                onChange={(e) => handleOnchangeInput(e.target.value, "username")}
                                placeholder="Enter Username"
                            />
                        </div>

                        <div className="col-12 col-sm-6 form-group">
                            {action === "CREATE" && (
                                <>
                                    <label>Password: </label>
                                    <input
                                        type="password"
                                        className={validInputs.password ? "form-control" : "form-control is-invalid"}
                                        value={userData.password}
                                        onChange={(e) => handleOnchangeInput(e.target.value, "password")}
                                        placeholder="Enter Password"
                                    />
                                </>
                            )}
                        </div>
                        <div className="col-12 form-group mb-2">
                            <label>Address: </label>
                            <input
                                type="text"
                                className={validInputs.address ? "form-control" : "form-control is-invalid"}
                                value={userData.address}
                                onChange={(e) => handleOnchangeInput(e.target.value, "address")}
                                placeholder="Enter Address"
                            />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Group: </label>
                            <select
                                className={validInputs.group ? "form-select" : "form-select is-invalid"}
                                onChange={(e) => handleOnchangeInput(e.target.value, "group")}
                                value={userData.group}
                            >
                                {userGroups.length > 0 &&
                                    userGroups.map((item, index) => {
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
                            <select
                                className="form-select"
                                onChange={(e) => handleOnchangeInput(e.target.value, "gender")}
                                value={userData.gender}
                            >
                                <option value="Male">
                                    Male
                                </option>
                                <option value="Female">
                                    Female
                                </option>
                                <option value="Other">Orther</option>
                            </select>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseUser()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleConfirmUser()}>
                        {action === "CREATE" ? "Save" : "Update"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default ModalUser;
