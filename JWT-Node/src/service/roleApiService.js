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

const getAllRolesWithPagination = async (page, limit) => {
    try {
        if ((!page && !limit) || page <= 0 || limit <= 0) {
            const data = await db.Role.findAll();
            return {
                EM: "Get list roles successfully!!",
                EC: 0,
                DT: data,
            };
        }
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
export { createNewGroups, getAllRolesWithPagination, deleteRole };
