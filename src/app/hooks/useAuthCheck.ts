import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export function useAuthCheck() {
  const router = useRouter();
  const [authDataString, setAuthDataString] = useState<string | null>(null);
  const [authDataLoaded, setAuthDataLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const authDataString = localStorage.getItem("authData");
      setAuthDataString(authDataString);
      setAuthDataLoaded(true);
    }
  }, []);

  useEffect(() => {
    console.log(authDataString);
    if (authDataLoaded) {
      if (authDataString !== null) {
        const authData = JSON.parse(authDataString);
        console.log(authData);
        axios
          .post("http://localhost:8080/api/isAuthenticated", authData, {})
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        router.push("/login");
      }
    }
  }, [authDataString, authDataLoaded, router]);

  return { authDataString, authDataLoaded };
}
