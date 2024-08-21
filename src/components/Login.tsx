import { useState,useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loggedIn } from '../stateMangment/userSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { userType } from '../types';
import { useSelector } from 'react-redux';


export default function Login() {
  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: { user: userType }) => state.user);

  useEffect(()=>{
    if (user.logging !== false){
      navigate('/')
    }
  },[user,navigate])
  const send = () => {
    const url = 'http://127.0.0.1:8000/signin/';
    axios
      .post(url, {
        username: username,
        email: email,
        password: password,
      })
      .then((res) => {
        const { user_name, token } = res.data;
        dispatch(loggedIn({ user_name, token, logging: true }));
        localStorage.setItem('reduxUserState', JSON.stringify({ user_name, token, logging: true }));
        navigate('/');
      })
      .catch((err) => {
        
        setErrorMessage('Invalid Entry');
      });

  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   
    send(); // Send the API request
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div
          className="flex flex-col items-center justify-center px-6 py-8 mx-auto
         md:h-screen lg:py-0"
        >
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900
             dark:text-white"
          >
            <img className="w-8 h-8 mr-2" src="" alt="logo" />
            LOGO
          </a>
          <div
            className="w-full bg-white rounded-lg shadow dark:border md:mt-0 
      sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1
                className="text-xl font-bold leading-tight tracking-tight
               text-gray-900 md:text-2xl dark:text-white"
              >
                Sign in to your account
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium
                       text-gray-900 dark:text-white"
                  >
                    Your User Name
                  </label>
                  <input
                    type="username"
                    name="username"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 
                       sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600
                        block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                         dark:placeholder-gray-400 dark:text-white
                          dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Jone-Doe"
                    autoComplete="username"
                    required={true}
                    onChange={(e)=>setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium
                       text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 
                       sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600
                        block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                         dark:placeholder-gray-400 dark:text-white
                          dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required={true}
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900
                     dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900
                     sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                     block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                      dark:placeholder-gray-400 dark:text-white
                       dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required={true}
                    onChange={(e)=>setPassword(e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded
                         bg-gray-50 focus:ring-3 focus:ring-primary-300
                          dark:bg-gray-700 dark:border-gray-600 
                          dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-sm flex flex-col justify-center items-start">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                      <p className='text-base text-start text-red-600 '>{errorMessage}</p>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 
                    hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full text-black bg-blue-400 hover:bg-blue-700
                   focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium 
                   rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600
                    dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-primary-600 hover:underline 
                    dark:text-primary-500"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
