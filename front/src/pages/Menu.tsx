import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";

import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import SettingsIcon from '@mui/icons-material/Settings';
import PostAddIcon from '@mui/icons-material/PostAdd';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

export default function Menu(){

    const [userRole, setRole] = useState('');
    useEffect(() => {
        const role = localStorage.getItem('user_role');
        if (role !== null) {
            setRole(role);
        }
    }, []);

    return(
        <div>
            <Nav></Nav>
            <div className="my-10">
                <h1 className="text-4xl font-bold text-center">Menu</h1>
                <div className="py-10 w-2/3 justify-center gap-20 flex flex-wrap rounded-xl mx-auto">
                    {userRole !== 'employer' && (
                        <div className="w-32 p-2 rounded bg-slate-100 shadow shadow-black flex flex-col place-items-center">
                            <BusinessCenterIcon color="primary" sx={{ fontSize: 50 }} />
                            <Link to="/job" className="mt-2 p-1 rounded text-blue-600 underline underline-offset-4">Find Job</Link>
                        </div>
                    )}
                    {userRole !== 'applicant' && (
                        <div className="w-32 p-2 rounded bg-slate-100 shadow shadow-black flex flex-col place-items-center">
                            <PostAddIcon color="primary" sx={{ fontSize: 50,marginLeft: '10px' }} />
                            <Link to='/job_emp' className="mt-2 p-1 rounded text-blue-600 underline underline-offset-4">Job posting</Link>
                        </div>
                    )}
                    <div className="w-32 p-2 rounded bg-slate-100 shadow shadow-black flex flex-col place-items-center">
                        <NotificationsActiveIcon color="primary" sx={{ fontSize: 50}} />
                        <Link to='/notification' className="mt-2 p-1 rounded text-blue-600 underline underline-offset-4">Notification</Link>
                    </div>
                    <div className="w-32 p-2 rounded bg-slate-100 shadow shadow-black flex flex-col place-items-center">
                        <RecordVoiceOverIcon color="primary" sx={{ fontSize: 50 , marginLeft: '15px'}} />
                        <p className="mt-2 p-1 rounded text-blue-600 underline underline-offset-4">Interview</p>
                    </div>
                    <div className="w-32 p-2 rounded bg-slate-100 shadow shadow-black flex flex-col place-items-center">
                        <SettingsIcon color="primary" sx={{ fontSize: 50 }} />
                        <p className="mt-2 p-1 rounded text-blue-600 underline underline-offset-4">Setting</p>
                    </div>
                </div>
            </div>
        </div>
    )
}