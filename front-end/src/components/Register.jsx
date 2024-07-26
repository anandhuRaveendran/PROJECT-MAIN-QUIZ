// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("Authtoken"))
      ?.split("=")[1];
    console.log("document.cookie value", authToken);

    if (authToken) {
      navigate('/profile');
    }
  }, [navigate]);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) => 
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(password);

  const validatePhone = (phone) => /^\d{10}$/.test(phone);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};

    if (!username) validationErrors.username = "Username is required";
    if (!email || !validateEmail(email)) validationErrors.email = "Invalid email address";
    if (!phone || !validatePhone(phone)) validationErrors.phone = "Phone number must be exactly 10 digits";
    if (!password || !validatePassword(password)) validationErrors.password = "Password must be 8-16 characters long and include a number, a special character, and a letter";
    if (password !== confirmPassword) validationErrors.confirmPassword = "Passwords do not match";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('password', password);
    formData.append('profilePicture', profilePicture);

    const response = await fetch('/api/signup', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    console.log(data);

    if (data.message === 'User registered successfully') {
      toast.success("Registration successful! Redirecting...");
      setTimeout(() => {
        navigate('/');
      }, 2000); // Give time for toast to be visible before navigating
    } else {
      toast.error(data.error || "An error occurred during registration");
    }
  };

  return (
    <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
      <div className="max-w-screen-xl bg-white border shadow-2xl sm:rounded-lg flex justify-center h-[700px] flex-1">
        <div className="flex-1 bg-white-900 text-center hidden md:flex">
          <div className="w-full bg-contain bg-fill bg-no-repeat bg-[url('src/assets/images/loginlogo.jpg')]">
          </div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">Sign up</h1>
              <p className="text-[12px] text-gray-500">Hey enter your details to create your account</p>
            </div>
            <div className="w-full flex-1 mt-8">
              <form onSubmit={handleSubmit} className="mx-auto max-w-xs flex flex-col gap-4">
                <input
                  className={`w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border ${errors.username ? 'border-red-500' : 'border-gray-200'} placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white`}
                  type="text"
                  placeholder="Enter your name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>}
                
                <input
                  className={`w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border ${errors.email ? 'border-red-500' : 'border-gray-200'} placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white`}
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                
                <input
                  className={`w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border ${errors.phone ? 'border-red-500' : 'border-gray-200'} placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white`}
                  type="tel"
                  placeholder="Enter your phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                
                <input
                  className={`w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border ${errors.password ? 'border-red-500' : 'border-gray-200'} placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white`}
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                
                <input
                  className={`w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'} placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white`}
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
                
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="file"
                  onChange={(e) => setProfilePicture(e.target.files[0])}
                />

                <button
                  type="submit"
                  className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <span className="ml-3">Sign Up</span>
                </button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  Already have an account?
                  <a href="/">
                    <span className="text-blue-900 font-semibold">Sign in</span>
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
