var isSupportTouch = "ontouchend" in document ? true : false;
jQuery.fn.extend({
	swipeLeft : function(fn){
		if(isSupportTouch){
			$(this).on("touchmove",fn);
		}
	},
	cc : function(fn){
		$(this).click(fn);
	}
});