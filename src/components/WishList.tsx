import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFavorate } from "../stateMangment/favorateSlice";
import { BiSolidCartAlt } from "react-icons/bi";

import { StateWishListType, productInCartType } from "../types";
import { addItem } from "../stateMangment/productsSlice";
import { motion, AnimatePresence } from "framer-motion";


export default function WishList() {
 const  wishListOpen = true
  const [wishList, setWishlist] = useState<productInCartType[]>([]);

  const wishListState = useSelector(
    (state: StateWishListType) => state.favorate
  );
  const ListRender = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setWishlist(wishListState);
   
  }, [ListRender, wishListOpen, wishListState]);
  const handleRemoveItem = (item: productInCartType) => {
    // Create a copy of the wishList array
    const updatedWishList = [...wishList];
    // Find the index of the item to remove
    const index = updatedWishList.indexOf(item);
    if (index !== -1) {
      // Remove the item from the copied array
      updatedWishList.splice(index, 1);
      // Update the state with the modified array
      setWishlist(updatedWishList);
      // Dispatch the action to remove the item from the Redux store
      dispatch(removeFavorate(item));
    }
  };
  const handleAddingToCart = (item: productInCartType) => {
    const { title, price, img, description, id, tags } = item;
    dispatch(
      addItem({ title, price, img, description, id, tags, quantity: 1 })
    );
    const updatedWishList = [...wishList];
    // Find the index of the item to remove
    const index = updatedWishList.indexOf(item);
    if (index !== -1) {
      // Remove the item from the copied array
      updatedWishList.splice(index, 1);
      // Update the state with the modified array
      setWishlist(updatedWishList);
      // Dispatch the action to remove the item from the Redux store
      dispatch(removeFavorate(item));
    }
  };

  // console.log(wishList, "wish list ");
  return (
    <>
    <AnimatePresence>
      

      
      <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 100, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3,  type: 'spring', stiffness: 500, damping: 30}}
      style={{ position: "absolute", top: 0 }}
     
      
      
        ref={ListRender}
        className="  absolute right-4 md:absolute md:right-8  top-24 w-4/6 max-w-sm border
         border-gray-600 text-gray-900 dark:text-white
         bg-white dark:bg-[#393947] rounded px-4 py-8 sm:px-6 lg:px-8"
        aria-modal="true"
        role="dialog"
        tabIndex={-1}
      >
        <h2>Wish List</h2>
        {wishList.length === 0 && (
          <h2 className=" text-xl text-center">No items in Wish List</h2>
        )}
        <div className="mt-4 space-y-6">
          <ul className="space-y-4">
            {wishList &&
              wishList.map((item, index) => {
                return (
                  
                    <li key={index} className="flex items-center gap-4">
                      <img
                        src={"http://127.0.0.1:8000/" + item.img}
                        alt={"Image + " + item.title}
                        className="w-8 rounded object-cover"
                      />

                      <div>
                        <h3 className="text-sm ">{item.title}</h3>

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

                        <motion.button

                         whileTap={{ scale: 0.7 }}
                         transition={{ duration: 0.4,  type: 'spring', stiffness: 500, damping: 30}}
         
                          onClick={() => {
                            handleAddingToCart(item);
                          }}
                          className=" transition hover:text-gray-600"
                        >
                          <BiSolidCartAlt size="24" />
                        </motion.button>
                        <motion.button

                         whileTap={{ scale: 0.7 }}
                         transition={{ duration: 0.4,  type: 'spring', stiffness: 500, damping: 30}}
         
                          onClick={() => {
                            handleRemoveItem(item);
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
                        </motion.button>
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
      </motion.div>
     
      </AnimatePresence>
    </>
  );
}
