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
export { registerNewUser, loginUser, fetchAllUser, deleteUser };
