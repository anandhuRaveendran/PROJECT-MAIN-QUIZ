/* eslint-disable react/no-unknown-property */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from "uuid";
import 'react-toastify/dist/ReactToastify.css';

const CreateQuiz = () => {
    const unique_id = uuid();

    const [questions, setQuestions] = useState([
        { question: '', options: ['', '', '', ''], answer: '' }
      ]);
      const [category, setCategory] = useState('');
      const [quizTitle, setQuizTitle] = useState('');
      const [thumbnail, setThumbnail] = useState(null);

      const [isPrivate, setIsPrivate] = useState(false);
      const navigate = useNavigate();
    
      const handleQuestionChange = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index].question = value;
        setQuestions(newQuestions);
      };
      const handleThumbnailChange = (e) => {
        setThumbnail(e.target.files[0]);
      };
      const handleOptionChange = (qIndex, oIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options[oIndex] = value;
        setQuestions(newQuestions);
      };
    
      const handleAnswerChange = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index].answer = value;
        setQuestions(newQuestions);
      };
    
      const addNewQuestion = () => {
        setQuestions([
          ...questions,
          { question: '', options: ['', '', '', ''], answer: '' }
        ]);
      };
    
      const deleteQuestion = (index) => {
        const newQuestions = questions.filter((_, qIndex) => qIndex !== index);
        setQuestions(newQuestions);
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const creator = 0;
        const joinid=isPrivate==true?unique_id.slice(0, 8):0;
        const active=true;
        const response = await fetch('http://localhost:5000/api/addQuiz', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({creator, questions, category, isPrivate , joinid,quizTitle,thumbnail,active}),
        });
    
        const data = await response.json();
        console.log(data.creator!=null)
        if (data.creator!=null) {
          alert('Successfully Created new Quiz')
          navigate('/profile');
        } else {
          alert('Something Went Wrong...');
        }
      };
    return (
        <>
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 bg-gray-100 rounded-lg dark:border-gray-700 mt-[80px]">
                    <div>
                        <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add a topic, a
                            prompt or paste your excerpt here</label>
                        <textarea id="message" rows="4"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Write your thoughts here..."></textarea>

                    </div>
                    <form className="max-w-sm ">
                        <select id="noofqns" className=" mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected>Choose Number of Questions</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="25">25</option>
                            <option value="30">30</option>
                        </select>
                    </form>
                    <div>
                        <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                        <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-42 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter quiz category" required />
                    </div>
                    <button type="submit" className="inline-flex items-center mt-2 px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                        Generate Quesions
                    </button>

                    <div className=" mt-2 flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                        <input id="bordered-checkbox-1" type="checkbox" value="" name="bordered-checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label for="bordered-checkbox-1" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Join With JOIN ID (Private)</label>
                    </div>
                    {/* <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                        <input id="bordered-checkbox-1" type="checkbox" value="" name="bordered-checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label for="bordered-checkbox-1" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Negative Mark for Wrong Answer</label>
                    </div> */}
                    <a href="./viewquiz.html">
                        <button type="submit" className="inline-flex ml-[600px] items-center mt-2 px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                            Publish
                        </button> </a>
                </div>
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <form onSubmit={handleSubmit}>
      <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Quiz Title
              </label>
              <input
                type="text"
                placeholder="Enter quiz title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Thumbnail Image
              </label>
              <input
                type="file"
                accept="image/*"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleThumbnailChange}
              />
            </div>
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="mb-4">
            <div className="flex justify-between items-center">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Question {qIndex + 1}
              </label>
              <button
                type="button"
                onClick={() => deleteQuestion(qIndex)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
            <textarea
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your question here..."
              value={q.question}
              onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
            />
            {q.options.map((option, oIndex) => (
              <div key={oIndex} className="mt-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Option {oIndex + 1}:
                </label>
                <input
                  type="text"
                  placeholder={`Option ${oIndex + 1}`}
                  className="rounded-lg border-2 border-gray-300 h-8 w-full"
                  value={option}
                  onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                />
              </div>
            ))}
            <div className="mt-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Answer:
              </label>
              <input
                type="text"
                placeholder="Enter Answer Here"
                className="rounded-lg border-2 border-gray-300 h-8 w-full"
                value={q.answer}
                onChange={(e) => handleAnswerChange(qIndex, e.target.value)}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addNewQuestion}
          className="inline-flex items-center mt-2 px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
        >
          Add new Question
        </button>
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Category
          </label>
          <input
            type="text"
            placeholder="Enter quiz category"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="mt-2 flex items-center border border-gray-200 rounded dark:border-gray-700">
          <input
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
          />
          <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Join With JOIN ID (Private)
          </label>
        </div>
        <button
          type="submit"
          className="inline-flex items-center mt-2 px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
        >
          Publish
        </button>
      </form>
    </div></div>   </>)

}

export default CreateQuiz