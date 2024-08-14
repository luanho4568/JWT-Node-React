import ret from "bluebird/js/release/util";
import db from "../models/index";

const createNewGroups = async (roles) => {
    try {
        let currentRoles = await db.Role.findAll({
            attributes: ["url", "description"],
            raw: true,
        });
        const persists = roles.filter(({ url: url1 }) => !currentRoles.some(({ url: url2 }) => url1 === url2));
        if (persists.length === 0) {
            return {
                EM: "Nothing to create...",
                EC: 0,
                DT: [],
            };
        }
        await db.Role.bulkCreate(persists);
        return {
            EM: `Create new roles success: ${persists.length} roles!`,
            EC: 0,
            DT: [],
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
const getAllRoles = async () => {
    try {
        let data = await db.Role.findAll();
        if (!data) {
            return {
                EM: "Roles not found",
                EC: 0,
                DT: [],
            };
        }
        return {
            EM: "Get data success!",
            EC: 0,
            DT: data,
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
const getAllRolesWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;
        const { count, rows } = await db.Role.findAndCountAll({
            offset,
            limit,
            attributes: ["id", "url", "description"],
            order: [["id", "DESC"]],
        });

        let totalPages = Math.ceil(count / limit);

        let data = {
            totalRows: count,
            totalPages,
            roles: rows,
        };
        return {
            EM: "Get list roles successfully!!",
            EC: 0,
            DT: data,
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

const deleteRole = async (id) => {
    try {
        let role = await db.Role.findOne({
            where: { id },
        });
        if (!role) {
            return {
                EM: "role not found",
                EC: -2,
                DT: [],
            };
        }
        await role.destroy();
        return {
            EM: "Delete role successfully",
            EC: 0,
            DT: [],
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

const getRoleByGroup = async (groupId) => {
    try {
        if (!groupId) {
            return {
                EM: "Not found any Roles",
                EC: 0,
                DT: [],
            };
        }

        let roles = await db.Group.findOne({
            where: { id: groupId },
            attributes: ["id", "name", "description"],
            include: [
                {
                    model: db.Role,
                    attributes: ["id", "url", "description"],
                    through: { attributes: [] },
                },
            ],
        });
        return {
            EM: "Get role by group successfully",
            EC: 0,
            DT: roles,
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
export { createNewGroups, getAllRolesWithPagination, deleteRole, getAllRoles, getRoleByGroup };
