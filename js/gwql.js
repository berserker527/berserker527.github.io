$(function(){
	//disk标题
	var disks = {"disk1":"Disk 1 苏醒的梦", "disk2":"Disk 2 流转的风", "disk3":"Disk 3 消散的虹"}
	//track标题
	var tracks = {"disk1":{
		"track1":"Track 1 弦拨浪起",
		"track2":"Track 2 我的前奏弹给你听",
		"track3":"Track 3 吟咏",
		"track4":"Track 4 破音",
		"track5":"Track 5 混乱的狂想曲",
		"track6":"Track 6 哀鸿调",
		"track7":"",
		"track8":"",
		"track9":"",
		"track10":""
	},"disk2":{
		"track1":"",
		"track2":"",
		"track3":"",
		"track4":"",
		"track5":"",
		"track6":"",
		"track7":"",
		"track8":"",
		"track9":"",
		"track10":""
	},"disk3":{
		"track1":"",
		"track2":"",
		"track3":"",
		"track4":"",
		"track5":"",
		"track6":"",
		"track7":"",
		"track8":"",
		"track9":"",
		"track10":""
	}};
	//根据url判断具体是哪一章
	var url = window.location.href;
	var temp = url.split("/");
	var disk = temp[temp.length - 2];
	var track = temp[temp.length - 1].replace(/.html[\s\S]*/,"");
	//浏览器宽度，用于判定是什么设备
	var _width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	var _height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	//初始化文档标题，正文显示的标题，左侧对应disk的track
	function initTitle(){
		document.title = "歌尾倾泪_" + tracks[disk][track];
		$(".title-disk").text(disks[disk]);
		$(".title-track").text(tracks[disk][track]);
		if(_width >= 1024){
			$("#" + disk).parent().show();
			$("ul[disk=" + disk + "]").children("li[track=" + track + "]").append("<span></span>");
			//二维码
			$(".qrcode img").attr({src : "../img/qrcode/" + disk + "_" + track + ".png", alt : document.title});
		}
	}
	//是否展示封面
	var coverCanShow = (window.location.search) ? false : true;
	//初始化封面
	function initCover(){
		if(_width <= 480 && coverCanShow){
			$(".cover img").css({height : _height + "px"});
		}else{ //如果不是手机端，直接移除，防止遮挡其余的元素
			$(".cover").remove();
		}
	}
	//正文内容
	var content = "";
	//大段落数量
	var sectionCount;
	//分页数量
	var pageCount;
	//当前页
	var currentPage = 0;
	//最大重新请求次数
	var refreshTime = 10;
	
	//初始化正文内容
	function initContent(){
		$.ajax({
          type: "GET",
          url: "../txt/" + disk + "_" + track + ".txt",
          success: function(data){
		  	if(data != ""){
				content = data;
			}else if(refreshTime > 0){ //请求无效则重新请求
				refreshTime--;
				initContent();
			}
		  	//大段落按txt中插入的<br/>计算
		  	sectionCount = data.split("<br/>").length;
			//5个大段落当做1页
		  	pageCount = Math.floor((sectionCount - 1) / 5);
			//成功获取txt后，初始化页码和第一页
			initPage();
			showContext(0);
		  },
		  error: function(){ 
		  	//refreshTime--;
			//initContent();
			$(".content").html("").append("<p>敬请期待！</p>");
		  }
        });
	}
	//初始化页码
	function initPage(){
		//组装页码
		$(".page").append('<div class="prev">&lt;</div>');
		for (var i = 0; i < pageCount + 1; i++) {
			if(i == 0){
				$(".page").append('<div class="num current" index="' + i + '">' + (i + 1) + '</div>');
			}
			else{
				$(".page").append('<div class="num" index="' + i + '">' + (i + 1) + '</div>');
			}
		};
		$(".page").append('<div class="next">&gt;</div>');
		//为页码按钮绑定点击事件
		$(".num").click(function(){
			$(".current").removeClass("current").addClass("num");
			$(this).removeClass("num").addClass("current");
			
			var index = $(this).attr("index");
			showContext(index);
		});
		//上一页
		$(".prev").click(function(){
			showContext(--currentPage);
		});
		//下一页
		$(".next").click(function(){
			showContext(++currentPage);
		});
	}
	//按页码显示正文
	function showContext(index){
		//防止页码超出范围
		if(index < 0 || index > pageCount){
			return;
		}
		currentPage = index;
		
		$(".pagenum .currentpage").text(currentPage + 1);
		$(".pagenum .pagecount").text(pageCount + 1);
		
		data = content.split("<br/>");
		//显示正文
		$(".content").html("");
		for (var i = 0; i < 5; i++) {
			if(5 * currentPage + i < sectionCount){
				$(".content").append(data[5 * currentPage + i] + "<br/>");
			}
			else{
				break;
			}
		};
		//当前页的样式
		$(".current").removeClass("current").addClass("num");
		$(".num[index=" + currentPage + "]").removeClass("num").addClass("current");
		//控制上一页和下一页按钮的显示
		if(currentPage == 0){
			$(".prev").hide();
		}else{
			$(".prev").show();
		}
		
		if(currentPage == pageCount){
			$(".next").hide();
		}else{
			$(".next").show();
		}
		//翻页后页面滚到开始
		window.document.body.scrollTop = 0;
	}
	//pc端左侧目录
	$(".disk-option li").click(function(){
		if (_width >= 1024) {
			var index = $(this).index();
			$(".track").hide().eq(index).show();
		}
	});
	//pad端顶部目录
	$(".disk-li").hover(
		function(){
			if (_width < 1024) {
				$(this).children(".track-down").show();
			}
		},
		function(){
			if (_width < 1024) {
				$(this).children(".track-down").hide();
			}
		}
	);
	//跳转章节
	$("ul[disk] li").click(function(){
		var _disk = $(this).parent().attr("disk");
		var _track = $(this).attr("track");
		
		window.location = "../" + _disk + "/" + _track + ".html?read=notfirst";
	});
	//menu按钮
	$(".tools .menu").click(function(){
		$(".tools .track").hide();
		$(".tools .disk li").removeClass("checked");
		$(".tools .disk").toggle();
	});
	//选择disk
	$(".tools .disk li").click(function(){
		$(".tools .disk li").removeClass("checked");
		var index = $(this).addClass("checked").index();
		disk = $(this).attr("disk");
		$(".tools .track").hide().eq(index).show();
	});
	//选择track
	$(".tools .track li").click(function(){
		track = $(this).attr("track");
	});
	//手机端点击正文，目录隐藏
	$(".main").click(function(){
		if(_width > 480){
			return;
		}
		$(".tools .disk").hide();
		$(".tools .track").hide();
	});
	//pc端二维码居中显示
	$(".qrcode").click(function(){
		$(this).toggleClass("qrcode_mark");
		$(".qrcode img").toggleClass("img_mark");
	});
	//封面点击后消失
	$(".cover").click(function(){
		$(this).animate({
			left : "-300px",
			opacity : 0
		},1000,function(){
			$(this).remove(); //不移除的话，tools按钮会被挡住而失效
		});
	});
	
	initCover();
	initTitle();
	initContent();
	

});
