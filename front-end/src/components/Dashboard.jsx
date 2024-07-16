// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';

const Dashboard = () => {
    const [quizzes, setQuizzes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await fetch('http://localhost:5000/home');
                const data = await response.json();
                setQuizzes(data);
                console.log(data)
            } catch (err) {
                console.error('Failed to fetch quizzes', err);
            }
        };

        fetchQuizzes();
    }, []);

    const groupedQuizzes = _.groupBy(quizzes, 'category');
console.log(groupedQuizzes)
    const handleQuizClick = (quiz) => {
        navigate('/quizdisplay', { state: { quiz } });
    };

    return (
        <div className="p-4 sm:ml-64 bg-gray-100" >
            <div className="p-4 border-2 bg-white-300 rounded-lg dark:border-gray-700 mt-[80px]">
                {Object.keys(groupedQuizzes).map((category) => (
                    <div key={category}>
                        <div className="mb-6 text-2xl font-bold justify-between bg-slate-300 rounded-2xl p-2">
                            {category} <span className="bg-gradient-to-br from-sky-500 to-cyan-400 bg-clip-text text-transparent">Quiz</span>
                            <button className="float-end text-white  border bg-sky-500 p-1 w-26 h-8 rounded-xl text-sm border-sky-500 focus:ring-4 shadow-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300 ">view more</button>
                        </div>
                        <div className="grid grid-cols-6  mb-4">
                            {groupedQuizzes[category].map((quiz) => (
                                <div 
                                    key={quiz._id}
                                    className="flex flex-col  items-center justify-center border-2 border-grey-500 shadow-2xl rounded-2xl bg-gray-50  dark:bg-gray-800 cursor-pointer focus:ring-4  transition ease-in-out  hover:-translate-y-1 hover:scale-110  duration-300 "
                                    onClick={() => handleQuizClick(quiz)} 
                                >
                                    <p className="text-2xl text-gray-400 dark:text-gray-500 object-fill">
                                        <img src="src/assets/images/thumbnail.webp" alt={quiz.quizTitle} className="border object-fill rounded-lg h-28" />
                                    </p>
                                    <div> <p className='font-extrabold text-blue-500'>{quiz.quizTitle}</p></div>
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
