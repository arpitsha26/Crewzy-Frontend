import React, { useState, useMemo, useCallback } from "react";
import logo from "../assets/logo.png";
import dp from "../assets/dp.webp";
import { FaRegHeart } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import OtherUser from "./OtherUser";
import Notifications from "../pages/Notifications";

function LeftHome() {

  const dispatch = useDispatch();

  const { userData, suggestedUsers, notificationData } = useSelector(
    (state) => state.user
  );

  const [showNotification, setShowNotification] = useState(false);



  const hasUnread = useMemo(() => {
    return notificationData?.some((n) => !n.isRead);
  }, [notificationData]);

  const suggestedTop = useMemo(() => {
    return suggestedUsers?.slice(0, 10) || [];
  }, [suggestedUsers]);



  const toggleNotifications = useCallback(() => {
    setShowNotification((prev) => !prev);
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/signout`, {
        withCredentials: true,
      });

      dispatch(setUserData(null));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

 

  return (
    <aside className="hidden lg:flex flex-col w-[25%] h-screen bg-black border-r border-gray-900">

     
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-900">
        <img src={logo} alt="logo" className="w-[90px]" />

        <button
          onClick={toggleNotifications}
          className="relative p-2 rounded-full hover:bg-gray-900 transition"
        >
          <FaRegHeart className="text-white w-6 h-6" />

          {hasUnread && (
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
          )}
        </button>
      </div>

      
      <div className="flex-1 overflow-y-auto">

        {!showNotification ? (
          <>
            
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-900">

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-700 hover:scale-105 transition">
                  <img
                    src={userData?.profileImage || dp}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <p className="text-white font-semibold text-[16px]">
                    {userData?.userName}
                  </p>

                  <p className="text-gray-400 text-[14px]">
                    {userData?.name}
                  </p>
                </div>

              </div>

              <button
                onClick={handleLogout}
                className="text-blue-500 text-sm font-semibold hover:text-blue-400 transition"
              >
                Log out
              </button>

            </div>

            
            <div className="px-6 py-6 flex flex-col gap-5">

              <div className="flex justify-between items-center">
                <h2 className="text-white text-[17px] font-semibold">
                  Suggested Users
                </h2>

                <span className="text-gray-400 text-sm cursor-pointer hover:text-white">
                  See All
                </span>
              </div>

              <div className="flex flex-col gap-4">
                {suggestedTop.map((user) => (
                  <OtherUser key={user._id} user={user} />
                ))}
              </div>

            </div>
          </>
        ) : (
          <Notifications />
        )}

      </div>

     
      <div className="px-6 py-4 border-t border-gray-900 text-gray-500 text-xs leading-relaxed">
        <p>
          About · Help · Press · API · Jobs · Privacy · Terms
        </p>
        <p className="mt-2">© 2026 Crewzy </p>
      </div>

    </aside>
  );
}

export default LeftHome;