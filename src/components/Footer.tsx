
import { Link } from "react-router-dom";

export const  Footer = () => {
    return (
       

<footer className="bg-white  shadow m-4 dark:bg-[#19191a]">
    <div className="w-full p-4 md:flex md:items-center md:justify-between">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">©  2024 MK Ecommerce. All rights reserved.
    
       
    </span>
    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
           <Link to='' className="hover:underline me-4 md:me-6">About</Link>
        </li>
        <li>
           <Link to='' className="hover:underline me-4 md:me-6">Privacy Policy</Link>
        </li>
        <li>
           <Link to='' className="hover:underline me-4 md:me-6">Licensing</Link>
        </li>
        <li>
           <Link to='' className="hover:underline">Contact</Link>
        </li>
    </ul>
    </div>
</footer>

    );
    }