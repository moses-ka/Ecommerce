import { Link } from "react-router-dom";
import { productType } from "../types";


export default function Product(props: productType) {

  const { title, price, img,id,description }: productType = props;

  const imgUrl = `http://127.0.0.1:8000/${img}`;
 
  return (
    <>
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow
       dark:bg-gray-800 dark:border-gray-700 ">
        <Link to={`/product/${id}`}>
          <img className=" rounded-t-lg w-full shadow-md" src={imgUrl} alt="product img" />
        </Link>
        <div className="p-4">
          <Link to={`/product/${id}`}>
            <h5 className="text-xl mt-2 font-semibold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h5>
          </Link>
          <div className="flex items-center  mb-5">
          <p className="leading-relaxed">{description}</p>
          
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded
             dark:bg-blue-200 dark:text-blue-800 ms-3">
             TAG
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              ${price}
            </span>
            <a
              href="#"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
               focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center
                dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add to cart
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
