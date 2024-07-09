// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
let aboutemail = ''
const Profile = () => {
    const navigate = useNavigate();
    const [history, setHistory] = useState([]);
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await fetch('http://localhost:5000/results');
                const historydata = await res.json();
                if (historydata) { aboutemail = historydata[0].username }
                setHistory(historydata);
            } catch (error) {
                console.log('error', error);
            }
        };
        const fetchQuiz = async () => {
            try {
                const res = await fetch('http://localhost:5000/myquizes');
                const quizdata = await res.json();
                if (quizdata) { aboutemail = quizdata[0].creator }

                setQuizzes(quizdata);
                console.log(quizdata)
            } catch (error) {
                console.log('error', error);
            }
        };
        fetchHistory();
        fetchQuiz()
    },
        []);
    const handleDelete = async (quiz) => {
        console.log(quiz._id)
        try {
            // eslint-disable-next-line no-unused-vars
            const response = await fetch(`http://localhost:5000/delete/${quiz._id}`, {
                method: 'DELETE',
            });
            const data = await response.json()
            console.log(data)
            navigate('/profile')


        }


        catch (error) {
            console.log(error)
        } finally {
            navigate('/profile')

        }

    }
    const handleQuizDetails = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/quizdetails/${id}`, {
            });
            const data = await response.json()
            navigate('/viewquiz', { state: { data } })
        } catch (error) {
            console.log(error)
        }
    }
    const handleSelect = async (id) => {
        const status = document.getElementById('status').value
        if (status == 'Closed') {
            const sts = false
            try {
                // eslint-disable-next-line no-unused-vars
                const response = await fetch(`http://localhost:5000/updateStatus`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ active: sts }),
                });
                const data = await response.json()
                console.log(data)



            }


            catch (error) {
                console.log(error)
            }

        }
        try {
            // eslint-disable-next-line no-unused-vars
            const response = await fetch(`http://localhost:5000/updateStatus`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ active: status }),
            });
            const data = await response.json()
            console.log(data)


        }


        catch (error) {
            console.log(error)
        }

        console.log(id)
    }
    return (
        <>
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 bg-gray-100 rounded-lg dark:border-gray-700 mt-[80px] flex items-center gap-4">
                    <img src="src/assets/images/profilepic.png" className="w-32 group-hover:w-36 group-hover:h-36 h-32 object-center object-cover rounded-full transition-all duration-500 delay-500" />
                    <div className="w-fit transition-all  duration-500 flex-wrap">
                        <h1 className="text-gray-600 dark:text-gray-200 font-bold">
                            Anandu Raveendran
                        </h1>
                        <p className="text-gray-400 flex-wrap">{aboutemail}</p>
                    </div>
                </div>

                <div className="p-4 border-2 bg-gray-100 rounded-lg dark:border-gray-700 mt-[80px]">
                    <p>History</p>
                    <div className="shadow-md sm:rounded-lg">
                        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
                            <label htmlFor="table-search" className="sr-only">Search</label>
                            <div>
                                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input type="text" id="table-search-users" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users" />
                            </div>
                        </div>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 flex-wrap">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr className="w-full">
                                    <th scope="col" className="px-6 py-3">Quiz Name</th>
                                    <th scope="col" className="px-6 py-3">Mark</th>
                                    <th scope="col" className="px-6 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody className="flex-wrap">
                                {history.map((item, index) => (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 flex-wrap">
                                        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                            <img className="w-10 h-10 rounded-full" src="src/assets/images/logo.svg" alt="Quiz Logo" />
                                            <div className="ps-3">
                                                <div className="text-base font-semibold">{item.quizTitle}</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">{item.marksObtained * 10}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className={`h-2.5 w-2.5 rounded-full ${item.marksObtained >= 3 ? 'bg-green-500' : 'bg-red-500'} me-2`}></div> {item.marksObtained >= 3 ? 'PASSED' : 'FAILED'}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="p-4 border-2 bg-gray-100 rounded-lg dark:border-gray-700 mt-[80px]">
                    <p>My Quizzes</p>
                    <div className="shadow-md sm:rounded-lg">
                        <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
                            <label htmlFor="table-search" className="sr-only">Search</label>
                            <div>
                                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input type="text" id="table-search-users" className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users" />
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
                                            <div className="ps-3">
                                                <div className="text-base font-semibold">{quiz.quizTitle}</div>
                                            </div>
                                        </th>

                                        <td className="px-6 py-4">
                                            <div className="text-base font-semibold">{quiz.joinid == 0 ? '' : quiz.joinid}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center"><div className={`h-2.5 w-2.5 rounded-full ${quiz.active === true ? 'bg-green-500' : 'bg-red-500'} me-2`}></div>
                                                <select id="status" value={quiz.active == true ? 'Active' : 'Closed'} onChange={() => handleSelect(quiz)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                             focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    <option selected value={quiz.active == true ? 'Active' : 'Closed'}>{quiz.active == true ? 'Active' : 'Closed'}</option>
                                                    <option value={quiz.active == true ? 'false' : 'true'}>{quiz.active == true ? 'Closed' : 'Active'}</option>
                                                    {/* <option value="false">Close</option> */}

                                                </select>

                                                {/* <div className={`h-2.5 w-2.5 rounded-full ${quiz.active === true ? 'bg-green-500' : 'bg-red-500'} me-2`}></div> {quiz.active == true ? 'Active' : 'Closed'} */}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <a onClick={() => handleQuizDetails(quiz._id)} type="button" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                                         dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800" onClick={() => handleDelete(quiz)}>Delete</button>
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
