import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Menu(){
    const [userRole, setUserRole] = useState<string | null>(null);

    const fetchData = async () => {
        try {
          const response = await fetch('https://job-center-system-api.vercel.app/api/applicant');
          const result = await response.json();
          console.log('Serverless function result:', result);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        const role = localStorage.getItem('userRole'); 
        setUserRole(role);
    }, []);

    return(
        <div className="my-10">
            <h1 className="text-2xl font-bold text-center">Menu</h1>
            <div className="py-10 w-2/3 justify-start gap-20 flex flex-wrap rounded-xl mx-auto">
                <div className="w-32 p-2 rounded bg-slate-100 shadow shadow-black flex flex-col place-items-center">
                    <div className="w-20 h-20 rounded bg-slate-300"></div>
                    <Link to="/job" className="mt-2 p-1 rounded text-white bg-blue-600">Find Job</Link>
                </div>
                <div className="w-32 p-2 rounded bg-slate-100 shadow shadow-black flex flex-col place-items-center">
                    <div className="w-20 h-20 rounded bg-slate-300"></div>
                    <Link onClick={fetchData} className="mt-2 p-1 rounded text-white bg-blue-600" to='/'>Interview</Link>
                </div>

                <div className="w-32 p-2 rounded bg-slate-100 shadow shadow-black flex flex-col place-items-center">
                    <div className="w-20 h-20 rounded bg-slate-300"></div>
                    <Link hidden={userRole=="Employer"} to="/setting" className="mt-2 p-1 rounded text-white bg-blue-600">Setting</Link>
                </div>
            </div>
        </div>
    )
}