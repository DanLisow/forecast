let API_KEY = 'ed4965c27175e820f03c9aa9d9d81a3b';
let input = document.getElementById('input');
let btn = document.querySelector('.container-input button');
let foreCast = document.querySelector('.container-block');
let error = document.querySelector('.error');
let title = document.querySelector('.container h1');


btn.onclick = () => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${API_KEY}&lang=ru`)
        .then((resp) => {
            if (resp.status == 404) {
                input.value = '';
                foreCast.innerHTML = '';
                title.textContent = '';
                error.innerHTML = `
                    <img src="img/criss-cross.svg" alt="">
                    <span>Ошибка! Такого города не существует</span>`;
            }
            else {
                error.innerHTML = '';
                return resp.json();
            }
            console.clear();
        })
        .then(data => {
            foreCast.innerHTML = `
                <div class="forecast-card">
                    <div class="card-title">
                        <h1>${Math.round(data.main.temp - 273)}&deg;</h1>
                        <span>${data.name}</span>
                        <img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png" alt="">
                    </div>
                    <div class="card-description">
                        <span><b>Состояние: </b>${data.weather[0]['description']}</span>
                        <span><b>Ощущается как: </b>${Math.round(data.main.temp - 273)}&deg;</span>
                        <span><b>Давление: </b>${data.main.pressure * 0.75} мм.рт.ст.</span>
                        <span><b>Влажность: </b>${data.main.humidity} %</span>
                        <span><b>Скорость ветра: </b>${data.wind.speed} м/c</span>
                        <span><b>Рассвет: </b>${timeConverter(data.sys.sunrise)}</span>
                        <span><b>Закат: </b>${timeConverter(data.sys.sunset)}</span>
                    </div>
                </div>`;
            title.textContent = 'Погода на сегодня :';
            input.value = '';
            console.clear();
        });
}

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time =  hour + ':' + min + ':' + sec ;
    return time;
  }




