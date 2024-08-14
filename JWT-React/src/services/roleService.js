import axios from "../setup/axios";

const createRolesService = async (roles) => {
    return await axios.post("/api/v1/role/create", [...roles]);
};

const fetchAllRoles = (page, limit) => {
    return axios.get(!page && !limit ? `api/v1/role/read` : `api/v1/role/read?page=${page}&limit=${limit}`);
};
const deleteRole = (role) => {
    return axios.delete(`api/v1/role/delete`, { data: { id: role.id } });
};

const fetchRolesByGroup = (groupId) => {
    return axios.get(`api/v1/role/by-group/${groupId}`);
};
export { createRolesService, fetchAllRoles, deleteRole, fetchRolesByGroup };
