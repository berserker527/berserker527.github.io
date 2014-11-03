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
		if(fn){
			$(this).click(fn);
		}
		else{
			$(this).click(function(){
				alert("X : " + this.e.pageX + " Y : " + this.e.pageY)
			});
		}
	}
});