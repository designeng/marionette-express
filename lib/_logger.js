var dateFormat = require('dateformat'),
    fs = require('fs'),
    _ = require("underscore"),
    sys = require('sys'),
    ev = require('events'),
    colors = require('colors');

var __proto = Object.create(require('events').EventEmitter.prototype);

var events = {};

var options = {
    level: 0,
    format: "<%= timestamp %> >> <%= event %> <%= padding %> >> <%= message %>\n",
    timestamp: "HH:MM:ss",
    filepath: "log.txt",
    console: true,
    flag: "w"
};

function log_event(options) {
    this.event = options.event;
    this.level = options.level || 0;
    this.color = options.color || 'green';
    ev.EventEmitter.call(this);
};

sys.inherits(log_event, ev.EventEmitter);

log_event.prototype.config = function(config) {
    for (var key in config) {
        this[key] = config[key];
    }
    return this;
}

log_event.prototype.__defineGetter__('padding', function() {
    var length = 0,
        padding = '';
    for (var key in events) {
        if (events.hasOwnProperty(key))
            length = length < events[key].event.length ? events[key].event.length : length;
    }
    for (var i = 0; i < length - this.event.length; i++) {
        padding += ' '
    }
    return padding;
});

log_event.prototype.output = function(input) {
    if (options.level <= this.level) {

        var message = '';
        for (var i in input) {
            message += " " + (typeof input[i] == "object" ? JSON.stringify(input[i], null) : input[i]);
        }


        var format = this.format || options.format,
            console = this.console || options.console,
            flag = this.flag || options.flag;

        var timestamp = dateFormat(new Date(), this.timestamp || options.timestamp);

        var compiled = _.template(format);

        var output = compiled({
            timestamp: timestamp,
            event: this.event[this.color],
            padding: this.padding,
            message: message
        });

        if (console) {
            console.log(output);
        }


        var timestamp = dateFormat(new Date(), this.timestamp || options.timestamp);

        var jsoncontent = output;

        fs.writeFileSync(options.filepath, jsoncontent, {
            encoding: 'utf8',
            flag: flag
        });
    }
}

exports.config = function(config) {
    for (var key in config) {
        if (options.hasOwnProperty(key)) {
            options[key] = config[key];
        }
    }
    return this;
}

var nFn = function(e) {
    return function() {
        if (arguments.length == 0) {
            return events[e]
        } else {
            events[e].output(arguments)
        }
    }
}

exports.new = function(newEvents) {
    for (event in newEvents) {
        events[event] = new log_event(newEvents[event]);
        this[event] = nFn(event);
    }
    return this;
}

exports.new({
    info: {
        color: 'green',
        level: 0,
        event: 'info'
    },
    warn: {
        color: 'yellow',
        level: 1,
        event: 'warning'
    },
    error: {
        color: 'red',
        level: 2,
        event: 'error'
    }
});