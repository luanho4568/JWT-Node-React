import axios from "../setup/axios";

const createRolesService = async (roles) => {
    return await axios.post('/api/v1/role/create' , [...roles])
}

export {createRolesService}