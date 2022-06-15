const fs = require("fs");
const dataPath = "./data/data.json"

module.exports = {
	readJson: function readJson(callback) {
		 fs.readFile(dataPath, (err, jsonString) => {
			if (err) {
				console.error(err);
				return;
			}
			callback(JSON.parse(jsonString))
		});
	},
	writeJson: function writeJson(data) {
		
		const jsonString = JSON.stringify(data)
		
		fs.writeFile(dataPath, jsonString, err => {
			if (err) {
				console.log('Error writing file', err)
			} else {
				console.log('Wrote file a new object')
			}
		})
	}
}