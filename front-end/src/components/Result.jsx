// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useLocation } from 'react-router-dom';

const Result = () => {
    const location = useLocation();
    const { totalQuestions, score } = location.state || { totalQuestions: 0, score: 0 };

    const incorrectAnswers = totalQuestions - score;
    const totalMarks = totalQuestions;  // Assuming each question is worth 2 marks
    const marksObtained = score;

    return (
        <div className="p-4 sm:ml-64">
            <div className="w-full p-4 border-2 bg-gray-100 rounded-lg dark:border-gray-700 mt-[80px] ">
                <div className="p-8 rounded w-full text-center">
                    <h2 className="text-2xl font-bold mb-4">Quiz Result</h2>
                    <p>Total Questions: {totalQuestions}</p>
                    <p>Correct Answers: {score}</p>
                    <p>Incorrect Answers: {incorrectAnswers}</p>
                    <p>Marks Obtained: {marksObtained}</p>
                    <p>Total Marks: {totalMarks}</p>
                    <a href="/profile"><button className="bg-blue-500 text-white py-2 px-4 rounded mt-4">Finish Quiz</button></a>
                </div>
            </div>
        </div>
    );
};

export default Result;
