import { useEffect, useState } from 'react'
import { FaCamera } from 'react-icons/fa'
import { getSingleUser, updateAddress, updateProfile } from '../../apiClient/endPoint'
import { getCredential } from '../../helper/helper'
import { showSuccessToast } from '../../helper/toast'

const Profile = () => {
  const email= getCredential()
  console.log("email987",email)
  const [formData, setFormData] = useState({
    id:"",
    name: '',
    email: '',
    password: '',
    address: '',
    landMark: '',
    mobile: '',
    houseNo: '',
  })

  const [imagePreview, setImagePreview] = useState('/placeholder.svg?height=120&width=120')

  const handleSave=async()=>{
    try{
      const data={userId:formData?.id,houseNo:formData?.houseNo,landMark:formData?.landMark,address:formData?.address}
    const resp=await updateAddress(data)
    console.log("resp",resp)
      showSuccessToast(resp.message)
    }catch(error){
      console.log(error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

    const getProfile=async()=>{
      try{
       const resp= await getSingleUser(email)
       console.log("resp",resp)
       setFormData((prev) => ({
        ...prev,
        id: resp.user?._id || '',
        name: resp.user.name || '',
        email: resp.user.email || '',
        mobile: resp.user.phone || '',
        address: resp.user?.addressDetails?.address || '',
      landMark: resp.user?.addressDetails?.landMark || '',
      houseNo: resp.user?.addressDetails?.houseNo || '',
       
      }));
      }catch(error){
        console.log(error)
      }
    }

  useEffect(()=>{
    getProfile()
  },[])

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
      <form onSubmit={handleSubmit}>
        {/* Banner and Profile Photo */}
        <div className="relative mb-16 sm:mb-24">
          <div className="h-32 sm:h-48 bg-gradient-to-r from-blue-200 to-yellow-100 rounded-lg"></div>
          <div className="absolute -bottom-12 sm:-bottom-16 left-4 sm:left-8">
            <div className="relative">
              <img
                src={imagePreview}
                alt="Profile"
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white"
              />
              <label
                htmlFor="photo-upload"
                className="absolute bottom-0 right-0 p-2 bg-gray-800 rounded-full cursor-pointer hover:bg-gray-700 transition-colors"
              >
                <FaCamera className="w-4 h-4 text-white" />
              </label>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
            <p className="text-sm text-gray-500">Update your photo and personal details</p>
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          onClick={handleSave}
          >
            Save
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-3">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Update Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter a new password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="houseNo" className="block text-sm font-medium text-gray-700 mb-1">
              House No
            </label>
            <input
              type="text"
              id="houseNo"
              name="houseNo"
              value={formData.houseNo}
              onChange={handleInputChange}
              placeholder="Enter your house number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter your address"
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          <div>
            <label htmlFor="landmark" className="block text-sm font-medium text-gray-700 mb-1">
              Landmark
            </label>
            <input
              type="text"
              id="landMark"
              name="landMark"
              value={formData.landMark}
              onChange={handleInputChange}
              placeholder="Enter nearby landmark"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
              Mobile No
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              placeholder="Enter your mobile number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default Profile
