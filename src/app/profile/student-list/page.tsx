"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/app/components/navbar";
import { useAuthCheck } from "@/app/hooks/useAuthCheck";
import Transition from "@/app/components/transition";
import { Student } from "@/models/Student";

function StudentList() {
  let [students, setStudents] = React.useState<Student[] | null>(null);
  const { authDataString, authDataLoaded } = useAuthCheck();
  const router = useRouter();

  useEffect(() => {
    if (authDataLoaded) {
      if (authDataString !== null) {
        const authData = JSON.parse(authDataString);
        console.log(authData);
        axios
          .post("http://localhost:8080/api/students", authData, {})
          .then(function (response) {
            console.log(response);
            setStudents(response.data);
            console.log(students);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        router.push("/login");
      }
    }
  }, [authDataLoaded]);

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
          <div className="bg-[#FAF9F6] bg-opacity-20 flex flex-col items-center h-full w-4/5 rounded-2xl shadow-xl shadow-indigo-950 ">
            <div className="bg-white w-full h-24 rounded-t-2xl rounded-bl-[40px] flex items-center pl-8">
              <h1 className="text-blue-500 text-2xl font-bold">Študenti:</h1>
            </div>
            <div className="text-white w-full h-16 rounded-bl-[40px] border-b-2 flex justify-around items-center px-8 ">
              <span className="w-2/5 text-start">Krstné meno:</span>
              <span className="w-2/5 text-start">Priezvisko:</span>
              <span className="w-1/5 text-start">Datum narodenia:</span>
            </div>
            {students === null ? (
              "loading..."
            ) : (
              <ul className="w-full text-center py-4 overflow-x-scroll">
                {students.map((student: Student, index: number) => {
                  const date =
                    student.dob.split(",")[0] + " " + student.dob.split(",")[1];
                  return (
                    <li
                      className={`${index % 2 === 0 ? "bg-[#FAF9F6] bg-opacity-20" : ""} text-white w-full h-8 flex justify-around items-center px-8`}
                      key={student.id}
                    >
                      <span className="w-2/5 text-start">
                        {student.firstName}
                      </span>
                      <span className="w-2/5 text-start">
                        {student.lastName}{" "}
                      </span>
                      <span className="w-1/5 text-start"> {date}</span>
                    </li>
                  );
                })}
              </ul>
            )}
            <div className={"h-6 w-full bg-[#FAF9F6] rounded-b-2xl"}></div>
          </div>
        </div>
      </main>
    </Transition>
  );
}

export default StudentList;
