import api from '../configs/api'

export const register=async(data)=>api.post("auth/register",data);


export const login=(data)=>api.post("auth/login",data);