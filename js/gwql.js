$(function(){
	var url = window.location.href;
	var temp = url.split("/");
	var disk = temp[temp.length - 2];
	var trace = temp[temp.length - 1].replace(".html","");
	var _width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	function initTitle(){
		if(_width >= 1024){
			$("#" + disk).parent().show();
			$("ul[disk=" + disk + "]").children("li[trace=" + trace + "]").append("<span></span>");
		}
	}
	
	$(".disk-option li").click(function(){
		if (_width >= 1024) {
			var index = $(this).index();
			$(".trace").hide().eq(index).show();
		}
	})
	
	$(".disk-li").hover(
		function(){
			console.log(_width);
			if (_width < 1024) {
				$(this).children(".trace-down").show();
			}
		},
		function(){
			console.log(_width);
			if (_width < 1024) {
				$(this).children(".trace-down").hide();
			}
		}
	);
	
	var sectionCount;
	var pageCount;
	var currentPage = 0;
	function initPager(){
		$.ajax({
          type: "GET",
          url: "../txt/" + disk + "_" + trace + ".txt",
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
          url: "../txt/" + disk + "_" + trace + ".txt",
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
