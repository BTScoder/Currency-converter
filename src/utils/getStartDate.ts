import type { DateRange } from "../types/types";
export function getStartDate(fromDate: DateRange): Date {
    const today = new Date();

    switch (fromDate) {
        case "1D": {
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);
            return yesterday;
        }

        case "1W": {
            const lastWeek = new Date(today);
            lastWeek.setDate(today.getDate() - 7);
            return lastWeek;
        }

        case "1M": {
            const lastMonth = new Date(today);
            lastMonth.setMonth(today.getMonth() - 1);
            return lastMonth;
        }

        case "3M": {
            const lastThreeMonths = new Date(today);
            lastThreeMonths.setMonth(today.getMonth() - 3);
            return lastThreeMonths;
        }

        case "1Y": {
            const lastYear = new Date(today);
            lastYear.setFullYear(today.getFullYear() - 1);
            return lastYear;
        }

        case "5Y": {
            const lastFiveYears = new Date(today);
            lastFiveYears.setFullYear(today.getFullYear() - 5);
            return lastFiveYears;
        }

        default: {
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);
            return yesterday;
        }
    }
}