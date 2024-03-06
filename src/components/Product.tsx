import { Link } from "react-router-dom";
import { productType } from "../types";
import { useDispatch } from "react-redux";
import { addItem } from "../stateMangment/productsSlice";
import { MdFavorite } from "react-icons/md";
import { addFavorate } from "../stateMangment/favorateSlice";


export default function Product(props: productType) {
  const dispatch = useDispatch();

  const { title, price, img, id, description,tags }: productType = props;

  const imgUrl = `http://127.0.0.1:8000/${img}`;
  const handlAddItem = () => {
   

    dispatch(addItem({ title, price, img, description, id,tags,quantity:1 }));
  };
  
  return (
    <>
      <div
        className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow
       dark:bg-gray-800 dark:border-gray-700 "
      >
        <Link to={`/product/${id}`}>
          <img
            className=" rounded-t-lg w-full shadow-md"
            src={imgUrl}
            alt="product img"
          />
        </Link>
        <div className="p-4">
          <Link to={`/product/${id}`}>
            <h5 className="text-xl mt-2 font-semibold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h5>
          </Link>
          <div className="flex items-center  mb-5">
            <p className="leading-relaxed">{description}</p>

            <span
              className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded
             dark:bg-blue-200 dark:text-blue-800 ms-3"
            >
              {tags}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              ${price}
            </span>
            <div className="flex justify-center items-center gap-2">

            <button onClick={()=>{
              dispatch(addFavorate({ title, price, img, description, id,tags,quantity:1 }));
            }}><MdFavorite/></button>
            <button
              onClick={handlAddItem}
              className="text-white  bg-black hover:bg-gray-700 focus:ring-4 focus:outline-none
              focus:ring-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center
              dark:bg-black dark:hover:bg-white dark:focus:ring-black"
              >
              Add to cart
            </button>
              </div>

          </div>
        </div>
      </div>
    </>
  );
}
