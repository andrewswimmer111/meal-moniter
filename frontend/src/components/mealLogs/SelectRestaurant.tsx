import { useState, useEffect } from "react";

import { getRestaurants } from "../../api_calls/meals";
import SearchSelect from "../SearchSelect";
import type { Restaurant } from "../../types/mealLogs";

type SelectRestuarantProps = {
    locationID: number,
    onSelectRestaurant: (restaurant: Restaurant) => void;
}

const SelectRestaurant = ({locationID, onSelectRestaurant} : SelectRestuarantProps) => {

    const [restaurantOptions, setRestaurantOptions] = useState<Restaurant[]>([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant>();

    useEffect(() => {
        async function fetchRestaurants() {
            const result = await getRestaurants(locationID);
            if (result.success && result.restaurants) {
                setRestaurantOptions(result.restaurants); 
            }
        }

        fetchRestaurants();
    }, [locationID])

    const RestaurantProps = {
        options: restaurantOptions,
        placeholder: "Search for restaurant",
        renderOption: (option: Restaurant) => option.name,
        onSelect: (value: Restaurant) => {
            setSelectedRestaurant(value); 
            onSelectRestaurant(value);
        }
    }
    return (
         <>
            <SearchSelect {...RestaurantProps}/>
            <div> The user selected {selectedRestaurant?.name} </div>
        </>
    )

}

export default SelectRestaurant