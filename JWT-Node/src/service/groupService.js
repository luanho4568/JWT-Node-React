import db from "../models/index";

const getGroup = async () => {
    try {
        let data = await db.Group.findAll({
            order: [["name", "ASC"]],
        });
        return {
            EM: "Get group success!", // error message
            EC: 0, // error code
            DT: data, // data
        };
    } catch (error) {
        console.log(error);
        return {
            EM: "Somthing wrongs in service...",
            EC: -1,
        };
    }
};

export { getGroup };
