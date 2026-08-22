import React from "react";
import LeftHome from "../components/LeftHome";
import Feed from "../components/Feed";
import RightHome from "../components/RightHome";

function Home() {
  return (
    <main className="w-full min-h-screen bg-[#08090b] flex justify-center">
      
      <div className="w-full max-w-[1400px] flex">

       
        <LeftHome />

        
        <Feed />

       
        <RightHome />

      </div>

    </main>
  );
}

export default Home;