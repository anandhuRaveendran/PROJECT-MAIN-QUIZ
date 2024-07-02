// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Quizdisplay = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { quiz } = location.state || {};
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(0);

    if (!quiz) {
        return (
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 bg-gray-100 rounded-lg dark:border-gray-700 mt-[80px]">
                    <div className="text-center">
                        <p>No quiz data available.</p>
                    </div>
                </div>
            </div>
        );
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];

    const handleAnswer = (option) => {
        const newAnswers = { ...answers, [currentQuestionIndex]: option };
        setAnswers(newAnswers);
        
        if (currentQuestion.answer === option) {
            setScore((prevScore) => prevScore + 1);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            saveResult();
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const saveResult = async () => {
        const resultData = {
            username:"",
            quizid: quiz._id,
            result: JSON.stringify({
                totalQuestions: quiz.questions.length,
                correctAnswers: score,
                incorrectAnswers: quiz.questions.length - score,
                marksObtained: score * 2,
                totalMarks: quiz.questions.length * 2
            }),
            qna: quiz.questions.map((question, index) => ({
                question: question.question,
                options: question.options,
                correctAnswer: question.answer,
                selectedOption: answers[index] || ""
            }))
        };

        try {
            const response = await fetch('http://localhost:5000/api/save-result', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(resultData)
            });

            if (response.ok) {
                navigate('/result', { state: { totalQuestions: quiz.questions.length, score } });
            } else {
                console.error('Failed to save result');
            }
        } catch (error) {
            console.error('Failed to save result', error);
        }
    };

    return (
        <div className="p-4 sm:ml-64">
            <div className="p-4 border-2 bg-gray-100 rounded-lg dark:border-gray-700 mt-[80px]">
                <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold">{quiz.quizTitle}</h2>
                </div>
                <div className="quiz-step">
                    <p>{`Question ${currentQuestionIndex + 1}: ${currentQuestion.question}`}</p>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        {currentQuestion.options.map((option, i) => (
                            <label key={i} className="block bg-gray-200 p-4 rounded cursor-pointer">
                                <input
                                    type="radio"
                                    name={`question${currentQuestionIndex}`}
                                    value={option}
                                    checked={answers[currentQuestionIndex] === option}
                                    onChange={() => handleAnswer(option)}
                                    className="mr-2"
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                </div>
                <div className="mt-4 flex justify-between">
                    <button
                        onClick={handlePrevious}
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                        disabled={currentQuestionIndex === 0}
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNext}
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                    >
                        {currentQuestionIndex < quiz.questions.length - 1 ? 'Next' : 'Finish'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Quizdisplay;
