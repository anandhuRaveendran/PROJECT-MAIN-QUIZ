
const NavBar = () => {
  return (
<>
{}
<div className="fixed  w-full justify-between">
        <nav className=" bg-white border-gray-200 dark:bg-gray-900 flex flex-wrap ">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/home" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="src/assets/images/logo.svg" className="h-8" alt="quizapp Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">QuizApp</span>
                </a>
                <div className="flex md:order-2 ml-6">
                    <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search"
                        aria-expanded="false"
                        className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1">
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        <span className="sr-only">Search</span>
                    </button>
                    <div className="relative hidden md:block">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">

                            <img className="w-6 h-6 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                src="src/assets/images/search.svg" />
                            <span className="sr-only">Search icon</span>
                        </div>
                        <input type="text" id="search-navbar"
                            className="block w-full p-5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search..."/>
                    </div>
                    <button data-collapse-toggle="navbar-search" type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-search" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    </div>


    <aside id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul className="space-y-2 font-medium mt-[100px]">
                <li>
                    <a href="/home"
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group">

                        <img src="src/assets/images/dashboard.svg"
                            className="w-8 h-8 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                            alt=""/>
                        <span className="ms-3">Dashboard</span>
                    </a>
                </li>
                <li>
                    <a href="/profile"
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group">
                        <img src="src/assets/images/profile.svg"
                            className="w-8 h-8 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                            aria-hidden="true" alt=""/>

                        <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
                    </a>
                </li>
                <li>
                    <a href="/createquiz"
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group">
                        <img src="src/assets/images/plus.svg"
                            className="w-8 h-8 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                            aria-hidden="true" alt=""/>

                        <span className="flex-1 ms-3 whitespace-nowrap">Create Quiz</span>
                        
                    </a>
                </li>
                <li>
                    <a href="/joinquiz"
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group">
                        <img src="src/assets/images/multiple-choice-quiz.svg"
                            className="w-8 h-8 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                            aria-hidden="true" alt=""/>

                        <span className="flex-1 ms-3 whitespace-nowrap">Join Quiz</span>
                    </a>
                </li>

                <li>
                    <a href="/leaderboard"
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group">
                        <img src="src/assets/images/leaderboard.svg"
                            className="w-8 h-8 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                            aria-hidden="true" alt=""/>

                        <span className="flex-1 ms-3 whitespace-nowrap">Leaderboard</span>
                    </a>
                </li>

                <li>
                    <a href="/"
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group">
                        {/* <!-- <img src="src/assets/images/leaderboard.svg"
                            className="w-8 h-8 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                            aria-hidden="true" alt=""> --> */}

                        <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
                    </a>
                </li>
            </ul>
        </div>
    </aside>
</>  )
}

export default NavBar