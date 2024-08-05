import { createNewUser, getUserList, deleteUser, getUserById, updateUser } from "../service/userService";
const handleUserPage = async (req, res) => {
    let userList = await getUserList();
    return res.render("home.ejs", { userList });
};
const handleCreateNewUser = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;
    await createNewUser(email, password, username);
    return res.redirect("/");
};

const handleDeleteUser = async (req, res) => {
    await deleteUser(req.params.id);
    return res.redirect("/");
};

const handleUpdateUser = async (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let id = req.body.id;
    await updateUser( id,username, email);

    return res.redirect("/");
};

const getUpdateUserPage = async (req, res) => {
    let id = req.params.id;
    let user = await getUserById(id);
    let userData = {};
    userData = user;

    return res.render("user-update.ejs", { userData });
};
export { handleUserPage, handleCreateNewUser, handleDeleteUser, handleUpdateUser, getUpdateUserPage };
