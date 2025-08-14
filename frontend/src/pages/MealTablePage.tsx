import MealTable from "../components/mealHistory/MealTable"
import Header from "../components/layout/Header";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

function MealTablePage() {

    const navigate = useNavigate()  
    const {logout} = useContext(UserContext)

    const headerButtons = [
        {
            label: "View Dashboard",
            onClick: () => navigate("/dashboard"),
        },
        {
            label: "Record Meal",
            onClick: () => navigate("/logmeal"),
        },
        {
            label: "Log out",
            onClick: () => {logout(); navigate("/landing")},
        },
    ]

    return (
        <>
            <Header buttons={headerButtons}/>
            <MealTable></MealTable>
        </>
    )
}

export default MealTablePage