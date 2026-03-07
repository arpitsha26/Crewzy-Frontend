import React, { useMemo } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { GoSearch } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OnlineUser from "../components/OnlineUser";
import { setSelectedUser } from "../redux/messageSlice";
import dp from "../assets/dp.webp";

function Messages() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userData } = useSelector((state) => state.user);
  const { onlineUsers } = useSelector((state) => state.socket);
  const { prevChatUsers } = useSelector((state) => state.message);


  const onlineFollowing = useMemo(() => {
    return userData?.following?.filter((user) =>
      onlineUsers?.includes(user._id)
    );
  }, [userData, onlineUsers]);

  const openChat = (user) => {
    dispatch(setSelectedUser(user));
    navigate("/messageArea");
  };

  return (
    <div className="flex flex-col h-full bg-black">

      <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-900">

        <MdOutlineKeyboardBackspace
          className="text-white cursor-pointer lg:hidden w-6 h-6"
          onClick={() => navigate(`/`)}
        />

        <h1 className="text-white text-xl font-semibold">Messages</h1>
      </div>

      
      <div className="px-5 py-3">
        <div className="flex items-center gap-3 bg-gray-900 rounded-lg px-3 py-2">
          <GoSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search messages"
            className="bg-transparent outline-none text-white text-sm w-full"
          />
        </div>
      </div>

  
      <div className="flex gap-4 overflow-x-auto px-5 py-4 border-b border-gray-900 scrollbar-hide">

        {onlineFollowing?.map((user) => (
          <OnlineUser key={user._id} user={user} />
        ))}

      </div>

      <div className="flex flex-col gap-4 px-5 py-5 overflow-y-auto">

        {prevChatUsers?.map((user) => {

          const isOnline = onlineUsers?.includes(user._id);

          return (
            <div
              key={user._id}
              onClick={() => openChat(user)}
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-900 rounded-lg p-2 transition"
            >

              {isOnline ? (
                <OnlineUser user={user} />
              ) : (
                <div className="w-[48px] h-[48px] rounded-full overflow-hidden border border-gray-700">
                  <img
                    src={user.profileImage || dp}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="flex flex-col">

                <span className="text-white font-semibold text-[16px]">
                  {user.userName}
                </span>

                {isOnline && (
                  <span className="text-blue-500 text-sm">
                    Active Now
                  </span>
                )}

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default Messages;