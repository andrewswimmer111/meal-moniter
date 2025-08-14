export type MealTimeData = {
    hour: number;
    count: number;
}

export type HeatmapData = {
    day: number;  // 0=Sunday ... 6=Saturday
    hour: number; // 0-23
    count: number;
}

export type LocationPieData = { name: string; value: number }[];

export type LocationCumulativeData = {
  date: string; // e.g., "2025-08-12"
  [location: string]: number | string; 
};

export type MenuItemFrequency = {
  name: string;
  count: number;
};

export type TotalPointsSpentDataPoint = {
  date: string;  // e.g., "2025-08-13"
  totalPointsSpent: number;
};

export type FormattedStatsData = {
    stats: {
        totalMeals: number;
        totalSpending: number;
        favoriteMeal: string;
        favoriteMealQuantity: number;
        favoriteRestaurant: string;
        favoriteRestaurantQuantity: number;
    };
    when: {
        mealTimeHistogram: {
            hour: number;
            count: number;
        }[];
        dayOfTheWeekHeatmap: {
            day: number;  // 0=Sunday ... 6=Saturday
            hour: number; // 0-23
            count: number;
        }[];
    };
    where: {
        locationPie: {name: string; value: number}[];
        restaurantPie: {name: string; value: number}[];
        restaurantLine: {
            counts: {
                date: string; // e.g., "2025-08-12"
                [location: string]: number | string; 
            }[];
            places: string[]
        };
    };
    what: {
        menuItemBar: {name: string; count: number}[];
    };
    how: {
        spendingLine: {date: string; cumulativePoints: number}[];
        stats: {
            avgPointsPerMeal: number;
            avgPointsPerDay: number;
        }
    }
}