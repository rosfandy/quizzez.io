import Navbar from "../components/Navbar.jsX";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { toast,ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import TextInput from '../components/FloatingLabel';
import axios from "axios";

export default function Login(){
    const [dataInput, setDataInput] = useState({})
    const [formData, setFormData] = useState({});
    let navigate = useNavigate();

    const routeChange = () => {
        let path = `/dashboard`;
        navigate(path);
    };
    
    useEffect(()=>{
        const mergedData = { ...formData, ...dataInput };
        setFormData(mergedData);
    }, [dataInput])

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("submit: ",formData)
        try {
            const response = await axios.post('http://localhost:3000/api/login', formData, {
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Credentials': true
                }
            });
            
            localStorage.setItem('username',response.data.username)
            localStorage.setItem('authToken', response.data.token);
            
            await new Promise((resolve) => {
                toast.success("Login Sukses !", {
                    onClose: resolve 
                });
            });
            
            routeChange(); 

        } catch (error) {
            toast.error(error.response.data.message);
        }
    };


    return(
        <div className="bg-[#FAFAFC] min-h-screen ">
            <Navbar/>
            <div className="items-center justify-center flex min-h-screen">
                <div className="Form items-center px-16 mt-8 py-12 bg-white justify-center text-center shadow-lg rounded-md">
                    <div className="">
                        <div className="font-bold text-[26px]">Lets Sign you In</div>
                        <div className="mt-2">Welcome Back,<br/> You have been missed</div>
                    </div>
                    <form onSubmit={handleSubmit} action="" className="flex flex-col gap-y-3 mt-8 max-w-[100%] my-auto ">
                        <TextInput setInput={setDataInput} type="email" name="email" label="Email" />
                        <TextInput setInput={setDataInput} type="password" name="password" label="Password" />
                        <button className="mt-6 bg-[#2B78E4] text-white py-1.5 text-[14px] rounded-md">Sign In</button>
                    </form>
                    <div className="mt-8 font-light text-[14px]">Don’t have an account ? <Link to="/register"><span className="font-semibold cursor-pointer">Register Now</span></Link></div>
                </div>
            </div>    
            <ToastContainer />

        </div>
    )
}