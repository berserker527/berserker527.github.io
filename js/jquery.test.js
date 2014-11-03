var _isSupportTouch = "ontouchend" in document ? true : false;
var _startX, _startY, _endX, _endY;
jQuery.fn.extend({
	swipe : function(fn){
		
	},
	swipeLeft : function(fn){
		if(_isSupportTouch){
			$(this).on("touchmove",fn);
		}
	},
	cc : function(fn){
		alert(this.e.pageX + " " + this.e.pageY);
		$(this).click(fn);
	}
});