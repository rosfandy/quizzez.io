import { Link } from "react-router-dom";

export default function Navbar(){
    return(
        <div className="Navbar fixed w-full bg-white">
            <div className="flex justify-between px-24 py-4 items-center">
                <div className="text-[20px] font-bold">Quizzes.io</div>
                <div className="gap-x-4 flex items-center">
                    <Link to="/login"><button className="border px-6 py-2 rounded-md font-normal text-[12px] text-[#2B78E4] border-[#2B78E4]">Login</button></Link>
                    <Link to="/"><button className="bg-[#2B78E4] text-white py-2 px-4 rounded-md text-[12px]">Get Started</button></Link>
                </div>
            </div>
        </div>
    )
}