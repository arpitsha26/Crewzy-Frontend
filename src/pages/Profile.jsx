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

  const userPosts = postData.filter(
    (post) => post.author?._id === profileData?._id
  );

  return (
    <div className="w-full min-h-screen bg-black text-white">

      
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">

        <MdOutlineKeyboardBackspace
          className="w-7 h-7 cursor-pointer"
          onClick={() => navigate("/")}
        />

        <div className="font-semibold text-lg">
          {profileData?.userName}
        </div>

        {profileData?._id === userData?._id && (
          <button
            className="text-blue-400 font-semibold"
            onClick={handleLogOut}
          >
            Log Out
          </button>
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
        <div className="flex justify-center mt-10 border-b border-gray-800">

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

      
      <div className="grid grid-cols-3 gap-[2px] mt-6">

        {(postType === "posts"
          ? userPosts
          : postData.filter((p) => userData.saved?.includes(p._id))
        ).map((post) => (
          <motion.div
            key={post._id}
            whileHover={{ scale: 1.03 }}
            className="aspect-square bg-gray-900 overflow-hidden"
          >
            <img
              src={post.image}
              className="w-full h-full object-cover cursor-pointer"
            />
          </motion.div>
        ))}

      </div>

      <Nav />
    </div>
  );
}

export default Profile;