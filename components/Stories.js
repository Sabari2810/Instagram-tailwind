import React from "react";
import faker from "faker";
import { useEffect, useState } from "react";
import Story from "./Story";
import { useSession } from "next-auth/react";

function Stories() {
  const [stories, setStories] = useState([]);
  const { data: session } = useSession();
  useEffect(() => {
    const stories = [...Array(20)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));

    setStories(stories);
  }, []);
  return (
    <div
      className="flex space-x-4 scrollbar-thin scrollbar-thumb-black
     bg-white mt-8 p-6 border-gray-200 border
      rounded-sm overflow-x-scroll"
    >
      {session && (
        <Story username={session.user.username} image={session.user.image} />
      )}
      {stories.map((profile) => (
        <Story
          username={profile.username}
          image={profile.avatar}
          key={profile.id}
        />
      ))}
    </div>
  );
}

export default Stories;
