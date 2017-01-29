var loaded
$("body").append("<div class = 'loadEl'><div class ='left-bg'></div><div class='left-load'></div><div class='right-load'></div><div class ='right-bg'></div><img src='img/logo/logo.png'>")
function setLoad(){
	var bgHeight = $(window).height();
	var bgWidth = $(window).width();
	$(".left-load").css("border-right", ""+(bgWidth/2)+"px solid #2D2A81");
	$(".left-load").css("border-top", ""+bgHeight+"px solid transparent");

	$(".right-load").css("border-left", ""+(bgWidth/2)+"px solid #108AEF");
	$(".right-load").css("border-bottom", ""+bgHeight+"px solid transparent");
}


setLoad();
$(window).resize(function() {
	setLoad();
});