//DOM selection
const alertBanner = document.getElementById("alert");
const user = document.getElementById("userField");
const message = document.getElementById("messageField");
const send = document.getElementById("send");
const notification = document.querySelector(".bell");
const closeNotification = document.querySelector(".close");

alertBanner.innerHTML = `
<div class="alert-banner">
    <p><strong>Alert:</strong> Today you have 10 alerts <strong>6</strong> please take time
    to look</p>
    <p class="alert-banner-close">x</p>
</div>
`;

alertBanner.addEventListener("click", (e) => {
  const element = e.target;
  if (element.classList.contains("alert-banner-close")) {
    alertBanner.style.opacity = "0";
    setTimeout(() => {
      alertBanner.style.display = "none";
    }, 700);
  }
});

send.addEventListener("click", (e) => {
  if (user.value === "" && message === "") {
    alert("Please fill out user and message field before sending");
    e.preventDefault();
  } else if (user.value === "") {
    alert("Please fill out user field before sending");
    e.preventDefault();
  } else if (message.value === "") {
    alert("Please fill out message field before sending");
    e.preventDefault();
  } else {
    alert(`Message successfully sent to ${user.value}`);
    e.preventDefault();
    user.value = "";
    message.value = "";
  }
});

notification.addEventListener("click", () => {
  document.getElementById("box").style.display = "block";
  document.querySelector(".main").style.opacity = 0.5;
});

closeNotification.addEventListener("click", () => {
  document.getElementById("box").style.display = "none";
  document.querySelector(".main").style.opacity = 1;
});

let settings = JSON.parse(localStorage.getItem("settings")) || [];
const saveSettings = document.querySelector("#save");
const cancelSettings = document.querySelector("#cancel");
const valueTimeZone = document.getElementById("timezone");
const valueEmail = document.getElementById("settingEmail");
const valueProfile = document.getElementById("settingProfile");

fillSettings(settings);

saveSettings.addEventListener("click", () => {
  if (valueTimeZone.value === "0") {
    alert("Select a Timezone please");
  } else {
    localStorage.removeItem("settings");
    settings = [];

    const settingExample = {
      timezone: valueTimeZone.options[valueTimeZone.selectedIndex].value,
      email: valueEmail.checked,
      profile: valueProfile.checked,
    };
    settings.push(settingExample);
    storeSettings(settings);
  }
});

cancelSettings.addEventListener("click", () => {
  localStorage.removeItem("settings");
  settings = [];
  fillSettings(settings);
  saveSettings.innerHTML = "SAVE";
});

function storeSettings(settings = []) {
  localStorage.setItem("settings", JSON.stringify(settings));
  saveSettings.innerHTML = "SAVED";
}

function fillSettings(settings = []) {
  if (settings.length >= 1) {
    valueEmail.checked = settings[0].email;
    valueProfile.checked = settings[0].profile;
    valueTimeZone.value = settings[0].timezone;
  } else {
    valueEmail.checked = false;
    valueProfile.checked = false;
    valueTimeZone.value = "0";
  }
}
