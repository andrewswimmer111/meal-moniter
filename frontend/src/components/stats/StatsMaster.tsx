import { MealTimeHistogram } from "./MealTimeHistogram"
import { type MealTimeData, type LocationPieData, type HeatmapData, type LocationCumulativeData, type MenuItemFrequency, type TotalPointsSpentDataPoint, type FormattedStatsData } from "../../types/stats";
import { DayOfWeekHeatmap } from "./DayOfTheWeekHeatmap";
import LocationDoublePie from "./LocationDoublePie";
import { LocationCumulativeLineChart } from "./LocationFreqLine";
import { TopMenuItemsBarChart } from "./TopMenuItems";
import TotalPointsSpentLine from "./TotalPointsSpentLine";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { getStats } from "../../api_calls/stats";

function StatsMaster() {

    const { user } = useContext(UserContext)
    const [statData, setStatData] = useState<FormattedStatsData>();


    useEffect(() => {
        if (!user) return;

        async function getStatData(userId: number) {
            const result = await getStats(userId);
            if (result.success && result.stats) {
                setStatData(result.stats);
                console.log(result.stats)
            }
            console.log(result.message)
        }

        getStatData(user.id)
    }, [])




    return (
        <>
            {!statData ? (
                <p>Loading...</p>
            ) : statData.stats.totalMeals === 0 ? (
                <p>No meals recorded yet.</p>
            ) : (
                <>
                    <MealTimeHistogram data={statData.when.mealTimeHistogram} />
                    <DayOfWeekHeatmap data={statData.when.dayOfTheWeekHeatmap} maxCount={statData.stats.favoriteMealQuantity}/>
                    <LocationDoublePie data={statData.where.locationPie} />
                    <LocationDoublePie data={statData.where.restaurantPie} />
                    <LocationCumulativeLineChart 
                        data={statData.where.restaurantLine.counts} 
                        locations={statData.where.restaurantLine.places} 
                    />
                    <TopMenuItemsBarChart data={statData.what.menuItemBar} />
                    <TotalPointsSpentLine data={statData.how.spendingLine} />
                </>
            )}
        </>
    )
}

export default StatsMaster