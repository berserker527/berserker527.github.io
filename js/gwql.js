$(function(){
	var url = window.location.href;
	var temp = url.split("/");
	var disk = temp[temp.length - 2];
	var trace = temp[temp.length - 1].replace(".html","");
	var _width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	if(_width >= 1024){
		console.log("ok");
		console.log($("#" + disk).html());
		$("#" + disk).show();
	}

});
