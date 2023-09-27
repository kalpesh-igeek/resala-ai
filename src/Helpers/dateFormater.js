import { format, isToday, isYesterday, differenceInDays } from 'date-fns';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

const currentDate = new Date();
const utcCurrentDate = zonedTimeToUtc(currentDate, 'UTC'); // Convert current date to UTC timezone

// Define your target date (e.g., yesterday)
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const utcYesterday = zonedTimeToUtc(yesterday, 'UTC'); // Convert yesterday to UTC timezone

// Function to determine the output based on the date comparison
export const getDateDisplay = (date) => {
  const utcDate = zonedTimeToUtc(date, 'UTC'); // Convert input date to UTC timezone

  if (isToday(utcDate, { timeZone: 'UTC' })) {
    // Return the current time if it's today in UTC timezone
    return format(utcDate, 'hh:mm a', { timeZone: 'UTC' });
  } else if (isYesterday(utcDate, { timeZone: 'UTC' })) {
    // Return "Yesterday" if it's yesterday in UTC timezone
    return 'Yesterday';
  } else {
    // Calculate the number of days between the current date and the target date in UTC timezone
    const daysDifference = differenceInDays(utcCurrentDate, utcDate);
    return `${daysDifference} days ago`;
  }
};
