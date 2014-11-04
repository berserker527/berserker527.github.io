//公用参数
var com = {
	isSupportTouch : "ontouchend" in document ? true : false,
	minDistance : 30,
	isTouchStart : false,
	isTouchEnd : true,
};
//com.isSupportTouch = "ontouchend" in document ? true : false;
//com.minDistance = 30;
//com.caonima = "caonima";
//起止位置
var pos = {
	start : {
		x : 0,
		y : 0
	},
	end : {
		x : 0,
		y : 0
	},
	setStart : function(e){
		this.start.x = e.pageX;
		this.start.y = e.pageY;
	},
	setEnd : function(e){
		this.end.x = e.pageX;
		this.end.y = e.pageY;
	},
	getDirection : function(){
		if(this.getDistance(this) < com.minDistance){
			return "";
		}
		com.isTouchStart = false;
		var _x = pos.end.x - pos.start.x;
		var _y = pos.end.y - pos.start.y;
		var dx = Math.abs(_x);
		var dy = Math.abs(_y);
		if(dx > dy){
			if(_x < 0){
				return "left";
			}
			if(_x > 0){
				return "right";
			}
			return "";
		}
		if(dx < dy){
			if(_y < 0){
				return "top";
			}
			if(_y > 0){
				return "down";
			}
			return "";
		}
		return "";
	},
	getDistance : function(pos){
		pos = pos || this;
		if (pos.start.x >= 0 && pos.end.x >= 0) {
			var x = pos.end.x - pos.start.x;
			var y = pos.end.y - pos.start.y;
			return Math.sqrt((x * x) + (y * y));
		}
		return 0;
	},
	clear : function(){
		this.start.x = this.start.y = this.end.x = this.end.y = 0;
	},
	show : function(){
		alert("show");
	}
};

jQuery.fn.extend({
	swipe : function(fn, _direction){
		console.log("--swipe");
		console.log(this);
		//operate.bind($(this)[0], "swipe", fn);
		if(_direction){
			console.log("----bind swipe left");
			jQuery(this).bind("swipe" + _direction, fn);
		}else{
			console.log("----bind swipe");
			jQuery(this).bind("swipe", fn);
		}
		return jQuery(this);
	},
	swipeLeft : function(fn){
		return this.swipe(fn, "left");
	},
	swipeRight : function(fn){
		return this.swipe(fn, "right");
	},
	swipeTop : function(fn){
		return this.swipe(fn, "top");
	},
	swipeDown : function(fn){
		return this.swipe(fn, "down");
	}
});

function eventManager(e){
	var ele = e.target;
	switch (e.type) {
		case "touchstart" : 
		case "mousedown" :
			com.isTouchStart = true;
			pos.setStart(e);
			break;
		case "touchmove" :
		case "mousemove" :
			if(!com.isTouchStart){
				return;
			}
			pos.setEnd(e);
			var direction = pos.getDirection();
			if(!direction || direction == ""){
				$(ele).trigger("swipe");
			}else{
				$(ele).trigger("swipe" + direction);
			}
			
			break;
		case 'touchend':
        case 'touchcancel':
        case 'mouseup':
        case 'mouseout':
			pos.clear();
			break;
	};
	
};
//初始化点击或者触摸的相关事件
(function init(){
	var eventNames = {
		START : "mousedown",
		MOVE : "mousemove",
		END : "mouseup",
		CANCEL : "mouseout"
	};
	if(com.isSupportTouch){
		var eventNames = {
			START : "touchstart",
			MOVE : "touchmove",
			END : "touchend",
			CANCEL : "touchcancel"
		};
	}
	for(var key in eventNames){
		document.addEventListener(eventNames[key], eventManager, false);
	}
})();