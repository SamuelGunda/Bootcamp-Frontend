"use client";

import Navbar from "../components/navbar";
import { useAuthCheck } from "../hooks/useAuthCheck";
import React from "react";
import Transition from "../components/transition";

function Profile() {
  const { authDataString, authDataLoaded } = useAuthCheck();

  if (!authDataLoaded) {
    return (
      <main className="bg-gradient-to-tl from-slate-50 via-25% via-cyan-600 to-blue-700 flex w-screen h-screen">
        <div className={"w-full h-full flex justify-center items-center"}>
          <p className="text-white text-2xl">Načitavanie...</p>
        </div>
      </main>
    );
  }

  return (
    <Transition>
      <main
        className={
          "bg-gradient-to-tl from-slate-50 via-25% via-cyan-600 to-blue-700 flex w-screen h-screen "
        }
      >
        <Navbar />
        <div className={"w-full h-full flex justify-center items-center"}>
          <div className="flex h-4 w-3/5 justify-center items-end py-4 border-b-2 border-white">
            <h1 className={"text-white text-5xl font-bold"}>Vitaj</h1>
            <p className={"text-white text-2xl"}>
              {" ,"}
              {authDataString !== null
                ? JSON.parse(authDataString).username
                : ""}
            </p>
          </div>
        </div>
      </main>
    </Transition>
  );
}

export default Profile;
