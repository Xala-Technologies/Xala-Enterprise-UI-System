/**
 * Calendar component with enterprise compliance and Norwegian holidays support
 * Uses semantic design tokens and pure presentational patterns
 */

import React from 'react';

import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type HTMLAttributes } from 'react';

/**
 * Calendar variants using semantic design tokens
 */
const calendarVariants = cva('p-4 border border-border rounded-md bg-background text-foreground', {
  variants: {
    variant: {
      default: 'border-border',
      compact: 'p-2',
      elevated: 'shadow-lg border-border',
    },
    size: {
      sm: 'text-xs',
      default: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

/**
 * Calendar day variants using semantic design tokens
 */
const calendarDayVariants = cva(
  [
    'h-8 w-8 rounded-md flex items-center justify-center text-sm transition-colors',
    'hover:bg-accent hover:text-accent-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
  ],
  {
    variants: {
      state: {
        default: 'text-foreground',
        selected: 'bg-primary text-primary-foreground hover:bg-primary/80',
        today: 'bg-accent text-accent-foreground font-medium',
        otherMonth: 'text-muted-foreground/50',
        disabled: 'text-muted-foreground/30 cursor-not-allowed hover:bg-transparent',
        holiday: 'text-destructive font-medium',
        weekend: 'text-muted-foreground',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  }
);

/**
 * Norwegian holiday interface
 */
export interface NorwegianHoliday {
  readonly date: string; // YYYY-MM-DD format
  readonly name: string;
  readonly type: 'national' | 'religious' | 'observance';
}

/**
 * Calendar date interface
 */
export interface CalendarDate {
  readonly date: Date;
  readonly day: number;
  readonly month: number;
  readonly year: number;
  readonly isToday: boolean;
  readonly isSelected: boolean;
  readonly isOtherMonth: boolean;
  readonly isDisabled: boolean;
  readonly isHoliday: boolean;
  readonly isWeekend: boolean;
  readonly holidayName?: string;
}

/**
 * Calendar component props interface
 */
export interface CalendarProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof calendarVariants> {
  readonly selectedDate?: Date;
  readonly currentMonth?: Date;
  readonly minDate?: Date;
  readonly maxDate?: Date;
  readonly disabledDates?: Date[];
  readonly norwegianHolidays?: NorwegianHoliday[];
  readonly showWeekNumbers?: boolean;
  readonly showOtherMonthDays?: boolean;
  readonly onDateSelect?: (_date: Date) => void;
  readonly onMonthChange?: (_month: Date) => void;
}

/**
 * Default Norwegian holidays for current year - pure data
 */
const getDefaultNorwegianHolidays = (year: number): NorwegianHoliday[] => [
  { date: `${year}-01-01`, name: 'Nyttårsdag', type: 'national' },
  { date: `${year}-05-01`, name: 'Arbeidernes dag', type: 'national' },
  { date: `${year}-05-17`, name: 'Grunnlovsdag', type: 'national' },
  { date: `${year}-12-25`, name: 'Første juledag', type: 'religious' },
  { date: `${year}-12-26`, name: 'Andre juledag', type: 'religious' },
];

/**
 * Get month names in Norwegian - pure function
 */
const getNorwegianMonthNames = (): string[] => [
  'Januar',
  'Februar',
  'Mars',
  'April',
  'Mai',
  'Juni',
  'Juli',
  'August',
  'September',
  'Oktober',
  'November',
  'Desember',
];

/**
 * Get day names in Norwegian - pure function
 */
const getNorwegianDayNames = (): string[] => ['Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør', 'Søn'];

/**
 * Check if date is weekend - pure function
 */
const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6; // Sunday or Saturday
};

/**
 * Check if date is holiday - pure function
 */
const isHoliday = (
  date: Date,
  holidays: NorwegianHoliday[]
): { isHoliday: boolean; name?: string } => {
  const dateString = date.toISOString().split('T')[0];
  const holiday = holidays.find(h => h.date === dateString);
  return {
    isHoliday: Boolean(holiday),
    name: holiday?.name,
  };
};

/**
 * Generate calendar grid - pure function
 */
const generateCalendarGrid = (
  month: Date,
  selectedDate?: Date,
  minDate?: Date,
  maxDate?: Date,
  disabledDates?: Date[],
  holidays?: NorwegianHoliday[]
): CalendarDate[] => {
  const today = new Date();
  const year = month.getFullYear();
  const monthIndex = month.getMonth();

  const firstDayOfMonth = new Date(year, monthIndex, 1);
  const _lastDayOfMonth = new Date(year, monthIndex + 1, 0);
  const firstDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7; // Monday = 0

  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - firstDayOfWeek);

  const days: CalendarDate[] = [];
  const currentDate = new Date(startDate);

  for (let i = 0; i < 42; i++) {
    // 6 weeks
    const isCurrentMonth = currentDate.getMonth() === monthIndex;
    const isToday = currentDate.toDateString() === today.toDateString();
    const isSelected = selectedDate
      ? currentDate.toDateString() === selectedDate.toDateString()
      : false;
    const isDisabled =
      (minDate && currentDate < minDate) ||
      (maxDate && currentDate > maxDate) ||
      disabledDates?.some(d => d.toDateString() === currentDate.toDateString()) ||
      false;

    const holidayInfo = holidays ? isHoliday(currentDate, holidays) : { isHoliday: false };

    days.push({
      date: new Date(currentDate),
      day: currentDate.getDate(),
      month: currentDate.getMonth(),
      year: currentDate.getFullYear(),
      isToday,
      isSelected,
      isOtherMonth: !isCurrentMonth,
      isDisabled,
      isHoliday: holidayInfo.isHoliday,
      isWeekend: isWeekend(currentDate),
      holidayName: holidayInfo.name,
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return days;
};

/**
 * Get week number - pure function
 */
const getWeekNumber = (date: Date): number => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
};

/**
 * Navigation icons
 */
const ChevronLeftIcon = (): React.ReactElement => (
  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

const ChevronRightIcon = (): React.ReactElement => (
  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

/**
 * Enhanced Calendar component
 * @param selectedDate - Currently selected date
 * @param currentMonth - Month to display
 * @param minDate - Minimum selectable date
 * @param maxDate - Maximum selectable date
 * @param disabledDates - Array of disabled dates
 * @param norwegianHolidays - Norwegian holidays to highlight
 * @param showWeekNumbers - Show week numbers
 * @param showOtherMonthDays - Show days from other months
 * @param onDateSelect - Date selection handler
 * @param onMonthChange - Month change handler
 * @param variant - Calendar styling variant
 * @param size - Calendar size
 * @param className - Additional CSS classes
 * @returns Enhanced Calendar JSX element
 */
export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      selectedDate,
      currentMonth = new Date(),
      minDate,
      maxDate,
      disabledDates,
      norwegianHolidays,
      showWeekNumbers = false,
      showOtherMonthDays = true,
      onDateSelect,
      onMonthChange,
      variant = 'default',
      size = 'default',
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    const monthNames = getNorwegianMonthNames();
    const dayNames = getNorwegianDayNames();
    const currentYear = currentMonth.getFullYear();
    const holidays = norwegianHolidays || getDefaultNorwegianHolidays(currentYear);

    const calendarDays = generateCalendarGrid(
      currentMonth,
      selectedDate,
      minDate,
      maxDate,
      disabledDates,
      holidays
    );

    const handleDateClick = (calendarDate: CalendarDate): void => {
      if (!calendarDate.isDisabled && onDateSelect) {
        onDateSelect(calendarDate.date);
      }
    };

    const handlePrevMonth = (): void => {
      const prevMonth = new Date(currentMonth);
      prevMonth.setMonth(prevMonth.getMonth() - 1);
      onMonthChange?.(prevMonth);
    };

    const handleNextMonth = (): void => {
      const nextMonth = new Date(currentMonth);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      onMonthChange?.(nextMonth);
    };

    const getDayState = (
      calendarDate: CalendarDate
    ): 'default' | 'selected' | 'today' | 'otherMonth' | 'disabled' | 'holiday' | 'weekend' => {
      if (calendarDate.isDisabled) return 'disabled';
      if (calendarDate.isSelected) return 'selected';
      if (calendarDate.isToday) return 'today';
      if (calendarDate.isOtherMonth) return 'otherMonth';
      if (calendarDate.isHoliday) return 'holiday';
      if (calendarDate.isWeekend) return 'weekend';
      return 'default';
    };

    return (
      <div
        ref={ref}
        className={cn(calendarVariants({ variant, size }), className)}
        role="application"
        aria-label="Kalender"
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handlePrevMonth}
            className="p-1 hover:bg-accent rounded-md transition-colors"
            aria-label="Forrige måned"
          >
            <ChevronLeftIcon />
          </button>

          <h2 className="font-semibold text-foreground">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h2>

          <button
            onClick={handleNextMonth}
            className="p-1 hover:bg-accent rounded-md transition-colors"
            aria-label="Neste måned"
          >
            <ChevronRightIcon />
          </button>
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Week number header */}
          {showWeekNumbers && (
            <div className="h-8 flex items-center justify-center text-xs text-muted-foreground font-medium">
              Uke
            </div>
          )}

          {/* Day headers */}
          {dayNames.map(day => (
            <div
              key={day}
              className="h-8 flex items-center justify-center text-xs text-muted-foreground font-medium"
            >
              {day}
            </div>
          ))}

          {/* Calendar days */}
          {calendarDays.map((calendarDate, index) => {
            const isStartOfWeek = index % 7 === 0;
            const shouldShow = showOtherMonthDays || !calendarDate.isOtherMonth;

            return (
              <React.Fragment key={calendarDate.date.toISOString()}>
                {/* Week number */}
                {showWeekNumbers && isStartOfWeek && (
                  <div className="h-8 flex items-center justify-center text-xs text-muted-foreground">
                    {getWeekNumber(calendarDate.date)}
                  </div>
                )}

                {/* Day cell */}
                {shouldShow ? (
                  <button
                    onClick={() => handleDateClick(calendarDate)}
                    disabled={calendarDate.isDisabled}
                    className={cn(calendarDayVariants({ state: getDayState(calendarDate) }))}
                    aria-label={`${calendarDate.day}. ${monthNames[calendarDate.month]} ${calendarDate.year}${calendarDate.holidayName ? ` - ${calendarDate.holidayName}` : ''}`}
                    title={calendarDate.holidayName}
                  >
                    {calendarDate.day}
                  </button>
                ) : (
                  <div className="h-8 w-8" />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded bg-primary" />
            <span>Valgt</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded bg-accent" />
            <span>I dag</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded bg-destructive" />
            <span>Helligdag</span>
          </div>
        </div>
      </div>
    );
  }
);

Calendar.displayName = 'Calendar';

/**
 * Calendar variants type exports
 */
export type CalendarVariant = VariantProps<typeof calendarVariants>['variant'];
export type CalendarSize = VariantProps<typeof calendarVariants>['size'];
