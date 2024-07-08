/* eslint-disable react-hooks/rules-of-hooks */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Quizdisplay = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { quiz } = location.state || {};
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(0);

    const [timeLeft, setTimeLeft] = useState(30); // Set timer duration here

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

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTimeLeft) => {
                if (prevTimeLeft <= 1) {
                    clearInterval(timer);
                    handleNext();
                    return 30;
                }
                return prevTimeLeft - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [currentQuestionIndex]);

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
            username: "",
            quizid: quiz._id,
            quizTitle: quiz.quizTitle,
            marksObtained: score,
            result: JSON.stringify({
                totalQuestions: quiz.questions.length,
                correctAnswers: score,
                incorrectAnswers: quiz.questions.length - score,
                totalMarks: quiz.questions.length
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
                const qna=resultData.qna
                console.log(qna)
                navigate('/result', { state: { totalQuestions: quiz.questions.length, score, qna } });
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
                    <div className="text-xl">Time left: {timeLeft}s</div>
                </div>
                <div className="quiz-step">
                    <p>{`Question ${currentQuestionIndex + 1}: ${currentQuestion.question}`}</p>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        {currentQuestion.options.map((option, i) => (
                            <button
                                key={i}
                                className={`block p-4 rounded cursor-pointer ${answers[currentQuestionIndex] === option ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                onClick={() => handleAnswer(option)}
                            >
                                {option}
                            </button>
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
