
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    console.log(data);
    if (data.status === 'success') {
        navigate('/home');
      } else {
        alert(data.message);
      }
  };
  return (
<>
<div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
        <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex h-[700px] justify-center flex-1">
          <div className="flex-1 bg-white-900 text-center hidden md:flex">
            <div
            className=" w-full bg-contain  bg-no-repeat bg-[url('src/assets/images/login.jpg')]">
          </div>
          </div>
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className=" flex flex-col items-center">
              <div className="text-center">
                <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                  Login
                </h1>
                <p className="text-[12px] text-gray-500">
                  Hey enter your details to login your account
                </p>
              </div>
              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs flex flex-col gap-4">
                    <form onSubmit={handleSubmit}>
                  <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
                  /> 
                  <a href="/home">
                  <button type="submit" className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                   
                    <span className="ml-3">Login</span>
                  </button></a></form>
                  <p className="mt-6 text-xs text-gray-600 text-center">
                    Dont have an account?
                    <a href="/register">
                      <span className="text-blue-900 font-semibold">Create New</span>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
</>  )
}

export default Login