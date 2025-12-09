import React, { useState } from 'react'
import { Link } from 'react-router';
import Image from "../assets/connect.png"
import useLogin from '../hooks/useLogin';

const Login = () => {

  const [loginData, setLoginData] = useState({
    email: "",
    password: "", 
  })

  const {isPending, error, loginMutation} = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  }

  return (
    <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8'>

      <div className='border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden'>

      {/* Login form section */}
      <div className='w-full lg:w-1/2 sm:p-8 flex flex-col'>

      {/* Logo */}
      <div className='mb-4 flex items-center justify-start gap-2'>
        <h1 className='text-accent font-bold'>CHAT-APP</h1>
      </div>

      {/* Erorrr message display */}
      {error && (
        <div className='alert alert-error mb-4'>
             <span>{error?.response?.data?.message || error?.message}</span>
        </div>
      )}

      <div className='w-full'>
        <form onSubmit={handleLogin}>
          <div className='space-y-4'>

            {/* welcome section */}
            <div>
              <h2 className='text-xl font-semibold'>Welcome back</h2>
              <p className='text-sm opacity-70'>Sign in to your account or continue your language joutnry</p>
            </div>

            {/*ALl input section */}
            <div className='flex
             flex-col gap-3'>

              {/* Email input section */}
              <div className='form-control w-full space-y-2'>
                <label className='label'>
                  <span className='label-text'>Email</span>
                </label>
                <input
                type='email'
                placeholder='hello@wxample.com'
                className='input input-bordered w-full'
                value={loginData.email}
                onChange={(e) => setLoginData({...loginData, email:e.target.value})}
                required
                />
              </div>

              {/* Password input section */}
              <div className='form-control w-full space-y-2'>
                <label className='label'>
                  <span className='label-text'>Password</span>
                </label>
                <input
                type='password'
                placeholder='%^hss!)^gGf6LOu%@$g$'
                className='input input-bordered w-full'
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password:e.target.value})}
                required
                />
              </div>

              {/* Form button setup */}
              <button type='submit' className='btn btn-accent w-full' disabled={isPending}>
                {isPending ? (
                  <>
                  <span className='loading loading-spinner loading-xs'>Signing in...</span>
                  </>
                ) : ("Sign In")}
              </button>

              <div className='text-center mt-4'>
                <p className='text-sm'>
                  Don't have an account{" "}
                  <Link to="/signup" className='text-accent hover:underline'>
                  Create one</Link>
                </p>
              </div>

            </div>
          </div>
        </form>
      </div>
      </div>

      {/* Side Image section setup */}
      <div className='hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center'>
      <div className='max-w-md p-8'>

        {/* ILLUSTRATION */}
        <div className='relative aspect-square max-w-sm mx-auto'>
          <img src={Image} alt="Language connaction illutration" className='w-full h-full'/>
        </div>


        <div className='text-center space-y-3 mt-6'>
          <h2 className='text-xl font-semibold'>Connect with language partners worldwide</h2>
          <p className='opacity-70'>
            Practice conversation, make friends, and improve your language skills together
          </p>
        </div>

      </div>

      </div>

      </div>
    </div>
  )
}

export default Login;