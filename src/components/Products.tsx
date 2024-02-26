
import { useEffect,useState } from 'react'
import {userType,productType} from '../types'
import { useSelector } from 'react-redux'
import Product from './Product'



export default function Products() {
  const [data, setData] = useState([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useSelector((state:userType) => state.user)
  useEffect(() => {
     fetch('http://127.0.0.1:8000/api/products')
    .then(res => res.json())
    .then(data => setData(data))
   
  }, [])

  // console.log(user , 'this is user state ')
  // console.log(data, 'this is data')
  return (  
    <>
    <div className='p-2 mt-16  focus:translate-x-[16rem]  w-full md:w-[79%]   md:absolute  md:left-64 '>
      <div className='flex flex-col md:flex-row  justify-center items-center gap-8 flex-wrap'>

      
            {data?.map((item:productType)=>{
              
              return <Product key={item.id} 
              title={item.title} price={item.price}
               img={item.img} id={item.id} 
               description={item.description}/>
          })}
     </div>  
    </div>
    </>
  )
}
