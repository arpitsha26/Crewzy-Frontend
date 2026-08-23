import React, { useEffect } from 'react'
import apiClient from '../api/apiClient'
import { useDispatch, useSelector } from 'react-redux'
import { setPostData } from '../redux/postSlice'

function useAllPost() {
    const dispatch=useDispatch()
    const {userData}=useSelector(state=>state.user)
  useEffect(()=>{
const fetchPost=async ()=>{
    try {
         const result=await apiClient.get('/api/post/getAll')
         dispatch(setPostData(result.data))
    } catch (error) {
        console.log(error)
    }
}
fetchPost()
  },[dispatch,userData])
}

export default useAllPost
