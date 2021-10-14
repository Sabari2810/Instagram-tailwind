import { signOut, useSession } from "next-auth/react";
import React from "react";

function MiniProfile() {
  const { data: session } = useSession();
  return (
    <div className="flex justify-between items-center mt-14 ml-10">
      <img
        className="rounded-full h-16 w-16 object-cover"
        src={session?.user?.image}
        alt=""
      />
      <div className="flex-1 mx-4">
        <h2 className="font-bold">{session?.user?.username}</h2>
        <h3 className="text-sm text-gray-400">Welcome to instagram</h3>
      </div>
      <button onClick={signOut} className="font-semibold text-blue-400 text-sm">
        Sign out
      </button>
    </div>
  );
}

export default MiniProfile;
