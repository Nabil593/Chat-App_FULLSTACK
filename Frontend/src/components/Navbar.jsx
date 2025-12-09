import React from 'react'
import useAuthUser from '../hooks/useAuthUser';
import { Link, useLocation } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '../config/api';
import { ArrowRightOnRectangleIcon, BellIcon } from '@heroicons/react/24/solid';
import useLogout from '../hooks/useLogout';
import ThemeSeclector from './ThemeSeclector';

const Navbar = () => {

  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  const { logoutMutation } = useLogout();

  return (
    <nav className='bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-end w-full'>

          {/* logo setup */}
          {isChatPage && (
            <div className='pl-5'>
              <Link to="/" className='flex items-center gap-2.5'>
              <span className='text-3xl font-bold text-accent'>CHAT-APP</span>
              </Link>
            </div>
          )}

          {/* Notification icon setup */}
          <div className='flex items-center gap-3 sm:gap-4'>
            <Link to={"/notifications"}>
            <button className='btn btn-ghost btn-circle'>
              <BellIcon className='h-6 w-6 text-base-content opacity-78' />
            </button>
            </Link>
          </div>

          {/* Theme icon setup */}
          <ThemeSeclector />

          {/* Avatar setup */}
          <div className='avatar'>
            <div className='w-9 rounded-full'>
              <img src={authUser?.profilePic} alt="User Avatar" rel='noreferrer' />
            </div>
          </div>

          {/* Logiout button setup */}
          <button className='btn btn-ghost btn-circle' onClick={logoutMutation}>
            <ArrowRightOnRectangleIcon className='h-6 w-6 text-base-content opacity-70'/>
          </button>

        </div>
      </div>
    </nav>
  )
}

export default Navbar;