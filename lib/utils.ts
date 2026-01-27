import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
  }).format(price);
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("sv-SE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

// Generate available pickup dates (excluding Sundays and Mondays)
export function getAvailablePickupDates(daysAhead: number = 60): string[] {
  const dates: string[] = [];
  const today = new Date();
  
  for (let i = 1; i <= daysAhead; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    const dayOfWeek = date.getDay();
    // Skip Sunday (0) and Monday (1) - bakery is closed
    if (dayOfWeek !== 0 && dayOfWeek !== 1) {
      dates.push(date.toISOString().split("T")[0]);
    }
  }
  
  return dates;
}

// Generate available pickup times based on store hours
export function getAvailablePickupTimes(date: string): string[] {
  const d = new Date(date);
  const dayOfWeek = d.getDay();
  
  // Store hours vary by day
  const hours: Record<number, { open: number; close: number }> = {
    2: { open: 8, close: 17 }, // Tuesday
    3: { open: 7, close: 18 }, // Wednesday
    4: { open: 7, close: 18 }, // Thursday
    5: { open: 7, close: 18 }, // Friday
    6: { open: 8, close: 13 }, // Saturday
  };
  
  const dayHours = hours[dayOfWeek];
  if (!dayHours) return [];
  
  const times: string[] = [];
  for (let hour = dayHours.open; hour < dayHours.close; hour++) {
    times.push(`${hour.toString().padStart(2, "0")}:00`);
    if (hour < dayHours.close - 1 || dayHours.close - hour > 0.5) {
      times.push(`${hour.toString().padStart(2, "0")}:30`);
    }
  }
  
  return times;
}
