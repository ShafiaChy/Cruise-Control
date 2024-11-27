import { useEffect, useState } from "react";
import {
  FaUser,
  FaChevronDown,
  FaTimes,
  FaBars,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";
import { LuBike } from "react-icons/lu";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { logout, useCurrentUser } from "../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { FlipLink } from "../utils/flipLink";
import Tooltip from "../utils/tootip";
import Logo from '../assets/car-logo.png'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isUser = useAppSelector(useCurrentUser);

  const toggleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const location = useLocation();
  const isAboutActive =
    location.pathname.startsWith("/about/who-are-we") ||
    location.pathname.startsWith("/about/history");

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 pt-4 ${
        scrolled ? "bg-gray-900 shadow-lg" : "bg-transparent"
      }`}
    >
      {/* <nav className="fixed top-0 left-0 right-0 z-50  pt-4 pb-0 bg-transparent "> */}
      <div className="hidden md:block ">
        <div className="grid grid-cols-4 items-center py-2 px-6 border-b border-gray-500   lg:w-11/12 w-full mx-auto">
          {/* Left side (logo) */}
          <div className="flex items-center text-white tracking-wide font-teko">
            <img src={Logo} className="w-14 h-14 mr-2" />
            <div className="text-4xl text-orange-500">Cruise Control</div>
          </div>

          {/* Center (menu) */}
          <div className="flex col-span-2 justify-between items-center text-sm px-6">
            <ul className="flex space-x-1 list-none">
              <li className="relative group text-white hover:text-orange-500 duration-300 px-4">
                <NavLink
                  to="/"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-orange-500" : ""
                  }
                >
                  HOME
                </NavLink>
                <span className="absolute left-1/2 -top-5 w-0 h-1 bg-orange-500n group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
              </li>

              {/* <li className="relative group text-white hover:text-orange-500 duration-300 px-4">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `flex items-center justify-between cursor-pointer ${
                      isActive ? "text-orange-500" : ""
                    }`
                  }
                >
                  ABOUT
                  <span className="absolute left-1/2 -top-5 w-0 h-1 bg-custom-green group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
                  <FaChevronDown className="ml-2 w-3 h-3" />
                </NavLink>
                <ul className="absolute z-50 left-0 top-full mt-2 w-40 bg-gray-800 text-white opacity-0 group-hover:opacity-100 transform scale-y-0 group-hover:scale-y-100 origin-top transition-all duration-300 ease-in-out">
                  <li className="px-4 py-2 hover:bg-gray-700 hover:text-orange-500">
                    <NavLink
                      to="/about/who-are-we"
                      className={({ isActive }) =>
                        `cursor-pointer ${isActive ? "text-orange-500" : ""}`
                      }
                    >
                      WHO ARE WE
                    </NavLink>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-700 hover:text-orange-500">
                    <NavLink
                      to="/about/history"
                      className={({ isActive }) =>
                        `cursor-pointer ${isActive ? "text-orange-500" : ""}`
                      }
                    >
                      OUR HISTORY
                    </NavLink>
                  </li>
                </ul>
              </li> */}
              <li className="relative group text-white hover:text-orange-500 duration-300 px-4">
                <div
                  className={`flex items-center justify-between cursor-pointer ${
                    isAboutActive ? "text-orange-500" : ""
                  }`}
                >
                  ABOUT
                  <span className="absolute left-1/2 -top-5 w-0 h-1 bg-orange-500 group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
                  <FaChevronDown className="ml-2 w-3 h-3" />
                </div>
                <ul className="absolute z-50 left-0 top-full mt-2 w-40 bg-transparent text-white opacity-0 group-hover:opacity-100 transform scale-y-0 group-hover:scale-y-100 origin-top transition-all duration-300 ease-in-out">
                  <li className="px-4 py-2 hover:bg-gray-700 hover:text-orange-500">
                    <NavLink
                      to="/about/who-are-we"
                      className={({ isActive }) =>
                        `cursor-pointer ${isActive ? "text-orange-500" : ""}`
                      }
                    >
                      WHO ARE WE
                    </NavLink>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-700 hover:text-orange-500">
                    <NavLink
                      to="/about/history"
                      className={({ isActive }) =>
                        `cursor-pointer ${isActive ? "text-orange-500" : ""}`
                      }
                    >
                      OUR HISTORY
                    </NavLink>
                  </li>
                </ul>
              </li>

              <li className="relative group text-white hover:text-orange-500 duration-300 px-4 cursor-pointer">
                <NavLink
                  to="/bike-listing"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-orange-500" : ""
                  }
                >
                  BIKE LISTING
                </NavLink>
                <span className="absolute left-1/2 -top-5 w-0 h-1 bg-orange-500 group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
              </li>
              {isUser && (
                <li className="relative group text-white hover:text-orange-500 duration-300 px-4">
                  <NavLink
                    to={`/${isUser?.role}/dashboard`}
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "text-orange-500"
                        : ""
                    }
                  >
                    DASHBOARD
                  </NavLink>
                  <span className="absolute left-1/2 -top-5 w-0 h-1 bg-orange-500 group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
                </li>
              )}

              <li className="relative group text-white hover:text-orange-500 duration-300 px-4 cursor-pointer">
                <NavLink
                  to="/contact-info"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-orange-500" : ""
                  }
                >
                  CONTACT
                </NavLink>
                <span className="absolute left-1/2 -top-5 w-0 h-1 bg-orange-500 group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
              </li>
            </ul>
          </div>

          {/* Right side (Icons) */}
          <div className="flex justify-end items-end text-white">
            {isUser && (
              <>
                <Tooltip text={isUser.email}>
                  <FaUser className="w-5 h-5 cursor-pointer" />
                </Tooltip>
              </>
            )}
            <AnimatePresence>
              {isUser ? (
                <motion.div
                  key="logout"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  onClick={() => dispatch(logout())}
                  className="bg-transparent text-white px-1 py-0 hover:opacity-90 border-transparent hover:border-b hover:border-orange-500 text-sm cursor-pointer transition-opacity"
                >
                  LOGOUT
                </motion.div>
              ) : (
                <motion.div
                  key="auth-options"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="flex items-end  "
                >
                  <button className="hover:border-orange-700 border-2 rounded-md bg-orange-500 py-3"><FlipLink  href="/login">login</FlipLink></button>
               
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Navigation Links */}
      </div>

      {/* Responsive Navbar for Medium and Smaller Devices */}
      <div className="md:hidden  grid grid-cols-3 items-center px-2 ">
        {/* Left side (User and Cart Icons) */}
        {/* <div className="flex items-center space-x-1 text-white">
          <FaUser className="w-5 h-5" />
          <FaShoppingCart className="w-5 h-5" />
        </div> */}
        <div className="flex items-center space-x-4 text-white">
          {isUser ? (
            <>
              <Tooltip text={isUser.email}>
                <FaUser className="w-5 h-5 cursor-pointer" />
              </Tooltip>
              <Tooltip text="Logout">
                <FaSignOutAlt
                  className="w-5 h-5 cursor-pointer hover:text-orange-500"
                  onClick={handleLogout}
                />
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip text="Login">
                <Link to="/login">
                  <FaSignInAlt className="w-5 h-5 cursor-pointer hover:text-orange-500" />
                </Link>
              </Tooltip>
              <Tooltip text="Sign Up">
                <Link to="/signup">
                  <FaUserPlus className="w-5 h-5 cursor-pointer hover:text-orange-500" />
                </Link>
              </Tooltip>
            </>
          )}
        </div>

        {/* Center (Logo) */}
        <Link
          to="/"
          className="flex justify-center items-center text-white tracking-wide font-teko "
        >
          <LuBike className="w-7 h-7 mr-2" />
          <div className="text-4xl text-orange-500">RideON</div>
        </Link>
        {/* </div> */}

        {/* Right side (Hamburger Menu) */}
        <div
          className="flex justify-end text-white cursor-pointer"
          onClick={toggleMenu}
        >
          {isOpen ? (
            <FaTimes
              className="w-6 h-6 
           transform   
           transition-transform duration-500 ease-in-out opacity-100"
            />
          ) : (
            <FaBars
              className="w-6 h-6 
           transform  
           transition-transform duration-500 ease-in-out opacity-100"
            />
          )}
        </div>
      </div>

      {/* Slide-out Menu responsive */}
      <div
        className={`md:hidden fixed top-0 pt-10 -z-20 right-0 w-64 h-full bg-orange-950 text-white transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-500 ease-in-out z-50`}
      >
        <ul className="flex flex-col space-y-4 mt-16 px-6 ">
          <li className="relative group text-white hover:text-orange-500 duration-300 px-4 cursor-pointer">
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-orange-500" : ""
              }
            >
              HOME
            </NavLink>
          </li>

          {/* <li className="relative group hover:text-orange-500 duration-300 px-4">
            <span className="flex items-center">
              <NavLink
                to=""
                className={({ isActive }) =>
                  isActive ? "text-orange-500" : ""
                }
              >
                ABOUT
              </NavLink>
              <FaChevronDown className="ml-2" onClick={toggleSubmenu} />
            </span>
            <ul
              className={`pl-4 space-y-2 text-white overflow-hidden ${
                isSubmenuOpen
                  ? "py-4 max-h-60 opacity-100"
                  : "max-h-0 opacity-0"
              } transform origin-top transition-all duration-700 ease-in-out`}
            >
              <li className="hover:bg-gray-800 hover:text-orange-500 px-2 py-1">
                <NavLink
                  to="/about/who-are-we"
                  className={({ isActive }) =>
                    isActive ? "text-orange-500" : ""
                  }
                >
                  WHO ARE WE
                </NavLink>
              </li>
              <li className="hover:bg-gray-800 hover:text-orange-500 px-2 py-1">
                <NavLink
                  to="/about/history"
                  className={({ isActive }) =>
                    isActive ? "text-orange-500" : ""
                  }
                >
                  OUR HISTORY
                </NavLink>
              </li>
            </ul>
          </li> */}

          <li
            className={`relative group duration-300 px-4 ${
              isAboutActive ? "text-orange-500" : "hover:text-orange-500"
            }`}
          >
            <span className="flex items-center">
              <div className={isAboutActive ? "text-orange-500" : ""}>
                ABOUT
              </div>
              <FaChevronDown
                className="ml-2 cursor-pointer"
                onClick={toggleSubmenu}
              />
            </span>
            <ul
              className={`pl-4 space-y-2 text-white overflow-hidden ${
                isSubmenuOpen
                  ? "py-4 max-h-60 opacity-100"
                  : "max-h-0 opacity-0"
              } transform origin-top transition-all duration-700 ease-in-out`}
            >
              <li className="hover:bg-gray-800 hover:text-orange-500 px-2 py-1">
                <NavLink
                  to="/about/who-are-we"
                  className={({ isActive }) =>
                    isActive ? "text-orange-500" : ""
                  }
                >
                  WHO ARE WE
                </NavLink>
              </li>
              <li className="hover:bg-gray-800 hover:text-orange-500 px-2 py-1">
                <NavLink
                  to="/about/history"
                  className={({ isActive }) =>
                    isActive ? "text-orange-500" : ""
                  }
                >
                  OUR HISTORY
                </NavLink>
              </li>
            </ul>
          </li>

          <li className="relative group hover:text-orange-500 duration-300 px-4  cursor-pointer">
            <NavLink
              to="/bike-listing"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-orange-500" : ""
              }
            >
              BIKE LISTING
            </NavLink>
          </li>

          {isUser && (
            <li className="relative group hover:text-orange-500 duration-300 px-4 cursor-pointer">
              <NavLink
                to={`/${isUser?.role}/dashboard`}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "text-orange-500" : ""
                }
              >
                DASHBOARD
              </NavLink>
            </li>
          )}

          <li className="relative group hover:text-orange-500 duration-300 px-4 cursor-pointer">
            <NavLink
              to="/contact-info"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-orange-500" : ""
              }
            >
              CONTACT
            </NavLink>
          </li>

          {/* Conditional Rendering for Auth Options */}
          {isUser ? (
            <li className="relative group hover:text-orange-500 duration-300 px-4 cursor-pointer">
              <span onClick={handleLogout}>LOGOUT</span>
            </li>
          ) : (
            <>
              <li className="relative group hover:text-orange-500 duration-300 px-4 cursor-pointer">
                <NavLink
                  to="/login"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-orange-500" : ""
                  }
                >
                  LOGIN
                </NavLink>
              </li>
              <li className="relative group hover:text-orange-500 duration-300 px-4 cursor-pointer">
                <NavLink
                  to="/signup"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-orange-500" : ""
                  }
                >
                  SIGNUP
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};
