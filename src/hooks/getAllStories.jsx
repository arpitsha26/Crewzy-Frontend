import React, { useEffect } from 'react'
import apiClient from '../api/apiClient'
import { useDispatch, useSelector } from 'react-redux'
import { setStoryList } from '../redux/storySlice'

function useAllStories() {
    const dispatch=useDispatch()
    const {userData}=useSelector(state=>state.user)
     const {storyData}=useSelector(state=>state.story)
  useEffect(()=>{
const fetchStories=async ()=>{
    try {
         const result=await apiClient.get('/api/story/getAll')
         dispatch(setStoryList(result.data))
         
    } catch (error) {
        console.log(error)
    }
}
fetchStories()
  },[userData,storyData])
}

export default useAllStories
