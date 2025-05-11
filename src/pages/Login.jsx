import React from 'react'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'



const Login = () => {

    const LoginSchema=Yup.object().shape({
      username:Yup.string()
      .required("نام کاربری الزامی است'"),
      password:Yup.string()
      .required("رمز عبور الزامی است'")
    });


    const {register,handleSubmit,formState:{errors}}=useForm({resolver:yupResolver(LoginSchema)});

    const onSubmit=(data)=>{
      console.log(data)
    }


  return (
    <div className='min-h-dvh flex justify-center items-center bg-gray-100'>

      <div className="flex flex-col w-90 shadow-md rounded-2xl bg-white  p-6 space-y-4">

        {/* logo */}
          <div className="flex justify-center">
            <img src="./logo.svg" alt="logo" className='w-20 h-20' />
          </div>
          {/* Title */}
          <h2 className="text-center text-lg font-bold">فرم ورود</h2>
          {/* Form */}
        <form  onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-3'>

          <input {...register("username")}  placeholder="نام کاربری" className=" w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"/>
          <p className='text-red-400'>{errors?.username && errors.username.message}</p>

          <input type='password' {...register("password")}  placeholder="رمز عبور" className=" w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring ring-blue-200"/>
          <p className='text-red-400'>{errors?.password && errors.password.message}</p>

          <button type="submit" className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md'>ورود</button>
        </form>

          <p className="text-sm text-gray-500">حساب کاربری ندارید؟{' '}<Link to="/register" className="text-blue-500">ثبت نام</Link></p>
      </div>
    
    </div>
  )
}

export default Login