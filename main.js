let currentTime = new Date();

render(currentTime);

document.getElementById("#currentDate").onclick = () => {
    currentTime =  new Date();
    render(currentTime);
};

document.getElementById("#prvMonth").onclick = () => {
  currentTime =  previousMonth(currentTime)
  render(currentTime);
};

document.getElementById("#nextMonth").onclick = () => {
    currentTime =  nextMonth(currentTime)
    render(currentTime);
};

function render(time) {
  const div = document.getElementById("#currentData");
  const now = time;
  let weekDayOfSelectDate = now.getUTCDay();
  if(weekDayOfSelectDate == 0) {
    weekDayOfSelectDate = 7;
  }
  const thisMonth = now.getMonth() + 1;
  const thisYear = now.getFullYear();
  div.innerText = thisYear + " 年 " + thisMonth + " 月 ";
  const daysDiv = document.getElementById("#calendar-days");
  console.log( weekDayOfSelectDate);
  let calendarNumOfGrids = 42;
  daysDiv.innerHTML = "";
  for (let i = 1; i < weekDayOfSelectDate; i++) {
    const appendDiv = document.createElement("div");
    appendDiv.className = "calendar-day-unThisMonth";
    appendDiv.innerText = daysInMonth(thisYear, thisMonth - 1) - i + 1;
    daysDiv.prepend(appendDiv);
    calendarNumOfGrids--;
  }

  for (let i = 1; i <= daysInMonth(thisYear, thisMonth); i++) {
    const appendDiv = document.createElement("div");
    appendDiv.className = "calendar-day";
    appendDiv.innerText = i;
    if (
      i == now.getDate() &&
      thisYear == new Date().getFullYear() &&
      thisMonth == new Date().getMonth() + 1
    ) {
      appendDiv.className = "calendar-day-thisDate";
    }
    daysDiv.append(appendDiv);
    calendarNumOfGrids--;
  }

  for (let i = 1; i <= calendarNumOfGrids; i++) {
    const appendDiv = document.createElement("div");
    appendDiv.className = "calendar-day-unThisMonth";
    appendDiv.innerText = i;
    daysDiv.append(appendDiv);
  }
}

function daysInMonth(year, month) {
  // JavaScript 中的月份从 0 到 11 表示一月到十二月，所以要减去 1。
  month--;

  // 创建一个新的 Date 对象，将日期设置为下个月的第 0 天，这将自动回到上个月的最后一天。
  const lastDayOfMonth = new Date(year, month + 1, 0);

  // 获取这一天的日期部分（即天数）。
  return lastDayOfMonth.getDate();
}

function previousMonth(currentTime) {
  const newTime = new Date(currentTime);
  newTime.setMonth(currentTime.getMonth() - 1);
  return newTime;
}

function nextMonth(currentTime) {
  const newTime = new Date(currentTime);
  newTime.setMonth(currentTime.getMonth() + 1);
  return newTime;
}
