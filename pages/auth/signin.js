import React from "react";
import { getProviders, signIn as LogIn } from "next-auth/react";
import Header from "../../components/Header";

import Image from "next/image";

function signIn({ providers }) {
  return (
    <>
      <Header />
      <div className="items-center flex flex-col">
        <img className="w-80" src="https://links.papareact.com/ocw" />
        {Object.values(providers).map((provider) => (
          <div key={provider.name} className="mt-40">
            <button
              className="bg-blue-500 text-white rounded-lg p-3"
              onClick={() =>
                LogIn(provider.id, {
                  callbackUrl: "/",
                })
              }
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

export default signIn;
