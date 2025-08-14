import MealHistoryTableComponent from "./MealHistoryTableComponent";
import { getMealHistory } from "../../api_calls/stats";
import { UserContext } from "../../contexts/UserContext";
import { useEffect, useContext, useState } from "react";

import type { Meal, TableMeal } from "../../types/table";

const MealTable = () => {

    const {user} = useContext(UserContext);
    const [mealData, setMealData] = useState<TableMeal[]>([])
    const [dataChange, setDataChange] = useState(0)

    const cleanMealData = (meals: Meal[]): TableMeal[] => {
        return meals.map(meal => ({
            id: meal.id, 
            eatenAt: meal.eatenAt,
            meal: meal.menuItem.name,
            restaurant: meal.menuItem.restaurant.name,
            price: meal.menuItem.price,
        }));
    };

    useEffect(() => {
        async function getMeals(userId: number) {
            const result = await getMealHistory(userId)
            if (result.success && result.meals) {
                const rawMealData = result.meals;
                setMealData(cleanMealData(rawMealData))
            }
            else {
                console.log(result.message)
            }
        }
        if (user) {
            getMeals(user.id)
        }
    }, [user, dataChange])

    return (
        <>
            {
                mealData.length > 0 ? (
                    <MealHistoryTableComponent meals={mealData} onDataChange={setDataChange}/>
                ) : 
                <div> No meals found. </div>
            }
        </>
    )
}

export default MealTable