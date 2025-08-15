import { MealTimeHistogram } from "./MealTimeHistogram"
import { DayOfWeekHeatmap } from "./DayOfTheWeekHeatmap";
import { LocationDoublePie } from "./LocationDoublePie";
import { LocationCumulativeLineChart } from "./LocationFreqLine";
import { TopMenuItemsBarChart } from "./TopMenuItems";
import TotalPointsSpentLine from "./TotalPointsSpentLine";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { getStats } from "../../api_calls/stats";
import BasicStatsCard from "./BasicStatsCard";
import StatsSection from "./StatsSection";
import type { FormattedStatsData } from "../../types/stats";


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
        <div style={{minHeight:"80vh"}}>
            {!statData ? (
                <div className="stats-section">Loading...</div>
            ) : statData.stats.totalMeals === 0 ? (
                <div className="stats-section"> No meals recorded yet. </div>
            ) : (
                <>
                    <div className="stats-section">
                        <h2> Quick Stats</h2>
                        <div className="quick-stats-cards">
                            <BasicStatsCard sentence={`You've spent $${statData.stats.totalSpending} on ${statData.stats.totalMeals} meals so far.`} />
                            <BasicStatsCard sentence={`Your favorite meal is the ${statData.stats.favoriteMeal}, ordered ${statData.stats.favoriteMealQuantity} times.`} />
                            <BasicStatsCard sentence={`You visit ${statData.stats.favoriteRestaurant} the most, with ${statData.stats.favoriteRestaurantQuantity} visits.`} />
                        </div>
                    </div>
                    <hr />
                    <StatsSection title="When do you eat?">
                        <MealTimeHistogram data={statData.when.mealTimeHistogram} />
                        <DayOfWeekHeatmap data={statData.when.dayOfTheWeekHeatmap} maxCount={statData.stats.favoriteMealQuantity} />
                    </StatsSection>
                    <hr />
                    <StatsSection title="Where do you eat?">
                        <LocationDoublePie data={statData.where.locationPie} title={"Location Pie Chart"} />
                        <LocationDoublePie data={statData.where.restaurantPie} title={"Restaurant Pie Chart"} />
                        <LocationCumulativeLineChart
                            data={statData.where.restaurantLine.counts}
                            locations={statData.where.restaurantLine.places}
                        />
                    </StatsSection>
                    <hr />
                    <StatsSection title="What do you eat?">
                        <TopMenuItemsBarChart data={statData.what.menuItemBar} />
                    </StatsSection>
                    <hr />
                    <StatsSection title="How do you spend?">
                        <TotalPointsSpentLine data={statData.how.spendingLine} />
                        <div className="basic-how-stats">
                            <h3>Basic Spending Stats</h3>
                            <BasicStatsCard sentence={`Average points per meal: $${statData.how.stats.avgPointsPerMeal} `} />
                            <BasicStatsCard sentence={`Average points per day: $${statData.how.stats.avgPointsPerDay} `} />
                        </div>
                    </StatsSection>

                    <h5 style={{ textAlign: "center", padding: "3vh" }}> Hope you enjoy the website! Contact me if you have more stats you would like to see. </h5>
                </>
            )}
        </div>
    )
}

export default StatsMaster