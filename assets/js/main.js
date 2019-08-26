const riotDate = new Date("2024-09-01T17:00:00+00:00");

const millisecondsInMinute = 1000 * 60;
const millisecondsInHour = millisecondsInMinute * 60;
const millisecondsInDay = millisecondsInHour * 24;
const millisecondsInYear = millisecondsInDay * 365;

const updateInnerTexts = (el, obj) => {
  for (let attr in obj) {
    let text = obj[attr];
    let nodes = Array.from(el.querySelectorAll(`[data-${attr}]`));
    nodes.forEach(node => {
      node.innerText = text;
    });
  }
};

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

let countdownEl = document.querySelector(".countdown");
let happenedEl = document.querySelector(".happened");

const pluralize = (n, text) => text + (n === 1 ? "" : "s");

let interval = null;
const render = () => {
  let { happened, years, days, hours, minutes, seconds } = calcTime();
  updateInnerTexts(countdownEl, {
    year: years,
    years: pluralize(years, "year"),
    hour: hours,
    hours: pluralize(hours, "hour"),
    day: days,
    days: pluralize(days, "day"),
    minute: minutes,
    minutes: pluralize(minutes, "minute"),
    second: seconds,
    seconds: pluralize(seconds, "second")
  });
  countdownEl.classList.toggle("is-hidden", happened);
  happenedEl.classList.toggle("is-hidden", !happened);
  if (happened) {
    window.clearInterval(interval);
  }
};

interval = window.setInterval(render, 500);
