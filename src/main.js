import "./style.css";

"use strict";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

const btn = document.getElementById("goBtn");

let parentEle = document.querySelector(".parent");

if (parentEle) {
  parentEle.addEventListener("input", (e) => {
    if (e.target.id === "cityInput") {
      localStorage.setItem("city", e.target.value);
    }
  });
  
  parentEle.addEventListener("click", (event) => {
    if (
      event.target.id === "searchBtn" &&
      document.getElementById("cityInput").value === ""
    ) {
      let div = document.createElement("div");
      div.innerHTML = "Enter a city name!";
      for (const key in obj) {
        div.style[key] = obj[key];
      }
      document.body.appendChild(div);
      setTimeout(() => {
        div.remove();
      }, 2000);
    } else if (event.target.id === "searchBtn") {
      let remove = document.getElementById("cityInput");
      remove.value = "";
      weatherDetails();
    } else {
      console.log("select something!");
    }
  });
  
}


let obj = {
  backgroundColor: "red",
  fontSize: "1.5rem",
  fontWeight: "bold",
  borderRadius: "10px",
  textAlign: "center",
  color: "white",
  position: "absolute",
  top: "1rem",
  padding: "0.5rem",
  width: "200px",
};

if (btn) {
  btn.addEventListener("click", () => {
    window.location.href = "weather.html";
  });
} else {
  console.error("Element with ID 'searchBtn' not found.");
}

let weatherDetails = async () => {
  try {
    const city = localStorage.getItem("city");
    if (!city) {
      alert("Please enter a city.");
      return;
    }
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      let div = document.createElement("div");
      div.innerHTML = "City not found!";
      for (const key in obj) {
        div.style[key] = obj[key];
      }
      document.body.appendChild(div);
      setTimeout(() => {
        div.remove();
      }, 2000);
      throw new Error("City not found or API error");
    }

    const data = await response.json();
    console.log(data);

    document.getElementById("cityName").textContent = data.name;
    document.getElementById("temperature").textContent = `${data.main.temp} °C`;
    document.getElementById("condition").textContent =
      data.weather[0].description;
    document.getElementById("humidity").textContent = `${data.main.humidity} %`;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

let refresh = document.querySelector(".main__item ");

if (refresh) {
  refresh.addEventListener("click", () => {
    window.location.reload();
  });
}



document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("toggleCircle");
  let isOn = false;

  const setTheme = (isDark) => {
    const parent = document.querySelector(".parent");
    const mainItem = document.querySelector(".main__item");
    const searchBtn = document.querySelector("#searchBtn");

    if (isDark) {
      document.documentElement.classList.add("dark-mode");
      document.body.classList.add("dark-mode");
      if (parent) parent.classList.add("dark-mode");
      if (mainItem) mainItem.classList.add("dark-mode");
      if (searchBtn) searchBtn.classList.add("dark-mode");
      if (toggle) toggle.classList.add("forward");
      toggle.style.transform = "";
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark-mode");
      document.body.classList.remove("dark-mode");
      if (parent) parent.classList.remove("dark-mode");
      if (mainItem) mainItem.classList.remove("dark-mode");
      if (searchBtn) searchBtn.classList.remove("dark-mode");
      if (toggle) toggle.style.transform = "translateX(0)";
      localStorage.removeItem("theme");
    }
  };

  if (localStorage.getItem("theme") === "dark") {
    isOn = true;
    setTheme(true);
  }

  if (toggle) {
    toggle.addEventListener("click", () => {
      isOn = !isOn;
      setTheme(isOn);
    });
  }
});
