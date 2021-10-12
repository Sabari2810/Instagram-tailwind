import React from "react";

function Story({ image, username }) {
  return (
    <div className="cursor-pointer">
      <img
        className="rounded-full h-14 w-14 p-[1.5px] border-red-500 border-2
        hover:scale-110 transition transform ease-out duration-200"
        src={image}
        alt={username}
      />
      <p className="text-xs w-14 truncate text-center">{username}</p>
    </div>
  );
}

export default Story;
