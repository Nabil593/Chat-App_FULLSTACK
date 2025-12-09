import React from 'react';
import { Routes, Route, Navigate } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';
import Home from './Pages/Home.jsx';
import Login from './Pages/Login.jsx';
import Signup from './Pages/Signup.jsx';
import Onboarding from './Pages/Onboarding.jsx';
import Call from './Pages/Call.jsx';
import Chat from './Pages/Chat.jsx';
import Notification from './Pages/Notification.jsx';
import { useQuery } from "@tanstack/react-query";
import PageLoader from './components/PageLoader.jsx';
import { getAuthUser } from './config/api.js';
import useAuthUser from './hooks/useAuthUser.js';
import Layout from './components/Layout.jsx';
import { useThemeStore } from './store/useThemeStore.js';


const App = () => {

  const {isLoading, authUser } = useAuthUser()

  const { theme } = useThemeStore();


  const isAuthenticated = Boolean(authUser)
  const isOnboarded = authUser?.isOnboarded



  if(isLoading) return <PageLoader/>


  return (
    <div className='h-screen' data-theme={theme}>
      <Routes>
        <Route path='/' element={ isAuthenticated && isOnboarded ? (
          <Layout showSidebar = {true}>
            <Home />
          </Layout>
        ) : (
          <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
        )} />

        <Route path='/login' element={!isAuthenticated? <Login /> : <Navigate to={
          isOnboarded ? "/" : "/onboarding"
        } /> } />

        <Route path='/signup' element={!isAuthenticated? <Signup /> : <Navigate to={
          isOnboarded ? "/" : "/onboarding"
        } /> } />

        <Route path='/Onboarding' element={isAuthenticated? (
          !isOnboarded ? ( <Onboarding/> ) : ( <Navigate to="/" /> )
        ) : (<Navigate to="/login" />) } />
        <Route path='/call' element= {isAuthenticated? <Call /> : <Navigate to="/login" /> } />
        <Route path='/chat' element={isAuthenticated? <Chat /> : <Navigate to="/login" /> } />

        <Route path='/notifications' element={isAuthenticated && isOnboarded ? (
          <Layout showSidebar= {true}>
            <Notification/>
          </Layout>
        ) : (
          <Navigate to={!isAuthenticated ? "/login" : "/onboarding"}/>
        ) } />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App; 
