jQuery(document).ready(function($) {
	var bgImg = new Image
		bgImg.src = "img/bg-1.jpg";

		$(bgImg).bind('load', function() {
			$(".left-load").animate({"left": "100%"}, 1800, function(){
				$(".loadEl").hide();
			});
			$(".right-load").animate({"right": "100%"}, 1800);
			$(".left-bg").animate({"top": "125%"}, 1410);
			$(".right-bg").animate({"top": "-100%"}, 1420);
			$(".loadEl>img").animate({"opacity": 0, "width": 300, "left": "41%", "top": "39%" }, 1800);
		});

		// $(window).bind('load', function() {
		// 	$(".left-load").animate({"left": "100%"}, 1800);
		// 	$(".right-load").animate({"right": "100%"}, 1800);
		// 	$(".left-bg").animate({"left": "125%"}, 1410);
		// 	$(".right-bg").animate({"left": "-100%"}, 2120, function(){
		// 		$(".loadEl").hide();
		// 	});
		// 	$(".loadEl>img").animate({"opacity": 0, "width": 300, "left": "41%", "top": "39%" }, 1800);
		// });


		
		var bgHeight = $(window).height();
		function slideHeight(){
			$(".left-side").css("height", bgHeight)
			$(".right-side").css("height", bgHeight)
			$(".main-wrapper").css("height", bgHeight)
		}
		slideHeight();
		$(window).resize(function() {
			slideHeight();
		});



	var i=0;
		$(".slides li").each(function(){
			$(".left-side", this).css("margin-top", bgHeight*i);
			$(".right-side", this).css("margin-top", -bgHeight*i);
			i++;
		});
	function border(){
	$(".left-side").css("border-right", "1px solid #AAB8C5");
		$(".left-side").css("box-shadow", "30px 0px 30px rgba(0,0,0,.5)");
		setTimeout(function () {
			$(".left-side").css("border-right", "0px solid #AAB8C5");
			$(".left-side").css("box-shadow", "0px 0px 0px rgba(0,0,0,.5)");
		}, 1600);
	}
	var slide = 1
	function nextSlide(){
		if (slide<4) {
			border();
			$(".slides li").each(function(){
				var thisSlideLeft = $(".left-side", this).css("margin-top");
				var thisSlideRight = $(".right-side", this).css("margin-top");
				$(".left-side", this).animate({"margin-top": Number(thisSlideLeft.match(/(\-?)\d+/g))-bgHeight}, 1500);
				$(".right-side", this).animate({"margin-top": Number(thisSlideRight.match(/(\-?)\d+/g))+bgHeight}, 1500);

			});
			slide++;
		}
	}
	function prevSlide(){
		if (slide>1) {
			border();
			$(".slides li").each(function(){
				var thisSlideLeft = $(".left-side", this).css("margin-top");
				var thisSlideRight = $(".right-side", this).css("margin-top");
				$(".left-side", this).animate({"margin-top": Number(thisSlideLeft.match(/(\-?)\d+/g))+bgHeight}, 1500);
				$(".right-side", this).animate({"margin-top": Number(thisSlideRight.match(/(\-?)\d+/g))-bgHeight}, 1500);
			});
			slide--;
		}
	}
	$(".next").on("click", function(){
		nextSlide();

	});
	$(".prev").on("click", function(){
		prevSlide();
	})
	function openText(){
		$(".text-box").animate({"top": 100}, 1000, function(){
			$(".text-box").animate({"width": 300, "left": "40%"}, 1000, function(){
				$(".text-box>h1").animate({"opacity": 1}, 400);
				$(".text-box>p").animate({"opacity": 1, "top": 0}, 700);
			});
		});
	}
	function closeText(){
		$(".text-box>h1").animate({"opacity": 0}, 400);
		$(".text-box>p").animate({"opacity": 0, "top": 100}, 700, function(){
			$(".text-box").animate({"width": 30, "left": "49%"}, 1000, function(){
				$(".text-box").animate({"top": 1000}, 1000);
			});
		});
	}
	$("body").on("click", ".open-text", function(){
		openText();
		$(".open-text").detach();
		$("<div class='close-text'>CLOSE TEXT</div>").insertBefore(".text-box");
	})

	$("body").on("click", ".close-text", function(){
		closeText();
		$(".close-text").detach();
		$("<div class='open-text'>OPEN TEXT</div>").insertBefore(".text-box");
	})



	$(".menu>li").on("mouseover", function() {

	});

	$(".menu>li").on("mouseout", function() {


	});
});

