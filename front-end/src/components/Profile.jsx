// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode";

// eslint-disable-next-line no-unused-vars
let aboutemail = '';
const Profile = () => {
    const navigate = useNavigate();
    const [history, setHistory] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const [profileName, setName] = useState('');
    const [profileMail, setEMail] = useState('');

    useEffect(() => {
        const authToken = document.cookie
            .split("; ")
            .find((row) => row.startsWith("Authtoken"))
            ?.split("=")[1];
        console.log("document.cookie value", authToken);
        if (!authToken) {
            navigate('/');
        } else if(authToken){
                  const decoded = jwtDecode(authToken);

        const fullName = decoded.username;
        const email=decoded.useremail
        setName(fullName);
        setEMail(email)  
        }


        const fetchHistory = async () => {
            try {
                const res = await fetch('/api/results');
                const historydata = await res.json();
                setHistory(historydata);
            } catch (error) {
                console.log('error', error);
            }
        };

        const fetchQuiz = async () => {
            try {
                const res = await fetch('/api/myquizes');
                const quizdata = await res.json();
                // if (quizdata) { aboutemail = quizdata[0].creator }
                setQuizzes(quizdata);
                console.log(quizdata);
            } catch (error) {
                console.log('error', error);
            }
        };

        fetchHistory();
        fetchQuiz();
    }, [navigate]);

    const handleDelete = async (quiz) => {
        try {
            const response = await fetch(`/api/delete/${quiz._id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            console.log(data);
        
            setQuizzes(quizzes.filter(q => q._id !== quiz._id));
 
            
        } catch (error) {
            console.log(error);
        }
    };

    const handleQuizDetails = async (id) => {
        try {
            const response = await fetch(`/api/quizdetails/${id}`, {});
            const quizdata = await response.json();
            navigate('/viewquiz', { state: { quizdata } });
        } catch (error) {
            console.log(error);
        }
    };

    const handleSelect = async (id, status) => {
        try {
            const response = await fetch(`/api/updateStatus`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ active: status === 'true', id }),
            });
            const data = await response.json();
            console.log(data);

            // Update the quiz status locally
            setQuizzes(quizzes.map(quiz => quiz._id === id ? { ...quiz, active: status === 'true' } : quiz));
        } catch (error) {
            console.log(error);
        }
    };

    return (
<>
  <div className="p-4 sm:ml-64 bg-gray-100 dark:bg-gray-900">
    {/* Profile Section */}
    <div className="p-4 border-2 bg-white dark:bg-gray-800 rounded-lg dark:border-gray-700 mt-[80px] flex flex-col md:flex-row items-center gap-4">
      <img src="src/assets/images/profilepic.png" className="w-32 h-32 md:w-36 md:h-36 object-center object-cover rounded-full transition-all duration-500" alt="Profile" />
      <div className="w-fit transition-all duration-500 text-center md:text-left">
        <h1 className="text-gray-600 dark:text-gray-200 font-bold">{profileName}</h1>
        <p className="text-gray-400 dark:text-gray-300">{profileMail}</p>
      </div>
    </div>

    {/* History Section */}
    <div className="p-4 border-2 bg-white dark:bg-gray-800 rounded-lg dark:border-gray-700 mt-[80px]">
      <p className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">History</p>
      <div className="shadow-md sm:rounded-lg overflow-x-auto">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 pb-4 bg-gray-50 dark:bg-gray-900">
          <label htmlFor="table-search" className="sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="text" id="table-search-users" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full md:w-80 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:ring-blue-500 focus:border-blue-500" placeholder="Search for users" />
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Quiz Name</th>
              <th scope="col" className="px-6 py-3">Mark</th>
              <th scope="col" className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                  <img className="w-10 h-10 rounded-full" src="src/assets/images/logo.svg" alt="Quiz Logo" />
                  <div className="pl-3">
                    <div className="text-base font-semibold">{item.quizTitle}</div>
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

    {/* My Quizzes Section */}
    <div className="p-4 border-2 bg-white dark:bg-gray-800 rounded-lg dark:border-gray-700 mt-[80px]">
      <p className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">My Quizzes</p>
      <div className="shadow-md sm:rounded-lg overflow-x-auto">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 py-4 bg-gray-50 dark:bg-gray-900">
          <label htmlFor="table-search" className="sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="text" id="table-search-users" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full md:w-80 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:ring-blue-500 focus:border-blue-500" placeholder="Search for quizzes" />
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Quiz Name</th>
              <th scope="col" className="px-6 py-3">Join ID</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">View</th>
              <th scope="col" className="px-6 py-3">Delete</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                  <div className="pl-3">
                    <div className="text-base font-semibold">{quiz.quizTitle}</div>
                  </div>
                </th>
                <td className="px-6 py-4">
                  <div className="text-base font-semibold">{quiz.joinid === 0 ? '' : quiz.joinid}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className={`h-2.5 w-2.5 rounded-full ${quiz.active ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
                    <select id="status" value={quiz.active} onChange={(e) => handleSelect(quiz._id, e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option value="true" selected={quiz.active === true}>Active</option>
                      <option value="false" selected={quiz.active === false}>Closed</option>
                    </select>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <a onClick={() => handleQuizDetails(quiz._id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">View</a>
                </td>
                <td className="px-6 py-4">
                  <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800" onClick={() => handleDelete(quiz)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</>

    );
};

export default Profile;
