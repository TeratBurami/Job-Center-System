import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';

export default function Nav(){
    return(
        <div className="absolute">
            <Link to='/'><HomeIcon/></Link>
        </div>
    )
}