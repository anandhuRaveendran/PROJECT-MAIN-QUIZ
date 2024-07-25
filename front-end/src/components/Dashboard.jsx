// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';

const Dashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("Authtoken"))
      ?.split("=")[1];
    if (!authToken) {
      navigate('/');
    }

    const fetchQuizzes = async () => {
      try {
        const response = await fetch('/api/home');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setQuizzes(data);
      } catch (err) {
        setError('Failed to fetch quizzes');
        console.error('Failed to fetch quizzes', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [navigate]);

  const handleQuizClick = (quiz) => {
    navigate('/quizdisplay', { state: { quiz } });
  };

  const handleViewMoreClick = (category) => {
    setExpandedCategories((prevExpandedCategories) => ({
      ...prevExpandedCategories,
      [category]: !prevExpandedCategories[category],
    }));
  };

  const groupedQuizzes = _.groupBy(quizzes, 'category');

  return (
    <div className="p-4 sm:ml-64 bg-gray-100 dark:bg-gray-900">
      <div className="p-4 border-2 bg-white dark:bg-gray-800 rounded-lg dark:border-gray-700 mt-[80px]">
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && (
          Object.keys(groupedQuizzes).length > 0 ? (
            Object.keys(groupedQuizzes).map((category) => (
              <div key={category} className="mb-8">
                <div className="flex justify-between items-center mb-6 text-2xl font-bold bg-slate-300 dark:bg-gray-700 rounded-2xl p-2">
                  <span className="text-gray-900 dark:text-white">
                    {category} <span className="bg-gradient-to-br from-sky-500 to-cyan-400 bg-clip-text text-transparent">Quiz</span>
                  </span>
                  <button
                    onClick={() => handleViewMoreClick(category)}
                    className="text-white bg-sky-500 border border-sky-500 p-1 w-26 h-8 rounded-xl text-sm focus:ring-4 focus:ring-sky-300 dark:focus:ring-sky-700 shadow-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                  >
                    {expandedCategories[category] ? 'View Less' : 'View More'}
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                  {groupedQuizzes[category].slice(0, expandedCategories[category] ? undefined : 6).map((quiz) => (
                    <div
                      key={quiz._id}
                      className="flex flex-col items-center justify-center border-2 border-gray-300 dark:border-gray-600 shadow-2xl rounded-2xl bg-gray-50 dark:bg-gray-800 cursor-pointer focus:ring-4 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300"
                      onClick={() => handleQuizClick(quiz)}
                    >
                      <img src="src/assets/images/thumbnail.webp" alt={quiz.quizTitle} className="border object-fill rounded-lg h-28" />
                      <p className="font-extrabold text-blue-500 dark:text-blue-300 mt-2">{quiz.quizTitle}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-400">No quizzes available</p>
          )
        )}
      </div>
    </div>
  );
};

export default Dashboard;
