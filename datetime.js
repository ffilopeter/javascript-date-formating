/**
 * JavaScript PHP-Like Date Formatting Script
 * https://www.php.net/manual/en/datetime.format.php
 */

// Days of the week
// 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'

// Three letter days of the week
// 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'

// Months
// 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'

// Three letter months
// 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'

Date.prototype.format = function(pattern) {
    let pat = pattern;
    const DOW = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const TLDOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // d - Day of the month, 2 digits with leading zero, 1 through 31
    // Date.prototype.getDate() returns an integer, between 1 and 31
    pat = pat.replace('d', this.getDate().toString().padStart(2, '0'));

    // D - A textual representation of a day, three letters, Mon through Sun
    // Date.prototype.getDay() returns an integer, between 0 - Sunday and 6 - Saturday
    pat = pat.replace('D', TLDOW[this.getDay()]);

    // j - Day of the month without leading zero, 1 through 31
    pat = pat.replace('j', this.getDate());

    // l - A full textual representation of the day of the week
    pat = pat.replace('l', DOW[this.getDay()]);

    // N - ISO 8601 numeric representation of the day of the week, 1 (for Monday) through 7 (for Sunday)
    pat = pat.replace('N', (this.getDay() > 0 ? this.getDay() : (this.getDay() + 7)));

    // S - English ordinal suffix for the day of the month, 2 characters
    // st, nd, rd or th. Works well with 'j'
    const nth = (d) => {
        if (d > 3 && d < 21) return 'th';
        switch (d % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };
    pat = pat.replace('S', nth(this.getDate()));

    // w - Numeric representation of the day of the week, 0 (for Sunday) through 6 (for Saturday)
    pat = pat.replace('w', this.getDay());

    // z - The day of the year (starting from 0), 0 through 365
    let now = this,
        start = new Date(now.getFullYear(), 0, 0),
        diff = now - start,
        oneDay = 1000 * 60 * 60 * 24,
        day = Math.floor(diff / oneDay);
    pat = pat.replace('z', day);

    // W - ISO 8601 week number of year, weeks starting on Monday
    // Solution here: https://weeknumber.com/how-to/javascript
};
