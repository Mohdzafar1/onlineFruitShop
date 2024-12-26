import apiClient from "./index"

export const register=async({email,password,phone,name})=>{
  const response=await apiClient("/register",{email,password,phone,name})
  console.log("response",response)
  return response
}

export const login=async(form)=>{
  const response=await apiClient.post("login",form)
  console.log("response",response)
  return response.data
}

export const getAllUsers=async()=>{
  const response=await apiClient.get("getAllUsers")
  return response.data
}

export const getSingleUser=async(email)=>{
  console.log("email987",email)
  const body={email}
  const response=await apiClient.get(`getSingleUser?email=${email}`)
  console.log("response",response)
  return response.data
}

export const updateAddress=async(formData)=>{
  const response=await apiClient.post(`updateAddress`,formData)
  console.log("response",response)
  return response.data
}

export const getAllProduct=async()=>{
  const response=await apiClient.get(`getProduct`)
  console.log("response",response)
  return response.data?.productList

}