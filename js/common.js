head.ready(function() {

	var agent = navigator.userAgent,
	event = (agent.match(/iPad/i)) ? "touchstart" : "click";

	$(document).bind(event, function(e){
		$(".js-overlay").hide();
		$("body").removeClass("has-open-popup");
		$(".js-select-list").hide();
		$(".js-select").removeClass("is-active");
		$(".js-extend-item").removeClass("is-active");
		$(".js-item-popup").fadeOut(200);
	});

	$(".js-extend-item-link").on("click", function(event){
		$(".js-extend-item").removeClass("is-active");
		$(this).parents(".js-extend-item").toggleClass("is-active");
		event.stopPropagation();
		return false;
	});

	// popups
	$(".js-popup-link").on("click", function(event){
		$(".js-overlay").fadeOut(200);
		var popup = $(this).attr("href");
		$("body").addClass("has-open-popup");
		$("."+popup).parent().fadeIn(200);
		event.stopPropagation();
		return false;
	});
	$(".js-popup-close").on("click", function(){
		$(".js-overlay").fadeOut(200); 
		$("body").removeClass("has-open-popup")
		return false;
	});
	$(".js-popup").on("click", function(event){
		event.stopPropagation();
	});

	$(".js-order-link").on("click", function(event){
		var popup = $(this).attr("href");
		var left = $(this).parents(".items-wrap").find(".js-item").first().offset().left;
		var top = $(this).parents(".js-item").offset().top;
		$("."+popup).css({
		 	left: left,
		 	top: top
		});
		$("."+popup).fadeIn(200);
		event.stopPropagation();
		return false;
	});
	$(".js-item").on("click", function(event){
		event.stopPropagation();
	});	
	$(".js-item-popup").on("click", function(event){
		event.stopPropagation();   
	});	

	$(".js-item-popup-close").on("click",function(){
		$(this).parents(".js-item-popup").fadeOut(200)
;	});

	$('.js-slider-offers').slick({
		slidesToShow: 1,
		infinite: true,
		speed: 300,
		touchMove: true,
		arrows: true,
		dots: true,
		autoplay: true,
  		autoplaySpeed: 5000,
		onInit: function(){
			//$(".slider-banner").addClass("is-ready");
		}
	});
	$('.js-promo-slider').slick({
		slidesToShow: 1,
		infinite: true,
		speed: 300,
		touchMove: true,
		//arrows: true,
		dots: true,
		autoplay: true,
  		autoplaySpeed: 5000,
		onInit: function(){
			$(".slider").addClass("is-ready");
		}
	});
	
	function ui_slider_range() {
		$(".js-ui-slider-range").each(function(){
			var slider = $(this).find(".js-ui-slider-main");
			var input_from = $(this).find(".js-ui-slider-from");
			var input_to = $(this).find(".js-ui-slider-to");
			var min_val = +$(this).attr("data-min");
			var max_val = +$(this).attr("data-max");
			slider.slider({
				range: true,
				min: min_val,
				max: max_val,
				step: 1000,	
				values: [ min_val, max_val ],
				slide: function( event, ui ) {
					$(this).find(".ui-slider-handle").html("<span></span>");
					var handle_0 = $(this).find(".ui-slider-range").next().find("span")
					var handle_1 = $(this).find(".ui-slider-range").next().next().find("span");
					input_from.text(ui.values[0]);
					input_to.text(ui.values[1]);
					handle_0.text(ui.values[0]);
					handle_1.text(ui.values[1]);
				}
			});
			console.log(handle_0);
			console.log(handle_1);
			$(this).find(".ui-slider-handle").html("<span></span>");
			var handle_0 = $(this).find(".ui-slider-range").next().find("span")
			var handle_1 = $(this).find(".ui-slider-range").next().next().find("span");
			handle_0.text(slider.slider( "values", 0 ));
			handle_1.text(slider.slider( "values", 1 ));
			input_from.text(slider.slider( "values", 0 ));
			input_to.text(slider.slider( "values", 1 ));
		});
	}
	ui_slider_range();



	function choose() {
		var number = $(".js-choose");
		number.each(function(){
			var max_number = +($(this).attr("data-max-number"));
			var input = $(this).find("input");
			var digit = $(this).find(".js-choose-digit");
			var plus = $(this).find(".js-plus");
			var minus = $(this).find(".js-minus");
			plus.on("click", function(){
				var val = +(input.val());
				if (val >= max_number) {
					return false
				}
				else {
					val += 1;
					input.val(val);
					digit.text(val);
				}
			});
			minus.on("click", function(){
				var val = +(input.val());
				if (val > 1) {
					val -= 1;
					input.val(val);
					digit.text(val);
				}
				else {
					return false;
				}
			});
		});
	}
	choose();

	function fixedHeader() {
		var top = $(".js-full-cart .header__top").outerHeight();
		var scroll_top = $(document).scrollTop();
		if (scroll_top >= top) {
			$("body").addClass("has-fixed-header");
		}
		else {
			$("body").removeClass("has-fixed-header");
		}
	}
	if ($(".js-full-cart").length) {
		fixedHeader();
	}
	$(window).scroll(function(){
		if ($(".js-full-cart").length) {
			fixedHeader();
		}
	});

	function tab() {
       $(".js-tab").each(function(){
        	var tab_link = $(this).find("a");
        	var tab_cont = $(this).parents(".js-tab-group").find(".js-tab-cont");
        	tab_cont.hide();
            var id_active = $(this).find(".is-active").attr("href");
        	$("."+id_active).show();
        	//$(this).parents(".js-tab-group").find(".js-tab1").show();
        	tab_link.on("click", function() {
            	var index = $(this).attr("href");
            	tab_link.removeClass("is-active");
            	$(this).addClass("is-active");
            	tab_cont.hide();
            	$(this).parents(".js-tab-group").find("."+index).show();
            	return false;
          	});
       });
  	}
  	tab();

  	$("body").prepend( '<div class="tooltip js-tooltip"><div class="tooltip__in"></div></div>' );
	var tooltip = $(".js-tooltip");
	$(".js-tooltip-key").hover(
		function(){
			var left = $(this).offset().left;
			var bottom = $(window).height() - $(this).offset().top;
			var tooltip_html = $(this).attr("data-title");
			tooltip.css({
				left: left,
				bottom: bottom
			});
			tooltip.find(".tooltip__in").html(tooltip_html).fadeIn("fast");
			tooltip.fadeIn("fast");
		},
		function() {
			tooltip.hide();
		}
	);
	tooltip.hover(
		function(){
			tooltip.show();
		},
		function() {
			tooltip.hide(); 
		}
	);

});