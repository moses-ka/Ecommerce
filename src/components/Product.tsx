import { Link } from "react-router-dom";
import { productType } from "../types";
import { useDispatch } from "react-redux";
import { addItem } from "../stateMangment/productsSlice";
import { MdFavorite } from "react-icons/md";
import { addFavorate } from "../stateMangment/favorateSlice";

export default function Product(props: productType) {
  const dispatch = useDispatch();

  const { title, price, img, id, description, tags }: productType = props;

  const imgUrl = `http://127.0.0.1:8000/${img}`;
  const handlAddItem = () => {
    dispatch(
      addItem({ title, price, img, description, id, tags, quantity: 1 })
    );
  };

  return (
    <>
      <div
        className="w-full max-w-md bg-white border border-gray-200 rounded shadow
       dark:bg-gray-800 dark:border-gray-700 "
      >
        <Link to={`/product/${id}`}>
          <img
            className=" rounded-t-lg w-full shadow-md border border-black"
            src={imgUrl}
            alt="product img"
          />
        </Link>
        <div className="p-4 border border-black">
          <Link to={`/product/${id}`}>
            <h5 className="text-xl mt-2 font-semibold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h5>
          </Link>
          <div className="flex items-center  mb-5">
            <span className="leading-relaxed text-black dark:text-white">{description}</span>

            <span
              className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded
             dark:bg-gray-200 dark:text-gray-800 ms-3"
            >
              {tags}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              ${price}
            </span>
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={() => {
                  dispatch(
                    addFavorate({
                      title,
                      price,
                      img,
                      description,
                      id,
                      tags,
                      quantity: 1,
                    })
                  );
                }}
              >
                <MdFavorite className='text-black dark:text-white' size="24" />
              </button>
              <button
                onClick={handlAddItem}
                className=" rounded border bg-white border-black px-5 py-3 text-sm text-black transition hover:ring-1 hover:ring-black "
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
