import React, { useState } from 'react'
import useAuthUser from '../hooks/useAuthUser';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import toast, { LoaderIcon } from 'react-hot-toast';
import { ArrowPathIcon, CameraIcon, MapPinIcon } from '@heroicons/react/24/solid';

import { completeOnborading } from '../config/api';
import { LANGUAGES } from '../constants';

const Onboarding = () => {

  const { authUser } = useAuthUser();

  const queryClient = useQueryClient();


  const [formState, setFormState] = useState({
    fullname: authUser?.fullname || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage:authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const {mutate:OnboardingMutation, isPending} = useMutation({
    mutationFn: completeOnborading,
    onSuccess: () => {
      toast.success("Profile Onboarding successfully");
      queryClient.invalidateQueries({queryKey: ["authUser"]});
    },

    onError: (error) => {
      toast.error(error.response.data.message);
    }
  })


  const handleSubmit = (e) => {
    e.preventDefault();
    OnboardingMutation(formState);
  }

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    setFormState({...formState, profilePic: randomAvatar});
    toast.success("Avatar changed successfully");
  }

  return (
    <div className='min-h-screen bg-base-100 flex items-center justify-center p-4'>
      <div className='card bg-base-200 w-full max-w-3xl shadow-xl'>
        <div className='card-body p-6 sm:p-8'>
          <h1 className='text-2xl sm:text-3xl font-bold text-center mb-6'>Optimize Your profile</h1>

          <form onSubmit={handleSubmit} className='space-y-4'>
            {/* Profile pic setup */}
            <div className='flex flex-col items-center justify-center space-x-4'>
              {/* Image setup */}
              <div className='size-32 rounded-full bg-base-300 overflow-hidden'>
                {formState.profilePic ? (
                  <img src={formState.profilePic} alt="Profile preview" className='w-full h-full object-cover'/>
                ) : (
                  <div className='flex items-center justify-center h-full'>
                    <CameraIcon className='size-12 text-base-content opacity-40'/>
                  </div>
                )}
              </div>

              {/* button setup */}
              <div className=' flex items-center gap-2'>
                <button type='button' onClick={handleRandomAvatar} className='btn btn-accent mt-3 '>
                  Choose Random Avatar
                </button>
              </div>
            </div>


                 {/* Fuul name setup */}
              <div className=''>
                <label className='label'>
                  <span className='label-text'>Full Name</span>
                </label>
                <input
                type='text' 
                name='Full Name'
                value={formState.fullname}
                onChange={(e) => setFormState({...formState, fullname: e.target.value})}
                className='input input-bordered w-full'
                placeholder='Your full name'
                />
              </div>

              {/* //BIO setup */}
              <div className='form-control'>
                <label className='lebel'>
                  <span className='label-text'>Bio</span>
                </label>
                <textarea
                name='bio'
                value={formState.bio}
                onChange={(e) => setFormState({...formState, bio: e.target.value})}
                className='textarea textarea-bordered h-25 w-full'
                placeholder='about your self & language learning goals'
                />
              </div>


              {/* //LANGUAGE */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {/* native language */}
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>Native Language</span>
                  </label>
                  <select
                  name='nativelanguage'
                  value={formState.nativeLanguage}
                  onChange={(e) => setFormState({...formState, nativeLanguage: e.target.value})}
                  className='select select-bordered w-full'
                  >
                    <option value={""}>Select your native language</option>
                    {LANGUAGES.map((lang) => (
                      <option key={`native-${lang}`} value={lang.toLowerCase()}>{lang}</option>
                    ))}
                  </select>
                </div>

                {/* LEARNING LANGUAGE */}
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>Learning Language</span>
                  </label>
                  <select
                  name='learninglanguage'
                  value={formState.learningLanguage}
                  onChange={(e) => setFormState({...formState, learningLanguage: e.target.value})}
                  className='select select-bordered w-full'
                  >
                    <option value={""}>Select language you're learning</option>
                    {
                      LANGUAGES.map((lang) => (
                        <option key={`learning-${lang}`} value={lang.toLowerCase()}>{lang}</option>
                      ))
                    }

                  </select>
                </div>
              </div>

                {/* //LOCATION */}
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>Loacation</span>
                  </label>
                  <div className='relative'>
                    <MapPinIcon className='absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70'/>
                    <input
                    type='text'
                    name='location'
                    value={formState.location}
                    onChange={(e) => setFormState({...formState, location: e.target.value})}
                    className='input input-bordered w-full pl-10'
                    placeholder='City, Country'
                    />
                  </div>
                </div>

                  {/* Submmit Button */}
                <button className='btn btn-accent w-full' disabled={isPending} type='submit'>
                  {
                    !isPending ?
                    <>
                    Complete Onboarding
                    </>
                    : 
                    <>
                    <LoaderIcon className='animate-spin size-5 mr-2'/>
                    Onboarding...
                    </>
                  }

                </button>


          </form>


        </div>
      </div>

    </div>
  )
}

export default Onboarding;