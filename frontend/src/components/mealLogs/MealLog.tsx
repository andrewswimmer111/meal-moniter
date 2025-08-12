import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import SelectLocation from "./SelectLocation";
import SelectRestaurant from "./SelectRestaurant";
import SelectMenuItem from "./SelectMenuItem"
import DisplayMeal from "./DisplayMeal";
import { logMeal } from "../../api_calls/meals";
import type { Location, MenuItem, Restaurant, LogMealInfo } from "../../types/mealLogs";

const MealLog = () => {

    const {user} = useContext(UserContext)

    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
    const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
    const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);

    const handleSubmit = async () => {
        
        if (selectedRestaurant && selectedMenuItem && user) {
            const data: LogMealInfo = {
                userId: user.id,
                menuItemId: selectedMenuItem.id
            }
            const result = await logMeal(data)
            console.log(result.message)
        }
        else {
            console.log("Something wrong")
        }
    }

    return (
        <>
            <div> Welcome, {user?.name} </div>
            <div> Select Location </div>
            <SelectLocation onSelectLocation={(loc) => {
                setSelectedLocation(loc);
                setSelectedRestaurant(null)
            }} />

            {selectedLocation && (
                <>
                    <div> Select Restaurant</div>
                    <SelectRestaurant
                        locationID={selectedLocation.id}
                        onSelectRestaurant={(rest) => {
                            setSelectedRestaurant(rest);
                            setSelectedMenuItem(null);
                        }}
                    />
                </>
            )}

            {selectedLocation && selectedRestaurant && (
                <>
                    <div> Select MenuItem </div>
                    <SelectMenuItem
                        restaurantID={selectedRestaurant.id}
                        onSelectMenuItem={(item) => setSelectedMenuItem(item)}
                    />
                </>
            )}

            {selectedLocation && selectedRestaurant && selectedMenuItem && (
                <>
                    <DisplayMeal menuItem={selectedMenuItem} restuarant={selectedRestaurant} />

                    <button onClick={handleSubmit}> submit meal </button>
                </>
            )}
        </>
    )
};

export default MealLog;
