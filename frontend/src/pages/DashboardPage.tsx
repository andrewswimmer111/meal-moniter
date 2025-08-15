import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from 'react-router-dom';
import StatsMaster from "../components/stats/StatsMaster";
import Header from "../components/layout/Header";


function DashBoardPage() {

    const navigate = useNavigate()
    const {user, logout} = useContext(UserContext)

    const headerButtons = [
        {
            label: "Record meal",
            onClick: () => navigate("/logmeal"),
        },
        {
            label: "View history",
            onClick: () => navigate("/history"),
        },
        {
            label: "Log out",
            onClick: () => {logout(); navigate("/")},
        },
    ];

    return (
        <>
            <Header buttons={headerButtons}/> 
            <div className="dashboard-page">
                <h1 className="dashboard-welcome">Welcome {user?.name}</h1>
                <StatsMaster />
            </div>
        </>
    )
}

export default DashBoardPage