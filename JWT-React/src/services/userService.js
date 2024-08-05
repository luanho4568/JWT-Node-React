import axios from "axios";

const registerNewUser = (data) => {
    return axios.post("http://localhost:8888/api/v1/register", data);
};

const loginUser = (data) => { 
    return axios.post("http://localhost:8888/api/v1/login", data);
}
export { registerNewUser,loginUser };
