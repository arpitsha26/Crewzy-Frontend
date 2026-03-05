import React from "react";
import logo from "../assets/logo.png";
import { FaRegHeart } from "react-icons/fa6";
import { BiMessageAltDetail } from "react-icons/bi";
import { motion } from "framer-motion";
import StoryDp from "./StoryDp";
import Nav from "./Nav";
import Post from "./Post";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Feed() {
  const { postData } = useSelector((state) => state.post);
  const { userData, notificationData } = useSelector((state) => state.user);
  const { storyList, currentUserStory } = useSelector((state) => state.story);
  const navigate = useNavigate();

  return (
    <div className="lg:w-[50%] w-full bg-black min-h-screen lg:h-screen relative lg:overflow-y-auto">

      {/* Mobile Header */}
      <div className="w-full h-[80px] flex items-center justify-between px-6 backdrop-blur-md bg-black/60 sticky top-0 z-50 lg:hidden">
        <img src={logo} alt="" className="w-[85px]" />

        <div className="flex items-center gap-4">

          <div
            className="relative cursor-pointer hover:scale-110 transition"
            onClick={() => navigate("/notifications")}
          >
            <FaRegHeart className="text-white w-6 h-6" />

            {notificationData?.length > 0 &&
              notificationData.some((noti) => noti.isRead === false) && (
                <span className="w-2.5 h-2.5 bg-blue-500 rounded-full absolute top-0 right-[-4px] animate-pulse"></span>
              )}
          </div>

          <BiMessageAltDetail
            className="text-white w-6 h-6 cursor-pointer hover:scale-110 transition"
            onClick={() => navigate("/messages")}
          />
        </div>
      </div>

      {/* Stories */}
      <div className="flex w-full overflow-x-auto gap-4 items-center px-4 py-5 scrollbar-hide bg-black border-b border-gray-800">

        <StoryDp
          userName={"Your Story"}
          ProfileImage={userData.profileImage}
          story={currentUserStory}
        />

        {storyList?.map((story, index) => (
          <StoryDp
            userName={story.author.userName}
            ProfileImage={story.author.profileImage}
            story={story}
            key={index}
          />
        ))}
      </div>

      {/* Feed Container */}
      <div className="w-full flex flex-col items-center gap-6 px-4 pt-10 pb-32 bg-gray-50 rounded-t-[40px] shadow-inner relative">

        <Nav />

        {/* Posts */}
        {postData &&
          postData.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full flex justify-center"
            >
              <Post post={post} />
            </motion.div>
          ))}
      </div>
    </div>
  );
}

export default Feed;