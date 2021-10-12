import React from "react";
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from "@heroicons/react/outline";

import { HomeIcon } from "@heroicons/react/solid";

import Image from "next/image";

function Header() {
  return (
    <div className="shadow-sm sticky top-0 z-50 bg-white">
      <div className="flex justify-between max-w-screen-lg mx-2 lg:mx-auto items-center">
        {/* left */}

        <div className="relative hidden lg:inline-grid h-24 w-24">
          <Image
            src="https://links.papareact.com/ocw"
            objectFit="contain"
            layout="fill"
          />
        </div>

        <div className="relative lg:hidden flex-shrink-0 h-10 w-10">
          <Image
            src="https://links.papareact.com/jjm"
            objectFit="contain"
            layout="fill"
          />
        </div>

        {/* middle */}
        <div className="relative rounded-md p-3">
          <div className="absolute pl-3 flex inset-y-0 items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-500" />
          </div>
          <input
            className="bg-gray-50 pl-10 rounded-md
             w-full block border border-gray-300 focus:ring-black focus:border-black"
            type="text"
            placeholder="Search"
          />
        </div>

        {/* right */}
        <div className="flex items-center space-x-3">
          <HomeIcon className="navBtn" />
          <MenuIcon className="h-6 md:hidden cursor-pointer" />
          <div className="relative navBtn">
            <PaperAirplaneIcon className="navBtn rotate-45" />
            <div
              className="absolute -top-2 -right-2 rounded-full
             items-center text-sm justify-center flex animate-pulse
              text-white h-5 w-5 bg-red-500"
            >
              3
            </div>
          </div>
          <PlusCircleIcon className="navBtn" />
          <UserGroupIcon className="navBtn" />
          <HeartIcon className="navBtn" />
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={
              "data:image/jpeg;base64,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"
            }
            alt="profile"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
