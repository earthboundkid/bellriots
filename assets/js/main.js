const riotDate = new Date("2024-09-01T17:00:00+00:00");

const millisecondsInMinute = 1000 * 60;
const millisecondsInHour = millisecondsInMinute * 60;
const millisecondsInDay = millisecondsInHour * 24;
const millisecondsInYear = millisecondsInDay * 365;

const calcTime = () => {
  let now = new Date();
  let milliseconds = riotDate - now;
  let happened = milliseconds < 1;
  if (happened) {
    milliseconds = 0;
  }
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
    happened,
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
let countdownEl = document.querySelector(".countdown");
let happenedEl = document.querySelector(".happened");

const pluralize = (n, text) => `${n} ${text}${n === 1 ? "" : "s"}`;

let interval = null;
const render = () => {
  let { happened, years, days, hours, minutes, seconds } = calcTime();
  yearEl.innerText = pluralize(years, "year");
  hourEl.innerText = pluralize(hours, "hour");
  dayEl.innerText = pluralize(days, "day");
  minuteEl.innerText = pluralize(minutes, "minute");
  secondEl.innerText = pluralize(seconds, "second");
  if (happened) {
    window.clearInterval(interval);
    countdownEl.classList.toggle("is-hidden");
    happenedEl.classList.toggle("is-hidden");
  }
};

interval = window.setInterval(render, 500);
