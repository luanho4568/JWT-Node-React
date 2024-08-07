import { createNewUser, deleteUser, getAllUsers, getUserWithPagination, updateUser } from "../service/userApiService";

const readFunc = async (req, res) => {
    try {
        console.log('>>>Cokies : ' , req.cookies);
        
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;
            let data = await getUserWithPagination(+page, +limit);
            return res.status(200).json({
                EM: data.EM, // error message
                EC: data.EC, // error code
                DT: data.DT, // data
            });
        } else {
            let data = await getAllUsers();
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
const createFunc = async (req, res) => {
    try {
        let data = await createNewUser(req.body);
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
const updateFunc = async (req, res) => {
    try {
        let data = await updateUser(req.body);
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
const deleteFunc = async (req, res) => {
    try {
        let data = await deleteUser(req.body.id);
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

export { createFunc, updateFunc, deleteFunc, readFunc };
