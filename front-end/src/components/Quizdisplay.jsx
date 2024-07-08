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
    const colors = [
        {
            main: 'text-[#ff5757]',
            background: 'bg-[#ff5757]/5'
        },
        {
            main: 'text-[#ffb01f]',
            background: 'bg-[#ffb01f]/5'
        },
        {
            main: 'text-[#00bd91]',
            background: 'bg-[#00bd91]/5'
        },
        {
            main: 'text-[#1125d4]',
            background: 'bg-[#1125d4]/5'
        },
    ];
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
        console.log(currentQuestionIndex,quiz.questions.length-1)
        if (currentQuestionIndex < quiz.questions.length - 1) {

            setTimeLeft(30)

            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            saveResult();
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setTimeLeft(30)
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
                const qna = resultData.qna
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
        // <div className="p-4 sm:ml-64 ">
        //     <div className="p-4 border-2 bg-gray-100 rounded-lg dark:border-gray-700 mt-[80px] ">
        //         <div className="text-center mb-4">
        //             <h2 className="text-2xl font-bold">{quiz.quizTitle}</h2>
        //             <div className="text-xl">Time left: {timeLeft}s</div>
        //         </div>
        //         <div className="quiz-step">
        //             <p>{`Question ${currentQuestionIndex + 1}: ${currentQuestion.question}`}</p>
        //             <div className="grid grid-cols-2 gap-4 mt-4">
        //                 {currentQuestion.options.map((option, i) => (
        //                     <button
        //                         key={i}
        //                         className={`block p-4 rounded cursor-pointer ${answers[currentQuestionIndex] === option ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        //                         onClick={() => handleAnswer(option)}
        //                     >
        //                         {option}
        //                     </button>
        //                 ))}
        //             </div>
        //         </div>
        //         <div className="mt-4 flex justify-between">
        //             <button

        //             >
        //                 Previous
        //             </button>
        //             <button

        //             </button>
        //         </div>
        //     </div>
        // </div>

        <div className="flex min-h-screen sm:p-10 justify-center items-center bg-[url('./assets/images/background.jpg')] border-2 shadow-2xl ">

            <div className="flex flex-col sm:flex-row sm:w-[80rem] sm:h-[40rem] sm:rounded-3xl h-full w-full sm:shadow-lg bg-white">
                <div className="flex sm:basis-1/2 flex-col items-center justify-center bg-gradient-to-b to-[#2e2be9] from-[#7857ff] sm:rounded-3xl rounded-b-3xl py-7 px-10">
                    <h2 className="text-[#ebf1ff] font-hankengrotesk text-xl sm:text-lg font-bold">{quiz.quizTitle}</h2>
                    <div className="flex flex-col items-center justify-center text h-44 rounded-full bg-gradient-to-b from-[#2421ca]/100 to-[#4e21ca]/0 my-6">
                        <h1 className=" font-hankengrotesk text-3xl sm:text-xl text-green-500 mb-2 font-extrabold">Question : {currentQuestionIndex + 1}</h1>

                        <h1 className="text-white font-hankengrotesk  sm:text-base sm:text-3xl font-extrabold mt-2">{` ${currentQuestion.question}`}</h1>
                        {/* <p className="text-center text-[#ebf1ff] text-lg sm:text-base font-hankengrotesk">You scored higher than 65% of the people who have taken these tests.</p> */}

                    </div>
                    <h1 className="text-white font-hankengrotesk text-3xl sm:text-2xl mb-2 font-extrabold">Time left: {timeLeft}s</h1>
                    <p className="text-[#c8c7ff] text-lg sm:text-base font-hankengrotesk"></p>

                </div>
                <div className="flex sm:basis-1/2 flex-col min-h-auto justify-between space-y-5 p-8 sm:px-10">
                    <h1 className="font-hankengrotesk text-xl sm:text-lg font-bold text-blue-500 ">Options</h1>

                    <div className="flex flex-col space-y-4 ">

                        {currentQuestion.options.map((option, i) => (

                            <div className={`flex justify-between  ${answers[currentQuestionIndex] === option ? 'bg-blue-500 text-white' : `${colors[i].background}`} items-center p-4 rounded-xl shadow`} key={i} onClick={() => handleAnswer(option)}>
                                <div className="flex space-x-3">
                                    <div className={`flex-col font-hankengrotesk text-lg sm:text-base   ${answers[currentQuestionIndex] === option ? 'bg-blue-500 text-white' : `${colors[i].main} `}`} >  {option}</div>
                                </div>
                            </div>
                            //    <button
                            //     key={i}
                            //         className={`block p-4 rounded cursor-pointer ${answers[currentQuestionIndex] === option ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            //         onClick={() => handleAnswer(option)}
                            //     >
                            //         {option}
                            //     </button>
                        ))}
                    </div>
<div className="flex justify-between">
                    <button className="
             active:bg-gradient-to-b text-white py-4 sm:py-3 rounded-full font-hankengrotesk text-xl 
             sm:text-lg font-bold"                         onClick={handlePrevious}
             
             disabled={currentQuestionIndex === 0}><img src="src/assets/images/previous.png" className="w-10"/></button>
                    <button className="             active:bg-gradient-to-b text-blue-500 text-2xl py-4 sm:py-3 rounded-full font-hankengrotesk text-xl 
             sm:text-lg font-bold"                         onClick={handleNext}
         >
             {currentQuestionIndex < quiz.questions.length - 1 ? <img src="src/assets/images/next.png" className="w-10"/> : 'Finish'}</button>
             </div>
                    <div className='py-4 sm:py-3 '>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default Quizdisplay;
