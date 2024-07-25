/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';

const LeaderBoard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("Authtoken"))
      ?.split("=")[1];
    console.log("document.cookie value", authToken);

    if (!authToken) {
      navigate('/');
    }

    const fetchLeaderboardData = async () => {
      try {
        const response = await fetch('/api/leaderboard'); // Update with your actual endpoint
        const data = await response.json();
        if (response.ok) {
          // Group data by useremail
          const groupedData = _.groupBy(data, 'useremail');

          // Calculate total marks for each user
          const leaderboardArray = Object.keys(groupedData).map(email => {
            const totalMarks = groupedData[email].reduce((acc, item) => {
              const result = JSON.parse(item.result);
              return acc + result.totalMarks;
            }, 0);

            return {
              useremail: email,
              username: groupedData[email][0].username, // Assuming the username is the same for each email
              totalMarks
            };
          });

          // Sort leaderboard by totalMarks in descending order
          leaderboardArray.sort((a, b) => b.totalMarks - a.totalMarks);
          setLeaderboardData(leaderboardArray);
        } else {
          console.error('Failed to fetch leaderboard data');
        }
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    fetchLeaderboardData();
  }, [navigate]);

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 bg-gray-100 rounded-lg dark:border-gray-700 mt-[80px]">
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
            <label htmlFor="table-search" className="sr-only">Search</label>
            <div className="">
              <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input type="text" id="table-search-users" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users" />
            </div>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Rank</th>
                <th scope="col" className="px-6 py-3">Total Marks Obtained</th>
                <th scope="col" className="px-6 py-3">Achievements/Medals</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((user, index) => (
                <tr key={user.useremail} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <img className="w-10 h-10 rounded-full" src="src/assets/images/profile.svg" alt="Profile image" />
                    <div className="ps-3">
                      <div className="text-base font-semibold">{user.username}</div>
                    </div>
                  </th>
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{user.totalMarks}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className={`h-2.5 w-2.5 rounded-full bg-${index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : 'gray'} me-2`}></div>
                      {index === 0 ? 'Gold' : index === 1 ? 'Silver' : index === 2 ? 'Bronze' : 'N/A'}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
