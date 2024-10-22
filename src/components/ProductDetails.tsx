import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { productType } from '../types'
import axios from 'axios';
import SideBar from './SideBar';
import { MdFavorite } from 'react-icons/md';
import { addItem } from '../stateMangment/productsSlice';
import { useDispatch } from 'react-redux';
import { addFavorate } from '../stateMangment/favorateSlice';

export default function Product() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const [product, setProduct] = useState<productType>();
  useEffect(() => {
    axios.get(`https://moseska.pythonanywhere.com/api/product/${id}`)
      .then(res => setProduct(res.data))
  }, [id])

  const serverUrl = 'https://moseska.pythonanywhere.com/'

  return (
    <>
      <SideBar />
      <section className=" mt-6 text-black dark:text-white dark:bg-[#19191a] body-font overflow-hidden ">
        <div className="flex justify-evenly items-center px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt={`product Image ${product?.title}`}
              className="lg:w-2/6 w-full object-cover object-center rounded border border-gray-200"
              src={`${serverUrl}${product?.img}`}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">

              <h1 className=" text-3xl title-font font-medium mb-1">
                {product?.title}
              </h1>

              <p className="leading-relaxed w-5/6">
                {product?.description}
              </p>
              <div className="flex mt-6 items-center pb-5 border-b-2 justify-between border-gray-200 mb-5">

                <span className="mr-3 text-center">Size : {product?.size}</span>
                <span>{product?.tags}</span>


              </div>
              <div className="flex justify-center items-center ">
                <span className="title-font font-medium text-2xl text-gray-900 dark:text-gray-200">
                  {product?.price} $
                </span>
                <button
                  onClick={() => {
                    if (product)
                      dispatch(addFavorate({
                        title: product?.title, price: product?.price,
                        img: product?.img, description: product?.description,
                        id: product?.id, tags: product?.tags, quantity: 1
                      }))
                  }}
                  className=" ml-28">
                  <MdFavorite size='24' />
                </button>
                <button
                  onClick={() => {
                    if (product)
                      dispatch(addItem({
                        title: product?.title, price: product?.price,
                        img: product?.img, description: product?.description,
                        id: product?.id, tags: product?.tags, quantity: 1
                      }))
                  }}
                  className="flex  ml-4 rounded border bg-white border-black px-5 py-3 text-sm
                  text-black transition hover:ring-1 hover:ring-black ">
                  add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
