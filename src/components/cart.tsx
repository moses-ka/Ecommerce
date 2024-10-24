import { useEffect, useState } from "react";
import { PlusItem, minusItem, removeItem } from "../stateMangment/productsSlice";
import { StateType, productInCartType } from "../types";
import { userType } from "../types";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "./SideBar";
import axios from "axios";

export default function Cart() {
  const [cart, setCart] = useState<productInCartType[]>([]); // Update the type of cart state
  const [subtotal, setSubtotal] = useState<number>(0);
  const [total, settotal] = useState<number>(0);
  const dispatch = useDispatch();
  const products = useSelector((state: StateType) => state.products);
  // Accessing products from Redux store
  const user = useSelector((state: { user: userType }) => state.user);

  useEffect(() => {
    setCart(products); // Setting cart state to products from Redux store
    const subTotal = products.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setSubtotal(subTotal);
    const Total = products.reduce((acc, item) => acc + item.price * 1.20 * item.quantity, 0);
    settotal(Math.round(Total * 100) / 100);
  }, [products]);


  const handleRemoveItem = (id: number) => {
    dispatch(removeItem(id)); // Dispatching action to remove item from Redux store
  };
  const handlePlus = (id: number) => {
    dispatch(PlusItem(id));
  };
  const handleMinus = (id: number) => {
    dispatch(minusItem(id));
  }
  const HandleCheckout = () => {
    const url = 'https://moseska.pythonanywhere.com/products/checkout';
    const data = {
      username: user.user_name,
      products: products.map(product => product.id),  // Send product IDs
      total: total
    };

    console.log(data, 'this is data');
    axios.post(url, data)
      .then(res => {
        console.log(res, 'this is res');
      })
      .catch(err => {
        console.error(err.response?.data || err.message, 'this is err');
      });
  };



  return (
    <>
      <SideBar />
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 text-black dark:text-gray-200">
          <div className="mx-auto max-w-3xl">
            <header className="text-center">
              <h1 className="text-xl font-bold   sm:text-3xl">
                Your Cart
              </h1>
            </header>
            <ul className="space-y-4">
              {cart?.length === 0 && (
                <p className="mt-8 text-center ">
                  Your cart is empty
                </p>
              )}

              <div className="mt-8  ">
                {cart && cart?.map((item: productInCartType) => {
                  return (
                    <div key={item.id}>
                      <li className="flex items-center gap-4">
                        <img
                          src={"https://moseska.pythonanywhere.com/" + item.img}
                          alt=""
                          className="w-2/6 rounded object-cover"
                        />

                        <div>
                          <h3 className="text-sm">
                            {item.title}
                          </h3>

                          <dl className="mt-0.5 space-y-px text-[10px]">
                            <div>

                              <span className="inline">{item.description}</span>
                            </div>

                            <div>
                              <span className="inline">{item.price} €</span>

                            </div>
                          </dl>
                        </div>

                        <div className="flex flex-1 items-center justify-center  gap-2">


                          <button className="w-8" onClick={() => handleMinus(item.id)}>-</button>

                          <span


                            className=" font-medium text-sm"
                          >
                            {item.quantity}

                          </span>
                          <button className="w-8" onClick={() => handlePlus(item.id)}>+</button>
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
                              className="h-4 w-4"
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
                    </div>
                  );
                })}
              </div>
            </ul>

            <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
              <div className="w-screen max-w-lg space-y-4">
                <dl className="space-y-0.5 text-sm  ">
                  <div className="flex justify-between">
                    <dt>Subtotal</dt>
                    <dd>{subtotal} €</dd>
                  </div>

                  <div className="flex justify-between">
                    <dt>VAT</dt>
                    <dd>20 %</dd>
                  </div>

                  {/* <div className="flex justify-between">
                    <dt>Discount</dt>
                    <dd>-£20</dd>
                  </div> */}

                  <div className="flex justify-between !text-base font-medium">
                    <dt>Total</dt>
                    <dd>{total} €</dd>
                  </div>
                </dl>



                <div className="flex justify-end">
                  <button


                    className="rounded border bg-white border-black px-5 py-3 text-sm text-black transition hover:ring-1 hover:ring-black "
                    onClick={HandleCheckout}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
