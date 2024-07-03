// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useLocation } from 'react-router-dom';

const Result = () => {
    const location = useLocation();
    const { totalQuestions, score } = location.state || { totalQuestions: 0, score: 0 };

    const incorrectAnswers = totalQuestions - score;
    const totalMarks = totalQuestions * 2;  // Assuming each question is worth 2 marks
    const marksObtained = score * 2;

    return (
        <div className="p-4 sm:ml-64 bg-gray-50 min-h-screen flex justify-center items-center">
            <div className="w-full max-w-lg p-8 border-2 bg-white rounded-lg shadow-md dark:border-gray-700 dark:bg-gray-800 mt-[80px]">
                <div className="p-8 rounded w-full text-center">
                    <h2 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-white">Quiz Result</h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">Total Questions: <span className="font-semibold">{totalQuestions}</span></p>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">Correct Answers: <span className="font-semibold">{score}</span></p>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">Incorrect Answers: <span className="font-semibold">{incorrectAnswers}</span></p>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">Marks Obtained: <span className="font-semibold">{marksObtained}</span></p>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">Total Marks: <span className="font-semibold">{totalMarks}</span></p>
                    <a href="/profile">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105">
                            Finish Quiz
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Result;
