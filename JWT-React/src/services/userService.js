import axios from "axios";

const registerNewUser = (data) => {
    return axios.post("http://localhost:8888/api/v1/register", data);
};

const loginUser = (data) => {
    return axios.post("http://localhost:8888/api/v1/login", data);
};

const fetchAllUser = () => {
    return axios.get("http://localhost:8888/api/v1/user/read");
};
export { registerNewUser, loginUser, fetchAllUser };
