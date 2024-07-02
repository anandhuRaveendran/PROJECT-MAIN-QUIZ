// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
// import axios from 'axios';

const Profile = () => {
    const [history, setHistory] = useState([]);
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await fetch('http://localhost:5000/results');
                const historydata = await res.json();
                console.log(historydata)
                setHistory(historydata);
            } catch (error) {
                console.log('error', error);
            }
        };
        const fetchQuiz= async () => {
            try {
                const res = await fetch('http://localhost:5000/myquizes');
                const quizdata = await res.json();
                console.log(quizdata)

                setQuizzes(quizdata);
            } catch (error) {
                console.log('error', error);
            }
        }; 
        fetchHistory();
        fetchQuiz()
    },
    //{
    //     // Fetch history data
    //     axios.get('API_ENDPOINT_FOR_HISTORY')
    //         .then(response => {

    //         })
    //         .catch(error => {
    //             console.error('There was an error fetching the history data!', error);
    //         });

    //     // Fetch quizzes data
    //     axios.get('API_ENDPOINT_FOR_QUIZZES')
    //         .then(response => {
    //             setQuizzes(response.data);
    //         })
    //         .catch(error => {
    //             console.error('There was an error fetching the quizzes data!', error);
    //         });
    // }, 
    []);
    return (
        <>
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 bg-gray-100 rounded-lg dark:border-gray-700 mt-[80px] flex items-center gap-4">
                    <img src="src/assets/images/profilepic.png" className="w-32 group-hover:w-36 group-hover:h-36 h-32 object-center object-cover rounded-full transition-all duration-500 delay-500" />
                    <div className="w-fit transition-all  duration-500 flex-wrap">
                        <h1 className="text-gray-600 dark:text-gray-200 font-bold">
                            Anandu Raveendran
                        </h1>
                        <p className="text-gray-400 flex-wrap"></p>
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
                                    // let marks=JSON.parse(item.result),
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 flex-wrap">
                                        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                            <img className="w-10 h-10 rounded-full" src="src/assets/images/logo.svg" alt="Quiz Logo" />
                                            <div className="ps-3">
                                                <div className="text-base font-semibold">{item.quizTitle}</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">{item.marksObtained}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className={`h-2.5 w-2.5 rounded-full ${item.status === 'passed' ? 'bg-green-500' : 'bg-red-500'} me-2`}></div> {item.status}
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
                                    <th scope="col" className="px-6 py-3">Status</th>
                                    <th scope="col" className="px-6 py-3">View</th>
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
                                            <div className="flex items-center">
                                                <div className={`h-2.5 w-2.5 rounded-full ${quiz.active === true ? 'bg-green-500' : 'bg-red-500'} me-2`}></div> {quiz.active==true?'Active':'Closed'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <a href="/viewquiz" type="button" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
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
