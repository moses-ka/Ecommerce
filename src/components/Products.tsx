
import { useEffect, useState } from 'react'
import {  productType } from '../types'

import Product from './Product'



export default function Products() {
  const [data, setData] = useState([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  
  useEffect(() => {
    fetch('https://moseska.pythonanywhere.com/api/products')
      .then(res => res.json())
      .then(data => setData(data))

  }, [])


  return (
    <>
      <div className='p-2 mt-24    w-full  '>
        <div className='flex flex-col md:flex-row 
          justify-center items-center gap-6 flex-wrap w-full dark:bg-[#19191a] dark:text-white'>


          {data?.map((item: productType) => {

            return <Product key={item.id}
              title={item.title} price={item.price}
              img={item.img} id={item.id}
              description={item.description}
              tags={item.tags}
              sex={item.sex}
              size={item.size}
              color={item.color}

            />
          })}
        </div>
      </div>
    </>
  )
}
