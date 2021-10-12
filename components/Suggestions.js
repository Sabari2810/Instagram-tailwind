import React from "react";
import { useState, useEffect } from "react";
import faker from "faker";

function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const stories = [...Array(5)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));

    setSuggestions(stories);
  }, []);
  return (
    <div>
      <div className="ml-10 mt-5">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold text-gray-400">
            Suggestions for you
          </h3>
          <button className="font-semibold text-gray-600">See All</button>
        </div>

        {suggestions.map((s) => (
          <div className="flex justify-between items-center mt-3" key={s.id}>
            <img src={s.avatar} alt="" className="h-10 rounded-full" />
            <div className="flex-1 ml-3 mr-2">
              <h1 className="font-semibold text-sm">{s.username}</h1>
              <h3 className="text-xs text-gray-500">
                works at {s.company.name}
              </h3>
            </div>
            <button className="text-xs text-blue-400 font-bold">Follow</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Suggestions;
