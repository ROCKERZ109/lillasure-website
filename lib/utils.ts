import { DayOfWeek } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("sv-SE", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

// Store closing hours by day (0 = Sunday, 6 = Saturday)
const closingHours: Record<number, number> = {
  0: 16, // Sunday - 16:00
  1: 0,  // Monday - closed
  2: 18, // Tuesday - 18:00
  3: 18, // Wednesday - 18:00
  4: 18, // Thursday - 18:00
  5: 18, // Friday - 18:00
  6: 16, // Saturday - 16:00
};

// Order cutoff: 2 hours before closing
const ORDER_CUTOFF_HOURS = 2;

// Check if ordering for tomorrow is still allowed
function canOrderForTomorrow(): boolean {
  const now = new Date();
  const currentDay = now.getDay();
  let currentHour = now.getHours();
  
  const todayClosing = closingHours[currentDay];
  console.log("date:locale",now,now.toLocaleString())
  console.log("Today Closing", todayClosing)
  console.log("currentday",now.toLocaleDateString())
  
  // If bakery is closed today, allow ordering
  if (todayClosing === 0) return true;

  // Cutoff time is 2 hours before closing
  const cutoffHour = todayClosing - ORDER_CUTOFF_HOURS;
  return currentHour < cutoffHour;
}

// Generate available pickup dates (excluding Sundays and Mondays, with cutoff logic)
export function getAvailablePickupDates(daysAhead: number = 60): string[] {
  const dates: string[] = [];
  const today = new Date();
  const canOrderTomorrow = canOrderForTomorrow();

  
  for (let i = 1; i <= daysAhead; i++) {
   let date = new Date(today);
date.setDate(today.getDate() + i);

// 1. Get the Day of Week (0-6) reliably
const dayOfWeek = date.getDay(); 
    // Skip  Monday (1) - bakery is closed
    if (dayOfWeek !== 1) {
      // Skip tomorrow if past cutoff time
      if (i === 1 && !canOrderTomorrow) {
        continue;
      }
      dates.push(date.toISOString().split("T")[0]);
    }
  }
  
  return dates;
}

// Generate available pickup times
export function getAvailablePickupTimes(dateString: string): string[] {
  const date = new Date(dateString);
  // console.log(date);
  const dayOfWeek = date.getDay();
  // const now = new Date();
  console.log(date.getMonth(), date.getDate())
  if ((date.getMonth()== 1) && (date.getDate()== 17)) return ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
  const satSun =  ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00","16:00"];
  const weekDays = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00","18:00"];
  // Different hours for weekdays vs weekends
  if (dayOfWeek === 6 || dayOfWeek === 0) {
    //  if(now.toLocaleDateString() == date.toLocaleDateString()){
    //     let today = [];

    //     today = satSun.filter(item=> parseInt(item)>(currentHour+1))
    //     console.log(today)
    //       return today;
    // }
    
    
    // Saturday/Sunday: 08:00-16:00

    return satSun;
  } else {
    // if(now.toLocaleDateString() == date.toLocaleDateString()){
    //     let today = [];

    //     today = weekDays.filter(item=> parseInt(item)>(currentHour+1))
    //     console.log(today)
    //       return today;
    // }
    // Weekdays: 08:00-18:00
    return weekDays;
  }
}

// Get cutoff info for display
export function getOrderCutoffInfo(): { cutoffTime: string; canOrderTomorrow: boolean } {
  const now = new Date();
  const currentDay = now.getDay();
  const todayClosing = closingHours[currentDay];
  
  if (todayClosing === 0) {
    return { cutoffTime: "Stängt idag", canOrderTomorrow: true };
  }
  
  const cutoffHour = todayClosing - ORDER_CUTOFF_HOURS;
  const cutoffTime = `${cutoffHour.toString().padStart(2, "0")}:00`;
  
  return {
    cutoffTime,
    canOrderTomorrow: now.getHours() < cutoffHour,
  };
}

export function getDayOfWeek(dateString: string): DayOfWeek {
  const days: DayOfWeek[] = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  return days[new Date(dateString).getDay()];
}