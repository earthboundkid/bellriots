const riotDate = new Date("2024-09-01T17:00:00+00:00");

const millisecondsInMinute = 1000 * 60;
const millisecondsInHour = millisecondsInMinute * 60;
const millisecondsInDay = millisecondsInHour * 24;
const millisecondsInYear = millisecondsInDay * 365;

const calcTime = () => {
  let now = new Date();
  let milliseconds = riotDate - now;
  let years = Math.floor(milliseconds / millisecondsInYear);
  let remainder = milliseconds % millisecondsInYear;
  let days = Math.floor(remainder / millisecondsInDay);
  remainder = remainder % millisecondsInDay;
  let hours = Math.floor(remainder / millisecondsInHour);
  remainder = remainder % millisecondsInHour;
  let minutes = Math.floor(remainder / millisecondsInMinute);
  remainder = remainder % millisecondsInMinute;
  let seconds = Math.floor(remainder / 1000);
  remainder = remainder % 1000;

  return {
    milliseconds,
    years,
    days,
    hours,
    minutes,
    seconds,
    remainder
  };
};

let yearEl = document.querySelector(".year");
let dayEl = document.querySelector(".day");
let hourEl = document.querySelector(".hour");
let minuteEl = document.querySelector(".minute");
let secondEl = document.querySelector(".second");

window.setInterval(() => {
  let { years, days, hours, minutes, seconds } = calcTime();
  yearEl.innerText = years;
  hourEl.innerText = hours;
  dayEl.innerText = days;
  minuteEl.innerText = minutes;
  secondEl.innerText = seconds;
}, 500);
