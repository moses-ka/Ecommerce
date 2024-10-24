import { Link } from "react-router-dom";
import { productType } from "../types";
import { useDispatch } from "react-redux";
import { addItem } from "../stateMangment/productsSlice";
import { MdFavorite } from "react-icons/md";
import { addFavorate } from "../stateMangment/favorateSlice";
import { BiSolidCartAlt } from "react-icons/bi";
import { motion } from "framer-motion";

export default function Product(props: productType) {
  const dispatch = useDispatch();

  const { title, price, img, id, description, tags,size }: productType = props;
  console.log(img , 'img');
  const imgUrl = `https://moseska.pythonanywhere.com/${img}`;
  const handlAddItem = () => {
    dispatch(
      addItem({ title, price, img, description, id, tags, quantity: 1 })
    );

  };

  return (
    <>
      <div
        className="w-[15rem] border border-gray-200 rounded shadow bg-[#ffffff] dark:bg-[#19191a] dark:text-white "
      >
        <Link to={`/product/${id}`}>
          <img
            className=" rounded h-[20rem] shadow-md "
            src={imgUrl}
            alt="product img"
          />
        </Link>
        <div className="p-4 border ">
          <Link to={`/product/${id}`}>
            
            <h4 className="text-xl mt-2 font-semibold tracking-tight
            mb-4">
              {title}
            </h4>
              
           
          </Link>
          <div className="flex items-center gap-4   mb-5">
              <span className=" text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded
             ">{size}</span>
            <span
              className=" text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded
              "
            >
              {tags}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold  ">
              ${price}
            </span>
            <div className="flex justify-center items-center gap-4">
              <motion.button
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
                whileTap={{ scale: 0.7 }}
                transition={{ duration: 0.3,  type: 'spring', stiffness: 500, damping: 30}}

              >
                <MdFavorite className='' size="24" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.7 }}
                transition={{ duration: 0.3,  type: 'spring', stiffness: 500, damping: 30}}

                onClick={handlAddItem}
               
              >
                <BiSolidCartAlt size='24' className=''/>
                
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
