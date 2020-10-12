const mth_element = document.querySelector('.date-picker .dates .month-wrapper .mth');
const dates_element = document.querySelector('.dates-here')

const next_mth_element = document.querySelector('.date-picker .dates .month-wrapper .arrow-wrapper-right');
const prev_mth_element = document.querySelector('.date-picker .dates .month-wrapper .arrow-wrapper-left');
const days_element = document.querySelector('.date-picker .dates .days');
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const date = new Date();

let day = date.getDate(); // gets current day
let month = date.getMonth(); // gets current month
let year = date.getFullYear(); // gets current year

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

// Storing dates here
const dates = [];


// Helper Functions
function formatDate(d) {
    let day = d.getDate();
    if (day < 10) {
        day = '0' + day;
    }
    let month = d.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }
    let year = d.getFullYear();
    return day + '/' + month + '/' + year;
}
// First Render Month and year
mth_element.textContent = months[month] + ' ' + year;

// FUNCTIONS
function populateDates() {
    console.log(date)
    const day_elements = document.getElementsByClassName('day');
    // Number of the last day of the current month 
    const lastDayCurrentMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    // Number of the last day of the previous month 
    const lastDayPrevMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    //This variable is responsible for filing the first days in the first row for the current month
    //  from the previous month
    const firstDayIndex = new Date(date.getFullYear(), date.getMonth(), 0).getDay();
    const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
    
    //This variable is responsible for filing the last days in the last row for the current month from the next month
    const nextDays = 7 - lastDayIndex;

    let days = "";
    // Show dates from previous month
    for (let x = firstDayIndex; x > 0; x--) {
        days += `<div class="pre-date day">${lastDayPrevMonth - x + 1}</div>`;
    }
    // populates dates for the current month 
    for (let i = 1; i <= lastDayCurrentMonth; i++) {
        const isCurrentDay = i === new Date().getDate();
        const isCurrentMonth = date.getMonth() === new Date().getMonth();
        const isCurrentYear = date.getFullYear() === new Date().getFullYear();

        if (isCurrentDay && isCurrentMonth && isCurrentYear) {
            days += `<div class="today-day day">${i}</div>`;
        }
        else {
            days += `<div class="day current-month-days">${i}</div>`;
        }
    }
    // populates dates from the next month
    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="next-date day">${j}</div>`;
        days_element.innerHTML = days;
    }


    for (const el of day_elements) {
        el.addEventListener('click', function () {

            // Inner value of 
            selectedDay = el.innerHTML;
            if (selectedDay < 10) {
                selectedDay = '0' + selectedDay;
            }
            selectedYear = year;
            // Month Selecting
            selectedMonth = month + 1;
            if (el.classList.contains('next-date')) {
                selectedMonth += 1;
                if (selectedMonth >= 13) {
                    selectedYear = year + 1;
                    selectedMonth = 1;
                }
            }

            if (el.classList.contains('pre-date')) {
                selectedMonth -= 1;
                if (selectedMonth <= 0) {
                    selectedYear = year - 1;
                    selectedMonth = 12;
                }
            }
            // If statment resposnible for fixing the year change in December and in January
            if (el.classList.contains('current-month-days')) {
                if (selectedYear > year) {
                    selectedYear = year;
                }
                else if (selectedYear < year) {
                    selectedYear = year;
                }
            }
            //Month formating
            if (selectedMonth < 10) {
                selectedMonth = '0' + selectedMonth;
            }
            selectedDate = selectedDay + "/" + selectedMonth + "/" + selectedYear;
            console.log(selectedDate);

            // Multiple date selector
            if (el.classList.contains("highlight-day")) {
                el.classList.remove("highlight-day");
                let datesIndex = dates.indexOf(selectedDate);
                dates.splice(datesIndex, 1);

            }
            else if (el.classList.contains("day")) {
                el.classList.add("highlight-day");
                dates.push(selectedDate)
            }
            dates_element.textContent = dates;
        });
    }

    //This for loop checks if there are any records in the dates array if so. add to them highlight class
    for (const el of day_elements) {
        selectedDay = el.innerHTML;
        if (selectedDay < 10) {
            selectedDay = '0' + selectedDay;
        }
        selectedYear = year;
        // Month Selecting
        selectedMonth = month + 1;
        if (el.classList.contains('next-date')) {
            selectedMonth += 1;
            if (selectedMonth >= 13) {
                selectedYear = year + 1;
                selectedMonth = 1;
            }
        }

        if (el.classList.contains('pre-date')) {
            selectedMonth -= 1;
            if (selectedMonth <= 0) {
                selectedYear = year - 1;
                selectedMonth = 12;
            }
        }
        // If statment resposnible for fixing the year change in December and in January
        if (el.classList.contains('current-month-days')) {
            if (selectedYear > year) {
                selectedYear = year;
            }
            else if (selectedYear < year) {
                selectedYear = year;
            }
        }
        //Month formating
        if (selectedMonth < 10) {
            selectedMonth = '0' + selectedMonth;
        }
        selectedDate = selectedDay + "/" + selectedMonth + "/" + selectedYear;
        if (dates.includes(selectedDate)) {
            el.classList.add("highlight-day");
        }
    }
}
//shift between 
function goToNextMonth(e) {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    mth_element.textContent = months[month] + ' ' + year;
}
function goToPrevMonth(e) {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    mth_element.textContent = months[month] + ' ' + year;
}
// EVENT LISTENERS
//  Update Month name along with year 
next_mth_element.addEventListener('click', goToNextMonth);
prev_mth_element.addEventListener('click', goToPrevMonth);

//Populate dates for new months on arrow click
prev_mth_element.addEventListener("click", () => {
    date.setMonth(date.getMonth() - 1, 1);
    populateDates();
});
next_mth_element.addEventListener("click", () => {
    date.setMonth(date.getMonth() + 1, 1);
    populateDates();
});

populateDates();