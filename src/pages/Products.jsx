import React from 'react'
import { useQuery } from '@tanstack/react-query';
import cookies from 'js-cookie'
import {getProducts} from '../services/products'
import { useNavigate } from 'react-router-dom';
const Products=()=>{
  const navigate= useNavigate();
  const logOut=()=>{
      cookies.remove('jwt-token');
      navigate('/login');
  }
  const {data,isPending}=useQuery({
    queryKey:["priducts"],
    queryFn:getProducts
  })
console.log(data)

  return (
    <>
          <div>ProductsList</div>
         <p>{isPending && "Loading..."}</p>

          <button onClick={logOut} className='py-2 px-4 rounded-md text-white bg-blue-400' >Log Out</button>

      {
         data &&  data.data.data.map(p=><p key={p.id} >{p.name}</p>)
      }
        
    </>
  )
}

export default Products