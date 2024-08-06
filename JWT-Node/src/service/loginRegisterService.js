import { Op } from "sequelize";
import db from "../models/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
};
const isCheckEmail = async (email) => {
    let user = await db.User.findOne({
        where: { email },
    });
    if (user) {
        return true;
    }
    return false;
};
const isCheckPhone = async (phone) => {
    let user = await db.User.findOne({
        where: { phone },
    });
    if (user) {
        return true;
    }
    return false;
};
const handleRegisterNewUser = async (rawUserData) => {
    try {
        // check email/phone are exist
        let checkEmail = await isCheckEmail(rawUserData.email);
        let checkPhone = await isCheckPhone(rawUserData.phone);
        if (checkEmail) {
            return {
                EM: "The email is already exists",
                EC: 1,
            };
        }
        if (checkPhone) {
            return {
                EM: "The phone number is already exists",
                EC: 1,
            };
        }
        // hash password
        let hashPass = hashUserPassword(rawUserData.password);
        // create new user
        await db.User.create({
            email: rawUserData.email,
            username: rawUserData.username,
            password: hashPass,
            phone: rawUserData.phone,
        });
        return {
            EM: "Create new user Successfully!!",
            EC: 0,
            DT: "",
        };
    } catch (error) {
        console.log(error);
        return {
            EM: "Somthing wrongs in service...",
            EC: -1,
        };
    }
};

const isCheckPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword); // true
};

const handleUserLogin = async (rawData) => {
    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [{ email: rawData.valueLogin }, { phone: rawData.valueLogin }],
            },
        });

        if (user) {
            console.log(">>> Found user with email/phone");
            let isCorrectPassword = isCheckPassword(rawData.password, user.password);
            if (isCorrectPassword) {
                return {
                    EM: "Login Successfully!!",
                    EC: 0,
                    DT: "",
                };
            }
        }
        console.log(">>> Input user with email/phone :", rawData.valueLogin, "| Password : ", rawData.password);
        return {
            EM: "Your email / phone number or password is incorrect!",
            EC: 1,
            DT: "",
        };
    } catch (error) {
        console.log(error);
        return {
            EM: "Somthing wrongs in service...",
            EC: -1,
        };
    }
};
export { handleRegisterNewUser, handleUserLogin ,  hashUserPassword ,isCheckEmail , isCheckPassword , isCheckPhone};
