// ====== OpenWeather API 설정 ======
const API_KEY = "f982190ba10162a379c1a1d59f6dd14c"; // 네 키
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const GEO_URL = "https://api.openweathermap.org/geo/1.0";

// ====== DOM 요소 ======
const searchForm = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");
const messageBox = document.getElementById("messageBox");

const currentTempEl = document.getElementById("currentTemp");
const currentMinMaxEl = document.getElementById("currentMinMax");
const currentDescEl = document.getElementById("currentDesc");
const currentEmojiEl = document.getElementById("currentDescEmoji");
const currentCityEl = document.getElementById("currentCity");
const currentFeelsLikeEl = document.getElementById("currentFeelsLike");
const currentHumidityEl = document.getElementById("currentHumidity");
const currentWindEl = document.getElementById("currentWind");
const currentPressureEl = document.getElementById("currentPressure");
const currentIconEl = document.getElementById("currentIcon");

const airQualityLocationEl = document.getElementById("airQualityLocation");
const airQualityIndexEl = document.getElementById("airQualityIndex");
const airQualityDetailEl = document.getElementById("airQualityDetail");
const airQualityChartEl = document.getElementById("airQualityChart");
const airQualityAqiPointerEl =
  document.getElementById("airQualityAqiPointer");

const forecastCityPillEl = document.getElementById("forecastCityPill");
const forecastListEl = document.getElementById("forecastList");

// 시간대 아이콘
const timeIconEl = document.getElementById("timeIcon");

// ====== 메시지 표시 ======
function setMessage(text, type = "") {
  messageBox.textContent = text || "";
  messageBox.classList.remove("error", "success");
  if (type) messageBox.classList.add(type);
}

// ====== 날씨 이모지 ======
function getWeatherEmoji(main, desc) {
  const m = (main || "").toLowerCase();
  const d = (desc || "").toLowerCase();

  if (m.includes("clear")) return "☀️";
  if (m.includes("cloud")) return d.includes("few") ? "🌤" : "☁️";
  if (m.includes("rain") || m.includes("drizzle")) return "🌧";
  if (m.includes("thunder")) return "⛈";
  if (m.includes("snow")) return "❄️";
  if (m.includes("mist") || m.includes("fog") || m.includes("haze"))
    return "🌫";
  return "🌍";
}

// ====== 날씨 설명을 한국식으로 매핑 ======
function mapWeatherToKorean(main, desc) {
  const m = (main || "").toLowerCase();
  const d = (desc || "").toLowerCase();

  // Clear
  if (m === "clear") {
    return "맑음";
  }

  // Clouds
  if (m === "clouds") {
    if (d.includes("few clouds")) return "구름 조금";
    if (d.includes("scattered clouds")) return "구름 많음";
    if (d.includes("broken clouds")) return "대체로 흐림";
    if (d.includes("overcast clouds")) return "흐림";
    return "구름 많음";
  }

  // Rain
  if (m === "rain") {
    if (d.includes("light rain")) return "약한 비";
    if (d.includes("moderate rain")) return "비";
    if (d.includes("heavy intensity rain")) return "강한 비";
    if (d.includes("very heavy rain")) return "매우 강한 비";
    if (d.includes("extreme rain")) return "폭우";
    return "비";
  }

  // Drizzle
  if (m === "drizzle") {
    return "이슬비";
  }

  // Thunderstorm
  if (m === "thunderstorm") {
    return "천둥번개";
  }

  // Snow
  if (m === "snow") {
    if (d.includes("light snow")) return "약한 눈";
    if (d.includes("heavy snow")) return "강한 눈";
    return "눈";
  }

  // 안개류
  if (
    m === "mist" ||
    m === "smoke" ||
    m === "haze" ||
    m === "fog" ||
    m === "sand" ||
    m === "dust" ||
    m === "ash"
  ) {
    if (m === "sand" || m === "dust") return "황사";
    return "안개";
  }

  if (m === "squall") return "돌풍";
  if (m === "tornado") return "토네이도";

  // 기본
  return "날씨 정보";
}

// ====== 시간대 구분 (새벽/오전/오후/저녁/밤) ======
function getTimeSlot(hour) {
  if (hour >= 0 && hour <= 4) return "dawn"; // 새벽
  if (hour >= 5 && hour <= 11) return "morning"; // 오전
  if (hour >= 12 && hour <= 16) return "afternoon"; // 오후
  if (hour >= 17 && hour <= 20) return "evening"; // 저녁
  return "night"; // 밤
}

// ====== 시간대 아이콘 업데이트 ======
function updateTimeIcon(slot) {
  if (!timeIconEl) return;

  const map = {
    dawn: { emoji: "🌅", label: "새벽" },
    morning: { emoji: "🌞", label: "오전" },
    afternoon: { emoji: "☀️", label: "오후" },
    evening: { emoji: "🌇", label: "저녁" },
    night: { emoji: "🌙", label: "밤" },
  };

  const info = map[slot] || map.afternoon;
  timeIconEl.textContent = info.emoji;
  timeIconEl.title = info.label;
}

// ====== 배경 업데이트 (날씨 + 시간대) ======
function updateBackground(current) {
  try {
    const main = current.weather[0].main.toLowerCase();
    const hour = new Date().getHours();
    const body = document.body;

    body.classList.remove(
      "w-clear",
      "w-clouds",
      "w-rain",
      "w-snow",
      "w-mist",
      "t-dawn",
      "t-morning",
      "t-afternoon",
      "t-evening",
      "t-night"
    );

    let weatherClass = "w-clouds";

    if (
      main.includes("thunder") ||
      main.includes("rain") ||
      main.includes("drizzle")
    ) {
      weatherClass = "w-rain";
    } else if (main.includes("snow")) {
      weatherClass = "w-snow";
    } else if (
      main.includes("mist") ||
      main.includes("fog") ||
      main.includes("haze")
    ) {
      weatherClass = "w-mist";
    } else if (main.includes("clear")) {
      weatherClass = "w-clear";
    } else if (main.includes("cloud")) {
      weatherClass = "w-clouds";
    }

    const slot = getTimeSlot(hour);
    const timeClass = `t-${slot}`;

    body.classList.add(weatherClass, timeClass);
    updateTimeIcon(slot);
  } catch (e) {
    console.error("배경 업데이트 실패:", e);
  }
}

// ====== 도시명 + 한국어 표시 헬퍼 ======
function buildDisplayNameEnglishKo(name, country, localKo) {
  if (localKo) {
    return `${name}, ${country} (${localKo})`;
  }
  return `${name}, ${country}`;
}

// ====== API 호출: Geo (도시 이름 → 좌표) ======
async function fetchCoordsByName(name) {
  const trimmed = name.trim();
  if (!trimmed) {
    throw new Error("도시 이름이 비어 있습니다.");
  }

  const url = `${GEO_URL}/direct?q=${encodeURIComponent(
    trimmed
  )}&limit=1&appid=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("위치 정보를 가져올 수 없습니다.");
  }
  const list = await res.json();
  if (!list || list.length === 0) {
    throw new Error("해당 이름의 위치를 찾을 수 없습니다.");
  }
  const item = list[0];

  const localKo =
    (item.local_names && item.local_names.ko) ||
    (item.local_names && item.local_names["ko"]) ||
    null;

  const displayName = buildDisplayNameEnglishKo(item.name, item.country, localKo);

  return {
    lat: item.lat,
    lon: item.lon,
    name: item.name,
    country: item.country,
    localKo,
    displayName,
  };
}

// ====== API 호출: Geo Reverse (좌표 → 도시 이름) ======
async function fetchReverseGeocode(lat, lon) {
  const url = `${GEO_URL}/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("현재 위치 정보를 가져올 수 없습니다.");
  }
  const list = await res.json();
  if (!list || list.length === 0) {
    throw new Error("현재 위치의 도시 정보를 찾을 수 없습니다.");
  }
  const item = list[0];

  const localKo =
    (item.local_names && item.local_names.ko) ||
    (item.local_names && item.local_names["ko"]) ||
    null;

  const displayName = buildDisplayNameEnglishKo(item.name, item.country, localKo);

  return {
    lat: item.lat,
    lon: item.lon,
    name: item.name,
    country: item.country,
    localKo,
    displayName,
  };
}

// ====== 현재 날씨 / 예보 / 공기질 ======
async function fetchCurrentWeatherByCoord(lat, lon) {
  // desc는 영어로 받아서 우리가 직접 한국어로 바꿔줌
  const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=en`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("현재 날씨를 가져올 수 없습니다.");
  }
  return res.json();
}

// 5일 예보 (3시간 간격)
async function fetchForecastByCoord(lat, lon) {
  const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=en`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("예보 정보를 가져올 수 없습니다.");
  }
  return res.json();
}

async function fetchAirQualityByCoord(lat, lon) {
  const url = `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("공기질 정보를 가져올 수 없습니다.");
  }
  return res.json();
}

async function getWeatherBundleByName(cityNameRaw) {
  const loc = await fetchCoordsByName(cityNameRaw);

  const [current, forecast, airQuality] = await Promise.all([
    fetchCurrentWeatherByCoord(loc.lat, loc.lon),
    fetchForecastByCoord(loc.lat, loc.lon),
    fetchAirQualityByCoord(loc.lat, loc.lon),
  ]);

  return { current, forecast, airQuality, loc };
}

// ====== 데이터 표시: 현재 날씨 ======
function displayCurrentWeather(data, displayCityText) {
  const temp = Math.round(data.main.temp);
  const feels = Math.round(data.main.feels_like);
  const min = Math.round(data.main.temp_min);
  const max = Math.round(data.main.temp_max);

  const main = data.weather[0].main;
  const rawDesc = data.weather[0].description;
  const icon = data.weather[0].icon;

  const koDesc = mapWeatherToKorean(main, rawDesc);

  currentTempEl.textContent = `${temp}°C`;
  currentMinMaxEl.textContent = `최저 ${min}°C / 최고 ${max}°C`;
  currentDescEl.textContent = koDesc;

  currentCityEl.textContent =
    displayCityText || `${data.name}, ${data.sys.country}`;

  currentFeelsLikeEl.textContent = `${feels}°C`;
  currentHumidityEl.textContent = `${data.main.humidity}%`;
  currentWindEl.textContent = `${data.wind.speed} m/s`;
  currentPressureEl.textContent = `${data.main.pressure} hPa`;

  const emoji = getWeatherEmoji(main, rawDesc);
  currentEmojiEl.textContent = emoji;

  if (icon) {
    currentIconEl.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    currentIconEl.alt = koDesc;
  } else {
    currentIconEl.removeAttribute("src");
  }

  updateBackground(data);
}

// ====== 예보 유틸: 날짜별 min/max 뽑기 ======
function summarizeDailyForecast(forecast) {
  const byDate = {};

  forecast.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0]; // YYYY-MM-DD
    if (!byDate[date]) {
      byDate[date] = [];
    }
    byDate[date].push(item);
  });

  return Object.keys(byDate)
    .slice(0, 5) // 최대 5일
    .map((date) => {
      const items = byDate[date];

      let min = Infinity;
      let max = -Infinity;
      let main = items[0].weather[0].main;
      let desc = items[0].weather[0].description;

      items.forEach((it) => {
        min = Math.min(min, it.main.temp_min);
        max = Math.max(max, it.main.temp_max);
      });

      // 정오 데이터 있으면 그걸 대표로 사용
      const noon = items.find((it) => it.dt_txt.includes("12:00:00"));
      if (noon) {
        main = noon.weather[0].main;
        desc = noon.weather[0].description;
      }

      return { date, min, max, main, desc };
    });
}

function formatDateLabel(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  const weekdayNames = ["일", "월", "화", "수", "목", "금", "토"];
  const day = weekdayNames[d.getDay()];
  const month = d.getMonth() + 1;
  const date = d.getDate();
  return `${month}/${date} (${day})`;
}

// ====== 데이터 표시: 5일 예보 ======
function displayForecast(forecast, displayCityText) {
  forecastCityPillEl.textContent =
    displayCityText || forecast.city?.name || "-";
  forecastListEl.innerHTML = "";

  if (!forecast || !forecast.list || !forecast.list.length) {
    forecastListEl.innerHTML =
      '<p style="font-size:12px;color:#94a3b8;">예보를 표시할 수 없습니다.</p>';
    return;
  }

  const days = summarizeDailyForecast(forecast);

  days.forEach((day) => {
    const item = document.createElement("div");
    item.className = "forecast-item";

    const emoji = getWeatherEmoji(day.main, day.desc);
    const min = Math.round(day.min);
    const max = Math.round(day.max);

    const koDesc = mapWeatherToKorean(day.main, day.desc);

    item.innerHTML = `
      <div class="forecast-date">${formatDateLabel(day.date)}</div>
      <div class="forecast-desc">
        <span class="forecast-emoji">${emoji}</span>
        <span>${koDesc}</span>
      </div>
      <div class="forecast-temp">
        <div class="forecast-temp-line">
          <span class="temp-min">최저 ${min}°C</span>
          <span class="temp-divider">/</span>
          <span class="temp-max">최고 ${max}°C</span>
        </div>
      </div>
    `;

    forecastListEl.appendChild(item);
  });
}

// ====== 유틸: PM 등급 (한국 기준 단순 버전) ======
function getPm25Level(value) {
  if (value <= 15) return "좋음";
  if (value <= 35) return "보통";
  if (value <= 75) return "나쁨";
  return "매우 나쁨";
}

function getPm10Level(value) {
  if (value <= 30) return "좋음";
  if (value <= 80) return "보통";
  if (value <= 150) return "나쁨";
  return "매우 나쁨";
}

// ====== 데이터 표시: 공기질 ======
function displayAirQuality(aq, cityLabel) {
  if (!aq || !aq.list || !aq.list[0]) {
    airQualityLocationEl.textContent = cityLabel || "-";
    airQualityIndexEl.textContent = "AQI: -";
    airQualityDetailEl.textContent = "";
    if (airQualityChartEl) airQualityChartEl.innerHTML = "";
    if (airQualityAqiPointerEl) {
      airQualityAqiPointerEl.style.left = "0%";
    }
    return;
  }

  const d = aq.list[0];
  const aqi = d.main.aqi; // 1~5
  const pm25 = d.components.pm2_5;
  const pm10 = d.components.pm10;

  const labels = ["매우 좋음", "좋음", "보통", "나쁨", "매우 나쁨"];
  const healthTips = [
    "대기질이 매우 좋습니다. 누구나 야외 활동에 적합한 수준입니다.",
    "대기질이 좋습니다. 대부분 사람에게 무리가 없는 수준입니다.",
    "보통 수준입니다. 민감군은 장시간 실외 활동을 줄이는 것이 좋습니다.",
    "나쁨 수준입니다. 가능하면 실외 활동을 줄이고, 마스크 착용을 권장합니다.",
    "매우 나쁨입니다. 가급적 실내에 머무르고 창문을 닫는 것이 좋습니다.",
  ];

  const label = labels[aqi - 1] || "정보 없음";
  const health = healthTips[aqi - 1] || "";

  const pm25Level = getPm25Level(pm25);
  const pm10Level = getPm10Level(pm10);

  airQualityLocationEl.textContent = cityLabel || "-";
  airQualityIndexEl.textContent = `AQI ${aqi} – ${label}`;

  airQualityDetailEl.innerHTML = `
    PM2.5: ${pm25.toFixed(1)} µg/m³ (${pm25Level}) ·
    PM10: ${pm10.toFixed(1)} µg/m³ (${pm10Level})<br />
    <span style="color:#cbd5f5;">${health}</span>
  `;

  if (airQualityAqiPointerEl) {
    const percent = ((aqi - 1) / 4) * 100;
    airQualityAqiPointerEl.style.left = `${percent}%`;
  }

  if (!airQualityChartEl) return;
  airQualityChartEl.innerHTML = "";

  const MAX_PM = 150;

  function createBarRow(labelText, value) {
    const percent = Math.max(0, Math.min(100, (value / MAX_PM) * 100));

    const row = document.createElement("div");
    row.className = "aq-bar-row";

    row.innerHTML = `
      <span class="aq-bar-label">${labelText}</span>
      <div class="aq-bar-track">
        <div class="aq-bar-fill" style="width: ${percent}%;"></div>
      </div>
      <span class="aq-bar-value">${value.toFixed(1)}</span>
    `;
    return row;
  }

  airQualityChartEl.appendChild(createBarRow("PM2.5", pm25));
  airQualityChartEl.appendChild(createBarRow("PM10", pm10));
}

// ====== 메인 핸들러 ======
async function handleSearch(rawCity) {
  try {
    const city = rawCity.trim();
    if (!city) return;

    setMessage("날씨 정보를 불러오는 중...", "success");
    const bundle = await getWeatherBundleByName(city);

    const displayName = bundle.loc.displayName;

    displayCurrentWeather(bundle.current, displayName);
    displayForecast(bundle.forecast, displayName);
    displayAirQuality(bundle.airQuality, displayName);

    setMessage(`${displayName} 날씨가 업데이트되었습니다.`, "success");
    cityInput.value = displayName;
  } catch (err) {
    console.error(err);
    setMessage(
      "날씨 정보를 불러오는 데 실패했습니다. 도시 이름(영어)을 확인해주세요.",
      "error"
    );
  }
}

// ====== 이벤트 ======
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const raw = cityInput.value;
  if (!raw.trim()) return;
  handleSearch(raw);
});

document.querySelectorAll(".chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    const city = chip.dataset.city;
    cityInput.value = city;
    handleSearch(city);
  });
});

// ====== 초기 로드: 위치 기반 or Seoul 기본 ======
async function init() {
  if (!API_KEY || API_KEY === "YOUR_OPENWEATHER_API_KEY_HERE") {
    console.warn("⚠️ OpenWeather API 키를 설정해야 합니다.");
    setMessage("app.js 상단의 API_KEY에 키를 먼저 설정해주세요.", "error");
    return;
  }

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          setMessage(
            "현재 위치 기반으로 날씨를 불러오는 중입니다...",
            "success"
          );

          // 좌표 → 도시이름 (영문 + 한국어)
          const loc = await fetchReverseGeocode(latitude, longitude);

          const [current, forecast, airQuality] = await Promise.all([
            fetchCurrentWeatherByCoord(loc.lat, loc.lon),
            fetchForecastByCoord(loc.lat, loc.lon),
            fetchAirQualityByCoord(loc.lat, loc.lon),
          ]);

          const displayName = loc.displayName;

          displayCurrentWeather(current, displayName);
          displayForecast(forecast, displayName);
          displayAirQuality(airQuality, displayName);

          setMessage("현재 위치 날씨가 업데이트되었습니다.", "success");
          cityInput.value = displayName;
        } catch (e) {
          console.error(e);
          setMessage(
            "현재 위치를 사용할 수 없습니다. Seoul 기준으로 표시합니다.",
            "error"
          );
          handleSearch("Seoul");
        }
      },
      () => {
        setMessage(
          "현재 위치 사용이 거부되었습니다. Seoul 기준으로 표시합니다.",
          "error"
        );
        handleSearch("Seoul");
      }
    );
  } else {
    handleSearch("Seoul");
  }
}

init();
