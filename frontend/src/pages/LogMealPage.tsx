import MealLog from "../components/mealLogs/MealLog"
import Header from "../components/layout/Header";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";


export default function LogMealPage() {

    const navigate = useNavigate()
    const {logout} = useContext(UserContext)

    const headerButtons = [
        {
            label: "View Dashboard",
            onClick: () => navigate("/dashboard"),
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
            <MealLog/>
        </>
    )
}
