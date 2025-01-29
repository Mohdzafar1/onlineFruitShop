import React, { useEffect, useState } from 'react';
import { login, register } from '../../apiClient/endPoint';
import { Link, useNavigate } from 'react-router-dom';
import { setAuthToken, setCredential } from '../../helper/helper';
import { showErrorToast, showSuccessToast } from '../../helper/toast';

const Register = () => {
 const[form,setForm]=useState({
    email:"",
    password:"",
    phone:"",
    name:""
 })

 const history=useNavigate()

  const handleSubmit =async (e) => {
    e.preventDefault();
  const resp=await register(form)
    console.log("resp",resp.data.status)
  if(resp.data.status==true){
    showSuccessToast(resp.data.message)
    history("/")
  }else{
    showErrorToast(resp.data.message)
  }
  };

 const handleChange=(e)=>{
   const{name,value}=e.target;
   setForm((prevVal)=>({
    ...prevVal,
    [name]:value
   }))
 }
 



  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <button className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <div className="flex flex-rows">
            <img 
              src="https://media.lordicon.com/icons/wired/flat/543-apple.gif" 
              alt="FRUGIVORE" 
              width={150} 
              height={50}
              className="h-12 w-auto"
            />
             <div>
             <span className='pt-3 font-bold'>MyShop</span>
             <p className='pt text-xs'>kichha online Fruit Shop</p>

             </div>
          </div>
        </button>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign up to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your Name
                </label>
                <input
                  type="name"
                  name="name"
                  id="name"
                  value={form.name}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Jone"
                  required
                  autoComplete='off'
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@gmail.com"
                  required
                  autoComplete='off'
                />
              </div>
              <div>
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your Phone
                </label>
                <input
                  type="phone"
                  name="phone"
                  id="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="123456789"
                  required
                  autoComplete='off'
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={form.password}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="••••••••"
                  required
                  autoComplete='off'

                />
              </div>
              <button
  type="submit"
  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
>
  Sign up
</button>

            </form>
            <Link to="/" className='text-blue'>user already account</Link>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
