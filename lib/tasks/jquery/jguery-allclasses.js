(function ($) {
    $.fn.classes = function (callback) {
        var classes = [];
        $.each(this, function (i, v) {
            var splitClassName = v.className.split(/\s+/);
            for (var j in splitClassName) {
                var className = splitClassName[j];
                if ('' !== className) {
                    classes.push(className); // replace with 'classes.unshift(className);' to put classes in order of their appearance
                }
            }
        });
        classes = $.unique(classes);
        if ('function' === typeof callback) {
            for (var i in classes) {
                callback(classes[i]);
            }
        }
        return classes;
    };
})(jQuery);