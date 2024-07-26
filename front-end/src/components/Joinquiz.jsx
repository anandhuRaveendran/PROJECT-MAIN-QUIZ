// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Joinquiz = () => {
  const [joinID, setJoinID] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const authToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("Authtoken"))
      ?.split("=")[1];

    if (!authToken) {
      navigate('/')
    }
  }, []);
  const handleJoin = async () => {
    if (joinID.length === 8) {
      try {
        const response = await fetch(`/api/get-quiz/${joinID}`);
        const data = await response.json();
        if (response.ok) {
            
          navigate('/quizdisplay', { state: { quiz: data } });
        } else {
          console.error('Failed to fetch quiz data');
        }
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    } else {
      console.error('JoinID must be 8 characters long');
    }
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 bg-gray-100 rounded-lg dark:border-gray-700 mt-[80px]">
        <input
          className="justify-center w-[200px] border-2 border-gray-600 ml-[600px] rounded-lg h-10"
          placeholder="Enter joinID"
          value={joinID}
          onChange={(e) => setJoinID(e.target.value)}
        />
        <button
          onClick={handleJoin}
          className="inline-flex items-center mt-2 px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
        >
          Join Quiz
        </button>
      </div>
    </div>
  );
};

export default Joinquiz;
