import React, { useEffect } from 'react'
import apiClient from '../api/apiClient'
import { useDispatch, useSelector } from 'react-redux'
import { setPostData } from '../redux/postSlice'
import { setLoopData } from '../redux/loopSlice'

function useAllLoops() {
    const dispatch=useDispatch()
    const {userData}=useSelector(state=>state.user)
   
  useEffect(()=>{
const fetchloops=async ()=>{
    try {
         const result=await apiClient.get('/api/loop/getAll')
         dispatch(setLoopData(result.data))
    } catch (error) {
        console.log(error)
    }
}
fetchloops()
  },[dispatch,userData])
}

export default useAllLoops
