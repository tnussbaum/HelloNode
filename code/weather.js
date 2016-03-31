// get references to the Java types
var YahooWeatherService = 
        Java.type("com.github.fedy2.weather.YahooWeatherService");
var DegreeUnit = 
        Java.type("com.github.fedy2.weather.data.unit.DegreeUnit");

// construct the Java API entry point
var weatherApi = new YahooWeatherService();

// execute the query to retrieve the data
// "12776228" is the WOEID (Where On Earth ID - Yahoo thing ...) 
// for the HMB office area/zip code
var channel = weatherApi.getForecast("12776228", 
                                     DegreeUnit.FAHRENHEIT);

// pull out the forecast from the available list
var forecast = channel.getItem().getForecasts().get(0);

// dump out some results
console.log(channel.getDescription());
console.log('High: %sF', forecast.getHigh());
console.log('Low: %sF', forecast.getLow());
console.log('Forecast: %s', forecast.getText());