import { React, useState, useEffect } from "react";
import {
  addLaborToContractor,
  fetchMazdoorsByContractorId,
} from "../../store/reducers/contractorSlice";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllMazdoors } from "../../store/reducers/mazdoorSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const contractorId = useSelector((state) => state.auth.user.contractorId);
  const [searchQuery, setSearchQuery] = useState("");
  const [laborIdSpecific, setlaborIdSpecific] = useState("");
  const { loading, error, contractor, mazdoors } = useSelector(
    (state) => state.contractor
  );
  const AllMazdoors = useSelector((state) => state.mazdoor.mazdoors);
  useEffect(() => {
    dispatch(fetchAllMazdoors());
  }, []);

  console.log("mazdoors", AllMazdoors);

  const handleAddLabor = (laborId) => {
    dispatch(addLaborToContractor({ contractorId, laborId }));
    setlaborIdSpecific(laborId)
  };

  const filteredMazdoors = AllMazdoors.filter((mazdoor) =>
    mazdoor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    dispatch(fetchMazdoorsByContractorId(contractorId));
  }, [contractorId, dispatch, laborIdSpecific]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-full ">
        <button
          disabled=""
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
        >
          <svg
            aria-hidden="true"
            role="status"
            className="inline w-4 h-4 me-3 text-white animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </svg>
          Loading...
        </button>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const Card = ({ data }) => {
    return (
      <div className="w-full mx-2 my-2 px-1 py-1 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-pink-200">
        <div className="flex flex-col items-center pb-10">
          <div className=" w-full flex flex-col md:flex-row justify-evenly items-center py-3">
            <img
              className="w-20 h-20 rounded-full shadow-lg"
              src={
                data.imageUrl
                  ? data?.imageUrl
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              }
              alt="worker image"
            />
            <div className="flex flex-col justify-center items-start">
              <p>
                <span className="font-bold">Name :</span> {data.name}
              </p>
              <p>
                <span className="font-bold">Profession :</span>
                {data.profession}
              </p>
              <p>
                <span className="font-bold">City :</span> {data.city}
              </p>
            </div>
          </div>
          <div className="w-full flex flex-col mt-2 ">
            <p className="px-2">
              <span className="font-bold"> Description:</span>{" "}
              {data.description}
            </p>
            <p className="mt-1 px-2">
              <span className="font-bold">Mobile Number: </span>{" "}
              {data.contactNumber}
            </p>
            <p className="mt-1 px-2">
              <span className="font-bold">CNIC Number: </span> {data.cnic}
            </p>
            <p className="mt-1 px-2">
              <span className="font-bold">Address: </span> {data.address}
            </p>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="w-full bg-white">
      <div className="bg-gray-50 dark:bg-gray-700 px-5 py-5">
        <p className="text-white">Contractor Dashboard</p>
      </div>

      <section className="w-full py-3 px-5">
        <div className="py-3 flex flex-col justify-center items-start">
          <p className="font-bold">Want to add mazdoor ?</p>
          <div className="w-full py-3 px-5">
            <input
              className="block w-full py-5 px-2 ps-10 text-sm text-black border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              placeholder="Search mazdoors ...."
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {/* Only render Mazdoors if search query is not empty */}
            {searchQuery && (
              <ul
                className="py-2 px-2 rounded bg-pink-200 mt-1"
                style={{ border: "1px solid red" }}
              >
                {filteredMazdoors.map((mazdoor) => (
                  <li key={mazdoor.id} className="flex justify-between">
                    <div>Name: {mazdoor.name}</div>
                    <div>Profession: {mazdoor.profession}</div>
                    <div>Mobile: {mazdoor.contactNumber}</div>
                    <div>City: {mazdoor.city}</div>
                    <div>Address: {mazdoor.address}</div>
                    <div>
                      <button
                        type="button"
                        className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        onClick={() => handleAddLabor(mazdoor.laborId)}
                        disabled={loading}
                      >
                        {loading ? "Adding..." : "Add Labor"}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div>
          <p className="font-bold">Your Registered Mazdoors ({mazdoors.length})</p>
          <div className="flex justify-between items-center flex-wrap">
            {mazdoors.length == 0 ? "No mazdoor registered" :  mazdoors.map((val, ind) => {
              return <Card data={val} />;
            })
            
            }
          </div>
        </div>
      </section>
    </div>
  );
}
