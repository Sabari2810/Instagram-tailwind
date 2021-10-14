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
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next//router";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";

function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState);
  return (
    <div className="shadow-sm sticky top-0 z-50 bg-white">
      <div className="flex justify-between max-w-screen-lg mx-2 lg:mx-auto items-center">
        {/* left */}

        <div className="relative hidden lg:inline-grid h-24 w-24">
          <Image
            onClick={() => router.push("/")}
            src="https://links.papareact.com/ocw"
            objectFit="contain"
            layout="fill"
          />
        </div>

        <div className="relative lg:hidden flex-shrink-0 h-10 w-10">
          <Image
            onClick={() => router.push("/")}
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
        <div className="flex items-center space-x-3">
          <HomeIcon onClick={() => router.push("/")} className="navBtn" />
          {session ? (
            <>
              <MenuIcon className="h-6 md:hidden cursor-pointer" />
              <div className="relative navBtn">
                <PaperAirplaneIcon className="navBtn rotate-45" />
                <div
                  className="absolute -top-2 -right-2 rounded-full
                 items-center text-sm justify-center flex animate-pulse
                  text-white h-5 w-5 bg-red-500"
                >
                  3
                </div>{" "}
              </div>
              <PlusCircleIcon
                onClick={() => setIsModalOpen(true)}
                className="navBtn"
              />
              <UserGroupIcon className="navBtn" />
              <HeartIcon className="navBtn" />
              <img
                onClick={signOut}
                className="h-10 w-10 rounded-full cursor-pointer object-cover"
                src={session?.user?.image}
                alt="profile"
              />
            </>
          ) : (
            <button onClick={signIn}>Sign In</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
