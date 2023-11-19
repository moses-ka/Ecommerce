
import { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import Product from './Product'
import stateType from './Login'
interface dataType {
  id: number
  title: string
  price: number
  img: string
}
interface stateType {

  user:"",
  token:"",
  loggedIn:false
}
export default function Products() {
  const [data, setData] = useState([])
  const user = useSelector((state:stateType) => state.user)
  useEffect(() => {
     fetch('http://127.0.0.1:8000/api/products')
    .then(res => res.json())
    .then(data => setData(data))

  }, [])

  
  return (  
    <>
    <div className='p-2 mt-16  focus:translate-x-[16rem]  w-full md:w-[79%]   md:absolute  md:left-64 '>
      <div className='flex flex-col md:flex-row  justify-center items-center gap-8 flex-wrap'>

      
            {data?.map((item:dataType)=>{
              
              return <Product key={item.id} title={item.title} price={item.price} img={item.img} />
          })}
     </div>  
    </div>
    </>
  )
}
