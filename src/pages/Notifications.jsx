import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import NotificationCard from '../components/NotificationCard';
import apiClient from '../api/apiClient';
import getAllNotifications from '../hooks/getAllNotifications';
import { setNotificationData } from '../redux/userSlice';
function Notifications() {
    const navigate=useNavigate()
    const {notificationData}=useSelector(state=>state.user)
    const ids=notificationData.map((n)=>n._id)
    const dispatch=useDispatch()
    const markAsRead=async ()=>{
        try {
            const result=await apiClient.post('/api/user/markAsRead',{notificationId:ids})
          await fetchNotifications()
        } catch (error) {
            console.log(error)
        }
    }
const fetchNotifications=async ()=>{
    try {
        const result=await apiClient.get('/api/user/getAllNotifications')
         dispatch(setNotificationData(result.data))
    } catch (error) {
        console.log(error)
    }
}
    

    useEffect(()=>{
    markAsRead()
   
    },[])
  return (
    <div className='w-full h-[100vh] bg-black overflow-auto'>
       <div className='w-full h-[80px]  flex items-center gap-[20px] px-[20px] lg:hidden'>
                      <MdOutlineKeyboardBackspace className='text-white cursor-pointer w-[25px]  h-[25px] ' onClick={() => navigate(`/`)} />
                      <h1 className='text-white text-[20px] font-semibold'>Notifications</h1>
                  </div>

                  <div className='w-full flex flex-col gap-[20px] h-100%]  px-[10px]'>
{notificationData?.map((noti,index)=>(
    <NotificationCard noti={noti} key={index}/>
))}
                  </div>
    </div>
  )
}

export default Notifications
