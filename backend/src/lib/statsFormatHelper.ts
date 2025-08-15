
export type MealHistoryEntry = {
  id: number;
  eatenAt: string; // ISO date string
  userId: number;
  menuItemId: number;
  menuItem: {
    id: number;
    name: string;
    price: number;
    restaurantId: number;
    categoryId: number;
    restaurant: {
      id: number;
      name: string;
      locationId: number;
    };
  };
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


export const formatAllData = (meals: MealHistoryEntry[]): FormattedStatsData => {
  return {
    stats: {
      totalMeals: getTotalMeals(meals),
      totalSpending: getTotalSpending(meals),
      favoriteMeal: getFavoriteMeal(meals).name,
      favoriteMealQuantity: getFavoriteMeal(meals).count,
      favoriteRestaurant: getFavoriteRestaurant(meals).name,
      favoriteRestaurantQuantity: getFavoriteRestaurant(meals).count,
    },
    when: {
      mealTimeHistogram: getMealTimeHistogram(meals),
      dayOfTheWeekHeatmap: getDayOfTheWeekHeatmap(meals),
    },
    where: {
      locationPie: getLocationPie(meals),
      restaurantPie: getRestaurantPie(meals),
      restaurantLine: getRestaurantLine(meals),
    },
    what: {
      menuItemBar: getMenuItemBar(meals),
    },
    how: {
      spendingLine: getSpendingLine(meals),
      stats: getHowStats(meals),
    },
  };
};


// STATS
const getTotalMeals = (meals: MealHistoryEntry[]): number => meals.length;

const getTotalSpending = (meals: MealHistoryEntry[]): number => {
  const total = meals.reduce((sum, m) => sum + m.menuItem.price * 1.075, 0);
  return Math.round(total * 100) / 100; 
};

const getFavoriteMeal = (meals: MealHistoryEntry[]): { name: string; count: number } => {
  const counts: Record<string, number> = {};

  meals.forEach(m => {
    counts[m.menuItem.name] = (counts[m.menuItem.name] || 0) + 1;
  });

  const [name, count] = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])[0] || ["", 0];

  return { name, count };
};

const getFavoriteRestaurant = (meals: MealHistoryEntry[]): { name: string; count: number } => {
  const counts: Record<string, number> = {};

  meals.forEach(m => {
    counts[m.menuItem.restaurant.name] =
      (counts[m.menuItem.restaurant.name] || 0) + 1;
  });

  const [name, count] = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])[0] || ["", 0];

  return { name, count };
};

// WHEN 
const getMealTimeHistogram = (meals: MealHistoryEntry[]) => {
  const counts: Record<number, number> = {};

  meals.forEach(m => {
    const hour = new Date(m.eatenAt).getHours();
    counts[hour] = (counts[hour] || 0) + 1;
  });

  return Object.entries(counts)
    .map(([hour, count]) => ({
      hour: Number(hour),
      count
    }))
}

const getDayOfTheWeekHeatmap = (meals: MealHistoryEntry[]) => {
  const counts: Record<string, number> = {};

  meals.forEach(m => {
    if (!m.eatenAt) return;
    const date = new Date(m.eatenAt);
    const day = date.getDay();  // 0=Sunday
    const hour = date.getHours();
    const key = `${day}-${hour}`;
    counts[key] = (counts[key] || 0) + 1;
  });

  return Object.entries(counts)
    .map(([key, count]) => {
      const [dayStr, hourStr] = key.split("-");
      return { day: Number(dayStr), hour: Number(hourStr), count };
    })
};

// WHERE
const getLocationPie = (meals: MealHistoryEntry[]) => {
  const counts: Record<string, number> = {};
  meals.forEach(m => {
    const locId = Number(m.menuItem.restaurant.locationId);
    const loc = String(["0", "WU", "Bryan Center", "Other"][locId])
    counts[loc] = (counts[loc] || 0) + 1;
  });
  return Object.entries(counts).map(([name, value]) => ({ name, value }));
};


const getRestaurantPie = (meals: MealHistoryEntry[]) => {
  const counts: Record<string, number> = {};
  meals.forEach(m => {
    counts[m.menuItem.restaurant.name] =
      (counts[m.menuItem.restaurant.name] || 0) + 1;
  });
  return Object.entries(counts).map(([name, value]) => ({ name, value }));
};

const getRestaurantLine = (meals: MealHistoryEntry[]) => {
  const grouped: Record<string, Record<string, number>> = {};
  const placesSet = new Set<string>();

  // Step 1: Count visits per day
  meals.forEach(m => {
    const date = m.eatenAt.split("T")[0];
    const restaurant = m.menuItem.restaurant.name;

    if (!date) return;
    if (!grouped[date]) grouped[date] = {};
    grouped[date][restaurant] = (grouped[date][restaurant] || 0) + 1;
    placesSet.add(restaurant);
  });

  // Step 2: Sort dates chronologically
  const sortedEntries = Object.entries(grouped).sort(([a], [b]) =>
    a < b ? -1 : 1
  );

  // Step 3: Make counts cumulative
  const cumulativeTotals: Record<string, number> = {}; // running totals for each restaurant
  const counts: { [location: string]: string | number; date: string }[] =
    sortedEntries.map(([date, restCounts]) => {
      const row: { [location: string]: string | number; date: string } = { date };

      for (const place of placesSet) {
        cumulativeTotals[place] =
          (cumulativeTotals[place] || 0) + (restCounts[place] || 0);
        row[place] = cumulativeTotals[place];
      }

      return row;
    });

  // Step 4: Sort legend (places) by final visit count (desc) and keep top 5
  const places = Array.from(placesSet)
    .sort((a, b) => (cumulativeTotals[b] || 0) - (cumulativeTotals[a] || 0))
    .slice(0, 5);

  return { counts, places };
};




// WHAT

const getMenuItemBar = (meals: MealHistoryEntry[]) => {
  const counts: Record<string, number> = {};
  meals.forEach(m => {
    counts[m.menuItem.name] = (counts[m.menuItem.name] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
};

// HOW
const getSpendingLine = (meals: MealHistoryEntry[]) => {
  let cumulative = 0;
  const dailyTotals: Record<string, number> = {};

  meals
    .slice()
    .forEach(m => {
      cumulative += m.menuItem.price * 1.075;
      const date = (m.eatenAt.split("T")[0]) as string
      dailyTotals[date] = cumulative
    });

  return Object.entries(dailyTotals).map(([date, cumulativePoints]) => ({
    date,
    cumulativePoints: Number(cumulativePoints.toFixed(2)),
  }));
};

const getHowStats = (meals: MealHistoryEntry[]) => {
  if (!meals[0] || !(meals[meals.length - 1])) {
    return { avgPointsPerMeal: 0, avgPointsPerDay: 0 };
  }

  const totalMeals = meals.length;
  const totalSpending = getTotalSpending(meals);
  const days =
    (new Date(meals[meals.length - 1]!.eatenAt).getTime() -
      new Date(meals[0].eatenAt).getTime()) /
    (1000 * 60 * 60 * 24);

  return {
    avgPointsPerMeal: totalMeals
      ? parseFloat((totalSpending / totalMeals).toFixed(2))
      : 0,
    avgPointsPerDay: days
      ? parseFloat((totalSpending / days).toFixed(2))
      : 0,
  };
};
