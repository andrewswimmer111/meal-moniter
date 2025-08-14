import { useState, useEffect } from "react";

import type { MenuItem } from "../../types/mealLogs";
import { getMenuItems } from "../../api_calls/meals";
import SearchSelect from "./SearchSelect";

type SelectMenuItemProps = {
    restaurantID: number,
    onSelectMenuItem: (menuItem: MenuItem) => void;
}

const SelectMenuItem = ({ restaurantID, onSelectMenuItem }: SelectMenuItemProps) => {

    const [menuItemOptions, setMenuItemOptions] = useState<MenuItem[]>([]);

    useEffect(() => {
        async function fetchMenuItems() {
            const result = await getMenuItems(restaurantID);
            if (result.success && result.menuItems) {
                setMenuItemOptions(result.menuItems);
            }
        }
        fetchMenuItems();
    }, [restaurantID])

    const MenuItemProps = {
        options: menuItemOptions,
        placeholder: "Search for order",
        renderOption: (option: MenuItem) => `${option.name} (${option.price})`,
        onSelect: (value: MenuItem) => {
            onSelectMenuItem(value);
        }
    }

    return (
        <>
            <SearchSelect {...MenuItemProps} />
        </>
    )
}

export default SelectMenuItem