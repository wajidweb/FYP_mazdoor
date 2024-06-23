import { React, useState , useEffect} from "react";
import Sidebar from "../components/mazdoor_dashboard_data/Sidebar";
import MazdoorProfile from "../components/mazdoor_dashboard_data/MazdoorProfile";
import Dashboard from "../components/mazdoor_dashboard_data/Dashboard";
import Jobs from "../components/mazdoor_dashboard_data/Jobs";
import AppliedJobs from "../components/mazdoor_dashboard_data/AppliedJobs";
import ChatHubMazdoor from "../components/mazdoor_dashboard_data/ChatHubMazdoor";
import mazdoorSidebarData from "../components/utils/mazdoorSidebarData";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMazdoorById } from '../store/reducers/mazdoorSlice';
import ChatRoom from "../components/mazdoor_dashboard_data/ChatRoom";



export default function MazdoorDashboard() {
  const dispatch = useDispatch();
  const mazdoor = useSelector((state)=> state.mazdoor.mazdoor);

  const [isOpen, setIsOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");
  const user = useSelector((state)=> state.auth.user);

  useEffect(() => {
    if (user?.laborId) {
      dispatch(fetchMazdoorById(user.laborId));
    }
  }, [dispatch, user]);


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
 
  const renderComponent = () => {
    switch (selectedOption) {
      case mazdoorSidebarData[0].text:
        return <MazdoorProfile user={user} mazdoor={mazdoor} />;

      case mazdoorSidebarData[1].text:
        return <Dashboard mazdoor={mazdoor} />;
      case mazdoorSidebarData[2].text:
        return <Jobs />;
      case mazdoorSidebarData[3].text:
        return <AppliedJobs />;
      case mazdoorSidebarData[4].text:
        // return <ChatHubMazdoor />;
        return <ChatRoom user={user} mazdoor={mazdoor} />;

      default:
        return <MazdoorProfile user={user} mazdoor={mazdoor}  />;
    }
  };

  console.log("here user", user);
  console.log("here mazdoor", mazdoor);

  return (
    <div className="py-8 ">
      <button
        onClick={toggleSidebar}
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-800 rounded-lg sm:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:text-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden={true}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>

      <div className="flex border-2">
        <Sidebar isOpen={isOpen} setSelectedOption={setSelectedOption} />
        <div className="flex-grow h-screen  rounded-sm">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}
