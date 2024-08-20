import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { productType } from "../types";
export default function SearchResults(props: {
  results: productType[];
  searchBar: boolean;
}) {
  const [search, setSearch] = useState<productType[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setSearch(props.results);
    if (props.searchBar && props.results.length > 0) {
      ref.current?.classList.remove("hidden");
    } else {
      ref.current?.classList.add("hidden");
    }
  }, [props.searchBar, props.results]);
  const Navigate = useNavigate();


  return (
    <>
      <div
        ref={ref}
        className=" absolute hidden top-[4rem] text-gray-900 dark:text-white   w-full"
        tabIndex={1}
      >
        <div
          className="absolute end-0 z-10 mt-2 w-full divide-y divide-gray-100 rounded-md border border-gray-100
          dark:bg-[#19191a] shadow-lg "
          role="menu"
        >
          <div className="p-2">
            {search.map((item: productType,key) => {
              return (
                <>
                  <button
                    key={key}
                    onClick={() => {
                      Navigate(`/product/${item?.id}`);
                    }}
                    className="block w-full rounded-lg px-4 py-2 text-sm hover:bg-[#d2d2d2] bg-white hover:text-gray-700"
                    role="menuitem"
                  >
                    <div className="flex justify-between items-center">
                    <img
                        src={"http://127.0.0.1:8000/" + item.img}
                        alt={"Image + " + item.title}
                        className="w-10 rounded object-cover"
                      />                    <span>{item.title}</span> <span className="">{item.price} Euro</span>
                    </div>
                   
                  </button>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
