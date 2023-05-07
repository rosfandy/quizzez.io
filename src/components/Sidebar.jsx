import { useState } from "react";
import { MdSpaceDashboard, MdHistory } from "react-icons/md";

export default function Sidebar(props) {
    const [active, setActive] = useState("Dashboard")
    
    const handleSetActive = (name) => {
        setActive(name)
        props.setActive(name)
    }

    return(
        <div className="sidebar shadow-md min-h-screen bg-white z-50 px-8 ">
            <div className="py-8 text-[#696F79] font-bold text-[24px]">Quizzes</div>
            <div className="menu-bar gap-y-6 flex flex-col">
                <button 
                    onClick={() => handleSetActive("Dashboard")} 
                    className={`flex items-center gap-x-2 py-3 pl-8  ${
                        active === "Dashboard" 
                            ? "text-white bg-blue-500 rounded-2xl transition-all duration-300" 
                            : "text-[#696F79] transition-all duration-300"
                    }`}
                >
                    <MdSpaceDashboard size={20}/>
                    <div className="text-[16px] font-semibold">Dashboard</div>
                </button>
                <button 
                    onClick={() => handleSetActive("History")} 
                    className={`flex items-center gap-x-2 py-3 pl-8 ${
                        active === "History" 
                            ? "text-white bg-blue-500 rounded-2xl transition-all duration-300" 
                            : "text-[#696F79] transition-all duration-300"
                    }`}
                >
                    <MdHistory size={20}/>
                    <div className="text-[16px] font-semibold">History</div>
                </button>
            </div>
        </div>
    )
}
