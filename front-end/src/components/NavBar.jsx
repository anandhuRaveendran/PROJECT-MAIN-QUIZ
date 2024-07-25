// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logout from './Logout';

const NavBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = () => {
    // No action needed for search
    // You can implement search or keep it as a placeholder
  };

  return (
    <>
      <div className="fixed w-full top-0 z-10">
        <nav className="bg-white border-gray-200 dark:bg-gray-900 flex flex-wrap items-center justify-between p-4">
          <Link to="/home" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="src/assets/images/logo.svg" className="h-8" alt="quizapp Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">QuizApp</span>
          </Link>
          <div className="flex items-center space-x-4 flex-1 justify-end">
            <div className="relative flex flex-grow max-w-xs">
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                onClick={handleSearch}
                className="absolute inset-y-0 end-0 px-4 py-2 text-white bg-blue-500 rounded-r-lg hover:bg-blue-700"
                aria-label="Search"
              >
                Search
              </button>
            </div>
            <button
              onClick={toggleSidebar}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="default-sidebar"
              aria-expanded={isSidebarOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
        </nav>
      </div>

      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium mt-[100px]">
            <li className="shadow-md rounded-2xl">
              <Link
                to="/home"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group"
              >
                <img
                  src="src/assets/images/dashboard.svg"
                  className="w-8 h-8 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  alt="Dashboard"
                />
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li className="shadow-md rounded-2xl">
              <Link
                to="/profile"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group"
              >
                <img
                  src="src/assets/images/profile.svg"
                  className="w-8 h-8 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                  aria-hidden="true"
                  alt="Profile"
                />
                <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
              </Link>
            </li>
            <li className="shadow-md rounded-2xl">
              <Link
                to="/createquiz"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group"
              >
                <img
                  src="src/assets/images/plus.svg"
                  className="w-8 h-8 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                  aria-hidden="true"
                  alt="Create Quiz"
                />
                <span className="flex-1 ms-3 whitespace-nowrap">Create Quiz</span>
              </Link>
            </li>
            <li className="shadow-md rounded-2xl">
              <Link
                to="/joinquiz"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group"
              >
                <img
                  src="src/assets/images/multiple-choice-quiz.svg"
                  className="w-8 h-8 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                  aria-hidden="true"
                  alt="Join Quiz"
                />
                <span className="flex-1 ms-3 whitespace-nowrap">Join Quiz</span>
              </Link>
            </li>
            <li className="shadow-md rounded-2xl">
              <Link
                to="/leaderboard"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group"
              >
                <img
                  src="src/assets/images/leaderboard.svg"
                  className="w-8 h-8 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                  aria-hidden="true"
                  alt="Leaderboard"
                />
                <span className="flex-1 ms-3 whitespace-nowrap">Leaderboard</span>
              </Link>
            </li>
            <li className="flex items-center p-2 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group shadow-md rounded-2xl">
              <Logout />
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default NavBar;
