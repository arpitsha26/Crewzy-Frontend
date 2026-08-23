import React, { useEffect } from 'react'
import apiClient from '../api/apiClient'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import { setCurrentUserStory } from '../redux/storySlice'

function useCurrentUser() {
    const dispatch=useDispatch()
    const {storyData}=useSelector(state=>state.story)
  useEffect(()=>{
const fetchUser=async ()=>{
    try {
         const result=await apiClient.get('/api/user/current')
         dispatch(setUserData(result.data))
         dispatch(setCurrentUserStory(result.data.story))
    } catch (error) {
        console.log(error)
    }
}
fetchUser()
  },[storyData])
}

export default useCurrentUser
