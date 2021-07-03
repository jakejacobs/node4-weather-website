const request = require('request');

const geocode = (address, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiamFrZWphY29iczIwMTUiLCJhIjoiY2s1cW10ZTkxMDNzMDNqbXI5bG5qamcybiJ9.YV-1ezxa6gsOohWL5pI04A&limit=1`;
	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to location service!', undefined);
		} else if (body.features.length === 0) {
			callback('Unable to find location! Try another search', undefined);
		} else {
			const lat = body.features[0].center[1];
			const lon = body.features[0].center[0];
			const location = body.features[0].place_name;
			callback(undefined, { latitude: lat, longitude: lon, location: location });
		}
	});
};

module.exports = geocode;
