// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const Quizdisplay = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { quiz } = location.state || {};
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const colors = [
        { main: 'text-[#ff5757]', background: 'bg-[#ff5757]/5' },
        { main: 'text-[#ffb01f]', background: 'bg-[#ffb01f]/5' },
        { main: 'text-[#00bd91]', background: 'bg-[#00bd91]/5' },
        { main: 'text-[#1125d4]', background: 'bg-[#1125d4]/5' },
    ];

    if (!quiz) {
        return (
            <div className="p-4 mt-16">
                <div className="p-4 border-2 bg-gray-100 rounded-lg dark:border-gray-700">
                    <div className="text-center">
                        <p>No quiz data available.</p>
                    </div>
                </div>
            </div>
        );
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const authToken = document.cookie
            .split("; ")
            .find((row) => row.startsWith("Authtoken"))
            ?.split("=")[1];
        if (!authToken) {
            navigate('/');
        }
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
    }, [currentQuestionIndex, navigate]);

    const handleAnswer = (option) => {
        const newAnswers = { ...answers, [currentQuestionIndex]: option };
        setAnswers(newAnswers);

        if (currentQuestion.answer === option) {
            setScore((prevScore) => prevScore + 1);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setTimeLeft(30);
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            saveResult();
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setTimeLeft(30);
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const saveResult = async () => {
        const authToken = document.cookie
            .split("; ")
            .find((row) => row.startsWith("Authtoken"))
            ?.split("=")[1];
        const decoded = jwtDecode(authToken);
        const user = decoded.username;
        const email = decoded.useremail;
        const resultData = {
            username: user,
            quizid: quiz._id,
            useremail: email,
            quizTitle: quiz.quizTitle,
            marksObtained: score * 10,
            result: JSON.stringify({
                totalQuestions: quiz.questions.length,
                correctAnswers: score,
                incorrectAnswers: quiz.questions.length - score,
                totalMarks: quiz.questions.length * 10
            }),
            qna: quiz.questions.map((question, index) => ({
                question: question.question,
                options: question.options,
                correctAnswer: question.answer,
                selectedOption: answers[index] || ""
            }))
        };
        try {
            const response = await fetch('/api/save-result', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(resultData)
            });

            if (response.ok) {
                navigate('/result', { state: { totalQuestions: quiz.questions.length, score, qna: resultData.qna } });
            } else {
                console.error('Failed to save result');
            }
        } catch (error) {
            console.error('Failed to save result', error);
        }
    };

    return (
        <div className="flex min-h-screen sm:pl-64 pt-16 sm:pt-4 pb-4 bg-[url('./assets/images/background.jpg')] border-2 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:w-[80rem] sm:h-[40rem] sm:rounded-3xl h-full w-full sm:shadow-lg bg-white">
                <div className="flex sm:basis-1/2 flex-col items-center justify-center bg-gradient-to-b to-[#2e2be9] from-[#7857ff] sm:rounded-3xl rounded-b-3xl py-7 px-10">
                    <h2 className="text-[#ebf1ff] font-hankengrotesk text-xl sm:text-lg font-bold">{quiz.quizTitle}</h2>
                    <div className="flex flex-col items-center justify-center h-44 rounded-3xl bg-gradient-to-b from-[#2421ca]/100 to-[#4e21ca]/0 my-6">
                        <h1 className="font-hankengrotesk text-3xl sm:text-xl text-green-500 mb-2 font-extrabold">Question : {currentQuestionIndex + 1}</h1>
                        <h1 className="text-white font-hankengrotesk sm:text-3xl font-extrabold mt-2">{currentQuestion.question}</h1>
                    </div>
                    <h1 className="text-white font-hankengrotesk text-3xl sm:text-2xl mb-2 font-extrabold">Time left: {timeLeft}s</h1>
                </div>
                <div className="flex sm:basis-1/2 flex-col min-h-auto justify-between space-y-5 p-8 sm:px-10">
                    <h1 className="font-hankengrotesk text-xl sm:text-lg font-bold text-blue-500">Options</h1>
                    <div className="flex flex-col space-y-4">
                        {currentQuestion.options.map((option, i) => (
                            <div
                                key={i}
                                className={`flex justify-between items-center p-4 rounded-xl shadow ${answers[currentQuestionIndex] === option ? 'bg-blue-500 text-white' : colors[i].background}`}
                                onClick={() => handleAnswer(option)}
                            >
                                <div className={`flex-col font-hankengrotesk text-lg sm:text-base ${answers[currentQuestionIndex] === option ? 'bg-blue-500 text-white' : colors[i].main}`}>
                                    {option}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between">
                        <button
                            onClick={handlePrevious}
                            disabled={currentQuestionIndex === 0}
                            className="active:bg-gradient-to-b text-white py-4 sm:py-3 rounded-full font-hankengrotesk text-xl sm:text-lg font-bold"
                        >
                            <img src="src/assets/images/previous.png" className="w-10" alt="Previous" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="active:bg-gradient-to-b text-blue-500 text-2xl py-4 sm:py-3 rounded-full font-hankengrotesk text-xl sm:text-lg font-bold"
                        >
                            {currentQuestionIndex < quiz.questions.length - 1 ? <img src="src/assets/images/next.png" className="w-10" alt="Next" /> : 'Finish'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Quizdisplay;
