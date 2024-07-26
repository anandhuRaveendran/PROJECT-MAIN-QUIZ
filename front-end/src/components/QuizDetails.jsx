/* eslint-disable react-hooks/rules-of-hooks */
// eslint-disable-next-line no-unused-vars
import { useLocation } from 'react-router-dom';
const QuizDetails = () => {
    const location = useLocation();

    const {quizdata}  = location.state || {};
  return (
<>
  <div className="p-4 sm:ml-64 bg-gray-100 dark:bg-gray-900">
    <div className="p-4 border-2 bg-white dark:bg-gray-800 rounded-lg dark:border-gray-700 mt-[80px]">
      <div className="shadow-md sm:rounded-lg">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 pb-4 bg-gray-50 dark:bg-gray-900">
          <label htmlFor="table-search" className="sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              {/* Optional: Include a search icon if needed */}
              {/* <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg> */}
            </div>
            <input
              type="text"
              id="table-search-users"
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for users"
            />
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">User Name</th>
              <th scope="col" className="px-6 py-3">Mark</th>
              <th scope="col" className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {quizdata.map((item, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                  <img className="w-10 h-10 rounded-full" src="src/assets/images/logo.svg" alt="Quiz Logo" />
                  <div className="pl-3">
                    <div className="text-base font-semibold">{item.username}</div>
                  </div>
                </th>
                <td className="px-6 py-4">{item.marksObtained * 10}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className={`h-2.5 w-2.5 rounded-full ${item.marksObtained >= 3 ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
                    {item.marksObtained >= 3 ? 'PASSED' : 'FAILED'}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</>
 )
}

export default QuizDetails