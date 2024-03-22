import  { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react';
import {productType} from '../types'
import axios from 'axios';
import SideBar from './SideBar';
export default function Product() {
  const {id} = useParams()
  const [product, setProduct] = useState<productType>();
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/product/${id}`)
    .then(res => setProduct(res.data))
  }, [id])

  const serverUrl = 'http://127.0.0.1:8000'

  return (
    <>
    <SideBar/>
      <section className=" text-gray-900 dark:text-gray-200 body-font overflow-hidden bg-gray-900">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt={`product Image ${product?.title}`}
              className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
              src={`${serverUrl}${product?.img}`}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                BRAND NAME
              </h2>
              <h1 className=" text-3xl title-font font-medium mb-1">
                {product?.title}
              </h1>
             
              <p className="leading-relaxed">
                {product?.description}
              </p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                  <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>

                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>

                  <div className="relative">
                    <select className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                      <option>SM</option>
                      <option>M</option>
                      <option>L</option>
                      <option>to select a size</option> 
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900 dark:text-gray-200">
                 {product?.price} $
                </span>
                <button
                 className="flex ml-auto rounded border bg-white border-black px-5 py-3 text-sm text-black transition hover:ring-1 hover:ring-black ">
                  Check Out
                </button>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-red-800 hover:text-red-500 hover:bg-gray-300 ml-4">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
