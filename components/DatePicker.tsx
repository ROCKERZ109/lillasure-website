"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
  availableDates: string[];
}

export default function DatePicker({
  selectedDate,
  onSelectDate,
  availableDates,
}: DatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  // Adjust for Monday start (Swedish calendar)
  const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const monthNames = [
    "Januari", "Februari", "Mars", "April", "Maj", "Juni",
    "Juli", "Augusti", "September", "Oktober", "November", "December"
  ];

  const dayNames = ["Mån", "Tis", "Ons", "Tor", "Fre", "Lör", "Sön"];

  const goToPrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const formatDateString = (day: number): string => {
    const year = currentMonth.getFullYear();
    const month = String(currentMonth.getMonth() + 1).padStart(2, "0");
    const dayStr = String(day).padStart(2, "0");
    return `${year}-${month}-${dayStr}`;
  };

  const isDateAvailable = (day: number): boolean => {
    const dateStr = formatDateString(day);
    return availableDates.includes(dateStr);
  };

  const isDateSelected = (day: number): boolean => {
    const dateStr = formatDateString(day);
    return dateStr === selectedDate;
  };

  const isToday = (day: number): boolean => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  const handleDateClick = (day: number) => {
    if (isDateAvailable(day)) {
      onSelectDate(formatDateString(day));
    }
  };

  // Generate calendar days
  const calendarDays = [];
  
  // Empty cells for days before the first day of month
  for (let i = 0; i < startDay; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="h-10" />);
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const available = isDateAvailable(day);
    const selected = isDateSelected(day);
    const today = isToday(day);

    calendarDays.push(
      <button
        key={day}
        type="button"
        onClick={() => handleDateClick(day)}
        disabled={!available}
        className={cn(
          "h-10 w-10 rounded-full text-sm font-body transition-all duration-200 relative",
          // Base styles
          "flex items-center justify-center mx-auto",
          // Available & not selected
          available && !selected && "hover:bg-wheat-100 text-crust-900 cursor-pointer",
          // Not available
          !available && "text-crust-300 cursor-not-allowed",
          // Selected
          selected && "bg-crust-900 text-flour-50 font-medium shadow-lg",
          // Today indicator
          today && !selected && "ring-2 ring-wheat-400 ring-offset-2"
        )}
      >
        {day}
      </button>
    );
  }

  return (
    <div className="bg-flour-50 border border-flour-300 rounded-lg p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={goToPrevMonth}
          className="p-2 hover:bg-flour-200 rounded-full transition-colors"
          aria-label="Föregående månad"
        >
          <ChevronLeft className="w-5 h-5 text-crust-600" />
        </button>
        
        <h3 className="font-display text-lg text-crust-900">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        
        <button
          type="button"
          onClick={goToNextMonth}
          className="p-2 hover:bg-flour-200 rounded-full transition-colors"
          aria-label="Nästa månad"
        >
          <ChevronRight className="w-5 h-5 text-crust-600" />
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 mb-2">
        {dayNames.map((day) => (
          <div
            key={day}
            className="h-8 flex items-center justify-center text-xs font-medium text-crust-500 uppercase tracking-wide"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-flour-200">
        <div className="flex items-center gap-2 text-xs text-crust-500">
          <div className="w-3 h-3 rounded-full bg-crust-900" />
          <span>Vald dag</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-crust-500">
          <div className="w-3 h-3 rounded-full ring-2 ring-wheat-400" />
          <span>Idag</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-crust-500">
          <div className="w-3 h-3 rounded-full bg-flour-300" />
          <span>Stängt</span>
        </div>
      </div>
    </div>
  );
}