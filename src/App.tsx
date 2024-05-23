"use client";
import { useState,useEffect } from 'react';
import {  ID, account } from './lib/appwrite';
import toast from 'react-hot-toast';
import ClockTime from './components/clockTime';


const Application = () => {
  const [loggedInUser, setLoggedInUser] = useState <unknown> (null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name , setName] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [processingLogin, setProcessingLogin] = useState(false);
  const [processingRegister, setProcessingRegister] = useState(false);
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
      const lcEmail = localStorage.getItem('email');
      if (lcEmail) {
        const uname = lcEmail.split('@')[0];
        // remove numbers
        setUsername(uname.replace(/[0-9]/g, ''));
      }

       if(loggedInUser) {
        setIsRegister(false);
      }


  }, [
    loggedInUser
  ]);

  async function register() {
    if (!email || !password || !name) {
      toast.error('Please fill all fields');
      return;
    }
    try {
      setProcessingRegister(true);
      await account.create(ID.unique(),email, password, name);
      // setLoggedInUser(account.get());
      toast.success(`
       Successfully registered as ${name} with email ${email}',
      ,
      `);
      setIsRegister(false);
      setEmail('');
      setPassword('');
      setName('');
      //delete current session
      await account.deleteSession('current');
      //delete all sessions
      // await account.deleteSessions();
      setProcessingRegister(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setProcessingRegister(false);
      toast.error(error.message);
    }
  }

  async function logout () {
    toast.success('Logged out');
    await account.deleteSession('current');
    setLoggedInUser(account.get());
    localStorage.removeItem('email');
    setLoggedInUser(null);
  }


  async function login(email: string, password: string) {
    if (!email || !password) {
      toast.error('Please fill all fields');
      return;
    }
    try {
      await account.deleteSession('current');
      setProcessingLogin(true);
      await account.createEmailPasswordSession(email, password)
    setLoggedInUser(account.get());
    localStorage.setItem('email', email);
    setProcessingLogin(false);
    setEmail('');
    setPassword('');
    
    toast.success(
      `🚀 Logged in as
      ${(await account.get()).email}
      `
      
      
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setProcessingLogin(false);
      toast.error(error.message);
      
      
    }
    
  }



  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {
        loggedInUser ? (
          <div className="bg-white p-8 rounded-lg shadow-md w-96 flex  flex-col gap-5">
            <h1 className="text-2xl font-bold mb-6">
              {/* Logged in emoji */}
              <span role="img" aria-label="logged in">
                🚀
              </span>
              Logged in
            </h1>
            <p>
              Welcome, {username}
            </p>
            {/* clock time */}
            <ClockTime />
             <button
              type="button"
              onClick={() => logout()}
              className="block w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
            >
              Logout
            </button>
          </div>
        ) : null
      }
      {
        isRegister && !loggedInUser && (
          <>
          <div className="bg-white p-8 rounded-lg shadow-md w-96">
            <h1 className="text-2xl font-bold mb-4">
              {/* Register emoji */}
              <span role="img" aria-label="register">
                🚀
              </span>
              Register
            </h1>
            <input
              className="border border-gray-300 p-2 w-full mb-4"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="border border-gray-300 p-2 w-full mb-4"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="border border-gray-300 p-2 w-full mb-4"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className='flex  gap-y-4 flex-col'>
               <button
              disabled={processingRegister}
              className="bg-blue-500 text-white p-2 w-full rounded-lg"
              onClick={register}
            >
              {
                processingRegister ? 'Processing...' : 'Register'
              }
            </button>
            <p className="text-center">Already have an account?
              <a href="#" 
              onClick={() => setIsRegister(false)} 
              className="text-blue-500 hover:underline">Login</a>
              </p>
            </div>
             
        

          </div>
        </>)
      }
      {
        !isRegister && !loggedInUser && (

          <div className="bg-white p-8 rounded-lg shadow-md w-96">
        
          <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-center py-6">
           {/* Login emoji */}
           <span role="img" aria-label="login">
             🚀
           </span>
           Login
          </h1>
           {/* {
             loggedInUser ? (
               <div>
                 <p className="text-center">You are logged in</p>
                 <button
                   type="button"
                   onClick={() => logout()}
                   className="block w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
                 >
                   Logout
                 </button>
               </div>
             ) : (
               <p className="text-center">You are not logged in</p>
             )
           } */}
           </div>
           <form 
           
           className="space-y-4">
             <input
               type="email"
               placeholder="Email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
             />
             <input
               type="password"
               placeholder="Password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
             />
           
             <div className="flex  gap-y-4 flex-col">
              {/* Register */}
             
               <button
               disabled={processingLogin}
                 type="button"
                  onClick={() => login(email, password)}
                 className="px-4 py-2
                 
                 w-full justify-self-center
                  bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
               >
                  {
                    processingLogin ? 'Processing...' : 'Login'
                  }
               </button>
               <p className="text-center">Don't have an account?
               <a href="#" 
              onClick={() => setIsRegister(true)} 
              className="text-blue-500 hover:underline">Register</a>
                </p>
             </div>
           </form>
         </div>
        )

      }
    
    </div>
  );
};

export default Application;