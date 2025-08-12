import { useState, useEffect } from "react";

import { getAllLocations } from "../../api_calls/meals";
import SearchSelect from "../SearchSelect";
import type { Location } from "../../types/mealLogs";


type SelectLocationProps = {
    onSelectLocation: (location: Location) => void;
};

const SelectLocation = ({ onSelectLocation }: SelectLocationProps) => {

    const [locationOptions, setLocationOptions] = useState<Location[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<Location>();

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
            setSelectedLocation(value);
            onSelectLocation(value); 
        }
    }

    return (
        <>
            <SearchSelect {...LocationProps}/>
            <div> The user selected {selectedLocation?.name} </div>
        </>
    )
}

export default SelectLocation