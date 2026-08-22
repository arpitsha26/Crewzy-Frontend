import React, { useEffect } from 'react'
import apiClient from '../api/apiClient'
import { useDispatch, useSelector } from 'react-redux'
import { setNotificationData } from '../redux/userSlice'

function useAllNotifications() {
    const dispatch=useDispatch()
    const {userData}=useSelector(state=>state.user)
  useEffect(()=>{
const fetchNotifications=async ()=>{
    try {
         const result=await apiClient.get('/api/user/getAllNotifications')
         dispatch(setNotificationData(result.data))
    } catch (error) {
        console.log(error)
    }
}
fetchNotifications()
  },[dispatch,userData])
}

export default useAllNotifications
