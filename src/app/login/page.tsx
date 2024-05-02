"use client";

import React from "react";
import axios from "axios";
import Image from "next/image";
import { LoginRequest } from "@/models/LoginRequest";
import { AuthCheck } from "@/models/AuthCheck";
import { useRouter } from "next/navigation";

export default function Auth() {
  const [students, setStudents] = React.useState<Number | null>(null);
  const [users, setUsers] = React.useState(null);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const router = useRouter();

  function login() {
    let loginRequest = {
      username: username,
      password: password,
    } as LoginRequest;
    axios
      .post("http://localhost:8080/api/login", loginRequest, {})
      .then(function (response) {
        // console.log(response);
        let AuthCheck = {
          token: response.data.token,
          username: username,
        } as AuthCheck;
        localStorage.setItem("authData", JSON.stringify(AuthCheck));
        router.replace("/profile");
      })
      .catch(function (error) {
        console.log(error.response.data.error);
        const errorResponse = error.response.data.error;
        setErrorMessage(errorResponse);
      });
  }

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/info");
        const { students, users } = response.data;
        setStudents(students);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData().then();
  }, []);

  return (
    <main className="bg-gradient-to-tl from-slate-50 via-25% via-cyan-600 to-blue-700 w-screen h-screen flex items-center justify-center">
      <div className="w-4/6 h-4/5 flex rounded-3xl border-white border-8 shadow-2xl shadow-indigo-950 p-2 bg-white bg-opacity-20">
        <section className="h-full w-3/5">
          <form
            className="flex flex-col items-center justify-center w-full h-full px-8"
            onSubmit={(e) => {
              login();
              e.preventDefault();
            }}
          >
            <div className="w-full h-1/6 flex flex-col justify-center items-center">
              <div className="w-full"></div>
              <h1 className="text-white font-mono text-4xl font-bold">
                Vitajte späť!
              </h1>
            </div>
            <div className="flex flex-col w-full h-1/3 justify-center items-center space-y-6">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-3/4 h-10 bg-white rounded-xl shadow-md pl-4 placeholder:text-blue-500"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-3/4 h-10 bg-white rounded-xl shadow-md pl-4 placeholder:text-blue-500"
              />
              <button
                className="w-2/5 h-6 bg-transparent text-white text-base rounded-lg pt-4"
                type={"button"}
              >
                Zabudli ste heslo?
              </button>
            </div>
            <div className="flex flex-col w-full h-2/6 justify-around items-center">
              <div className="flex flex-col items-center  w-3/5">
                {errorMessage && (
                  <p className="text-center text-sm text-red-500 bg-red-200 bg-opacity-70 border-2 border-white rounded-xl shadow-md">
                    {errorMessage ? `${errorMessage}` : null}
                  </p>
                )}
              </div>
              <button
                className="w-1/2 h-12 bg-white text-blue-500 bg-opacity-70 text-lg font-bold border-2 border-white rounded-xl shadow-md"
                type={"submit"}
              >
                Prihlásiť sa
              </button>
            </div>
          </form>
        </section>

        <section className="h-full w-2/5 rounded-2xl border-white bg-login-form-img bg-cover bg-center">
          <div className="w-full h-2/3 flex flex-col justify-start items-center p-4 pt-8 space-y-4">
            <h2 className="text-2xl p-2 rounded-xl bg-white bg-opacity-75 text-blue-500 text-center mx-8 border-2 border-white">
              Zaregistrujte sa do nášho Bootcampu!{" "}
              {students
                ? `Momentálne máme ${students} študentov`
                : "Načítavanie..."}
            </h2>
          </div>
          <div className="w-full h-1/3 flex justify-center items-center border-t-2 border-white">
            <button
              className="w-1/2 h-12 bg-white text-blue-500 bg-opacity-75 text-lg font-bold border-2 border-white rounded-xl shadow-md"
              type={"button"}
            >
              Zaregistrovať sa
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
