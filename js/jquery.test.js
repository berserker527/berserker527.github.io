//公用参数
var com = {
	isSupportTouch : "ontouchend" in document ? true : false,
	minDistance : 30,
	isTouchStart : false,
	isTouchEnd : true,
	isCanTrigger : false
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
		var src = {};
		if(com.isSupportTouch){
			src = e.touches[0];
			alert(touches.length);
		}else{
			src = e;
		}
		this.start.x = src.pageX;
		this.start.y = src.pageY;
		console.log("--setStart");
		$("body").append("--setStart x ： " + this.start.x + "<br/>");
	},
	setEnd : function(e){
		var src = {};
		if(com.isSupportTouch){
			src = e.touches[0];
		}else{
			src = e;
		}
		this.end.x = src.pageX;
		this.end.y = src.pageY;
		console.log("--setEnd");
		$("body").append("--setEnd x ： " + this.end.x + "<br/>");
	},
	getDirection : function(){
		if(this.getDistance(this) < com.minDistance){
			return "";
		}
		com.isTouchStart = false;
		com.isCanTrigger = true;
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
		$("body").append("show");
	}
};

jQuery.fn.extend({
	swipe : function(fn, _direction){
		console.log("--swipe");
		if(_direction){
			console.log("----bind swipe " + _direction);
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

var eventManager = function(e){
	console.log(e);
	$("body").append("# evevt :" + e + "<br/>");
	var ele = e.target;
	switch (e.type) {
		case "touchstart" : 
		case "mousedown" :
			com.isTouchStart = true;
			pos.setStart(e);
			break;
		case "touchmove" :
			if(!com.isTouchStart){
				return;
			}
			console.log("--touchmove");
			$("body").append("--touchmove" + "<br/>");
		case "mousemove" :
			if(!com.isTouchStart){
				return;
			}
			console.log("--mousemove");
			$("body").append("--mousemove" + "<br/>");
			pos.setEnd(e);
			var direction = pos.getDirection();
			console.log("----direction ： " + direction);
			$("body").append("----direction ： " + direction + "<br/>");
			console.log("----isCanTrigger ： " + com.isCanTrigger);
			$("body").append("----isCanTrigger ： " + com.isCanTrigger + "<br/>");
			if(com.isCanTrigger){
				if(!direction || direction == ""){
					console.log("----trigger swipe");
					$("body").append("----trigger swipe" + "<br/>");
					$(ele).trigger("swipe");
				}else{
					console.log("----trigger swipe " + direction);
					$("body").append("----trigger swipe " + direction + "<br/>");
					$(ele).trigger("swipe" + direction);
				}
			}
			break;
		case 'touchend':
        case 'touchcancel':
        case 'mouseup':
        case 'mouseout':
			pos.clear();
			com.isCanTrigger = false;
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
	$("body").append(com.isSupportTouch + "<br/>");
	for(var key in eventNames){
		document.addEventListener(eventNames[key], eventManager, false);
	}
})();