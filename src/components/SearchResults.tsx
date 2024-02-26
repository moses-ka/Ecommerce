import { Link, useNavigate } from "react-router-dom";

import { productType } from "../types";
export default function SearchResults(props: { results: productType[] }) {
    const Navigate = useNavigate()
    const results =props.results
   
console.log(props.results, 'this is the results')
  return (
    <>
      <div className=" absolute  top-[4rem] right-[10rem]">
        <div
          className="absolute end-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
          role="menu"
        >
          <div className="p-2">
           {results.map((item:productType)=>{
            
                return <>
                 <button
                key={item?.id}
                onClick={()=>{
                    Navigate(`/product/${item?.id}`)
                }}
                className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                role="menuitem"
              >
              
                {item.title}
              </button>
              </>
           })}

          
          </div>
        </div>
      </div>
    </>
  );
}
