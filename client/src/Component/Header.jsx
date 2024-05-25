// import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
//import DarkMode from "./DarkMode/DarkMode/DarkMode";
//import { useEffect } from "react";
//import { IonIcon } from 'ionicons/icons';
export default function Header({ isFixed }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State to manage menu toggle
  const { userRole } = useAuth();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const toggleDropdown2 = () => {
    setIsOpen2(!isOpen2);
  };
  const toggleDropdown3 = () => {
    setIsOpen3(!isOpen3);
  };
  const onMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  // const [searchTerm, setSearchTerm] = useState("");
  //const navigate = useNavigate(); // Use useNavigate hook

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const urlParams = new URLSearchParams(window.location.search);
  //   urlParams.set("searchTerm", searchTerm);
  //   const searchQuery = urlParams.toString();
  //   navigate(`/search?${searchQuery}`); // Use navigate function
  // };
  // useEffect(() => {
  //   const urlParams = new URLSearchParams(location.search);
  //   const searchTermFromUrl = urlParams.get("searchTerm");
  //   if (searchTermFromUrl) {
  //     setSearchTerm(searchTermFromUrl);
  //   }
  // }, [location.search]);

  return (
    <header
      className={`bg-slate-300 shadow-md absolute ${
        isFixed ? "fixed top-0 w-full z-50" : ""
      }`}
    >
      <nav class="flex justify-between">
        <div className="flex w-[130px] md:w-[200px] justify-between items-center py-4 px-4">
          <Link to="/">
            <h1 className="font-bold text-sm sm:text-xl flex-wrap">
              <span className="text-slate-950 hover:text-blue-700">
                IBS BROKER
              </span>
            </h1>
          </Link>
        </div>

        <div className="flex gap-3 justify-between items-center py-4 px-4">
          <div class="navLinks duration-500 absolute md:static md:w-auto w-full md:h-auto h-[85vh] md:items-center gap-[1.5vw] top-[100%] left-[-100%] px-5 md:py-0 ">
            <ul className="flex md:flex-row flex-col md:items-center md:gap-[2vw] gap-8">
              {/* Hide list on small screens */}
              <Link to="/">
                <li className="relative font-semibold max-w-fit pr-3 md:pr-0 py-1 after:bg-gradient-to-r from-[#db3333] to-[#db3333] after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300">
                  HOME
                </li>
              </Link>
              <Link to="/About">
                <li className="relative font-semibold max-w-fit pr-3 md:pr-0 py-1 after:bg-gradient-to-r from-[#db3333] to-[#db3333]  after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300">
                  ABOUT
                </li>
              </Link>
              <Link to="/Store">
                <li className="relative font-semibold max-w-fit pr-3 md:pr-0 py-1 after:bg-gradient-to-r from-[#db3333] to-[#db3333]  after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300">
                  STORE
                </li>
              </Link>
              <div className="relative">
                <button
                  onClick={toggleDropdown2}
                  className="relative font-semibold max-w-fit pr-3 md:pr-0 py-1 after:bg-gradient-to-r from-[#db3333] to-[#db3333]  after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300"
                >
                  LISTINGS
                </button>
                {isOpen2 && (
                  <ul className="absolute left-0 mt-2 w-36 border rounded-lg shadow-lg z-10 bg-slate-300">
                    <li className="py-2 px-3 text-sm text-gray-700 font-semibold md:pr-0 after:bg-gradient-to-r from-[#db3333] to-[#db3333]  after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300">
                      <Link to="/caristing-only">Car Listing</Link>
                    </li>
                    <li className="py-2 px-3 text-sm text-gray-700 font-semibold md:pr-0 after:bg-gradient-to-r from-[#db3333] to-[#db3333]  after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300">
                      <Link to="/houseisting-only">House Listing</Link>
                    </li>
                  </ul>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={toggleDropdown3}
                  className="relative font-semibold max-w-fit pr-3 md:pr-0 py-1 after:bg-gradient-to-r from-[#db3333] to-[#db3333]  after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300"
                >
                  CONTACT
                </button>
                {isOpen3 && (
                  <ul className="absolute left-0 mt-2 w-36 border rounded-lg shadow-lg z-10 bg-slate-300">
                    <li className="py-2 px-3 text-sm text-gray-700 font-semibold md:pr-0 after:bg-gradient-to-r from-[#db3333] to-[#db3333]  after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300">
                      <Link to="/ContactPage">Contact</Link>
                    </li>
                    <li className="py-2 px-3 text-sm text-gray-700 font-semibold md:pr-0 after:bg-gradient-to-r from-[#db3333] to-[#db3333]  after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300">
                      <Link to="/brokers">Contact Brokers</Link>
                    </li>
                  </ul>
                )}
              </div>
              {/* <Link to="/ContactPage">
                <li className="relative max-w-fit font-semibold pr-3 md:pr-0 py-1 after:bg-gradient-to-r from-[#db3333] to-[#db3333]  after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300">
                  CONTACT
                </li>
              </Link> */}
            </ul>
          </div>
          <div class="flex items-center gap-2">
            <ul className="hidden sm:flex gap-4">
              {userRole === "user" ? (
                <Link to="/profile">
                  <img
                    className="rounded-full h-10 w-10 mt-1 object-cover"
                    src="https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg="
                    alt="profile"
                  />
                </Link>
              ) : userRole === "broker" ? (
                <Link to="/Bprofile">
                  <img
                    className="rounded-full h-10 w-10 object-cover"
                    src="https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg="
                    alt="profile"
                  />
                </Link>
              ) : (
                <Link to="/sign-in">
                  <button className="hover:bg-clip-text hover:text-transparent bg-gradient-to-br from-[#db3333] to-[#db3333]  border-solid border-2 border-[#5356e3]  font-bold text-white px-3 py-2 rounded-full ">
                    Sign in
                  </button>
                </Link>
              )}
              <button
                onClick={toggleDropdown}
                className="hover:bg-clip-text hover:text-transparent bg-gradient-to-br from-[#db3333] to-[#db3333]  border-solid border-2 border-[#5356e3]  font-bold text-white px-3 py-2 rounded-full "
              >
                SignUp
              </button>
              {isOpen && (
                <ul
                  className="absolute ml-19 mt-16 w-30 bg-slate-300 border
        rounded-lg shadow-lg z-10"
                >
                  <li
                    className="py-2 px-3 text-sm text-gray-700 hover:text-red-600 
        ease-in-out delay-150 hover:-translate-y-1 hover:scale-210 duration-300 font-medium"
                  >
                    <Link to="/Sign-up">Signup as Broker</Link>
                  </li>
                  <li
                    className="py-2 px-3 text-sm text-gray-700 hover:text-red-600 
        ease-in-out delay-150 hover:-translate-y-1 hover:scale-210 duration-300 font-medium"
                  >
                    <Link to="/User-Sign-up">Signup as User</Link>
                  </li>
                  {/* <li>
              <DarkMode />
            </li> */}
                </ul>
              )}
            </ul>
            <ion-icon
              name="menu"
              onclick="onMenuToggle(this)"
              class="text-[30px] cursor-pointer md:hidden"
            ></ion-icon>
          </div>
        </div>
      </nav>
    </header>
  );
}
