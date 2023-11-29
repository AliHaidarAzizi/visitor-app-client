import {
  ChevronFirst,
  LogOut,
  LayoutDashboard,
  ChevronLast,
  UserSquareIcon,
} from "lucide-react";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import { viewUser } from "../utils/api/user";

const SidebarContext = createContext();
const Sidebar = ({ children }) => {
  const localStore = localStorage.getItem("sidebarExpanded") == "true";
  const [expanded, setExpended] = useState(localStore);
  const [user, setUser] = useState([]);
  const [email, setEmail] = useState([]);
  const navigate = useNavigate();

  const fetchUser = async () => {
    const userData = await viewUser();
    setUser(userData.data.data.username);
    setEmail(userData.data.data.email);
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const handleClick = () => {
    setExpended((current) => {
      localStorage.setItem("sidebarExpanded", !current);
      return !current;
    });
  };
  const handleLogoButton = () => {
    navigate("/secured");
  };

  const handleLogOut = () => {
    const cookies = new Cookies(null, { path: "/" });
    cookies.remove("token");
    toast.warning("Log out successful", {
      icon: "🔓",
      autoClose: 3000,
    });
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <aside className="h-screen">
      <nav className=" h-full flex flex-col bg-white border-r shadow-sm">
        <div className=" p-4 pb-2 flex justify-between items-center">
          <img
            src="625813f6-ad6e-49d8-aecf-16ca24753ea5.png"
            alt=""
            className={` overflow-hidden cursor-pointer transition-all ${
              expanded ? "w-10" : "w-0"
            }  `}
            onClick={handleLogoButton}
          />
          <button
            onClick={handleClick}
            className=" p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3"> {children} </ul>
        </SidebarContext.Provider>

        <div className=" border-t flex p-3">
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            <div className="leading-4">
              <h4 className=" font-semibold capitalize">{user}</h4>
              <span className=" text-xs text-grey-600">{email}</span>
            </div>

            <LogOut
              className=" hover:text-red-600 hover:scale-110 cursor-pointer"
              size={20}
              title="Log Out"
              onClick={handleLogOut}
            />
          </div>
        </div>
      </nav>
    </aside>
  );
};

const SidebarItem = ({ icon, text, alert, to }) => {
  const { expanded } = useContext(SidebarContext);
  const navigate = useNavigate();
  const location = useLocation();

  // beginner friendly
  // const currentPath = location.pathname
  // const active = currentPath == to

  // advance
  const active = location.pathname == to;

  const handleClick = () => {
    navigate(to);
  };
  return (
    <li
      className={`relative flex item-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600"
      }`}
      onClick={handleClick}
    >
      {icon}
      <span
        className={` overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
        absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </li>
  );
};

const SidebarComponent = () => {
  return (
    <Sidebar>
      <SidebarItem
        icon={<LayoutDashboard size={20} />}
        to="/secured"
        text="Dashboard"
      />
      <SidebarItem
        icon={<UserSquareIcon size={20} />}
        to="/secured/profile"
        text="User"
      />
    </Sidebar>
  );
};

export default SidebarComponent;
