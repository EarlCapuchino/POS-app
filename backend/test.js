let dateObj = new Date();

// current date
// adjust 0 before single digit date
let date = ("0" + dateObj.getDate()).slice(-2);
// current month
let month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
// current year
let year = dateObj.getFullYear();
// current hours
let hours = dateObj.getHours();

// current minutes
let minutes = dateObj.getMinutes();

// current seconds
let seconds = dateObj.getSeconds();
let mseconds = dateObj.get

// prints date in YYYY-MM-DD format
console.log(year + "-" + month + "-" + date);

// prints date & time in YYYY-MM-DD HH:MM:SS format
console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);

// prints time in HH:MM format
console.log(hours + ":" + minutes);