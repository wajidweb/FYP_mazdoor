import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../store/reducers/userSlice";

const UserSearch = ({ onUserSelect }) => {
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const users = useSelector((state) => state.users.users);
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log("users are", users);
  console.log(filteredUsers); 

  return (

    <div>
      <form className="max-w-md mx-auto">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="default-search"
            className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-600 rounded-lg bg-gray-50 focus:ring-blue-500  focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search user ..."
            required=""
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <ul>
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              onClick={() => onUserSelect(user)}
              className="w-11/12 flex flex-row justify-start items-center bg-slate-400 hover:bg-slate-500 rounded-md py-2 px-2 cursor-pointer my-1"
            >
              <div className="w-8 h-8 rounded-full mx-3">
                <img
                  src={user?.imageUrl}
                  className="w-full h-full rounded-full"
                  alt="user image"
                />
              </div>
              <div className="flex flex-col justify-start items-start">
                <p className="text-sm text-white">{user?.name}</p>
                <p className="text-sm text-gray-300">{user?.userType}</p>
              </div>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
};

export default UserSearch;
