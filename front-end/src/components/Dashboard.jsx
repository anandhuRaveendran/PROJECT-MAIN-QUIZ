// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';

const Dashboard = () => {
    const [quizzes, setQuizzes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch quizzes from the backend
        const fetchQuizzes = async () => {
            try {
                const response = await fetch('http://localhost:5000/home');
                const data = await response.json();
                setQuizzes(data);
            } catch (err) {
                console.error('Failed to fetch quizzes', err);
            }
        };

        fetchQuizzes();
    }, []);

    // Group quizzes by category
    const groupedQuizzes = _.groupBy(quizzes, 'category');

    const handleQuizClick = (quiz) => {
        navigate('/quizdisplay', { state: { quiz } });
    };

    return (
        <div className="p-4 sm:ml-64">
            <div className="p-4 border-2 bg-white-300 rounded-lg dark:border-gray-700 mt-[80px]">
                {Object.keys(groupedQuizzes).map((category) => (
                    <div key={category}>
                        <div className="mb-6 text-2xl font-bold justify-between">
                            {category} <span className="bg-gradient-to-br from-sky-500 to-cyan-400 bg-clip-text text-transparent">Quiz</span>
                            <button className="float-end text-black">view more</button>
                        </div>
                        <div className="grid grid-cols-6 gap-4 mb-4">
                            {groupedQuizzes[category].map((quiz) => (
                                <div
                                    key={quiz._id}
                                    className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800 cursor-pointer"
                                    onClick={() => handleQuizClick(quiz)}
                                >
                                    <p className="text-2xl text-gray-400 dark:text-gray-500">
                                        <img src={quiz.thumbnail || './default-thumbnail.jpg'} alt={quiz.quizTitle} className="border rounded-lg h-28" />
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
