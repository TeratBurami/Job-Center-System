import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Menu(){

    const [userRole, setRole] = useState('');
    useEffect(() => {
        const role = localStorage.getItem('user_role');
        if (role !== null) {
            setRole(role);
        }
        console.log(role);
    }, []);

    return(
        <div className="my-10">
            <h1 className="text-2xl font-bold text-center">Menu</h1>
            <div className="py-10 w-2/3 justify-start gap-20 flex flex-wrap rounded-xl mx-auto">
                {userRole !== 'employer' && (
                    <div className="w-32 p-2 rounded bg-slate-100 shadow shadow-black flex flex-col place-items-center">
                        <div className="w-20 h-20 rounded bg-slate-300"></div>
                        <Link to="/job" className="mt-2 p-1 rounded text-white bg-blue-600">Find Job</Link>
                    </div>
                )}
                {userRole !== 'applicant' && (
                    <div className="w-32 p-2 rounded bg-slate-100 shadow shadow-black flex flex-col place-items-center">
                        <div className="w-20 h-20 rounded bg-slate-300"></div>
                        <Link to='/job_emp' className="mt-2 p-1 rounded text-white bg-blue-600">Job posting</Link>
                    </div>
                )}
                <div className="w-32 p-2 rounded bg-slate-100 shadow shadow-black flex flex-col place-items-center">
                    <div className="w-20 h-20 rounded bg-slate-300"></div>
                    <Link to='/interview' className="mt-2 p-1 rounded text-white bg-blue-600">Interview</Link>
                </div>

                <div className="w-32 p-2 rounded bg-slate-100 shadow shadow-black flex flex-col place-items-center">
                    <div className="w-20 h-20 rounded bg-slate-300"></div>
                    <Link to="/setting" className="mt-2 p-1 rounded text-white bg-blue-600">Setting</Link>
                </div>
            </div>
        </div>
    )
}