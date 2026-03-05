import axios from "axios";
import React, { useEffect, useState } from "react";
import { serverUrl } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProfileData, setUserData } from "../redux/userSlice";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { motion } from "framer-motion";
import dp from "../assets/dp.webp";
import Nav from "../components/Nav";
import FollowButton from "../components/FollowButton";
import Post from "../components/Post";
import { setSelectedUser } from "../redux/messageSlice";

function Profile() {

  const { userName } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [postType, setPostType] = useState("posts");

  const { profileData, userData } = useSelector((state) => state.user);
  const { postData } = useSelector((state) => state.post);

  const handleProfile = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/user/getProfile/${userName}`,
        { withCredentials: true }
      );
      dispatch(setProfileData(result.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/signout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleProfile();
  }, [userName]);

  return (
    <div className="w-full min-h-screen bg-black text-white">

     
      <div className="w-full h-[70px] flex justify-between items-center px-6 border-b border-gray-800">

        <MdOutlineKeyboardBackspace
          className="w-7 h-7 cursor-pointer"
          onClick={() => navigate("/")}
        />

        <div className="font-semibold text-lg">
          {profileData?.userName}
        </div>

        {profileData?._id === userData?._id && (
          <div
            className="text-blue-400 font-semibold cursor-pointer"
            onClick={handleLogOut}
          >
            Log Out
          </div>
        )}
      </div>

      
      <div className="flex flex-col items-center pt-6 px-6">

        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="w-[120px] h-[120px] rounded-full overflow-hidden border-4 border-blue-500 shadow-xl"
        >
          <img
            src={profileData?.profileImage || dp}
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="text-2xl font-semibold mt-4">
          {profileData?.name}
        </div>

        <div className="text-gray-400">
          {profileData?.profession || "New User"}
        </div>

        <div className="text-gray-300 text-center max-w-[400px] mt-2">
          {profileData?.bio}
        </div>

      </div>

      
      <div className="flex justify-center gap-12 mt-6 text-center">

        <div>
          <div className="text-xl font-bold">
            {profileData?.posts?.length || 0}
          </div>
          <div className="text-gray-400">Posts</div>
        </div>

        <div>
          <div className="text-xl font-bold">
            {profileData?.followers?.length || 0}
          </div>
          <div className="text-gray-400">Followers</div>
        </div>

        <div>
          <div className="text-xl font-bold">
            {profileData?.following?.length || 0}
          </div>
          <div className="text-gray-400">Following</div>
        </div>

      </div>

     
      <div className="flex justify-center gap-4 mt-6 px-6">

        {profileData?._id === userData?._id ? (
          <button
            className="bg-white text-black px-6 py-2 rounded-full font-semibold"
            onClick={() => navigate("/editprofile")}
          >
            Edit Profile
          </button>
        ) : (
          <>
            <FollowButton
              tailwind="bg-blue-500 px-6 py-2 rounded-full font-semibold"
              targetUserId={profileData?._id}
              onFollowChange={handleProfile}
            />

            <button
              className="bg-gray-700 px-6 py-2 rounded-full"
              onClick={() => {
                dispatch(setSelectedUser(profileData));
                navigate("/messageArea");
              }}
            >
              Message
            </button>
          </>
        )}

      </div>

    
      {profileData?._id === userData?._id && (
        <div className="flex justify-center mt-8 border-b border-gray-800">

          <button
            onClick={() => setPostType("posts")}
            className={`px-6 py-3 ${
              postType === "posts"
                ? "border-b-2 border-white"
                : "text-gray-500"
            }`}
          >
            Posts
          </button>

          <button
            onClick={() => setPostType("saved")}
            className={`px-6 py-3 ${
              postType === "saved"
                ? "border-b-2 border-white"
                : "text-gray-500"
            }`}
          >
            Saved
          </button>

        </div>
      )}

     
      <div className="w-full flex justify-center">

        <div className="w-full max-w-[900px] flex flex-col items-center gap-6 pt-8 pb-32">

         
          {profileData?._id === userData?._id && postType === "posts" &&
            postData?.map((post) =>
              post.author?._id === profileData?._id && (
                <Post key={post._id} post={post} />
              )
            )}

    
          {profileData?._id === userData?._id && postType === "saved" &&
            postData?.map((post) =>
              userData?.saved?.includes(post._id) && (
                <Post key={post._id} post={post} />
              )
            )}

          
          {profileData?._id !== userData?._id &&
            postData?.map((post) =>
              post.author?._id === profileData?._id && (
                <Post key={post._id} post={post} />
              )
            )}

        </div>

      </div>

      <Nav />

    </div>
  );
}

export default Profile;