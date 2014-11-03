var _isSupportTouch = "ontouchend" in document ? true : false;
var _startX, _startY, _endX, _endY;
jQuery.fn.extend({
	swipe : function(){
		$(this).one("touchstart",function(e){
			_startX = e.pageX;
			_startY = e.pageY;
		}).one("touchend",function(e){
			_endX = e.pageX;
			_endY = e.pageY;
		});
		if(_startX < _endX){
			alert("right");
		}
		else{
			alert("left");
		}
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