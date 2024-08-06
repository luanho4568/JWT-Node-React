import { getGroup } from "../service/groupService";

const readGroupFunc = async (req , res) => {
    try {
        let data = await getGroup()
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
export { readGroupFunc };
