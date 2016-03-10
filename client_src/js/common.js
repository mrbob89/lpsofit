$(function() {

	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};

	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });

});

$(document).ready(function () {

	$(".input-phone").mask("+38(999)999-99-99");
	//initialize swiper when document ready  
	var reviewsSwiper = new Swiper ('.swiper-reviews', {
		loop: true,
		// Navigation arrows
	    nextButton: '.swiper-next',
	    prevButton: '.swiper-prev',
	});

	var photoesSwiper = new Swiper ('.swiper-photoes', {
		loop: true,
		loopedSlides: 3,
		effect: 'coverflow',
		slidesPerView: 2,
		centeredSlides: true,
		coverflow: {
            rotate: 0,
            stretch: 50,
            depth: 200,
            modifier: 1,
            slideShadows : true
        },
        breakpoints: {
			// when window width is <= 320px
			320: {
			  slidesPerView: 1,
			  spaceBetweenSlides: 10
			},
			// when window width is <= 640px
			640: {
			  slidesPerView: 2,
			  spaceBetweenSlides: 30
			}
		},

        // Navigation arrows
	    nextButton: '.swiper-next',
	    prevButton: '.swiper-prev',
	});

	lightbox.option({
      albumLabel: ""
    });      

    $(".btn-form").click(function() {
		var text = $(this).attr("data-value");
		$(".hidden-input").val(text);
	});  
});

$( ".servicec__item .services__more" ).click(function() {
	$(this).parent().parent().removeClass("serv-colour");
	$(this).parent().find(".services__caption").css({
			opacity: 1,
			visibility: 'visible'
		});
	$(this).css("display","none");
	$(this).parent().find("h3").css("display","none");
});

$( ".btn-close" ).click(function() {
	$(this).parent().parent().parent().addClass("serv-colour");
	$(this).parent().css({
			opacity: 0,
			visibility: 'hidden'
		});
	$(this).parent().parent().find(".services__more").css("display","inline-block");
	$(this).parent().parent().find("h3").css("display","block");
});

