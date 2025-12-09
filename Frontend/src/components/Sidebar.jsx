import React from 'react'
import useAuthUser from '../hooks/useAuthUser';
import { Link, useLocation } from 'react-router';
import { BellIcon, HomeIcon, UserIcon } from '@heroicons/react/24/solid';

const Sidebar = () => {
    const { authUser } = useAuthUser()
    const location = useLocation();
    const currentPath = location.pathname;


  return (
    <aside className='w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0'>

        {/* Logo setup */}
        <div className='mb-4 flex items-center justify-start gap-2'>
        <Link to="/" className='flex items-center gap-2.5'>
        <h1 className='text-accent font-bold tracking-wider p-2'>CHAT-APP</h1>
        </Link>
        </div>

        {/* Navber setup */}
        <nav className='flex-1 p-4 space-y-1 opacity-70'>

            {/* Home link setup */}
            <Link to='/' className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === '/' ? "btn-active" : ""}`}>
            <HomeIcon className='size-5 text-base-content opacity-70' />
            <span>Home</span>
            </Link>

            {/* Friends link setup */}
            <Link to='/friends' className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === '/friends' ? "btn-active" : ""}`}>
            <UserIcon className='size-5 text-base-content opacity-70' />
            <span>Friends</span>
            </Link>

            {/* Notifications link setup */}
            <Link to='/notifications' className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === '/notifications' ? "btn-active" : ""}`}>
            <BellIcon className='size-5 text-base-content opacity-70' />
            <span>Notifications</span>
            </Link>

        </nav>


        {/* USER PROFILE SECTION */}
        <div className="p-4 border-t border-l-base-300 mt-auto">
          <div className="flex items-center gap-3">
           <div className="avatar">
             <div className="w-10 rounded-full">
               <img src={authUser?.profilePic} alt="User Avatar" />
             </div>
           </div>

         {/* User info */}
         <div className="flex-1">
           <p className="font-semibold text-sm">{authUser?.fullname}</p>
           <p className="text-xs text-success flex items-center gap-1">
           <span className="w-2 h-2 rounded-full bg-success inline-block"></span> Online</p>
         </div>
         </div>
        </div>

    </aside>
  )
}

export default Sidebar;