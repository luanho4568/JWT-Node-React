import React, { useEffect, useState } from "react";
import "./GroupRole.scss";
import { fetchGroup } from "../../services/userService";
import { toast } from "react-toastify";
import { assignRolesToGroup, fetchAllRoles, fetchRolesByGroup } from "../../services/roleService";
import _ from "lodash";
const GroupRole = (props) => {
    const [userGroups, setUserGroups] = useState([]);
    const [listRoles, setListRoles] = useState([]);
    const [selectGroup, setSelectGroup] = useState("");

    const [assignRolesByGroup, setAssignRolesByGroup] = useState([]);
    useEffect(() => {
        getGroup();
        fetchRoles();
    }, []);
    const handleOnchangeSelect = (e) => {};
    const getGroup = async () => {
        let response = await fetchGroup();
        if (response && response.EC === 0) {
            setUserGroups(response.DT);
        } else {
            toast.error(response.EM);
        }
    };
    const fetchRoles = async () => {
        let response = await fetchAllRoles(0, 0);
        if (response && +response.EC === 0) {
            setListRoles(response.DT);
        }
    };

    const handleOnchangeGroup = async (value) => {
        setSelectGroup(value);
        if (value) {
            let data = await fetchRolesByGroup(value);
            if (data && +data.EC === 0) {
                let groupRoles = data.DT.Roles;
                let allRoles = listRoles;
                let result = await buildDataRolesByGroup(groupRoles, allRoles);
                setAssignRolesByGroup(result);
            }
        }
    };
    const buildDataRolesByGroup = (groupRoles, allRoles) => {
        let result = [];
        if (allRoles?.length > 0) {
            allRoles.map((role) => {
                let obj = {};
                obj.url = role.url;
                obj.id = role.id;
                obj.description = role.description;
                obj.isAssigned = false;
                if (groupRoles?.length > 0) {
                    obj.isAssigned = groupRoles.some((item) => item.url === role.url);
                }
                result.push(obj);
            });
        }
        return result;
    };
    const handleSelectRole = (value) => {
        const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup);
        let foundIndex = _assignRolesByGroup.findIndex((item) => +item.id === +value);
        console.log(foundIndex);

        if (foundIndex > -1) {
            _assignRolesByGroup[foundIndex].isAssigned = !_assignRolesByGroup[foundIndex].isAssigned;
        }
        setAssignRolesByGroup(_assignRolesByGroup);
    };

    const buildDataToSave = () => {
        let result = {};
        const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup);
        result.groupId = selectGroup;
        let groupRolesFilter = _assignRolesByGroup.filter((item) => item.isAssigned === true);
        let finalGroupRoles = groupRolesFilter.map(item => {
            let data = { groupId: +selectGroup, roleId: +item.id };
            return data;
        });
        result.groupRoles = finalGroupRoles;
        return result;
    };
    const handleSave = async () => {
        let data = buildDataToSave();
        let response = await assignRolesToGroup(data)
        if(response?.EC === 0) {
            toast.success(response.EM);
        }else {
            toast.error(response.EM);
        }
    };
    return (
        <div className="group-role-container">
            <div className="container">
                <div className="container mt-3">
                    <h4>Group Role:</h4>
                    <div className="assign-group-role">
                        <label>
                            select Groups: (<span style={{ color: "red" }}>*</span>)
                        </label>
                        <div className="col-12 col-sm-6 form-group mt-2">
                            <select className="form-select" onChange={(e) => handleOnchangeGroup(e.target.value)}>
                                <option value="">Plz select your group</option>
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
                    </div>
                    <hr />
                    {selectGroup && (
                        <div className="roles">
                            <h5>Assign Roles:</h5>
                            {assignRolesByGroup?.length > 0 &&
                                assignRolesByGroup.map((item, index) => {
                                    return (
                                        <div className="form-check mt-2" key={`list-role-${index}`}>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value={item.id}
                                                id={`list-role-${index}`}
                                                checked={item.isAssigned}
                                                onChange={(e) => handleSelectRole(e.target.value)}
                                            />
                                            <label className="form-check-label" for={`list-role-${index}`}>
                                                {item.url}
                                            </label>
                                        </div>
                                    );
                                })}
                            <div className="mt-3">
                                <button className="btn btn-warning" onClick={() => handleSave()}>
                                    Save
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GroupRole;
