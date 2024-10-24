import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from 'react-redux'
import { userType } from "../types";
import { useNavigate } from "react-router-dom";
import MKcommerce from '../assets/MKcommerce.png'
export default function SignUp() {
  
    const [username , setUsername] = useState('')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [confirmPassword , setConfirmPassword] = useState('')
    const [errorMsg , setErrorMsg] = useState('')
      const user = useSelector((state: { user: userType }) => state.user);
    const navigate = useNavigate()
    useEffect(()=>{
      if (user.logging !== false){
        navigate('/')
      }
    },[user,navigate])

  
    
    const send = ()=>{
        const url = 'https://moseska.pythonanywhere.com/signup/'
        axios.post(url,{
            username:username,
            email:email,
            password:password
        })
        .then(res=>console.log(res,'this is res'))
        .catch(err=>console.log(err,'this is err'))
      }
    const HandleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
      
        if (password !== confirmPassword){
            setErrorMsg("Password does not match")
        }
      
        send()
        navigate('/login')
    }
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div
          className="flex flex-col items-center justify-center px-6 py-8
         mx-auto md:h-screen lg:py-0"
        >
          <Link
            to="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900
             dark:text-white"
          >
            <img src={MKcommerce} alt="MKcommerce Logo" className="w-20  " />
          </Link>
          <div
            className="w-full bg-white rounded-lg shadow dark:border
           md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1
                className="text-xl font-bold leading-tight tracking-tight
               text-gray-900 md:text-2xl dark:text-white"
              >
                Create and account
              </h1>
              <form onSubmit={HandleSubmit} className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900
                     dark:text-white"
                  >
                    Your User Name
                  </label>
                  <input
                    type="username"
                    name="username"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900
                     sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Jane-Doe"
                    required={true}
                    onChange={(e)=>setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900
                     dark:text-white"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900
                     sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900
                     dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type="confirm-password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900
                     sm:text-sm rounded-lg focus:ring-primary-600 
                     focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                      dark:border-gray-600 dark:placeholder-gray-400
                       dark:text-white dark:focus:ring-blue-500
                        dark:focus:border-blue-500"
                    required={true}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                  />
                </div>
                {errorMsg && <p className='text-red-500'>{errorMsg}</p>}
               
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded
                       bg-gray-50 focus:ring-3 focus:ring-primary-300
                        dark:bg-gray-700 dark:border-gray-600 
                        dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required={true}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <a
                        className="font-medium text-primary-600 hover:underline 
                        dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-black  bg-blue-500 hover:bg-blue-700
                   focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium 
                   rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600
                    dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create an account
                </button>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-primary-600 hover:underline 
                    dark:text-primary-500"
                  >
                    Login here
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
