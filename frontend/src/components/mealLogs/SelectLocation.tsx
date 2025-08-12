import { useState, useEffect } from "react";

import { getAllLocations } from "../../api_calls/meals";
import SearchSelect from "../SearchSelect";
import type { Location } from "../../types/mealLogs";


type SelectLocationProps = {
    onSelectLocation: (location: Location) => void;
};

const SelectLocation = ({ onSelectLocation }: SelectLocationProps) => {

    const [locationOptions, setLocationOptions] = useState<Location[]>([]);

    useEffect(() => {
        async function fetchLocations() {
            const result = await getAllLocations();
            if (result.success && result.locations) {
                setLocationOptions(result.locations)
            }
            else {
                console.log("fetchLocations call failed")
            }
        }
        fetchLocations()
    }, [])

    const LocationProps = {
        options: locationOptions,
        placeholder: "Search for location",
        renderOption: (option: Location) => option.name,
        onSelect: (value: Location) => {
            onSelectLocation(value); 
        }
    }

    return (
        <>
            <SearchSelect {...LocationProps}/>
        </>
    )
}

export default SelectLocation