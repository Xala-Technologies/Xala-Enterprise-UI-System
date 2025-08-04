/**
 * @fileoverview SSR-Safe Calendar Component - Production Strategy Implementation
 * @description Calendar component using useTokens hook for JSON template integration
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready
 */

import React, { forwardRef, type HTMLAttributes } from 'react';
import {
  Box,
  Text,
  Heading,
  List,
  ListItem,
  Link,
} from '../semantic';

/**
 * Calendar variant types
 */
export type CalendarVariant = 'default' | 'compact' | 'elevated';

/**
 * Calendar size types
 */
export type CalendarSize = 'sm' | 'default' | 'lg';

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
export interface CalendarProps extends HTMLAttributes<HTMLDivElement> {
  readonly selectedDate?: Date;
  readonly currentMonth?: Date;
  readonly minDate?: Date;
  readonly maxDate?: Date;
  readonly disabledDates?: Date[];
  readonly norwegianHolidays?: NorwegianHoliday[];
  readonly showWeekNumbers?: boolean;
  readonly showOtherMonthDays?: boolean;
  readonly onDateSelect?: (date: Date) => void;
  readonly onMonthChange?: (month: Date) => void;
  readonly variant?: CalendarVariant;
  readonly size?: CalendarSize;
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
  // const _lastDayOfMonth = new Date(year, monthIndex + 1, 0); // Unused
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
  <svg viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

const ChevronRightIcon = (): React.ReactElement => (
  <svg viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

/**
 * Enhanced Calendar component
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
      style,
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

    // Get border radius
    const borderRadius = {
      md: '0.375rem',
    };

    // Get shadows
    const shadows = {
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    };

    // Size styles
    const getSizeStyles = (): React.CSSProperties => {
      switch (size) {
        case 'sm':
          return {
            fontSize: '0.75rem',
            padding: '0.5rem',
          };
        case 'lg':
          return {
            fontSize: '1rem',
            padding: '1rem',
          };
        default:
          return {
            fontSize: '0.875rem',
            padding: '1rem',
          };
      }
    };

    // Variant styles
    const getVariantStyles = (): React.CSSProperties => {
      switch (variant) {
        case 'compact':
          return {
            padding: '0.5rem',
          };
        case 'elevated':
          return {
            boxShadow: shadows.lg,
          };
        default:
          return {};
      }
    };

    // Calendar container styles
    const calendarStyles: React.CSSProperties = {
      borderRadius: borderRadius.md,
      border: '1px solid #e5e7eb',
      backgroundColor: '#ffffff',
      color: '#111827',
      fontFamily: 'Inter, system-ui, sans-serif',
      ...getSizeStyles(),
      ...getVariantStyles(),
      ...style,
    };

    // Day cell size
    const dayCellSize = size === 'sm' ? '28px' : size === 'lg' ? '40px' : '32px';

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

    const getDayStyles = (calendarDate: CalendarDate): React.CSSProperties => {
      const baseStyles: React.CSSProperties = {
        height: dayCellSize,
        width: dayCellSize,
        borderRadius: borderRadius.md,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size === 'sm' ? '0.75rem' : '0.875rem',
        transition: 'all 150ms ease-in-out',
        border: 'none',
        cursor: calendarDate.isDisabled ? 'not-allowed' : 'pointer',
        backgroundColor: 'transparent',
        outline: 'none',
      };

      if (calendarDate.isDisabled) {
        return {
          ...baseStyles,
          color: '#9ca3af',
          cursor: 'not-allowed',
        };
      }

      if (calendarDate.isSelected) {
        return {
          ...baseStyles,
          backgroundColor: '#3b82f6',
          color: '#ffffff',
        };
      }

      if (calendarDate.isToday) {
        return {
          ...baseStyles,
          backgroundColor: '#f3f4f6',
          color: '#111827',
          fontWeight: '500',
        };
      }

      if (calendarDate.isOtherMonth) {
        return {
          ...baseStyles,
          color: '#d1d5db',
        };
      }

      if (calendarDate.isHoliday) {
        return {
          ...baseStyles,
          color: '#ef4444',
          fontWeight: '500',
        };
      }

      if (calendarDate.isWeekend) {
        return {
          ...baseStyles,
          color: '#6b7280',
        };
      }

      return {
        ...baseStyles,
        color: '#111827',
      };
    };

    const buttonStyles: React.CSSProperties = {
      padding: '0.25rem',
      borderRadius: borderRadius.md,
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 150ms ease-in-out',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };

    return (
      <Box ref={ref} className={className} role="application" aria-label="Kalender" {...props}>
        {/* Header */}
        <Box>
          <Text
            as="button"
            onClick={handlePrevMonth}
            aria-label="Forrige måned"
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'var(--accent)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <ChevronLeftIcon />
          </Text>

          <Heading level={2}>
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </Heading>

          <Text
            as="button"
            onClick={handleNextMonth}
            aria-label="Neste måned"
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'var(--accent)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <ChevronRightIcon />
          </Text>
        </Box>

        {/* Days grid */}
        <Box>
          {/* Week number header */}
          {showWeekNumbers && <Box>Uke</Box>}

          {/* Day headers */}
          {dayNames.map(day => (
            <Box key={day}>{day}</Box>
          ))}

          {/* Calendar days */}
          {calendarDays.map((calendarDate, index) => {
            const isStartOfWeek = index % 7 === 0;
            const shouldShow = showOtherMonthDays || !calendarDate.isOtherMonth;

            return (
              <React.Fragment key={calendarDate.date.toISOString()}>
                {/* Week number */}
                {showWeekNumbers && isStartOfWeek && <Box>{getWeekNumber(calendarDate.date)}</Box>}

                {/* Day cell */}
                {shouldShow ? (
                  <Text
                    as="button"
                    onClick={() => handleDateClick(calendarDate)}
                    disabled={calendarDate.isDisabled}
                    style={getDayStyles(calendarDate)}
                    aria-label={`${calendarDate.day}${calendarDate.holidayName ? `: ${calendarDate.holidayName}` : ''}`}
                    title={calendarDate.holidayName}
                    onMouseEnter={e => {
                      if (!calendarDate.isDisabled && !calendarDate.isSelected) {
                        e.currentTarget.style.backgroundColor = 'var(--accent)';
                        e.currentTarget.style.color = 'var(--accent-foreground)';
                      }
                    }}
                    onMouseLeave={e => {
                      if (!calendarDate.isDisabled && !calendarDate.isSelected) {
                        const styles = getDayStyles(calendarDate);
                        e.currentTarget.style.backgroundColor =
                          styles.backgroundColor || 'transparent';
                        e.currentTarget.style.color = styles.color || 'inherit';
                      }
                    }}
                    onFocus={e => {
                      e.currentTarget.style.outline = '2px solid var(--primary)';
                      e.currentTarget.style.outlineOffset = '2px';
                    }}
                    onBlur={e => {
                      e.currentTarget.style.outline = 'none';
                    }}
                  >
                    {calendarDate.day}
                  </Text>
                ) : (
                  <Box />
                )}
              </React.Fragment>
            );
          })}
        </Box>

        {/* Legend */}
        <Box>
          <Box>
            <Box />
            <Text as="span">Valgt</Text>
          </Box>
          <Box>
            <Box />
            <Text as="span">I dag</Text>
          </Box>
          <Box>
            <Box />
            <Text as="span">Helligdag</Text>
          </Box>
        </Box>
      </Box>
    );
  }
);

Calendar.displayName = 'Calendar';
