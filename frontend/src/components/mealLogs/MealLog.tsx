import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import SelectLocation from "./SelectLocation";
import SelectRestaurant from "./SelectRestaurant";
import SelectMenuItem from "./SelectMenuItem"
import SelectDate from "./SelectDate";
import DisplayMeal from "./DisplayMeal";
import { logMeal } from "../../api_calls/meals";
import type { Location, MenuItem, Restaurant, LogMealInfo } from "../../types/mealLogs";

const MealLog = () => {

    const {user} = useContext(UserContext)

    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
    const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
    const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
    const [selectedDate, setSelectedDate] = useState("");

    const [message, setMessage] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const handleSubmit = async () => {
        
        if (selectedRestaurant && selectedMenuItem && user) {
            const eatenAtISO = selectedDate ? new Date(selectedDate).toISOString() : undefined;

            const data: LogMealInfo = {
                userId: user.id,
                menuItemId: selectedMenuItem.id,
                ...(eatenAtISO && { eatenAt: eatenAtISO })
            }
            const result = await logMeal(data)
            setButtonDisabled(true)
            setMessage(result.message)
        }
        else {
            setMessage("You're not ready to log yet.")
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
                    <SelectDate value={selectedDate} onChange={setSelectedDate} />
                    <button onClick={handleSubmit} disabled={buttonDisabled}> submit meal </button>
                    <div> {message} </div>
                </>
            )}


            {buttonDisabled && (
                <>
                    <button onClick={() => window.location.reload()}>Log new meal</button>
                </>
            )}
        </>
    )
};

export default MealLog;
