import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import SelectLocation from "./SelectLocation";
import SelectRestaurant from "./SelectRestaurant";
import SelectMenuItem from "./SelectMenuItem"
import SelectDate from "./SelectDate";
import DisplayMeal from "./DisplayMeal";
import { logMeal } from "../../api_calls/meals";
import type { Location, MenuItem, Restaurant, LogMealInfo } from "../../types/mealLogs";
import { useNavigate } from "react-router-dom";

import './MealLogs.css'

const MealLog = () => {

    const { user } = useContext(UserContext)
    const navigate = useNavigate()

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
        <div className="meal-logger-container">
            <div className="meal-logger-subheader">Record meal below</div>
            <div className="meal-logger-card">
                <SelectLocation
                    onSelectLocation={(loc) => {
                        setSelectedLocation(loc);
                        setSelectedRestaurant(null);
                    }}
                />
            </div>

            {selectedLocation && (
                <>
                    <div className="meal-logger-card">
                        <SelectRestaurant
                            locationID={selectedLocation.id}
                            onSelectRestaurant={(rest) => {
                                setSelectedRestaurant(rest);
                                setSelectedMenuItem(null);
                            }}
                        />
                    </div>
                </>
            )}

            {selectedLocation && selectedRestaurant && (
                <>
                    <div className="meal-logger-card">
                        <SelectMenuItem
                            restaurantID={selectedRestaurant.id}
                            onSelectMenuItem={(item) => setSelectedMenuItem(item)}
                        />
                    </div>
                </>
            )}

            {selectedLocation && selectedRestaurant && selectedMenuItem && (
                <div className="meal-logger-card">
                    <DisplayMeal
                        menuItem={selectedMenuItem}
                        restuarant={selectedRestaurant}
                    />
                    <SelectDate value={selectedDate} onChange={setSelectedDate} />
                    <button
                        className="meal-logger-button"
                        onClick={handleSubmit}
                        disabled={buttonDisabled}
                    >
                        Submit Meal
                    </button>
                    {message && <div className="message">{message}</div>}
                </div>
            )}

            {buttonDisabled && (
                <div className="button-container">
                    <button
                        className="meal-logger-button"
                        onClick={() => navigate('/dashboard')}
                    >
                        Return To Dashboard
                    </button>
                    <button
                        className="meal-logger-button"
                        onClick={() => window.location.reload()}
                    >
                        Log New Meal
                    </button>
                </div>
            )}
        </div>

    )
};

export default MealLog;
