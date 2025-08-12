import type { MenuItem, Restaurant } from "../../types/mealLogs"

type DisplayMealProps = {
    menuItem: MenuItem,
    restuarant: Restaurant
}

const DisplayMeal = ({menuItem, restuarant}: DisplayMealProps) => {

    const realPrice = (menuItem.price * 1.075).toFixed(2)

    return (
        <div>You spent ${realPrice} on {menuItem.name} from {restuarant.name}.</div>
    )
}

export default DisplayMeal