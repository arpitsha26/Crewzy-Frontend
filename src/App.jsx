import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import Upload from './pages/Upload'
import Loops from './pages/Loops'
import Story from './pages/Story'
import Messages from './pages/Messages'
import MessageArea from './pages/MessageArea'
import Search from './pages/Search'
import Notifications from './pages/Notifications'
import useCurrentUser from './hooks/getCurrentUser'
import useSuggestedUsers from './hooks/getSuggestedUsers'
import useAllPost from './hooks/getAllPost'
import useAllLoops from './hooks/getAllLoops'
import useAllStories from './hooks/getAllStories'
import useFollowingList from './hooks/getFollowingList'
import usePrevChatUsers from './hooks/getPrevChatUsers'
import useAllNotifications from './hooks/getAllNotifications'
import { setOnlineUsers, setSocket } from './redux/socketSlice'
import { setNotificationData } from './redux/userSlice'

function App() {
  useCurrentUser()
  useSuggestedUsers()
  useAllPost()
  useAllLoops()
  useAllStories()
  useFollowingList()
  usePrevChatUsers()
  useAllNotifications()

  const { userData, notificationData } = useSelector((state) => state.user)
  const { socket } = useSelector((state) => state.socket)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!userData) {
      if (socket) {
        socket.close()
        dispatch(setSocket(null))
      }
      return undefined
    }

    const socketIo = io(import.meta.env.VITE_SERVER_URL, {
      query: { userId: userData._id },
    })
    dispatch(setSocket(socketIo))
    socketIo.on('getOnlineUsers', (users) => dispatch(setOnlineUsers(users)))

    return () => socketIo.close()
  }, [dispatch, userData])

  useEffect(() => {
    if (!socket) return undefined
    const handleNotification = (noti) => {
      dispatch(setNotificationData([...(notificationData || []), noti]))
    }
    socket.on('newNotification', handleNotification)
    return () => socket.off('newNotification', handleNotification)
  }, [dispatch, notificationData, socket])

  return (
    <Routes>
      <Route path='/signup' element={!userData ? <SignUp /> : <Navigate to='/' />} />
      <Route path='/signin' element={!userData ? <SignIn /> : <Navigate to='/' />} />
      <Route path='/' element={userData ? <Home /> : <Navigate to='/signin' />} />
      <Route path='/forgot-password' element={!userData ? <ForgotPassword /> : <Navigate to='/' />} />
      <Route path='/profile/:userName' element={userData ? <Profile /> : <Navigate to='/signin' />} />
      <Route path='/story/:userName' element={userData ? <Story /> : <Navigate to='/signin' />} />
      <Route path='/upload' element={userData ? <Upload /> : <Navigate to='/signin' />} />
      <Route path='/search' element={userData ? <Search /> : <Navigate to='/signin' />} />
      <Route path='/editprofile' element={userData ? <EditProfile /> : <Navigate to='/signin' />} />
      <Route path='/messages' element={userData ? <Messages /> : <Navigate to='/signin' />} />
      <Route path='/messageArea' element={userData ? <MessageArea /> : <Navigate to='/signin' />} />
      <Route path='/notifications' element={userData ? <Notifications /> : <Navigate to='/signin' />} />
      <Route path='/loops' element={userData ? <Loops /> : <Navigate to='/signin' />} />
    </Routes>
  )
}

export default App
