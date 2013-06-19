'use strict';

var marionetteEntity = require(__dirname + '/tasks/marionette.bp/entity')

exports.createLayout = function(req, res) {
	console.log("createLayout".green)

	var dir = req.body.dir,
		layoutName = req.body.layoutName,
		regions = req.body.regions;

	if (!dir || !layoutName) {
		res.send("Data is not complete: " + dir + " " + layoutName);
	} else {
		console.log("try to create" , regions)
		marionetteEntity.createLayout(dir, layoutName, regions);
		res.send("RES: ");
	}
};