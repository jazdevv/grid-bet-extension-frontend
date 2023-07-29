import { useState } from "react"
import axios from "axios";
export default function Login({setJwtCookie}){
    const [email, setEmail] = useState('test@gmail.com');
    const [password, setPassword] = useState('passw0rd');
    const [error,setError] = useState(false);
    function onChangeEmail (e) {
        setError(false);
        setEmail(e.target.value);
    }

    function onChangePassword (e) {
        setError(false);
        setPassword(e.target.value);
    }

    async function onSubmit (){
        try{
            const data = await axios({
                url:"http://127.0.0.1:8080/auth/login",
                method:"POST",
                data:{
                    email,
                    password
                },
                withCredentials: true
            })
            const jwtbet = data.data;
            localStorage.setItem("jwtbet",jwtbet);
            setJwtCookie(jwtbet);
        }catch(err){
            console.log(err);
            setError(true);

        }
        
    }

    return <div className='text-white h-full w-full flex flex-col items-center gap-2'>
        <div className='text-white text-3xl font-bold'>LOGIN</div>
        {error ? <div className="px-5 w-full items-center pt-2">
            <div className="bg-red-500 py-2.5 rounded-lg flex justify-center">
                <div className="font-bold">
                    Invalid Email or Password
                </div>
            </div>
        </div> : <></>}
        <div className="px-5 py-5">
            <label className="font-semibold text-sm textwhite pb-1 block">Email</label>
            <input onChange={onChangeEmail} value={email} type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full text-gray-900" />
            <label className="font-semibold text-sm textwhite pb-1 block">Password</label>
            <input onChange={onChangePassword} value={password} type="password" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full text-gray-900" />
            <button onClick={onSubmit} type="button" className="transition duration-200 bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                <span className="inline-block mr-2">Login</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </button>
      </div>
    </div>
}