import axios from "axios";

const registerNewUser = (data) => {
    return axios.post("http://localhost:8888/api/v1/register", data);
};

const loginUser = (data) => {
    return axios.post("http://localhost:8888/api/v1/login", data);
};

const fetchAllUser = (page, limit) => {
    return axios.get(`http://localhost:8888/api/v1/user/read?page=${page}&limit=${limit}`);
};

const deleteUser = (user) => {
    return axios.delete(`http://localhost:8888/api/v1/user/delete`, { data: { id: user.id } });
};

const fetchGroup = () => {
    return axios.get(`http://localhost:8888/api/v1/group/read`);
};
const createNewUser = (userData) => {
    return axios.post(`http://localhost:8888/api/v1/user/create` , {...userData});
};

const updateCurrentUser = (userData) => {
    return axios.put(`http://localhost:8888/api/v1/user/update`, {...userData});
};
export { registerNewUser, loginUser, fetchAllUser, deleteUser ,fetchGroup , createNewUser , updateCurrentUser};
