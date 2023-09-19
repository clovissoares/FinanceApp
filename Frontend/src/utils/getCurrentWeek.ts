import { addDays, startOfWeek } from "date-fns";
import { DateRange } from "react-day-picker";

export const getCurrentWeek = () => {
    const currentDate = new Date();
  
    const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
    const endOfCurrentWeek = addDays(startOfCurrentWeek, 6);
  
    const weekRange: DateRange = {from: startOfCurrentWeek, to:endOfCurrentWeek}
  
    return weekRange;
}