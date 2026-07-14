document.addEventListener("DOMContentLoaded", function () {
	var swiperTestimonial = new Swiper(".swiper-testimonial", {
	slidesPerView: 1,
	spaceBetween: 20,
	loop: true,
	loopedSlides: 5,
	grabCursor: true,
	observer: true,
	observeParents: true,
	speed: 1000,
	autoplay: {
		delay: 2000,
		disableOnInteraction: false,
		pauseOnMouseEnter: true,
	},
	});
});

document.addEventListener("DOMContentLoaded", function() {
    var swiperPartner = new Swiper(".swiper-partner", {
        slidesPerView: 5,
        spaceBetween: 20,
        loop: true,
        grabCursor: true,
        observer: true,
        speed: 1000,
        observeParents: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        breakpoints: {
            0: { 
                slidesPerView: 2,
                spaceBetween: 30
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 100
            },
            992: { 
                slidesPerView: 5
            },
        },
    });
});