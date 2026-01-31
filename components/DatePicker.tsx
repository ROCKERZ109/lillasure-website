"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

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
  const t = useTranslations('date_picker');
  
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

  // Adjust for Monday start (Swedish calendar logic)
  const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  // Construct translated arrays
  const monthNames = [
    t('months.jan'), t('months.feb'), t('months.mar'), t('months.apr'),
    t('months.may'), t('months.jun'), t('months.jul'), t('months.aug'),
    t('months.sep'), t('months.oct'), t('months.nov'), t('months.dec')
  ];

  const dayNames = [
    t('weekdays.mon'), t('weekdays.tue'), t('weekdays.wed'), 
    t('weekdays.thu'), t('weekdays.fri'), t('weekdays.sat'), 
    t('weekdays.sun')
  ];

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
    const currentDay = new Date().toISOString().split("T")[0];

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
          available && !selected && "hover:bg-gray-700 text-white cursor-pointer",
          // Not available
          !available && "text-red-400 cursor-not-allowed",
          // Past dates
          formatDateString(day) < currentDay && "text-gray-500 cursor-not-allowed",
          // Today not available
          today && "text-yellow-200 cursor-not-allowed",
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
    <div className="bg-gray-800 border border-flour-300 rounded-lg p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={goToPrevMonth}
          className="p-2 hover:bg-flour-200 rounded-full transition-colors"
          aria-label={t('aria.prev_month')}
        >
          <ChevronLeft className="w-5 h-5 text-crust-600" />
        </button>
        
        <h3 className="font-display text-lg text-white/80">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        
        <button
          type="button"
          onClick={goToNextMonth}
          className="p-2 hover:bg-flour-200 rounded-full transition-colors"
          aria-label={t('aria.next_month')}
        >
          <ChevronRight className="w-5 h-5 text-crust-600" />
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 mb-2">
        {dayNames.map((day) => (
          <div
            key={day}
            className="h-8 flex items-center justify-center text-xs font-medium text-crust-200 uppercase tracking-wide"
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
        <div className="flex items-center gap-2 text-xs text-crust-200">
          <div className="w-3 h-3 rounded-full bg-crust-900" />
          <span>{t('legend.selected')}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-crust-200">
          <div className="w-3 h-3 rounded-full ring-2 ring-wheat-400" />
          <span>{t('legend.today')}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-crust-200">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <span>{t('legend.closed')}</span>
        </div>
      </div>
    </div>
  );
}