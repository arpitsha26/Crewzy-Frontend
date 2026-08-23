import apiClient from '../api/apiClient'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setStoryData } from '../redux/storySlice'
import StoryCard from '../components/StoryCard'

function Story() {
    const {userName}=useParams()
    const dispatch=useDispatch()
    const {storyData}=useSelector(state=>state.story)

    const handleStory=async ()=>{
      dispatch(setStoryData(null))
        try {
            const result=await apiClient.get(`/api/story/getByUserName/${userName}`)
            dispatch(setStoryData(result.data[0]))
            console.log(storyData)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        if(userName){
         handleStory()
        }

    },[userName])
  return (
    <div className='w-full  h-[100vh] bg-black flex justify-center items-center'>
      <StoryCard storyData={storyData}/>
    </div>
  )
}

export default Story
