import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from 'react-router-dom';
import StatsMaster from "../components/stats/StatsMaster";


function DashBoardPage() {

    const navigate = useNavigate()
    const {user, logout} = useContext(UserContext)

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <div>
            <h1>Welcome {user?.name}</h1>
            <button onClick={handleLogout}>Log out</button>
            <StatsMaster />
        </div>
    )
}

export default DashBoardPage