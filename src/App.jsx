import illustration from "./assets/img/Mask.png"
import Navbar from './components/Navbar.jsX'
import { Link } from "react-router-dom";

export default function App() {
  return (
    <div className="">
      <Navbar/>
      <div className="App bg-[#FAFAFC] min-h-screen ">
        <div className="flex bg-red py-16 gap-x-2 justify-center items-center pt-32">
          <div className="flex flex-col">
            <div className="text-[54px] font-bold w-[70%] tracking-wider leading-[60px]">Take Online Quizzes.</div>
            <div className="font-light text-[20px]  pt-4">Finish your exam, quizzes, task from everywhere</div>
            <Link to="/register"><button className="bg-[#2B78E4] mt-8 text-white rounded-md py-2 w-[25%]">Join</button></Link>
          </div>
          <img src={illustration} className="w-[30%]" alt="" />
        </div>
      </div>
    </div>
  )
}