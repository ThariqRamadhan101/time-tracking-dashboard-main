let globalData = [];

fetch("data.json")
  .then((response) => {
    if (!response.ok) return console.log("Oops! Something went wrong.");
    return response.json();
  })
  .then((data) => {
    globalData = data;
    populateDOM(data, "weekly");
    setupTimeframeSwitching();
  });

const container = document.getElementById("container");
const populateDOM = (data, timeframe) => {
  while (container.children.length > 1) {
    container.removeChild(container.lastChild);
  }

  data.forEach((item) => {
    appendItem(item, timeframe);
  });
};

const appendItem = (item, timeframe) => {
  const activityClassName = item.title.toLowerCase().replace(/\s+/g, "-");
  const current = item.timeframes[timeframe].current;
  const previous = item.timeframes[timeframe].previous;

  const timeframeLabel = {
    daily: "Yesterday",
    weekly: "Last Week",
    monthly: "Last Month",
  }[timeframe];

  const activity = document.createElement("div");
  activity.className = "card " + activityClassName;

  activity.innerHTML = `
        <div class="header ${activityClassName}">
          <img src="./images/icon-${activityClassName}.svg" alt="icon-${activityClassName}" />
        </div>
        <div class="section">
          <div class="activity">
            <h3>${item.title}</h3>
            <img src="./images/icon-ellipsis.svg" alt="icon-ellipsis" />
          </div>
          <div class="time">
            <h3 class="time__now">${current}hrs</h3>
            <h4 class="time__lastweek">${timeframeLabel} - ${previous}hrs</h4>
          </div>
        </div>
  `;

  container.appendChild(activity);
};

const setupTimeframeSwitching = () => {
  const buttons = document.querySelectorAll(".timeframes btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("selected-timeframes"));

      btn.classList.add("selected-timeframes");

      const timeframe = btn.id;
      populateDOM(globalData, timeframe);
    });
  });
};
