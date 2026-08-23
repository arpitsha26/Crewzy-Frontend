import React, { useEffect } from 'react'
import apiClient from '../api/apiClient'
import { useDispatch, useSelector } from 'react-redux'
import { setPrevChatUsers } from '../redux/messageSlice'

function usePrevChatUsers() {
    const dispatch=useDispatch()
    const {messages}=useSelector(state=>state.message)
  useEffect(()=>{
const fetchUser=async ()=>{
    try {
         const result=await apiClient.get('/api/message/prevChats')
         dispatch(setPrevChatUsers(result.data))
    } catch (error) {
        console.log(error)
    }
}
fetchUser()
  },[messages])
}

export default usePrevChatUsers
