import { useEffect, useState } from "react";
import { deleteUser, fetchAllUser } from "../../services/userService";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";
import ModalUser from "./ModalUser";

const User = (props) => {
    const [listUser, setListUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(3);
    const [totalPages, setTotalPages] = useState(0);

    // modal delete
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataModal, setDataModal] = useState({});

    // modal update && create
    const [isShowModalUser, setIsShowModalUser] = useState(false);
    const [dataModalUser, setDataModalUser] = useState({});
    const [actionModalUser, setActionModalUser] = useState("CREATE");
    useEffect(() => {
        fetchUser();
    }, [currentPage]);

    const fetchUser = async () => {
        let response = await fetchAllUser(currentPage, currentLimit);
        console.log('>>> check response: ' , response);
        
        if (response  && response.EC === 0) {
            setTotalPages(response.DT.totalPages);
            setListUser(response.DT.users);
        }
    };
    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
    };
    const handleDeleteUser = async (user) => {
        setDataModal(user);
        setIsShowModalDelete(true);
    };
    const handleClose = () => {
        setIsShowModalDelete(false);
        setDataModal({});
    };
    const confirmDeleteUser = async (user) => {
        let response = await deleteUser(dataModal);

        if (response && response.EC === 0) {
            toast.success(response.EM);
            await fetchUser();
            setIsShowModalDelete(false);
        } else {
            toast.error(response.EM);
        }
    };

    const onHideModalUser = async () => {
        setIsShowModalUser(false);
        setDataModalUser({});
        await fetchUser();
    };

    const handleEditUser = (user) => {
        setDataModalUser(user);
        setActionModalUser("UPDATE");
        setIsShowModalUser(true);
    };
    const handleRefesh = async () => {
        await fetchUser();
    }
    return (
        <>
            <div className="container">
                <div className="manage-user-container">
                    <div className="user-header">
                        <div className="title">
                            <h3>Table Users</h3>
                        </div>
                        <div className="actions">
                            <button className="btn btn-success" onClick={() => handleRefesh()}>Refesh</button>
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    setIsShowModalUser(true);
                                    setActionModalUser("CREATE");
                                }}
                            >
                                Add new user
                            </button>
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
                                                <td>{(currentPage - 1) * currentLimit + (index + 1)}</td>
                                                <td>{item.id}</td>
                                                <td>{item.email}</td>
                                                <td>{item.username}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.Group ? item.Group.name : ""}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-warning mx-3"
                                                        onClick={() => handleEditUser(item)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => handleDeleteUser(item)}
                                                    >
                                                        Delete
                                                    </button>
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
            <ModalDelete
                show={isShowModalDelete}
                handleClose={handleClose}
                confirmDeleteUser={confirmDeleteUser}
                dataModal={dataModal}
            />
            <ModalUser
                onHide={onHideModalUser}
                show={isShowModalUser}
                dataModalUser={dataModalUser}
                action={actionModalUser}
            />
        </>
    );
};
export default User;
