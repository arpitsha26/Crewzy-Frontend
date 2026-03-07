import React, { useState, useMemo, useCallback } from "react";
import logo from "../assets/logo.png";
import { FaRegHeart } from "react-icons/fa6";
import dp from "../assets/dp.webp";
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

  /* ---------- Optimizations ---------- */

  const hasUnread = useMemo(() => {
    return notificationData?.some((n) => !n.isRead);
  }, [notificationData]);

  const topSuggestedUsers = useMemo(() => {
    return suggestedUsers?.slice(0, 4) || [];
  }, [suggestedUsers]);

  const handleLogOut = useCallback(async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/signout`, {
        withCredentials: true,
      });

      dispatch(setUserData(null));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const toggleNotification = () => {
    setShowNotification((prev) => !prev);
  };

  /* ---------- UI ---------- */

  return (
    <div
      className={`w-[25%] hidden lg:flex flex-col h-screen bg-black border-r border-gray-900 ${
        showNotification ? "overflow-hidden" : "overflow-y-auto"
      }`}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-900">
        <img src={logo} alt="logo" className="w-[85px]" />

        <div
          className="relative cursor-pointer transition hover:scale-110"
          onClick={toggleNotification}
        >
          <FaRegHeart className="text-white w-6 h-6" />

          {hasUnread && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
          )}
        </div>
      </div>

      {/* CONTENT */}
      {!showNotification ? (
        <>
          {/* USER PROFILE */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-900">
            <div className="flex items-center gap-3">
              <div className="w-[55px] h-[55px] rounded-full overflow-hidden border border-gray-700">
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
              onClick={handleLogOut}
              className="text-blue-500 text-sm font-semibold hover:text-blue-400"
            >
              Log Out
            </button>
          </div>

          {/* SUGGESTED USERS */}
          <div className="flex flex-col gap-5 px-5 py-6">
            <h2 className="text-white text-[18px] font-semibold">
              Suggested Users
            </h2>

            {topSuggestedUsers.map((user) => (
              <OtherUser key={user._id} user={user} />
            ))}
          </div>
        </>
      ) : (
        <Notifications />
      )}
    </div>
  );
}

export default LeftHome;