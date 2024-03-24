import { useRef,useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector, } from "react-redux";
import { StateType } from "../types";
import { Link } from "react-router-dom";
import {removeItem } from "../stateMangment/productsSlice";
export default function CartList(props: { cartListOpen: boolean , wishListOpen: boolean} ) {
    let { cartListOpen,wishListOpen } = props;

    const ListRender = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const cartList = useSelector((state:StateType) => state.products); // Accessing products from Redux store
    useEffect(() => {
   
        if (cartListOpen&&!wishListOpen) {
          ListRender.current?.classList.remove("hidden");
        } else {
          ListRender.current?.classList.add("hidden");
        }
      }, [ListRender,cartListOpen,cartList]);

    const handleRemoveItem = (id:number) => {
        dispatch(removeItem(id)); // Dispatching action to remove item from Redux store


    }


    return (
        <>
        <div
          ref={ListRender}
          className=" hidden absolute right-4 md:absolute md:right-8  top-24 w-4/6 max-w-sm border border-gray-600 bg-white
          dark:bg-gray-800 text-gray-900 dark:text-white
          rounded px-4 py-8 sm:px-6 lg:px-8"
          aria-modal="true"
          role="dialog"
          tabIndex={-1}
        >
         
          {cartList.length === 0 && (
            <h2 className=" text-xl text-center">No items in Wish List</h2>
          )}
          <div className="mt-4 space-y-6">
            <ul className="space-y-4">
              {cartList &&
                cartList.map((item, index) => {
                  return (
                    
                      <li key={index} className="flex items-center gap-4">
                        <img
                          src={"http://127.0.0.1:8000/" + item.img}
                          alt={"Image + " + item.title}
                          className="w-8 rounded object-cover"
                        />
  
                        <div>
                          <h3 className="">{item.title}</h3>
  
                          <dl className="mt-0.5 space-y-px text-[10px] ">
                            <div>
                              <dt className="inline">Price </dt>
                              <dd className="inline"> {item.price}</dd>
                            </div>
  
                            <div>
                              <dd className="inline">{item.tags}</dd>
                            </div>
                          </dl>
                        </div>
  
                        <div className="flex flex-1 items-center justify-end gap-2">
                          <span></span>
  
                          {/* <button
                            onClick={() => {
                              handleAddingToCart(item);
                            }}
                            className="text-gray-600 transition hover:text-gray-900"
                          >
                            <BsFillBasket2Fill size="22" />
                          </button> */}
                          <button
                            onClick={() => {
                              handleRemoveItem(item.id);
                            }}
                            className=" transition hover:text-red-600"
                          >
                            <span className="sr-only">Remove item</span>
  
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="h-8 w-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        </div>
                      </li>
                    
                  );
                })}
            </ul>
  
            <div className="space-y-4 text-center">
              <Link
                to="/cart"
                className="block rounded border border-gray-600 px-5 py-3 text-sm  transition hover:ring-1 hover:ring-gray-400"
              >
                View my cart
              </Link>
            </div>
          </div>
        </div>
      </>
    )
}