'use strict';

var marionetteEntity = require(__dirname + '/tasks/marionette.bp/entity'),
bemStyles = require(__dirname + '/tasks/bemStyles');

exports.createLayout = function(req, res) {
	var dir = req.body.dir,
		layoutName = req.body.layoutName,
		regions = req.body.regions;

	if (!dir || !layoutName) {
		res.send("Data is not complete: " + dir + " " + layoutName);
	} else {
		marionetteEntity.createLayout(dir, layoutName, regions);
		res.send("RES: ");
	}
};

exports.createBemStyles = function(req, res){
	var dir = req.body.dir,
		layoutName = req.body.layoutName;

	if (!dir || !layoutName) {
		res.send("Data is not complete: " + dir + " " + layoutName);
	} else {
		bemStyles.create(dir, layoutName);
		res.send("RES: ");
	}
};