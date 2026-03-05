import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import { serverUrl } from "../App";
import dp from "../assets/dp.webp";

function Search() {

  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [searchData, setSearchData] = useState([]);

  const handleSearch = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/user/search?keyWord=${input}`,
        { withCredentials: true }
      );

      setSearchData(result.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (input) {
      handleSearch();
    } else {
      setSearchData([]);
    }
  }, [input]);

  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center">

      {/* HEADER */}
      <div className="w-full h-[70px] flex items-center gap-5 px-5 border-b border-[#1f1f1f] sticky top-0 bg-black z-10">

        <MdOutlineKeyboardBackspace
          className="text-white cursor-pointer w-6 h-6 hover:text-gray-400 transition"
          onClick={() => navigate(`/`)}
        />

        <h1 className="text-white text-xl font-semibold">Search</h1>

      </div>


      {/* SEARCH BAR */}
      <div className="w-full flex justify-center mt-6 px-5">

        <div className="w-full max-w-[650px] h-[50px] rounded-full bg-[#121212] border border-[#262626] flex items-center px-4 gap-3 focus-within:border-gray-500 transition">

          <FiSearch className="text-gray-400 w-5 h-5" />

          <input
            type="text"
            placeholder="Search users..."
            className="bg-transparent outline-none text-white w-full text-[16px]"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

        </div>

      </div>


      {/* RESULTS */}
      <div className="w-full max-w-[700px] mt-8 flex flex-col gap-4 px-4">

        {input && searchData?.length === 0 && (
          <div className="text-gray-500 text-center mt-10">
            No users found
          </div>
        )}


        {searchData?.map((user, index) => (

          <div
            key={index}
            onClick={() => navigate(`/profile/${user.userName}`)}
            className="w-full h-[70px] flex items-center gap-4 px-4 rounded-xl bg-[#121212] border border-[#1f1f1f] hover:bg-[#1c1c1c] hover:border-gray-600 cursor-pointer transition duration-200"
          >

            {/* PROFILE IMAGE */}
            <div className="w-[50px] h-[50px] rounded-full overflow-hidden border border-gray-700">

              <img
                src={user.profileImage || dp}
                alt=""
                className="w-full h-full object-cover"
              />

            </div>


            {/* USER INFO */}
            <div className="flex flex-col">

              <span className="text-white font-semibold text-[16px]">
                {user.userName}
              </span>

              <span className="text-gray-400 text-sm">
                {user.name}
              </span>

            </div>

          </div>

        ))}

      </div>


      {/* EMPTY STATE */}
      {!input && (
        <div className="text-gray-600 text-lg mt-20">
          🔎 Search for users
        </div>
      )}

    </div>
  );
}

export default Search;