"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { OrderedListProps, ordersType } from "../types"

export default function OrderedList(props: OrderedListProps) {
  const [orderedList, setOrderedList] = useState<ordersType[]>([]) // Initialize as an empty array

  const { user } = props

  useEffect(() => {
    const url = "http://127.0.0.1:8000/ordered-products"
    const data = {
      username: "nnoo"
    }
    
    axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => {
      const orders: ordersType[] = res.data.ordered_products // Make sure the response is typed correctly
      setOrderedList(orders)
    })
    .catch(err => console.log(err, 'this is err'))
  }, [user])

  const HandleOrderClick = () => {
    console.log('clicked')
  }

  return (
    <>
      <div id="OrderedList">
        <ul>
          {orderedList.length > 0 ? (
            orderedList.map((item: ordersType) => {
              console.log(item)
              return (
                <>
               <button onClick={HandleOrderClick} >

               
                <li key={item.id}>
                    <div className="flex flex-col justify-center items-start gap-2 text-sm">
                    <div className="flex justify-center items-center gap-2">
                       Date Placed: <span className=""> {item.date.substring(0, 10)}</span>
                     
                    </div>
                    <div className="flex justify-center items-center gap-2">
                       Total:<span className=""> {item.total}</span>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        products quantity: <span className=""> {item.products.length}</span>

                       
                    </div>
                    <hr  className="w-44 "/>
                    </div>

                </li>
                </button>
                </> )
            })
          ) : (
            <li>No orders found</li>
          )}
        </ul>
      </div>
    </>
  )
}