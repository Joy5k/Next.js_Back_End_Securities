'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Page = () => {
  const router=useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Token, setToken] = useState('')
  const [loading,setLoading] = useState(false)
  const handleLogin = async (event) => {
    event.preventDefault();

    // Create an object to hold the email and password
    const data = {
      email,
      password,
    };

    try {
      setLoading(true);
      const res = await fetch('/api/Token', {
        method: 'POST', // Use POST instead of GET
        headers: {
          'Content-Type': 'application/json',
          email:email
        },
      });

      if (res.ok) {
        const json = await res.json();
        setToken(json.Token)
        document.cookie = 'Token =' + json.Token;
        const response = await fetch(`/api/email?email=${email}`, {
          method: "POST",
          //secret Token setting in the headers 
          headers:{Token: JSON.stringify(Token)}
    })
    const result= await response.json()
        console.log(result, '--the result--from the login.page');
        
        if (result.message === 'Success') {
          setLoading(false)
              router.replace('/protectedRoute')
        }
      }
      else {
        console.error('Failed to fetch data',res);
        setLoading(false)
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin} className="hero h-screen bg-base-200 w-full">
        <p className='text-black m-10'>Login</p>
        <div className="hero-content">
          <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
            <div className="card-body">
              <p className='text-black text-center text-xl font-bold'>Login</p>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name='email'
                  className="input input-bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name='password'
                  className="input input-bordered"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
                <div className="form-control mt-6">
                  {loading ?
                    <button type='submit' className="btn btn-primary"><span className="loading loading-dots loading-lg text-center my-auto mx-auto"></span></button> :  <button type='submit' className="btn btn-primary">Login</button>}
              
               
              </div>
            </div>
          </div>
        </div>
        </form>
    
    </div>
  );
};

export default Page;
