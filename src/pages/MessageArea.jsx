import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { LuImage } from "react-icons/lu";
import { IoMdSend } from "react-icons/io";
import dp from "../assets/dp.webp";
import SenderMessage from "../components/SenderMessage";
import ReceiverMessage from "../components/ReceiverMessage";
import axios from "axios";
import { serverUrl } from "../App";
import { setMessages } from "../redux/messageSlice";

function MessageArea() {

  const { selectedUser, messages } = useSelector((state) => state.message);
  const { userData } = useSelector((state) => state.user);
  const { socket } = useSelector((state) => state.socket);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState("");
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);

  const imageInput = useRef();
  const bottomRef = useRef();

  

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };



  const handleSendMessage = async (e) => {
    e.preventDefault();

    try {

      const formData = new FormData();
      formData.append("message", input);

      if (backendImage) {
        formData.append("image", backendImage);
      }

      const res = await axios.post(
        `${serverUrl}/api/message/send/${selectedUser._id}`,
        formData,
        { withCredentials: true }
      );

      dispatch(setMessages([...messages, res.data]));

      setInput("");
      setFrontendImage(null);
      setBackendImage(null);

    } catch (error) {
      console.log(error);
    }
  };



  const getMessages = async () => {
    try {

      const res = await axios.get(
        `${serverUrl}/api/message/getAll/${selectedUser._id}`,
        { withCredentials: true }
      );

      dispatch(setMessages(res.data));

    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getMessages();
  }, [selectedUser]);

  useEffect(() => {
    socket?.on("newMessage", (msg) => {
      dispatch(setMessages([...messages, msg]));
    });

    return () => socket?.off("newMessage");

  }, [messages]);

  

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  

  return (
    <div className="w-full h-screen flex flex-col bg-black">

     
      <div className="flex items-center gap-4 px-6 py-3 border-b border-gray-900 bg-black">

        <MdOutlineKeyboardBackspace
          className="text-white cursor-pointer w-6 h-6"
          onClick={() => navigate(`/`)}
        />

        <div
          className="w-10 h-10 rounded-full overflow-hidden cursor-pointer"
          onClick={() => navigate(`/profile/${selectedUser.userName}`)}
        >
          <img
            src={selectedUser.profileImage || dp}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <p className="text-white font-semibold text-[16px]">
            {selectedUser.userName}
          </p>
          <p className="text-gray-400 text-[13px]">
            {selectedUser.name}
          </p>
        </div>
      </div>

     
      <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6">

        {messages?.map((mess, index) =>
          mess.sender === userData._id ? (
            <SenderMessage key={index} message={mess} />
          ) : (
            <ReceiverMessage key={index} message={mess} />
          )
        )}

        <div ref={bottomRef}></div>
      </div>

      
      {frontendImage && (
        <div className="absolute bottom-[90px] right-6 w-[120px] h-[120px] rounded-xl overflow-hidden border border-gray-800">
          <img src={frontendImage} className="w-full h-full object-cover" />
        </div>
      )}

      
      <div className="border-t border-gray-900 px-6 py-3 bg-black">

        <form
          onSubmit={handleSendMessage}
          className="flex items-center gap-3 bg-[#131616] rounded-full px-4 py-2"
        >

          <input
            type="file"
            hidden
            accept="image/*"
            ref={imageInput}
            onChange={handleImage}
          />

          <button
            type="button"
            onClick={() => imageInput.current.click()}
          >
            <LuImage className="text-gray-300 w-6 h-6" />
          </button>

          <input
            type="text"
            placeholder="Message..."
            className="flex-1 bg-transparent outline-none text-white text-[15px]"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          {(input || frontendImage) && (
            <button className="bg-gradient-to-br from-purple-600 to-pink-500 w-10 h-10 rounded-full flex items-center justify-center">
              <IoMdSend className="text-white w-5 h-5" />
            </button>
          )}

        </form>

      </div>

    </div>
  );
}

export default MessageArea;