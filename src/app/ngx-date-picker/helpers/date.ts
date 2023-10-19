/**
 * Handy function to make it easy to create a date offset by a given number of years.
 * @param offset
 */
export const getYearOffset = (offset: number) => {
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() + offset);
    return currentDate;
}

/**
 * Get an array of the allowed years that the user can select.
 */
export const getYears = (minDate: Date, maxDate: Date) => {
    const range: number = (maxDate.getFullYear() + 1) - minDate.getFullYear();
    return Array.from(new Array(range), (_x, i) => minDate.getFullYear() + i).map((year) => {
        return year;
    });
}

/**
 * Get the number of days in a give date's current month. For example, it will return 31 if there are 31 days in the
 * given calendar month.
 * @param date
 */
export const getMaxDayCount = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

/**
 * Get a list of day of the week names.
 */
export const getDayOfTheMonthNames = () => {
    return [
        'MON',
        'TUE',
        'WED',
        'THU',
        'FRI',
        'SAT',
        'SUN'
    ];
}

/**
 * Get a list of months.
 */
export const getMonths = () => {
    return [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
}
