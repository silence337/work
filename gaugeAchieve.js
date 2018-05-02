var gaugeProgress = function(options){
	var me = this;
	var defaults = {
		id : null,       // necessary
		current : null,  // necessary
		maximum : null,  // necessary
		percentage : false,
		currentNode : null,
		maximumNode : null,
		fps : null,
		callback : null
	};
	this.settings = this.extend(defaults, options);

	this.el = document.getElementById(this.settings.id);
	this.gauge   = this.el.querySelector('.bar');
	this.percentage = this.settings.percentage;
	this.current = this.settings.current;
	this.maximum = this.settings.maximum;
	this.fps = this.settings.fps;
	me.callback = this.settings.callback;

	if (!this.maximum) { console.log("Please setting maximum value");}
	if (!this.current) { console.log("Please setting current value");}

	me.createText(this.settings.currentNode, this.settings.current);
	me.createText(this.settings.maximumNode, this.settings.maximum);

	if (this.percentage){
		this.progressPercentage();
		me.createText('percentage', this.result + '%');
	}
	document.addEventListener("DOMContentLoaded", function(){
    	me.doAnimation();
  	});
}
gaugeProgress.prototype = {
	extend : function(defaults, options){
		var extended = {};
		var prop;
		for (prop in defaults) {
			if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
				extended[prop] = defaults[prop];
			}
		}
		for (prop in options) {
			if (Object.prototype.hasOwnProperty.call(options, prop)) {
				extended[prop] = options[prop];
			}
		}
		return extended;
	},
	createText : function(setting, val){
		var regexp = /\B(?=(\d{3})+(?!\d))/g;
		var valueReplace = val.toString().replace(regexp, ',');
		if (!setting) {
			return;
		}
		var len = this.el.querySelector('.' + setting) !== null;
		if (len){
			this.el.querySelector('.' + setting).textContent = valueReplace;
			return;
		}
		var create = document.createElement('span');
		create.setAttribute('class', setting);
		this.el.appendChild(create);

		var eNodeValue = document.createTextNode(valueReplace);
		var node = this.el.querySelector('.' + setting);
		node.appendChild(eNodeValue);
	},
	progressPercentage : function(){
		this.result = this.current / this.maximum * 100;
	},
	progressBar : function(){
		this.gauge.style.WebkitTransition = this.fps;
		this.gauge.style.transition = this.fps;

		this.progressPercentage();

		if(this.result >= 100){
			this.gauge.style.width = '100%';
		}else{
			this.gauge.style.width = this.result + '%';
		}
	},
	callback : function(){
		if (typeof this.callback === 'function') {
			this.callback();
		} else {
			window[this.callback].call();
		}
	},
	doAnimation : function() {
		var me = this;
		me.progressBar();
		if (me.callback) {
			me.callback();
		}
	},
	changeCurrent : function(currentVal){
		var me = this;
		this.current = currentVal;
		this.progressPercentage();
		me.createText(this.settings.currentNode, this.current);
		if (this.percentage){
			me.createText('percentage', this.result + '%');
		}
		me.doAnimation();
	}
}
