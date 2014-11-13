$(function(){
	//disk标题
	var disks = {"disk1":"Disk 1 苏醒的梦", "disk2":"Disk 2 流转的风", "disk1":"Disk 3 消散的虹"}
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
	var track = temp[temp.length - 1].replace(".html","");
	//浏览器宽度，用于判定是什么设备
	var _width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	//初始化文档标题，正文显示的标题，左侧对应disk的track
	function initTitle(){
		document.title = "歌尾倾泪_" + tracks[disk][track];
		$(".title-disk").text(disks[disk]);
		$(".title-track").text(tracks[disk][track]);
		if(_width >= 1024){
			$("#" + disk).parent().show();
			$("ul[disk=" + disk + "]").children("li[track=" + track + "]").append("<span></span>");
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
		console.log("refreshTime : " + refreshTime);
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
			console.log(" : sectionCount" + sectionCount);
			//5个大段落当做1页
		  	pageCount = Math.floor((sectionCount - 1) / 5);
			console.log(" : pageCount" + pageCount);
			
			initPage();
			showContext(0);
		  },
		  error: function(){ //请求无效则重新请求
		  	refreshTime--;
			initContent();
		  }
        });
	}
	//初始化页码
	function initPage(){
		$(".page").append('<div class="prev">&lt;</div>');
		$(".prev").hide();
		for (var i = 0; i < pageCount + 1; i++) {
			if(i == 0){
				$(".page").append('<div class="current" index="' + i + '">' + (i + 1) + '</div>');
			}
			else{
				$(".page").append('<div class="num" index="' + i + '">' + (i + 1) + '</div>');
			}
		};
		$(".page").append('<div class="next">&gt;</div>');
		
		$(".num, .current").click(function(){
			$(".current").removeClass("current").addClass("num");
			$(this).removeClass("num").addClass("current");
			
			var index = $(this).attr("index");
			showContext(index);
		});
		$(".prev").click(function(){
			showContext(currentPage - 1);
			console.log("prev currentPage : " + (currentPage - 1))
		});
		$(".next").click(function(){
			showContext(currentPage + 1);
			console.log("prev currentPage : " + (currentPage + 1))
		});
	}
	//按页码显示正文
	function showContext(index){
		console.log("into showContext");
		if(index < 0 || index > pageCount){
			console.log("out of showContext");
			return;
		}
		currentPage = index;
		
	  	console.log("currentPage ： " + currentPage);
		data = content.split("<br/>");
		
		$(".content").html("");
		for (var i = 0; i < 5; i++) {
			if(5 * currentPage + i < sectionCount){
				$(".content").append(data[5 * currentPage + i] + "<br/>");
				//console.log(data[5 * currentPage + i]);
			}
			else{
				break;
			}
		};
		
		if(currentPage == 0){
			$(".prev").hide();
		}else{
			$(".prev").show();
		}
		
		if(currentPage == pageCount){
			$(".next").show();
		}else{
			$(".next").hide();
		}
		window.document.body.scrollTop = 0;
	}
	
	$(".disk-option li").click(function(){
		if (_width >= 1024) {
			var index = $(this).index();
			$(".track").hide().eq(index).show();
		}
	})
	
	$(".disk-li").hover(
		function(){
			console.log(_width);
			if (_width < 1024) {
				$(this).children(".track-down").show();
			}
		},
		function(){
			console.log(_width);
			if (_width < 1024) {
				$(this).children(".track-down").hide();
			}
		}
	);
	
	initTitle();
	initContent();
	

});
