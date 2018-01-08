var weatherApp = function() {
    var weatherLib = { 
        cities:[]
    };
    var STORAGE_ID = 'weather';

    // For template
    var source = $("#weather-template").html();
    var template = Handlebars.compile(source);

    var saveToLocalStorage = function () {
        localStorage.setItem(STORAGE_ID, JSON.stringify(weatherLib.cities));
    }

    var getFromLocalStorage = function () {
        return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
    }
   
    //add the county
    //push the comments
    //post the comments
    //delete the post


    var fetchWeather = function () {
        var city = $(".city-input").val(); 
        var buildUrl = 'http://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=825d56b5627561dede04f0b68e06e411';
        $.ajax({
            method: "GET",
            url: buildUrl,
            success: function(data) {
                // About the weather
                var city = data.name;
                var tempCelc = data.main.temp - 273.15;
                tempCelc = tempCelc.toFixed(1);
                var tempFar = data.main.temp * 9/5 - 459.67;
                tempFar = tempFar.toFixed(1);


                // Push to array
                weatherLib.cities.push({city: city, tempCelc: tempCelc, tempFar: tempFar, date: new Date().getDate(), month: new Date().getMonth()+1, year: new Date().getFullYear(), hours: new Date().getHours(), minutes: new Date().getMinutes()});
                saveToLocalStorage();

                // Rendering
                renderPost();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
            }); 
        $(".city-input").val("");
    }; 

    var renderPost = function() {
        $(".weather-posts").empty();
        weatherLib  = {cities: getFromLocalStorage()};
        var newHTML = template(weatherLib);
        $(".weather-posts").append(newHTML);
    }

    renderPost();

    return {
        fetch: fetchWeather
    }
}

var app = weatherApp();

$(".pull").on('click', app.fetch);

