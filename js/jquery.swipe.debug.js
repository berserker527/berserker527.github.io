//公用参数
var com = {
	isSupportTouch : "ontouchend" in document ? true : false,
	minDistance : 30,
	isTouchStart : false,
	isCanTrigger : false,
	debugMode : true,
};
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
			if(com.debugMode){
				$("body").append("------touchlength : " + e.touches.length + "<br/>");
			}
		}else{
			src = e;
		}
		this.start.x = src.pageX;
		this.start.y = src.pageY;
		if(com.debugMode){
			console.log("--setStart x ： " + this.start.x + " y : " + this.start.y);
			$("body").append("--setStart x ： " + this.start.x + " y : " + this.start.y + "<br/>");
		}
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
		if(com.debugMode){
			console.log("--setEnd x ： " + this.end.x + " y : " + this.end.y);
			$("body").append("--setEnd x ： " + this.end.x + " y : " + this.end.y + "<br/>");
		}
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
	}
};

jQuery.fn.extend({
	swipe : function(fn, _direction ,_distance){
//		console.log("--swipe");
		var eventParam = {}
		if(_distance){
			com.minDistance = _distance > 0 ? _distance : 1;
		}
		if(_direction){
			if(isNaN(_direction)){
				eventParam.direction = _direction;
//				console.log("----bind swipe " + _direction);
				jQuery(this).bind("swipe" + _direction, eventParam, fn);				
			}else{
				com.minDistance = _distance > 0 ? _distance : 1;
				jQuery(this).bind("swipe", eventParam, fn);
			}
		}else{
//			console.log("----bind swipe");
			jQuery(this).bind("swipe", fn);
		}
		return jQuery(this);
	},
	swipeLeft : function(fn, _distance){
		if(_distance){
			return this.swipe(fn, "left", _distance);
		}
		return this.swipe(fn, "left");
	},
	swipeRight : function(fn, _distance){
		if(_distance){
			return this.swipe(fn, "right", _distance);
		}
		return this.swipe(fn, "right");
	},
	swipeTop : function(fn, _distance){
		if(_distance){
			return this.swipe(fn, "top", _distance);
		}
		return this.swipe(fn, "top");
	},
	swipeDown : function(fn, _distance){
		if(_distance){
			return this.swipe(fn, "down", _distance);
		}
		return this.swipe(fn, "down");
	}
});

var eventManager = function(e){
	if(com.debugMode){
//		console.log(e);
//		$("body").append("# evevt :" + e + "<br/>");
	}
	var ele = e.target;
	e.stopPropagation();
    e.preventDefault();
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
			if(com.debugMode){
				console.log("--touchmove");
				$("body").append("--touchmove" + "<br/>");
			}
		case "mousemove" :
			if(!com.isTouchStart){
				return;
			}
			if(com.debugMode){
				console.log("--mousemove");
				$("body").append("--mousemove" + "<br/>");
			}
			pos.setEnd(e);
//			var direction = pos.getDirection();
//			if(com.debugMode){
//				console.log("----direction ： " + direction);
//				$("body").append("----direction ： " + direction + "<br/>");
//				console.log("----isCanTrigger ： " + com.isCanTrigger);
//				$("body").append("----isCanTrigger ： " + com.isCanTrigger + "<br/>");	
//			}
//			if(com.isCanTrigger){
//				if(!direction || direction == ""){
//					if(com.debugMode){
//						console.log("----trigger swipe");
//						$("body").append("----trigger swipe" + "<br/>");
//					}
//					$(ele).trigger("swipe");
//				}else{
//					if(com.debugMode){
//						console.log("----trigger swipe " + direction);
//						//console.log("------e.direction " + e.data.direction);
//						$("body").append("----trigger swipe " + direction + "<br/>");
//						//$("body").append("------e.direction " + e.data.direction + "<br/>");
//					}
//					$(ele).trigger("swipe" + direction);
//				}
//			}
			break;
		case 'touchend':
        case 'touchcancel':
        case 'mouseup':
        case 'mouseout':
			if(!com.isTouchStart){
				return;
			}
			if(com.debugMode){
				console.log("--mouseout");
				$("body").append("--mouseout" + "<br/>");
			}
			pos.setEnd(e);
			var direction = pos.getDirection();
			if(com.debugMode){
				console.log("----direction ： " + direction);
				$("body").append("----direction ： " + direction + "<br/>");
				console.log("----isCanTrigger ： " + com.isCanTrigger);
				$("body").append("----isCanTrigger ： " + com.isCanTrigger + "<br/>");
			}
			if(com.isCanTrigger){
				if(!direction || direction == ""){
					if(com.debugMode){
						console.log("----trigger swipe");
						$("body").append("----trigger swipe" + "<br/>");
					}
					$(ele).trigger("swipe");
				}else{
					if(com.debugMode){
						console.log("----trigger swipe " + direction);
						$("body").append("----trigger swipe " + direction + "<br/>");
					}
					$(ele).trigger("swipe" + direction);
				}
			}
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
	if(com.debugMode){
//	$("body").append(com.isSupportTouch + "<br/>");		
	}
	for(var key in eventNames){
		document.addEventListener(eventNames[key], eventManager, false);
	}
})();