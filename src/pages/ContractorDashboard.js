import { React, useState, useEffect } from "react";
import Sidebar from "../components/contractor_dashboard_data/Sidebar";
import Dashboard from "../components/contractor_dashboard_data/Dashboard";
import Jobs from "../components/contractor_dashboard_data/Jobs";
import ChatHubContractor from "../components/employer_dashboard_data/ChatHubMazdoor";
import contractorSidebarData from "../components/utils/contractorSidebarData";
import CreateNewJob from "../components/employer_dashboard_data/CreateNewJob";
import ContractorProfile from "../components/contractor_dashboard_data/ContractorProfile";
import { useDispatch, useSelector } from "react-redux";
import { fetchContractorById } from "../store/reducers/contractorSlice";
import AppliedJobs from "../components/contractor_dashboard_data/AppliedJobs";
import ChatRoom from "../components/contractor_dashboard_data/ChatRoom";

export default function ContractorDashboard() {
  const dispatch = useDispatch();
  const user = useSelector((state)=> state.auth.user);
  const contractor = useSelector((state)=> state.contractor.contractor);

  useEffect(() => {
    if (user?.contractorId) {
      dispatch(fetchContractorById(user?.contractorId));
    }
  }, [dispatch, user]);


  const [isOpen, setIsOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const renderComponent = () => {
    switch (selectedOption) {
      case contractorSidebarData[0].text:
        return <ContractorProfile  user={user} contractor={contractor} />;

      case contractorSidebarData[1].text:
        return <Dashboard />;
      case contractorSidebarData[2].text:
        return <Jobs  />;
      case contractorSidebarData[3].text:
        return <AppliedJobs  />;

      case contractorSidebarData[4].text:
        // return <ChatHubContractor />;
        return <ChatRoom user={user} mazdoor={contractor} />;
      default:
        return <ContractorProfile  user={user} contractor={contractor} />;
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
