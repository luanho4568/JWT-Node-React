import React, { useEffect, useRef, useState } from "react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { createRolesService } from "../../services/roleService";
import TableRoles from "./TableRoles";
const Role = (props) => {
    const listChildDefaults = {
        child1: { url: "", description: "", isValidUrl: true },
    };
    const [listChilds, setListChilds] = useState(listChildDefaults);
    const childRef = useRef();
    const handleAddNewInput = () => {
        let _listChilds = _.cloneDeep(listChilds);
        _listChilds[`child-${uuidv4()}`] = { url: "", description: "", isValidUrl: true };
        setListChilds(_listChilds);
    };
    const handleDeleteInput = (key) => {
        let _listChilds = _.cloneDeep(listChilds);
        delete _listChilds[key];
        setListChilds(_listChilds);
    };
    const handleOnchangeInput = (name, value, key) => {
        let _listChilds = _.cloneDeep(listChilds);
        _listChilds[key][name] = value;
        if (value && name === "url") {
            _listChilds[key]["isValidUrl"] = true;
        }
        setListChilds(_listChilds);
    };
    const buildDataToPersist = () => {
        let _listChilds = _.cloneDeep(listChilds);
        let result = [];
        Object.entries(_listChilds).map(([key, child], index) => {
            result.push({
                url: child.url,
                description: child.description,
            });
        });
        return result;
    };
    const handleSave = async () => {
        let invalidObj = Object.entries(listChilds).find(([key, child], index) => {
            return child && !child.url;
        });
        if (!invalidObj) {
            //  call api
            let data = buildDataToPersist();
            let res = await createRolesService(data);
            if (res?.EC === 0) {
                toast.success(res.EM);
                childRef.current.fetchRolesAgain();
                setListChilds(listChildDefaults);
            }
        } else {
            // error
            toast.error("Input URL must not be empty...");
            let _listChilds = _.cloneDeep(listChilds);
            const key = invalidObj[0];
            _listChilds[key]["isValidUrl"] = false;
            setListChilds(_listChilds);
        }
    };

    return (
        <div className="role-container">
            <div className="container">
                <div className="adding-roles mt-3">
                    <div className="title-role">
                        <h3 className="title-role">Create New Roles</h3>
                    </div>
                    <div className="role-parent">
                        {Object.entries(listChilds).map(([key, child], index) => {
                            return (
                                <div className=" row role-child" key={`child-${key}`}>
                                    <div className={`col-5 form-group ${key}`}>
                                        <label>URL:</label>
                                        <input
                                            type="text"
                                            className={child.isValidUrl ? "form-control" : "form-control is-invalid"}
                                            value={child.url}
                                            onChange={(e) => handleOnchangeInput("url", e.target.value, key)}
                                        />
                                    </div>
                                    <div className="col-5 form-group">
                                        <label>Description:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={child.description}
                                            onChange={(e) => handleOnchangeInput("description", e.target.value, key)}
                                        />
                                    </div>
                                    <div className="col-2 mt-4 actions">
                                        <button className="btn btn-primary mx-2" onClick={() => handleAddNewInput()}>
                                            Add
                                        </button>
                                        {index >= 1 && (
                                            <button className="btn btn-danger" onClick={() => handleDeleteInput(key)}>
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div>
                        <button className="btn btn-warning mt-3" onClick={() => handleSave()}>
                            Save
                        </button>
                    </div>
                </div>
                <hr />
                <div className="mt-3">
                    <h4>List Current Roles</h4>

                    <TableRoles ref={childRef} />
                </div>
            </div>
        </div>
    );
};

export default Role;
