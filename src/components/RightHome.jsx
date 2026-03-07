import React from "react";
import Messages from "../pages/Messages";

function RightHome() {
  return (
    <aside className="hidden lg:flex flex-col w-[25%] h-screen bg-black border-l border-gray-900">
      
      
      <div className="flex-1 overflow-y-auto">
        <Messages />
      </div>

    </aside>
  );
}

export default RightHome;