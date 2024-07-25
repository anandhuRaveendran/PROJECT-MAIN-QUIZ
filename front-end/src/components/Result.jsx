// eslint-disable-next-line no-unused-vars
import {React,useState ,useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    FacebookShareButton, 
    FacebookIcon, 
    RedditShareButton, 
    RedditIcon, 
    WhatsappShareButton, 
    WhatsappIcon, 
    LinkedinShareButton, 
    LinkedinIcon, 
  } from 'next-share'; 
const Result = () => {
  const navigate=useNavigate();
    const location = useLocation();
  console.log(location)
  useEffect(() => {
    const authToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("Authtoken"))
      ?.split("=")[1];
    console.log("documemnt.cookie vslue", authToken);

    if (!authToken) {
      navigate('/')
    }
  }, []);
    const { totalQuestions, score ,qna } = location.state || { totalQuestions: 0, score: 0 };
    const [share, setShare] = useState(false);
console.log(qna)
    const handleShare = () => {
        setShare(true)
      }
      const handleFinish = () => {
        navigate('/profile')
      }
    // const incorrectAnswers = totalQuestions - score;
    const totalMarks = totalQuestions * 10;  
    const marksObtained = score * 10;

    return (

        <div className="flex min-h-screen sm:p-10 justify-center items-center bg-[url('./assets/images/background.jpg')] border-2 shadow-2xl ">

        <div className="flex flex-col sm:flex-row sm:w-[60rem] sm:h-[40rem] sm:rounded-3xl h-full w-full sm:shadow-lg bg-white">
        <div className="flex sm:basis-1/2 flex-col items-center justify-center bg-gradient-to-b to-[#2e2be9] from-[#7857ff] sm:rounded-3xl rounded-b-3xl py-7 px-10">
            <h2 className="text-[#ebf1ff] font-hankengrotesk text-xl sm:text-lg font-bold">Your Result</h2>
            <div className="flex flex-col items-center justify-center w-44 h-44 rounded-full bg-gradient-to-b from-[#2421ca]/100 to-[#4e21ca]/0 my-6">
                <h1 className="text-white font-hankengrotesk text-7xl sm:text-6xl font-extrabold">{marksObtained}</h1>
                <p className="text-[#c8c7ff] text-lg sm:text-base font-hankengrotesk">of {totalMarks}</p>
            </div>
            <h1 className="text-white font-hankengrotesk text-3xl sm:text-2xl mb-2 font-extrabold">Great</h1>
            <p className="text-center text-[#ebf1ff] text-lg sm:text-base font-hankengrotesk">You scored higher than 65% of the people who have taken these tests.</p>
        </div>
        <div className="flex sm:basis-1/2 flex-col min-h-auto justify-between space-y-5 p-8 sm:px-10">
            <h1 className="font-hankengrotesk text-xl sm:text-lg font-bold text-red-500">Summary</h1>
            <div className="flex flex-col space-y-4 overflow-auto">
              {<div>
             {qna.map((answer, index) => (
                <div key={index} className="mb-2">
                  <p className='text-blue-500'>{answer.question}</p>
                  {answer.selectedOption==answer.correctAnswer?<p className="text-green-500">Your answer: {answer.selectedOption}</p>:<p className="text-red-500">Your answer: {answer.selectedOption}</p>}
                  <p>Correct answer: <span className='text-yellow-500'>{answer.correctAnswer}</span></p>
                </div>
              ))}</div>}
            
            </div>
            <button className="bg-[#303b5a] sm:hover:bg-gradient-to-b to-[#2e2be9] from-[#7857ff]
             active:bg-gradient-to-b text-white py-4 sm:py-3 rounded-full font-hankengrotesk text-xl 
             sm:text-lg font-bold" onClick={handleFinish}>Finish</button>
            <button className="bg-[#303b5a] sm:hover:bg-gradient-to-b to-[#2e2be9] from-[#7857ff] 
            active:bg-gradient-to-b text-white py-4 sm:py-3 rounded-full font-hankengrotesk
             text-xl sm:text-lg font-bold" onClick={handleShare}>Share</button>
   <div className='py-4 sm:py-3 '>

             {share == true ? <div>
               <FacebookShareButton url={'/home'}>
                 <FacebookIcon size={32} round />
               </FacebookShareButton>
               <RedditShareButton url={'/home'}>
                 <RedditIcon size={32} round />
               </RedditShareButton>
               <WhatsappShareButton url={'/home'}>
                 <WhatsappIcon size={32} round />
               </WhatsappShareButton>
               <LinkedinShareButton url={'/home'}>
                 <LinkedinIcon size={32} round />
               </LinkedinShareButton>
             </div> : ''}
           </div>
        </div>
        </div>
    </div>
    );
};

export default Result;
