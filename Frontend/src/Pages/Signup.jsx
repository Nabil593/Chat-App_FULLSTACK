import React, { useState } from 'react'
import { Link } from 'react-router';
import image01 from "../assets/chating.png";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signup } from '../config/api';
import useSignup from '../hooks/useSignup';

const Signup = () => {

  const [signupData, setsignupData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const {isPending, error, signupMutation} = useSignup();


  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };


  return (
    <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8'>
      <div className='border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden'>

      {/* SIGNUP FORM - LEFT SIDE */}
      <div className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col'>

      {/* LOGO */}
      <div className='mb-4 flex items-center justify-start'>
        <span className='text-accent text-3xl font-bold bg-clip-text'>CHAT-APP</span>


        {/* //Error message if any */}
        {error && (
          <div className='alert alert-error mb-4'>
            <span>{error.response.data.message}</span>
          </div>
        )}




      </div>

      {/* FORM */}
        <div className='w-full'>
          <form onSubmit={handleSignup} >
            <div className='space-y-4'>
              <div>
                <h2 className='text-xl font-semibold'>Create an account</h2>
                <p>Join Chat-App and start your language learning adventure</p>
              </div>

              <div className='space-y-3'>

                {/* FULLNAME */}
                <div className='form-control w-full'>
                  <label className='label' >
                    <span className='label-text'>Full Name</span>
                  </label>
                  <input 
                  type='text' 
                  placeholder='John Doe' 
                  className='input input-border w-full'
                  value={signupData.fullname}
                  onChange={(e) => setsignupData({...signupData, fullname: e.target.value})}
                  required
                  />
                </div>

                {/* EMAIL */}
                 <div className='form-control w-full'>
                  <label className='label' >
                    <span className='label-text'>Email</span>
                  </label>
                  <input 
                  type='email' 
                  placeholder='johndoe@gmail.com' 
                  className='input input-border w-full'
                  value={signupData.email}
                  onChange={(e) => setsignupData({...signupData, email: e.target.value})}
                  required
                  />
                </div>

                {/* PASSWORD */}
                 <div className='form-control w-full'>
                  <label className='label' >
                    <span className='label-text'>Password</span>
                  </label>
                  <input 
                  type='password' 
                  placeholder='kj*g!3$g$@^gs096%^' 
                  className='input input-border w-full'
                  value={signupData.password}
                  onChange={(e) => setsignupData({...signupData, password: e.target.value})}
                  required
                  />
                  <p className='text-xs opacity-70 mt-1'>Password must be al least 6 characters</p>
                </div>

                {/* TERM & CONDITION CHECK BOX*/}
                 <div className='form-control'>
                  <label className='label cursor-pointer justify-start gap-2'>
                    <input type='checkbox' className='checkbox checkbox-sm' required/>
                    <span className='text-xs leading-tight'>I agree to the{""}</span>
                    <span className='text-primary hover:underline' >terms of service</span>and{""}
                    <span className='text-primary hover:underline' >privacy policy</span>
                  </label>
                </div>

              </div>


              {/* //FORM BUTTON */}
              <button type='submit' className='btn btn-accent w-full'>
                {isPending ? (
                  <>
                  <span className='loading loading-spinner loading-xs'>Loading...</span>
                  </>
                ) : ("Create Account")}
              </button>



              <div className='text-center mt-4'>
                <p>
                  Already have an account?{""} 
                  <Link to="/login" className='text-accent hover:underline'> Sign in </Link>
                </p>
              </div>


            </div>
          </form>
        </div>
      </div>

      {/* SIGNUP FORM - LEFT SIDE */}
      <div className='hidden lg:flex flex-col bg-base-200 w-1/2 p-4 sm:p-8'>
      <div className='relative aspect-square max-w-sm mx-auto'>
        <img src={image01} alt="chating-image" className='w-full h-full'/>
      </div>

      <div className='text-center space-y-3 mt-6'>
        <h2 className='text-xl font-semibold'>Connect with language partners worldwide</h2>
        <p className='opacity-70'>Practice converssation, make friends, and improve your language skills together</p>
      </div>
      </div>


      </div>
    </div>
  )
}

export default Signup;