import { useState, useRef, useEffect } from "react";
import { GoPersonFill } from "react-icons/go";
import { BiSolidCartAlt, BiSolidSearchAlt2 } from "react-icons/bi";
import { MdFavorite } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import SearchResults from "./SearchResults";
import WishList from "./WishList";
import CartList from "./CartList";
import { motion } from "framer-motion";
import MKcommerce from "../assets/MKcommerce.png";
import UserList from "./UserList";
export default function SideBar() {
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartListOpen, setIsCartListOpen] = useState(false);
  const [favorite, setFavorite] = useState(false);
  
  const search = useRef<HTMLInputElement>(null);
  const [results, setResults] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isUserListOpen, setUserListOpen] = useState(false);
  const Navigate = useNavigate();
  console.log(isUserListOpen , "isUserListOpen");
 
  const Search = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      search.current?.classList.add("hidden");
    }
    if (!isSearchOpen) {
      search.current?.classList.remove("hidden");
    }
    // this function is handlinig the search bar show it and hide it
  };
  const blur = () => {
    setIsSearchOpen(false);
    search.current?.classList.add("hidden");
    // this function is hiding the search bar when it is not in focus
  };

  useEffect(() => {
    if (searchValue === "") {
      return;
    }
    fetch(`http://127.0.0.1:8000/api/products/search/${searchValue}`)
      .then((res) => res.json())
      .then((data) => setResults(data));
  }, [searchValue]);
  const handleUserBtn = () => {
    setUserListOpen(!isUserListOpen);
  }
  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b     border-gray-200 dark:bg-[#19191a] dark:border-gray-700">
      <SearchResults results={results} searchBar={isSearchOpen} />
        <div className="px-3 py-3 lg:px-5 lg:pl-3 h-24 flex flex-col  justify-center">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
             

              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                <motion.button
                 whileTap={{ scale: 0.7 }}
                 transition={{ duration: 0.3,  type: 'spring', stiffness: 500, damping: 30}}
 
                  onClick={() => {
                    Navigate("/");
                  }}
                >
                  <img src={MKcommerce} alt="MKcommerce Logo" className="w-20" />
                </motion.button>
              </span>
            </div>
            <div className="flex items-center">
              <div className="flex items-center j ml-3 justify-center  gap-4 mr-2">
                <form
                  className=""
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSearchValue(searchValue);
                  }}
                  action=""
                >

                <input
                  id="searchBar"
                  onChange={(e) => setSearchValue(e.target.value)}
                  type="text"
                  ref={search}
                  onBlur={blur}
                  placeholder="Search"
                  className="border-2 hidden border-gray-200 rounded-lg p-1 "
                />
                </form>
                <motion.button 
                 whileTap={{ scale: 0.7 }}
                 transition={{ duration: 0.3,  type: 'spring', stiffness: 500, damping: 30}}
 
                onClick={Search}>
                  <BiSolidSearchAlt2 className="w-6 h-6 text-black hover:text-[#858592] dark:text-white" />
                </motion.button>

                <GoPersonFill onClick={
                  handleUserBtn
                } id="userBtn" className="w-6 h-6 text-black hover:text-[#858592] dark:text-white" />
                  {
                    isUserListOpen && <UserList />
                  }
                <motion.button
                 whileTap={{ scale: 0.7 }}
                 transition={{ duration: 0.3,  type: 'spring', stiffness: 500, damping: 30}}
 
                  onClick={() => {
                    setIsCartListOpen(!isCartListOpen);
                  }}
                >
                  <BiSolidCartAlt className="w-6 h-6 text-black hover:text-[#858592] dark:text-white" />
                </motion.button>
                {isCartListOpen && <CartList   />}
                <motion.button onClick={() => setFavorite(!favorite)}
                 whileTap={{ scale: 0.7 }}
                 transition={{ duration: 0.3,  type: 'spring', stiffness: 500, damping: 30}}
 
                >

                  <MdFavorite  className="w-6 h-6 text-black hover:text-[#858592] dark:text-white" />
                </motion.button>
               {favorite && <WishList  />}
              </div>
            </div>
          </div>
        </div>
      </nav>

      
    </>
  );
}
