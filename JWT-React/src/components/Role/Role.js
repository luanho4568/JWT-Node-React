import React, { useEffect, useState } from "react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
const Role = (props) => {
    const listChildDefaults = {
        child1: { url: "", description: "" },
    };
    const [listChilds, setListChilds] = useState(listChildDefaults);
    const handleAddNewInput = () => {
        let _listChilds = _.cloneDeep(listChilds);
        _listChilds[`child-${uuidv4()}`] = { url: "", description: "" };
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
        setListChilds(_listChilds);
    };
    const handleSave = () => {
        let _listChilds = _.cloneDeep(listChilds);
        console.log(_listChilds);
    };
    return (
        <div className="role-container">
            <div className="container">
                <div className="row mt-3">
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
                                            className="form-control"
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
            </div>
        </div>
    );
};

export default Role;
