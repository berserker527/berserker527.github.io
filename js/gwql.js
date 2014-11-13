$(function(){
	var disks = {"disk1":"Disk 1 苏醒的梦", "disk2":"Disk 2 流转的风", "disk1":"Disk 3 消散的虹"}
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
	var url = window.location.href;
	var temp = url.split("/");
	var disk = temp[temp.length - 2];
	var track = temp[temp.length - 1].replace(".html","");
	var _width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	function initTitle(){
		document.title = "歌尾倾泪_" + tracks[disk][track];
		$(".title-disk").text(disks[disk]);
		$(".title-track").text(tracks[disk][track]);
		if(_width >= 1024){
			$("#" + disk).parent().show();
			$("ul[disk=" + disk + "]").children("li[track=" + track + "]").append("<span></span>");
		}
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
	
	var sectionCount;
	var pageCount;
	var currentPage = 0;
	function initPager(){
		$.ajax({
          type: "GET",
          url: "../txt/" + disk + "_" + track + ".txt",
          success: function(data){
		  	sectionCount = data.split("<br/>").length;
			pageCount = (sectionCount - 1) / 5;
			$(".page").append('<div class="prev">&lt;</div>');
			for (var i = 0; i < pageCount; i++) {
				if(i == 0){
					$(".page").append('<div class="current" index="' + i + '">' + (i + 1) + '</div>');
				}
				else{
					$(".page").append('<div class="num" index="' + i + '">' + (i + 1) + '</div>');
				}
			};
			$(".page").append('<div class="prev">&gt;</div>');
			
			$(".num").click(function(){
				$(".current").removeClass("current").addClass("num");
				$(this).removeClass("num").addClass("current");
				var index = $(this).attr("index");
				showContext(index);
				window.document.body.scrollTop = 0;
			});
          }
        });
	}
	
	function showContext(currentPage){
		$.ajax({
          type: "GET",
          url: "../txt/" + disk + "_" + track + ".txt",
          success: function(data){
		  	console.log(data);
			data = data.split("<br/>");
			
			$(".content").html("");
			for (var i = 0; i < 5; i++) {
				if(5 * currentPage + i < sectionCount){
					$(".content").append(data[5 * currentPage + i] + "<br/>");
					console.log(data[5 * currentPage + i]);
				}
				else{
					break;
				}
			};
          }
        });  
	}
	 
	initTitle();
	initPager();
	showContext(0);

});
