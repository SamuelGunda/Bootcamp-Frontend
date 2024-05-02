"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faPeopleGroup, faIdCard } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const router = useRouter();
  function logout() {
    localStorage.removeItem("authData");
    router.push("/login");
  }

  return (
    <nav
      className={
        "bg-[#FAF9F6] bg-opacity-20 h-screen flex flex-col justify-between min-w-[280px] w-[280px]  shadow-xl shadow-indigo-950"
      }
    >
      <header
        className={"h-1/6 w-full flex flex-col justify-center items-center p-2"}
      >
        <div
          className={
            "flex justify-center items-center w-full h-full border-b-2 border-white"
          }
        >
          <Image
            src={"/assets/images/kasv-logo.png"}
            width={60}
            height={60}
            alt={"KASV Logo"}
          ></Image>
          <div>
            <h1 className="text-lg text-white font-bold ml-1">
              Košická akadémia softvérového vývoja
            </h1>
            <h2 className="text-md text-white ml-1">Bootcamp</h2>
          </div>
        </div>
      </header>

      <section
        className={
          "h-4/6 w-full flex flex-col justify-center items-start p-1 space-y-2"
        }
      >
        <ul className="w-full flex flex-col justify-start items-center space-y-2">
          <li className="w-full h-12 button-light-mode">
            <Link
              className="h-full w-full flex justify-start items-center"
              href="../profile"
            >
              <FontAwesomeIcon className="size-[32px] p-2" icon={faUser} />
              <span>Profil</span>
            </Link>
          </li>
          <li className="w-full h-12 button-light-mode">
            <Link
              className="h-full w-full flex justify-start items-center"
              href="../profile/student-list"
            >
              <FontAwesomeIcon
                className="size-[32px] p-2"
                icon={faPeopleGroup}
              />
              <span>Výpis študentov</span>
            </Link>
          </li>
          <li className="w-full h-12 button-light-mode ">
            <Link
              className="h-full w-full flex justify-start items-center"
              href="../profile/student-register"
            >
              <FontAwesomeIcon className="size-[32px] p-2" icon={faIdCard} />
              <span>Registrácia študenta</span>
            </Link>
          </li>
          <li className="w-full h-12 button-light-mode">
            <Link
              className="h-full w-full flex justify-start items-center"
              href="https://www.instagram.com/samuell_gunda/"
            >
              <FontAwesomeIcon className="size-[32px] p-2" icon={faInstagram} />
              <span>Hod mi like na IG</span>
            </Link>
          </li>
        </ul>
        <ul className=" w-full flex flex-col justify-around items-start space-y-2">
          <li className="w-full h-12 button-light-mode">
            <Link
              className="h-full w-full flex justify-start items-center"
              href="https://www.instagram.com/kosickaitakademia/"
            >
              <FontAwesomeIcon className="size-[35px] p-2" icon={faInstagram} />
              <span>Instagram</span>
            </Link>
          </li>
          <li className="w-full h-12 button-light-mode">
            <Link
              className="h-full w-full flex justify-start items-center"
              href="https://www.facebook.com/kosickaakademia/"
            >
              <FontAwesomeIcon className="size-[35px] p-2" icon={faFacebookF} />
              <span>Facebook</span>
            </Link>
          </li>
        </ul>
      </section>
      <footer
        className={"h-1/6 w-full flex flex-col justify-around items-end p-2"}
      >
        <div className=" w-full border-t-2 border-white"></div>
        <button className="w-full h-12 button-light-mode" onClick={logout}>
          Log Out
        </button>
      </footer>
    </nav>
  );
}

export default Navbar;
