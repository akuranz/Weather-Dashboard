# WeatherDashboard

## Description

Weather Dashboard based on city search using OpenWeather Map APIs. Current weaather forcast displays city name, date, weather condition icon, temperature, humidity, wind speed, and UV index. 5-day weather forecast displays date, weather condition icon, tempurature and humidity.

## Instructions for User

Search for any city in the search box and click enter. The current weather conditions and a five-day forecast will be displayed for the city. The search will also be saved and displayed in the search history below the search box.

## HTML

Most of the html is greated dynamically in JQuery.

## Javascript

The JQuery uses three separate AJAX calls and the OpenWeather Map APis for Current Weather Data and the 5 day / 3 hour forecast. It relies on looping thorugh an object and storing information in local storage. Moment.js is used for the dates.

## APIs

Current weather data API:
https://openweathermap.org/current

5 day weather forecast:
https://openweathermap.org/forecast

## Licensing

This project uses one Font Awesome icon:

- search is a free Font Awesome icon with Attribution 4.0 International (CC BY 4.0).

MIT License

Copyright (c) [2019][abby kuranz]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
