// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import 'chart.js/auto';
import { toast } from 'react-toastify';

const Profile = () => {
    const navigate = useNavigate();
    const [history, setHistory] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const [profileName, setName] = useState('');
    const [profileMail, setEMail] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        const authToken = document.cookie
            .split("; ")
            .find((row) => row.startsWith("Authtoken"))
            ?.split("=")[1];
        console.log("document.cookie value", authToken);
        if (!authToken) {
            navigate('/');
        } else if (authToken) {
            const decoded = jwtDecode(authToken);
            const fullName = decoded.username;
            const email = decoded.useremail;
            setName(fullName);
            setEMail(email);
        }
        const fetchProfile = async () => {
          try {
            const response = await fetch('/api/profile', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                // Include auth token if necessary
              },
            });
    
            const data = await response.json();
            if (response.ok) {
              setUserData(data);
            } else {
              toast.error(data.error || 'Failed to fetch profile');
            }
          } catch (error) {
            toast.error('Failed to fetch profile');
          } finally {
            setLoading(false);
          }
        };
    
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
                setQuizzes(quizdata);
                console.log(quizdata);
            } catch (error) {
                console.log('error', error);
            }
        };
        fetchProfile();

        fetchHistory();
        fetchQuiz();
    }, [navigate]);
    if (loading) {
      return <div>Loading...</div>;
    }
  
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

    // Prepare data for the charts
    // const quizCreationDates = quizzes.map(quiz => new Date(quiz.createdAt).toLocaleDateString());
    // const quizCreationCounts = quizCreationDates.reduce((acc, date) => {
    //     acc[date] = (acc[date] || 0) + 1;
    //     return acc;
    // }, {});

    // const quizHistoryDates = history.map(item => new Date(item.createdAt).toLocaleDateString());
    // const quizHistoryCounts = quizHistoryDates.reduce((acc, date) => {
    //     acc[date] = (acc[date] || 0) + 1;
    //     return acc;
    // }, {});

    // const chartDataCreated = {
    //     labels: Object.keys(quizCreationCounts),
    //     datasets: [
    //         {
    //             label: 'Quizzes Created',
    //             data: Object.values(quizCreationCounts),
    //             fill: false,
    //             backgroundColor: 'rgba(75, 192, 192, 0.6)',
    //             borderColor: 'rgba(75, 192, 192, 1)',
    //             tension: 0.1,
    //         },
    //     ],
    // };

    // const chartDataAttended = {
    //     labels: Object.keys(quizHistoryCounts),
    //     datasets: [
    //         {
    //             label: 'Quizzes Attended',
    //             data: Object.values(quizHistoryCounts),
    //             fill: false,
    //             backgroundColor: 'rgba(153, 102, 255, 0.6)',
    //             borderColor: 'rgba(153, 102, 255, 1)',
    //             tension: 0.1,
    //         },
    //     ],
    // };
    console.log(userData,'userdata')

    return (
        <>
            <div className="p-4 sm:ml-64 bg-gray-100 dark:bg-gray-900">
                {/* Profile Section */}
                <div className="p-4 border-2 bg-white dark:bg-gray-800 rounded-lg dark:border-gray-700 mt-[80px] flex flex-col md:flex-row items-center gap-4">
            <div className="w-32 h-32 md:w-36 md:h-36 object-center object-cover rounded-full transition-all duration-500" alt="" >
            {userData.profilePicture ? (
          <img
            src={`/uploads/${userData.profilePicture}`}
            alt=""
            className="rounded-full w-32 h-32"
          />
        ) : (
          <div className="rounded-full w-32 h-32 bg-gray-300 flex items-center justify-center">
            No Image
          </div>
        )}
                    </div>
                    <div className="w-fit transition-all duration-500 text-center md:text-left">
                        <h1 className="text-gray-600 dark:text-gray-200 font-bold">{profileName}</h1>
                        <p className="text-gray-400 dark:text-gray-300">{profileMail}</p>
                    </div>
                </div>

                {/* Charts Section */}
                {/* <div className="p-4 border-2 bg-white dark:bg-gray-800 rounded-lg dark:border-gray-700 mt-[80px]">
                    <p className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">Quiz Activity Charts</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                            <Line data={chartDataCreated} />
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                            <Line data={chartDataAttended} />
                        </div>
                    </div>
                </div> */}
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
                                        <td className="px-6 py-4">{item.marksObtained}</td>
                                        <td className="px-6 py-4">
                                            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.marksObtained>=20 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                                                {item.marksObtained>=20 ? 'Passed' : 'Failed'}
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
                                    <th scope="col" className="px-6 py-3">Status</th>
                                    <th scope="col" className="px-6 py-3">Details</th>
                                    <th scope="col" className="px-6 py-3">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {quizzes.map((quiz) => (
                                    <tr key={quiz._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                            <img className="w-10 h-10 rounded-full" src="src/assets/images/logo.svg" alt="Quiz Logo" />
                                            <div className="pl-3">
                                                <div className="text-base font-semibold">{quiz.quizTitle}</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            <select
                                                value={quiz.active ? 'true' : 'false'}
                                                onChange={(e) => handleSelect(quiz._id, e.target.value)}
                                                className={`py-1 px-2 rounded ${quiz.active ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                                            >
                                                <option value="true">Active</option>
                                                <option value="false">Inactive</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleQuizDetails(quiz._id)}
                                                className="bg-blue-500 text-white py-1 px-2 rounded"
                                            >
                                                View Details
                                            </button>
                                        </td>

                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleDelete(quiz)}
                                                className="bg-red-500 text-white py-1 px-2 rounded"
                                            >
                                                Delete
                                            </button>
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
