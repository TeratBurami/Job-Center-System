import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Nav(){

    const handleLogout = () => {
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_role");
        window.location.href = "/";
    }

    return(
        <div className="absolute top-0 right-0 p-2">
            <div className="flex">
                <Link to='/'><HomeIcon fontSize='large' color='primary'/></Link>
                <Button onClick={handleLogout}><LogoutIcon color='primary' /></Button>
            </div>
        </div>
    )
}