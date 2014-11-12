$(function(){
	var url = window.location.href;
	var temp = url.split("/");
	var disk = temp[temp.length - 2];
	var trace = temp[temp.length - 1].replace(".html","");
	var _width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	if(_width >= 1024){
		$("#" + disk).parent().show();
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

});
