var _isSupportTouch = "ontouchend" in document ? true : false;
var _startX, _startY, _endX, _endY;
var _direction;

jQuery.fn.extend({
	swipe : function(fn, direction){
		alert("swipe");
		var startEvent = "touchstart";
		var endEvent = "touchend";
		if (!_isSupportTouch) {
			startEvent = "mousedown";
			endEvent = "mouseup";alert("notsupportTouch");
		}
		if(direction == "right" || direction == "left"){
			alert("directionok");
			jQuery(this)[0].addEventListener(startEvent, function(e){
				_startX = e.pageX;
				_startY = e.pageY;
				console.log(_startX + " " + _startY);alert("startEvent");
			});
			jQuery(this)[0].addEventListener(endEvent, function(e){
				_endX = e.pageX;
				_endY = e.pageY;
				console.log(_endX + " " + _endY);alert("endEvent");
				if(_startX < _endX){
					_direction = "right";alert("right");
				}
				else if(_startX > _endX){
					_direction = "left";alert("left");
				}
				if(_direction == direction){
					fn();
				}
			});
		}
		return this;
	},
	swipeLeft : function(fn){
		alert("swipeLeft");
		return jQuery(this).swipe(fn,"left");
	},
	swipeRight : function(fn){
		return jQuery(this).swipe(fn,"right");
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
