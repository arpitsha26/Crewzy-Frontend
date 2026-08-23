import React, { useEffect } from 'react'
import apiClient from '../api/apiClient'
import { useDispatch, useSelector } from 'react-redux'
import { setFollowing } from '../redux/userSlice'

function useFollowingList() {
    const dispatch=useDispatch()
    const {storyData}=useSelector(state=>state.story)
  useEffect(()=>{
const fetchUser=async ()=>{
    try {
         const result=await apiClient.get('/api/user/followingList')
         dispatch(setFollowing(result.data))
    } catch (error) {
        console.log(error)
    }
}
fetchUser()
  },[storyData])
}

export default useFollowingList
