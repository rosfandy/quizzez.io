import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import MainNav from "../components/MainNav";
import Sidebar from "../components/Sidebar";
import History from "../components/History";
import Quiz from "./Quiz";
import { getToken } from "../getToken";

export default function Dashboard() {
  const [active, setActive] = useState("Dashboard");
  const [isSidebar, setSidebar] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="bg-[#FAFAFC] min-h-screen">
      <ToastContainer />
      <div className="flex">
        <div
          className={`${
            isSidebar ? "translate-x-0" : "-translate-x-full"
          } fixed h-full w-64 bg-white shadow-lg transition-transform ease-in-out duration-300 z-30`}
        >
          <Sidebar setActive={setActive} />
        </div>
        <div className="w-full">
          <MainNav setSidebar={setSidebar} />
          <div className="rounded-2xl">
            {isAuthenticated ? (
              active === "Dashboard" && <Quiz />
            ) : null}
            {!isAuthenticated ? (
              <p>Redirecting to login page...</p>
            ) : null}
            {active === "History" && <History />}
          </div>
        </div>
      </div>
    </div>
  );
}
