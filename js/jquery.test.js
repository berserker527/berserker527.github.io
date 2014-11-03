var _isSupportTouch = "ontouchend" in document ? true : false;
var _startX, _startY, _endX, _endY;
var _direction;

jQuery.fn.extend({
	swipe : function(fn, direction){
		var startEvent = "touchstart";
		var endEvent = "touchend";
		if (!_isSupportTouch) {
			startEvent = "mousedown";
			endEvent = "mouseup";
		}
		if(direction == "right" || direction == "left"){
			this.addEventListener(startEvent, function(e){
				_startX = e.pageX;
				_startY = e.pageY;
				console.log(_startX + " " + _startY);
			});
			this.addEventListener(endEvent, function(e){
				_endX = e.pageX;
				_endY = e.pageY;
				console.log(_endX + " " + _endY);
				if(_startX < _endX){
					_direction = "right";
				}
				else if(_startX > _endX){
					_direction = "left";
				}
				if(_direction == direction){
					fn();
				}
			});
		}
		return this;
	},
	swipeLeft : function(fn){
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
