"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/app/components/navbar";
import { useAuthCheck } from "@/app/hooks/useAuthCheck";
import Transition from "@/app/components/transition";

function StudentRegister() {
  const { authDataString, authDataLoaded } = useAuthCheck();

  if (!authDataLoaded) {
    return (
      <main className="bg-gradient-to-tl from-slate-50 via-25% via-cyan-600 to-blue-700 flex w-screen h-screen ">
        <div className={"w-full h-full flex justify-center items-center"}>
          <p className="text-white text-2xl">Načítavanie...</p>
        </div>
      </main>
    );
  }

  return (
    <Transition>
      <main
        className={
          "bg-gradient-to-tl from-slate-50 via-10% via-cyan-600 to-blue-700 flex w-screen h-screen "
        }
      >
        <Navbar />
        <div className={"w-full h-full flex justify-center items-center p-4"}>
          <div className="bg-[#FAF9F6] bg-opacity-20 flex flex-col items-center h-full w-4/5 rounded-2xl shadow-xl shadow-indigo-950 "></div>
        </div>
      </main>
    </Transition>
  );
}

export default StudentRegister;
