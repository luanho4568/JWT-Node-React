import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { deleteRole, fetchAllRoles } from "../../services/roleService";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";

const TableRoles = forwardRef((props, ref) => {
    const [listRoles, setListRoles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(3);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchRoles();
    }, [currentPage]);

    useImperativeHandle(ref, () => ({
        fetchRolesAgain() {
            fetchRoles();
        },
    }));

    const fetchRoles = async () => {
        let response = await fetchAllRoles(currentPage, currentLimit);
        if (response && +response.EC === 0) {
            setTotalPages(response.DT.totalPages);
            setListRoles(response.DT.roles);
        }
    };
    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
    };
    const handleDeleteRole = async (role) => {
        let response = await deleteRole(role);
        console.log(response);
        if (response && +response.EC === 0) {
            toast.success(response.EM);
            await fetchRoles();
        } else {
            toast.error(response.EM);
        }
    };
    return (
        <div>
            <table className="table table-border table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>URL</th>
                        <th>DESCRIPTION</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listRoles && listRoles.length > 0 ? (
                        listRoles.map((item, index) => {
                            console.log(item);
                            return (
                                <tr key={`row-${item.id}`}>
                                    <td>{(currentPage - 1) * currentLimit + (index + 1)}</td>
                                    <td>{item.id}</td>
                                    <td>{item.url}</td>
                                    <td>{item.description}</td>
                                    <td>
                                        <button className="btn btn-warning mx-3">Edit</button>
                                        <button className="btn btn-danger" onClick={() => handleDeleteRole(item)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td>Not found roles</td>
                        </tr>
                    )}
                </tbody>
            </table>
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
    );
});

export default TableRoles;
