const currentDay = $('.bottom .now');
const day1 = $('.bottom .forecast');
const loca = $('.top');
const mid = $('.middle');
const api = 'https://free-api.heweather.com/v5/weather?';
const key = 'd1ec31c3827c4b0a9788d44c1b7d414f';
let currentDiv = 0;

function getTop(basic) {
    let a = `
            <h2 class="city">${basic.city}</h2>
            <div class="location">
                <h3 class="cnty">${basic.cnty}</h3>
                <img src="./img/loaction.png" alt="loaction">
            </div>
    `;
    loca.html(a);
}

function getNow(current, aqi) {
    let a = `
        <h2 class="current-day">现在</h2>
        <h2 class="tmp">${current.tmp}°</h2>
        <h2 class="cond-text">${current.cond.txt}</h2>
        <h2 class="wind-sc">${current.wind.sc}</h2>
        <h2 class="aqi-city-pm25">pm2.5：${aqi.city.pm25}</h2>
        <h2 class="aqi-city-qlyty">空气质量：${aqi.city.qlty}</h2>
   `;
    currentDay.html(a)
}

function getForecast(dailyForecast) {
    console.log(dailyForecast[0].date)
    let a = dailyForecast.map((item) => `
         <li class="daily_forecast">
                        <h2 class="date">${item.date}</h2>
                        <h2 class="cond-text">${item.cond.txt_d}~${item.cond.txt_n}</h2>
                        <h2 class="cond-tmp">${item.tmp.min}°~${item.tmp.max}°</h2>
                    </li>     
    `);
    currentDay.after(a);
}

function getSuggestion(suggestions) {
    let a = `
           <div>
                <h2>舒适度指数:${suggestions.comf.brf}</h2>
                <p>${suggestions.comf.txt}</p>
           </div>
           <div>
                <h2>洗车指数:${suggestions.cw.brf}</h2>
                <p>${suggestions.cw.txt}</p>
           </div>
           <div>
                <h2>穿衣指数:${suggestions.drsg.brf}</h2>
                <p>${suggestions.drsg.txt}</p>
           </div>
           <div>
                <h2>感冒指数:${suggestions.flu.brf}</h2>
                <p>${suggestions.flu.txt}</p>
           </div>
           <div>
                <h2>运动指数:${suggestions.sport.brf}</h2>
                <p>${suggestions.sport.txt}</p>
           </div>
           <div>
                <h2>旅游指数:${suggestions.trav.brf}</h2>
                <p>${suggestions.trav.txt}</p>
           </div>
     
           <div>
                <h2>紫外线指数:${suggestions.uv.brf}</h2>
                <p>${suggestions.uv.txt}</p>
           </div>
    `;
    mid.html(a)
}

function changeSuggestion() {
    let allDiv = $('.middle div');
    $(allDiv[currentDiv]).fadeOut(500, function () {
        if (currentDiv == allDiv.length - 1) {
            currentDiv = 0;
        } else {
            currentDiv++;
        }
        $(allDiv[currentDiv]).fadeIn(500);
    });
}

function initialize() {
    const myCity = new BMap.LocalCity();
    myCity.get(function (result) {
        let city = result.name;
        let url = `${api}city=${city}&key=${key}`

        $.getJSON(url, function (data) {
            let weather = data.HeWeather5[0];
            let aqi = weather.aqi;
            let basic = weather.basic;
            let dailyForecast = weather.daily_forecast;
            let current = weather.now;
            let suggestions = weather.suggestion;
          
            getNow(current, aqi);
            getForecast(dailyForecast);
            getTop(basic);
            getSuggestion(suggestions);
            setInterval(changeSuggestion, 5000);
        })
    });
}

