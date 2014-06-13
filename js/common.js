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
		$(".js-window").fadeOut(200);
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

	// windows
	$(".js-window-link").on("click", function(event){
		var popup = $(this).attr("href");
		var left = $(this).parents(".js-window-ancor").offset().left;
		var top = $(this).parents(".js-window-ancor").offset().top;
		$("."+popup).css({
			top: top,
			left: left
		})
		$("."+popup).fadeIn(200);
		event.stopPropagation();
		return false;
	});
	$(".js-window-close").on("click", function(){
		$(".js-overlay").fadeOut(200); 
		$(this).parents(".js-window").fadeOut(200);
		return false;
	});
	$(".js-window").on("click", function(event){
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
	});

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
	$(".js-promo-slider").each(function(){

		if ($(this).find(".js-slide").length <= 1) {
			$(this).addClass("has-one-slide");
		}
		else {
			$(this).removeClass("has-one-slide");
		}
	});
	
	$(".js-compaign-key").on("click",function(){
		$(this).parents(".js-place").find(".js-compaigns").slideToggle(200)
	});
	$(".js-compaigns-close").on("click",function(){
		$(this).parents(".js-place").find(".js-compaigns").slideUp(200)
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

	var sidebar = $(".js-sidebar");
    var sidebar_in = sidebar.find(".sidebar__in");

    function fixedSidebar() {
    	if ($(".js-full-cart").length) {
    		var top = sidebar.offset().top -79;
    	}
    	else {
    		var top = sidebar.offset().top;
    	}
        var left = sidebar.offset().left
        var scroll_top = $(document).scrollTop();
        var height = sidebar_in.outerHeight();

        if (scroll_top >= top) {
            $("body").addClass("has-fixed-sidebar");

            // set max sidebar height
            if (height >= $(window).height()) {
                sidebar.find(".sidebar__wrap").css({
                    maxHeight: $(window).height()-80
                });
                sidebar_in.css({
                    maxHeight: $(window).height()-36,
                    left: left
                });
            }
            if (height < $(window).height()) {
                sidebar.find(".sidebar__wrap").css({
                    maxHeight: 'auto'
                });
                sidebar_in.css({
                    maxHeight: 'auto'
                });
            }

            // remove fixing
            


        }
        else {
            $("body").removeClass("has-fixed-sidebar");
        }
    }
    if (sidebar.length) {
        fixedSidebar();
    }

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

	$(window).resize(function(){
        if (sidebar.length) {
            fixedSidebar();
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

	$(".js-more-categs").on("click",function(){
		$(this).parent().hide();
		$(this).parents(".js-sidebar-categs").find("[hidden]").removeAttr("hidden");
	});
	$(".js-order").on("click",function(){
		$(this).toggleClass("is-active");
		$(this).parent().find(".js-order-detail").slideToggle(200)
	});

	$(".js-select select").on("change",function(){
		var	val = $(this).val();
		$(this).parent().find(".js-select-input").val(val);
		$(this).parent().find(".js-select-text").text(val);
	});

	$("body").on("change",".js-check input",function(){
		if ($(this).is(":checked")) {
			$(this).parent().addClass("is-checked");
			$(this).parents(".js-check-group").addClass("is-active")
		}
		else {
			$(this).parent().removeClass("is-checked");
			$(this).parents(".js-check-group").removeClass("is-active")
		}
	});
	$("body").on("change",".js-check-add input",function(){
		if ($(this).is(":checked")) {
			$(this).parents(".js-check-group").addClass("is-active-add")
		}
		else {
			$(this).parents(".js-check-group").removeClass("is-active-add")
		}
	});
	$(".js-check input").each(function(){
		if ($(this).is(":checked")) {
			$(this).parent().addClass("is-checked");
			$(this).parents(".js-check-group").addClass("is-active")
		}
		else {
			$(this).parent().removeClass("is-checked");
			$(this).parents(".js-check-group").removeClass("is-active")
		}
	});
	$(".js-check-add input").each(function(){
		if ($(this).is(":checked")) {
			$(this).parents(".js-check-group").addClass("is-active-add")
		}
		else {
			$(this).parents(".js-check-group").removeClass("is-active-add")
		}
	});

	$(window).scroll(function(){
		if ($(".js-full-cart").length) {
			fixedHeader();
		}
        if (sidebar.length) {
            fixedSidebar();
        }  
        //scrollNav();
        
	});

	$("body").on("click",".js-add-btn",function(){
		var new_el = $(this).attr("data-hidden");
		var html = $("."+new_el).html();
		if ($(this).parents(".js-add-btn-wrap")) {
			$(this).parents(".js-add-btn-wrap").before(html);
		}
		else {
			$(this).before(html);
		}
		
		return false;
	});

	$("body").on("click",".js-remove-btn",function(){
		$(this).closest(".js-removeable").remove();
		if ($(this).parents(".js-menu-item").length) {
    		$(this).parents(".js-menu-item").remove();
    	}
    	if ($(this).parents(".js-menu-item-head").length) {
    		$(this).parents(".js-menu-list").remove();
    	}
		return false;
	});

	// $(".js-remove-btn").on("click",function(){
	// 	$(this).closest(".js-removeable").remove();
		
	// 	return false;
	// });

	$(".js-drag-list").sortable({
    	items: ".js-drag-item"
    });
    

    $(".js-hide-menu-item").on("click",function(){
    	if ($(this).parents(".js-menu-item").length) {
    		$(this).parents(".js-menu-item").toggleClass("is-inactive");
    	}
    	if ($(this).parents(".js-menu-item-head").length) {
    		$(this).parents(".js-menu-list").toggleClass("is-inactive");
    	}
		return false;
	});
	$(".js-double-btn").on("click",function(){
		var html = $('<div>').append($(this).parents(".js-menu-item").clone()).html();
    	$(this).parents(".js-menu-item").after(html);
		return false;
	});

	$(".js-sidebar-nav a").on("click",function(){
    	var categ = $(this).attr("href");
    	var el = $('[data-categ="'+categ+'"]');
    	if ($(".js-full-cart").length) {
    		var top = el.offset().top - $(".js-full-cart").outerHeight();
    	}
    	else {
    		var top = el.offset().top;
    	}
    	$(".js-sidebar-nav li").removeClass("is-active"); 
    	$(this).parent().addClass("is-active");

    	$('html, body').animate({
            scrollTop: top
        }, 200); 
        return false;
    });
    $(".js-sidebar-nav ul a").on("click",function(){
    	var categ = $(this).attr("href");
    	var el = $('[data-categ="'+categ+'"]');
    	if ($(".js-full-cart").length) {
    		var top = el.offset().top - $(".js-full-cart").outerHeight();
    	}
    	else {
    		var top = el.offset().top;
    	}
    	$(".js-sidebar-nav ul li").removeClass("is-active"); 
    	$(this).parent().addClass("is-active");
    	$(this).parents("li").addClass("is-active");

    	$('html, body').animate({
            scrollTop: top
        }, 200);
        return false;
    });

    $(".js-sidebar-nav .is-active").each(function(){
    	var categ = $(this).find("a").attr("href");
    	var el = $('[data-categ="'+categ+'"]');
    	if ($(".js-full-cart").length) {
    		var top = el.offset().top - $(".js-full-cart").outerHeight();
    	}
    	else {
    		var top = el.offset().top;
    	}

    	$('html, body').animate({
            scrollTop: top
        }, 100);
        return false;
    });

    function scrollSidebar() {
    	var block = $(".js-categ");
    	var doc_top = $(document).scrollTop();
    	block.each(function(){
    		var attr = $(this).attr("data-categ");
    		var link = $('[href="'+attr+'"]');
    		var link_top = $(this).offset().top;

    		if ($(".js-full-cart").length) {
	    		if (doc_top >= link_top - $(".js-full-cart").outerHeight()) {
	    			$(".js-sidebar-nav li").removeClass("is-active");
	    			link.parents("li").addClass("is-active");
	    		}
	    	}
	    	else {
	    		if (doc_top >= link_top) {
	    			$(".js-sidebar-nav li").removeClass("is-active");
	    			link.parents("li").addClass("is-active");
	    		}
	    	}
    	});


    	
    }
    $(window).scroll(function(){
    	scrollSidebar();

    });   


});