render: function() {

	var templateParams = _.extend({}, this.model, localizedText),
		renderedTemplate = this.template(templateParams);

	this.$el.html(renderedTemplate);

	this.bindUIElements();
	this.delegateEvents();

	return this;
}