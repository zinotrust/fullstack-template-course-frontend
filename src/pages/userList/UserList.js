import React, { useEffect, useState } from "react";
import "./UserList.scss";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../redux/features/auth/authSlice";
import { Spinner } from "../../components/loader/Loader";
import UserStats from "../../components/userStats/UserStats";
import Search from "../../components/search/Search";
import { FaTrashAlt } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import ChangeRole from "../../components/changeRole/ChangeRole";
import {
  FILTER_USERS,
  selectFilteredUsers,
} from "../../redux/features/auth/filterSlice";
import ReactPaginate from "react-paginate";

const UserList = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { users, isLoading, isLoggedIn, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const filteredUsers = useSelector(selectFilteredUsers);

  useEffect(() => {
    dispatch(FILTER_USERS({ users, search }));
  }, [dispatch, users, search]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete This User",
      message: "Are you sure to do delete this user?",
      buttons: [
        {
          label: "Delete",
          onClick: () => removeUser(id),
        },
        {
          label: "Cancel",
          //   onClick: () => alert('Click No')
        },
      ],
    });
  };

  const removeUser = async (id) => {
    await dispatch(deleteUser(id));
    dispatch(getUsers());
  };

  //   Begin pagination
  const itemsPerPage = 5;
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredUsers.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredUsers.length;
    setItemOffset(newOffset);
  };
  //   End pagination

  return (
    <>
      <div className="user-list">
        {isLoading && <Spinner />}
        <UserStats />
        <div className="--underline"></div>

        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>All Users ~ {users.length}</h3>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
        </div>

        <div className="table">
          {!isLoading && users.length === 0 ? (
            <p>No user found...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Change Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((user, index) => {
                  const { _id, name, email, role } = user;
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{name}</td>
                      <td>{email}</td>
                      <td>{role}</td>
                      <td>
                        <ChangeRole _id={_id} />
                      </td>

                      <td>
                        <span>
                          <FaTrashAlt
                            size={20}
                            color={"red"}
                            onClick={() => confirmDelete(_id)}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </div>
    </>
  );
};

export default UserList;
