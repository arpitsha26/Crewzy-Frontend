import React, { useEffect } from 'react'
import apiClient from '../api/apiClient'
import { useDispatch, useSelector } from 'react-redux'
import { setSuggestedUsers } from '../redux/userSlice'

function useSuggestedUsers() {
    const dispatch=useDispatch()
    const {userData}=useSelector(state=>state.user)
  useEffect(()=>{
const fetchUser=async ()=>{
    try {
         const result=await apiClient.get('/api/user/suggested')
         dispatch(setSuggestedUsers(result.data))
    } catch (error) {
        console.log(error)
    }
}
fetchUser()
  },[userData])
}

export default useSuggestedUsers
