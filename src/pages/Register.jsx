import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import {register as registerService,login as loginService} from '../services/auth'
import {toast} from 'react-toastify';
import {useForm} from 'react-hook-form'
import { Link,  useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import cookies from 'js-cookie'
export default function Register() {


const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .required('نام کاربری الزامی است')
    .min(3, 'نام کاربری باید حداقل ۳ کاراکتر باشد'),

  password: Yup.string()
    .required('رمز عبور الزامی است')
    .min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد'),

  confirmPassword: Yup.string()
    .required('تکرار رمز عبور الزامی است')
    .oneOf([Yup.ref('password')], 'رمز عبور با تکرار آن مطابقت ندارد'),
});
const {register,handleSubmit,formState:{errors}}=useForm({resolver:yupResolver(RegisterSchema)});

   const navigate=useNavigate()
   const registerMutation= useMutation({
    mutationFn:registerService
   })
   const loginMutation=useMutation({
        mutationFn:loginService,
        onSuccess:(data)=>{            
              cookies.set('jwt-token',data.data.token,{expires:1});
              navigate('/products');
        },
        onError:(err)=>{
          toast.error("مشکلی در ورود کاربر به وجود آمد!");
          console.log("Error from loginMutation",err);
        }
   })
  const onSubmit=(formData)=>{
   registerMutation.mutate(formData,{
      onSuccess:()=>{
        toast.success("کاربر با موفقیت ثبت گردید!");
        loginMutation.mutate({username:formData.username,password:formData.password});
      },
      onError:(err)=>{
        toast.error("مشکلی در ثبت کاربر به وجود آمد!");
        console.log("Error from registerMutation",err);
        
      }
    })
  }
  return (
    <div  className="bg-gray-100 min-h-dvh flex items-center justify-center ">
      <div className="bg-white shadow-md rounded-xl w-90 p-6  space-y-4">
        
        {/* Logo */}
        <div className="flex justify-center">
          <img src="/logo.svg" alt="لوگو" className="w-20 h-20" />
        </div>

        {/* Title */}
        <h2 className="text-lg font-bold text-center">فرم ثبت نام</h2>

        {/* Form */}
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('username')}
            type="text"
            placeholder="نام کاربری"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
          <p className='text-red-400'>{errors?.username && errors.username.message}</p>
          <input
          {...register('password')}
            type="password"
            placeholder="رمز عبور"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
          <p className='text-red-400'>{errors?.password && errors.password.message}</p>
          <input
          {...register('confirmPassword')}
            type="password"
            placeholder="تکرار رمز عبور"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
          <p className='text-red-400'>{errors?.confirmPassword && errors.confirmPassword.message}</p>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            ثبت نام
          </button>
        </form>

        {/* Login Link */}
        <p className="text-sm  text-gray-500">
          حساب کاربری دارید؟{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            ورود
          </Link>
        </p>
      </div>
    </div>
  );
}
