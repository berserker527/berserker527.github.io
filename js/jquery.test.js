jQuery.fn.extend({
	isSupportTouch : "ontouchend" in document ? true : false,
	swipeLeft : function(fn){
		if(isSupportTouch){
			$(this).on("touchmove",fn);
		}
	},
	cc : function(fn){
		$(this).click(fn);
	}
});