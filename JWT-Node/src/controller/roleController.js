import {
    assignRoleToGroup,
    createNewGroups,
    deleteRole,
    getAllRoles,
    getAllRolesWithPagination,
    getRoleByGroup,
} from "../service/roleApiService";

const readRoleFunc = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;
            let data = await getAllRolesWithPagination(+page, +limit);
            return res.status(200).json({
                EM: data.EM, // error message
                EC: data.EC, // error code
                DT: data.DT, // data
            });
        } else {
            let data = await getAllRoles();
            return res.status(200).json({
                EM: data.EM, // error message
                EC: data.EC, // error code
                DT: data.DT, // data
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "Error from server", // error message
            EC: "-1", // error code
            DT: "", // data
        });
    }
};
const createRoleFunc = async (req, res) => {
    try {
        let data = await createNewGroups(req.body);
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT, // data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "Error from server", // error message
            EC: "-1", // error code
            DT: "", // data
        });
    }
};
const deleteRoleFunc = async (req, res) => {
    try {
        let data = await deleteRole(req.body.id);
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT, // data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "Error from server", // error message
            EC: "-1", // error code
            DT: "", // data
        });
    }
};

const getRoleByGroupFunc = async (req, res) => {
    try {
        let id = req.params.groupId;
        let data = await getRoleByGroup(id);
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT, // data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "Error from server", // error message
            EC: "-1", // error code
            DT: "", // data
        });
    }
};
const assignRoleToGroupFunc = async (req, res) => {
    try {
        let data = await assignRoleToGroup(req.body.data);
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT, // data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "Error from server", // error message
            EC: "-1", // error code
            DT: "", // data
        });
    }
};
export { createRoleFunc, readRoleFunc, deleteRoleFunc, getRoleByGroupFunc, assignRoleToGroupFunc };
