const request = require('request');

const forecast = (lat, lon, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=fb97bd27a5a8b3834b98791ca68ab29e&query=${lat},${lon}`;
	request(
		{
			url,
			json: true
		},
		(error, { body }) => {
			if (error) {
				callback('Unable to connect to weather service!', undefined);
			} else if (body.error) {
				callback('Unable to find location', undefined);
			} else {
				const data = body.current;
				callback(
					undefined,
					`${data
						.weather_descriptions[0]}. It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees out. The humidity is ${data.humidity}%.`
				);
			}
		}
	);
};

module.exports = forecast;
