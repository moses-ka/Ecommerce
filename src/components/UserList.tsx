import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { userType } from '../types';



const UserList: React.FC = () => {
    const [user, setUser] = useState<userType >();
    const UserData = useSelector((state: { user: userType }) => state.user);

    useEffect(() => {
        setUser(UserData);
        console.log(user , "user from  UserList")
    }, [UserData,user]);

    return (
        <>
      <AnimatePresence>
       
          <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 100, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3,  type: 'spring', stiffness: 500, damping: 30}}
          style={{ position: "absolute", top: 0 }}
          
          className=" absolute right-4 md:absolute md:right-8 top-24 w-4/6 max-w-sm border border-gray-600 bg-white
           dark:bg-[#393947] text-gray-900 dark:text-white rounded px-4 py-8 sm:px-6 lg:px-8"
          aria-modal="true"
          role="dialog"
          tabIndex={3}
          
          >
           
              <h2 className="text-xl text-center">{user?.user_name}</h2>
           
            <div className="mt-4 space-y-6">
              <ul>
                <li>Orders History</li>
                <li>Wish List</li>
                <li>Costumer Serves</li>
              </ul>
              <div className="space-y-4 text-center">
                <button className='block rounded border border-gray-600 px-5 py-3 text-sm transition hover:ring-1 w-full hover:ring-gray-400'>Sign Out</button>
              </div>
            </div>
          </motion.div>
     
      </AnimatePresence>
    </>
    );
};

export default UserList;
