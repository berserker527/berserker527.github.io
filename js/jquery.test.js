var _isSupportTouch = "ontouchend" in document ? true : false;
var _startX, _startY, _endX, _endY;
var _direction;
jQuery.fn.extend({
	swipe : function(fn, direction){
		if (!_isSupportTouch) {
			return this;
		}
		if(direction == "right" || direction == "left"){
			$(this).on("touchstart",function(e){
				_startX = e.pageX;
				_startY = e.pageY;
				console.log(_startX + " " + _startY);
			}).on("touchend",function(e){
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
					fn;
				}
			});
		}
		return this;
	},
	swipeLeft : function(fn){
		swipe(fn,"left");
	},
	swipeRight : function(fn){
		swipe(fn,"right");
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