import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from "bluebird";
import db from "../models/index";
import { where } from "sequelize";

const salt = bcrypt.genSaltSync(10);
const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
};

const createNewUser = async (email, password, username) => {
    let hashPass = hashUserPassword(password);
    try {
        await db.User.create({
            username: username,
            email: email,
            password: hashPass,
        });
    } catch (error) {
        console.log(">>> check error create new user : ", error);
    }
};

const getUserList = async () => {
    // test relationships
    let newUser = await db.User.findOne({
        where: { id: 1 },
        raw: true,
        include: { model: db.Group, attributes: ["name" , "description"] },
        attributes: ["id", "username", "email"],
        nest: true,
    });

    // let roles = await db.Group.findOne({
    //     where: { id: 1 },
    //     raw: true,
    //     include: db.Role,
    //     nest: true,
    // })
    // console.log(">>> check new roles ", roles);

    let r = await db.Role.findAll({
        include: { model: db.Group, where: { id: 1 } ,attributes: ["name" , "description"]},
        raw: true,
        nest: true,
    });
    let users = [];
    try {
        users = await db.User.findAll();
    } catch (error) {
        console.log(">>> check error list users : ", error);
    }
    return users;
};

const deleteUser = async (id) => {
    try {
        await db.User.destroy({
            where: { id },
        });
    } catch (error) {
        console.log(">>> check error list users : ", error);
    }
};

const getUserById = async (id) => {
    let user = {};
    user = await db.User.findOne({
        where: { id },
    });

    return user.get({ plain: true });
};

const updateUser = async (id, username, email) => {
    await db.User.update(
        { email, username },
        {
            where: { id },
        }
    );
};
export { createNewUser, hashUserPassword, getUserList, deleteUser, getUserById, updateUser };
