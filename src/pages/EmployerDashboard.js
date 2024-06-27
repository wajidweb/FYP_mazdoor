import { React, useState, useEffect } from "react";
import Sidebar from "../components/employer_dashboard_data/Sidebar";
import Dashboard from "../components/employer_dashboard_data/Dashboard";
import Jobs from "../components/employer_dashboard_data/Jobs";
import ChatHubMazdoor from "../components/employer_dashboard_data/ChatHubMazdoor";
import employerSidebarData from "../components/utils/employerSidebarData";
import EmployerProfile from "../components/employer_dashboard_data/EmployerProfile";
import CreateNewJob from "../components/employer_dashboard_data/CreateNewJob";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployerById } from "../store/reducers/employerSlice";
import ChatRoom from "../components/employer_dashboard_data/ChatRoom";

export default function EmployerDashboard() {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");
  const [jobPage, setJobPage] = useState(true);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const dispatch = useDispatch();
  const employer = useSelector((state) => state.employer.employer);
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    if (user?.employerId) {
      dispatch(fetchEmployerById(user?.employerId));
    }
  }, [dispatch, user]);

  const renderComponent = () => {
    switch (selectedOption) {
      case employerSidebarData[0].text:
        return <EmployerProfile user={user} employer={employer} />;

      case employerSidebarData[1].text:
        return <Dashboard employer={employer} setSelectedOption={setSelectedOption} />;
      case employerSidebarData[2].text:
        if (jobPage) {
          return <Jobs setJobPage={setJobPage} />;
        } else {
          return <CreateNewJob setJobPage={setJobPage} />;
        }

      case employerSidebarData[3].text:
        // return <ChatHubMazdoor />;
        return <ChatRoom user={user} mazdoor={employer} />;
      default:
        return <EmployerProfile user={user} employer={employer} />;
    }
  };

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
