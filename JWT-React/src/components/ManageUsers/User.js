import { useEffect, useState } from "react";
import { fetchAllUser } from "../../services/userService";
import ReactPaginate from "react-paginate";

const User = (props) => {
    const [listUser, setListUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(3);
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        fetchUser();
    }, [currentPage]);

    const fetchUser = async () => {
        let response = await fetchAllUser(currentPage, currentLimit);
        if (response && response.data && response.data.EC === 0) {
            setTotalPages(response.data.DT.totalPages);
            setListUser(response.data.DT.users);
            console.log(response.data);
        }
    };
    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
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
                                                    <button className="btn btn-warning mr-3">Edit</button>
                                                    <button className="btn btn-danger">Delete</button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td>Not found User</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {totalPages > 0 && (
                        <div className="user-footer">
                            <ReactPaginate
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={totalPages}
                                previousLabel="< previous"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
export default User;
