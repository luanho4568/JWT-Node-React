import ret from "bluebird/js/release/util";
import db from "../models/index";
import { where } from "sequelize";

const getAllUsers = async () => {
    try {
        let user = await db.User.findAll({
            include: { model: db.Group, attributes: ["name", "description"] },
            attributes: ["id", "username", "email", "phone", "gender"],
        });
        if (!user) {
            return {
                EM: "Get data success!",
                EC: 0,
                DT: [],
            };
        }
        return {
            EM: "Get data success!",
            EC: 0,
            DT: user,
        };
    } catch (error) {
        console.log(error);
        return {
            EM: "Somthing wrongs with services",
            EC: -1,
            DT: [],
        };
    }
};

const createNewUser = async () => {
    try {
        let user = await User.create({});
    } catch (error) {
        console.log(error);
        return {
            EM: "Somthing wrongs with services",
            EC: -1,
            DT: [],
        };
    }
};

const updateUser = async (data) => {
    try {
        let user = await db.User.findOne({
            where: { id: data.id },
        });
        if (!user) {
            return {
                EM: "User not found",
                EC: -2,
                DT: [],
            };
        }
        user.save();
    } catch (error) {
        console.log(error);
        return {
            EM: "Somthing wrongs with services",
            EC: -1,
            DT: [],
        };
    }
};

const deleteUser = async (id) => {
    try {
        let user = await db.User.delete({
            where: { id },
        });
    } catch (error) {
        console.log(error);
        return {
            EM: "Somthing wrongs with services",
            EC: -1,
            DT: [],
        };
    }
};

export { getAllUsers, createNewUser, updateUser, deleteUser };
