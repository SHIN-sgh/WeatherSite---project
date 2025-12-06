# WeatherSite — 실시간 날씨 정보 웹 애플리케이션  
# WeatherSite — Real-time Weather Information Web Application  

---

## 1. 프로젝트 개요  
본 프로젝트는 HTML, CSS, 그리고 JavaScript를 이용하여 제작한 실시간 날씨 웹 사이트입니다.  
사용자는 특정 도시를 검색하거나 현재 위치 정보를 활용하여 현재 날씨, 5일 예보, 대기질(AQI), 미세먼지(PM2.5/PM10) 정보를 직관적으로 확인할 수 있습니다.  
또한 시간대(새벽·오전·오후·저녁·밤)에 따라 배경이 동적으로 변화하며, 비나 눈이 내릴 때는 화면에 실제 애니메이션 효과가 나타나도록 구현했습니다.  

This project is a real-time weather website built using HTML, CSS, and JavaScript.  
Users can search any city or use their current location to view current weather conditions, a 5-day forecast, air quality index (AQI), and fine dust levels (PM2.5/PM10).  
The background dynamically changes according to the time of day (dawn, morning, afternoon, evening, night), and weather animations such as rain or snow are displayed when applicable.

---

## 2. 프로젝트 목적  
이 웹사이트는 단순한 정보 나열이 아닌, 실제 날씨 앱과 유사한 사용자 경험을 제공하는 것을 목표로 했습니다.  
사용자에게 보기 쉬운 인터페이스, 빠른 검색, 반응형 UI, 그리고 시각적인 날씨 효과를 제공하여 실용성과 학습 효과를 높였습니다.  

The purpose of this project was not only to display weather data but also to deliver an experience similar to real mobile weather applications.  
The site offers an easy-to-read interface, fast search, responsive layout, and visual weather effects to enhance usability and learning effectiveness.

---

## 3. 사용된 기술  
이 프로젝트는 HTML을 기반으로 페이지 구조를 만들고, CSS를 통해 디자인 및 애니메이션을 구현하였으며, JavaScript로 API 통신 및 데이터 처리를 담당했습니다.  
OpenWeather API를 통해 실시간 데이터를 받아와 화면에 표시하도록 구성했습니다.  

This project uses HTML for page structure, CSS for design and animations, and JavaScript for API communication and data handling.  
Real-time data is fetched from the OpenWeather API and displayed on the website.

---

## 4. 파일 구성  
본 프로젝트는 다음과 같은 세 개의 핵심 파일로 구성되어 있습니다.  

index.html 파일은 전체 웹 페이지의 기본 구조를 담당하며, 헤더, 검색창, 현재 날씨 영역, 예보 영역, 공기질 정보 영역 등이 포함되어 있습니다.  
style.css 파일은 전체 디자인을 담당하며, 색상 테마, 시간대별 배경 변화, 비와 눈 애니메이션, 반응형 UI 스타일이 정의되어 있습니다.  
app.js 파일은 OpenWeather API와의 연동, 현재 날씨 및 예보 데이터 처리, 공기질 정보 처리, 사용자 위치 기반 자동 조회 등의 모든 동작 로직을 담당합니다.  

This project consists of three main files.  
The index.html file defines the overall structure of the website including header, search bar, weather, forecast, and air quality sections.  
The style.css file controls the design, theme colors, time-based backgrounds, rain and snow animations, and responsive layout.  
The app.js file handles API communication, current weather and forecast data processing, air quality visualization, and geolocation-based detection.

---

## 5. 주요 기능  

● 현재 날씨 표시  
현재 온도, 체감 온도, 습도, 풍속, 기압 등의 세부 정보를 제공합니다.  
Provides detailed current weather such as temperature, feels-like temperature, humidity, wind speed, and pressure.  

● 5일 예보 제공  
일별 최저/최고 기온과 날씨 변화가 보기 쉽게 정리되어 있습니다.  
5-day weather forecast including daily min/max temperatures and conditions.  

● 대기질(AQI) + PM2.5/PM10  
공기질 지수를 수치화하고, 미세먼지는 막대 그래프로 시각화합니다.  
Air quality (AQI) and fine dust levels are visualized using graphs.  

● 시간대별 배경 변화  
새벽, 오전, 오후, 저녁, 밤의 분위기에 따라 배경 색과 효과가 변합니다.  
Background changes dynamically depending on the time of day.  

● 비/눈 애니메이션  
현재 날씨가 비·눈일 경우 화면에 애니메이션이 나타납니다.  
Rain and snow animations appear depending on current conditions.  

● 반응형 웹 디자인  
휴대폰, 태블릿, PC 해상도에 자동으로 맞춰집니다.  
Fully responsive design for mobile, tablet, and desktop.  

---

## 6. 참고 및 벤치마킹  
디자인과 사용자 경험 향상을 위해 실제 날씨 서비스를 참고했습니다.  

The Weather Channel — 정보 배치 방식 참고  
AccuWeather — 데이터 시각화 구조 참고  
OpenWeather API Example — API 구조 이해  
Yr.no — 미니멀하고 깔끔한 디자인  

To improve design and user experience, several real services were referenced.  

The Weather Channel — Layout and information hierarchy  
AccuWeather — Data visualization style  
OpenWeather API examples — API structure  
Yr.no — Minimal and clean design approach  

---

## 7. 실행 방법  
1. 저장소 파일을 다운로드합니다. 
2. 브라우저에서 index.html 파일을 실행합니다.
4. 위치 사용을 허용하면 자동으로 현재 날씨가 표시됩니다.
  

1. Download the repository files 
2. Open index.html in a web browser
3. Allow location access to automatically see local weather
   
---

## 8. 마무리  
본 프로젝트는 HTML, CSS, JavaScript를 종합적으로 활용하여 실제 서비스에 가까운 웹 애플리케이션을 만드는 경험을 목표로 하였습니다.  
API 처리, 반응형 UI, 시각 효과 등 다양한 기술을 구현하여 웹 개발 능력을 향상시켰습니다.  

This project aimed to build a realistic weather web application using HTML, CSS, and JavaScript.  
Various techniques such as API handling, responsive UI, and visual effects were implemented to enhance practical web development skills.
