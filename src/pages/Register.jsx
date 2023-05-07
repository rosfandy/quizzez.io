import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextInput from '../components/FloatingLabel';
import Navbar from '../components/Navbar.jsX';

export default function Register() {
  const [dataInput, setDataInput] = useState({})
  const [formData, setFormData] = useState({});

  useEffect(()=>{
    const mergedData = { ...formData, ...dataInput };
    setFormData(mergedData);
  }, [dataInput])

  const handleSubmit = async (event) => {
    event.preventDefault();
    let res = ""
    try {
        console.log("submit: ",formData)
        res = await axios.post('http://localhost:3000/api/register', formData, {
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Credentials': true
            }
        });      
        toast.success('Registration successful!');
        
    } catch (error) {
        console.error(error);
        toast.error('Registration failed!');
    }
    console.log(res.data)
  };

  return (
    <div className="bg-[#FAFAFC] min-h-screen ">
    <Navbar/>
    <ToastContainer />
      <div className="items-center justify-center flex min-h-screen">
        <div className="Form items-center px-16 mt-12 py-8 bg-white justify-center text-center shadow-lg rounded-md">
          <div className="">
            <div className="font-bold text-[26px]  text-center justify-center flex">
              <div className="w-[90%]">Lets Register Account</div>
            </div>
            <div className="mt-2 text-center justify-center flex">
              <div className=" w-[80%] ">Hello user , you have a greatful journey</div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-y-3 mt-8 max-w-[100%] my-auto ">
            <TextInput setInput={setDataInput} type="text" name="username" label="Username" />
            <TextInput setInput={setDataInput} type="email" name="email" label="Email" />
            <TextInput setInput={setDataInput} type="password" name="password" label="Password" />
            <button className="mt-6 bg-[#2B78E4] text-white py-1.5 text-[14px] rounded-md">Sign In</button>
          </form>
          <div className="mt-8 font-light text-[14px]">Already have an account ?<Link to="/login"> <span className="font-semibold cursor-pointer">Login Now</span></Link></div>
        </div>
      </div>
    </div>
  )
}
