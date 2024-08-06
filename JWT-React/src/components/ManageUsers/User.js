import { useEffect, useState } from "react";
import { fetchAllUser } from "../../services/userService";

const User = (props) => {
    const [listUser, setListUser] = useState([]);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        let response = await fetchAllUser();
        if (response && response.data && response.data.EC === 0) {
            setListUser(response.data.DT);
        }
    };
    return (
        <>
            <div className="manage-user-container">
                <div className="container">
                    <div className="user-header">
                        <div className="title">
                            <h3>Table Users</h3>
                        </div>
                        <div className="actions">
                            <button className="btn btn-success">Refesh</button>
                            <button className="btn btn-primary">Add new user</button>
                        </div>
                    </div>
                    <div className="user-body">
                        <table className="table table-border table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>ID</th>
                                    <th>Email</th>
                                    <th>UserName</th>
                                    <th>Phone Number</th>
                                    <th>Group</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listUser && listUser.length > 0 ? (
                                    listUser.map((item, index) => {
                                        return (
                                            <tr key={`row-${item.id}`}>
                                                <td>{index + 1}</td>
                                                <td>{item.id}</td>
                                                <td>{item.email}</td>
                                                <td>{item.username}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.Group ? item.Group.name : ""}</td>
                                                <td>
                                                    <button className="btn btn-primary">Edit</button>
                                                    <button className="btn btn-danger">Delete</button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <>Not found User</>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="user-footer">
                        <nav aria-label="Page navigation example">
                            <ul class="pagination">
                                <li class="page-item">
                                    <a class="page-link" href="#">
                                        Previous
                                    </a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#">
                                        1
                                    </a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#">
                                        2
                                    </a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#">
                                        3
                                    </a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#">
                                        Next
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
};
export default User;
