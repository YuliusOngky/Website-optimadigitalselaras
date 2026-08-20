/* JavaScript Document */
jQuery(document).ready(function () {
	'use strict';

	/* image-carousel function by = owl.carousel.js */
	jQuery('.img-carousel').owlCarousel({
		loop: true,
		margin: 30,
		nav: true,
		dots: false,
		navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
		responsive: {
			0: {
				items: 1
			},
			480: {
				items: 2
			},
			767: {
				items: 3
			},
			1000: {
				items: 4
			}
		}
	})

	/* image-carousel no margin function by = owl.carousel.js */
	jQuery('.img-carousel-content').owlCarousel({
		loop: true,
		autoplay: true,
		margin: 30,
		nav: true,
		dots: false,
		navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
		responsive: {
			0: {
				items: 1
			},
			480: {
				items: 2
			},
			767: {
				items: 2
			},
			1000: {
				items: 3
			}
		}
	})

	/*  Portfolio Carousel function by = owl.carousel.js */
	jQuery('.portfolio-carousel').owlCarousel({
		loop: true,
		autoplay: true,
		margin: 30,
		nav: true,
		dots: false,
		navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
		responsive: {
			0: {
				items: 1
			},
			480: {
				items: 2
			},
			767: {
				items: 3
			},
			1000: {
				items: 4
			}
		}
	})

	/*  Portfolio Carousel no margin function by = owl.carousel.js */
	jQuery('.portfolio-carousel-nogap').owlCarousel({
		loop: true,
		autoplay: true,
		margin: 0,
		nav: true,
		dots: false,
		navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
		responsive: {
			0: {
				items: 1
			},

			480: {
				items: 2
			},

			767: {
				items: 3
			},
			1000: {
				items: 4
			}
		}
	})

	/*  Blog post Carousel function by = owl.carousel.js */
	jQuery('.blog-carousel').owlCarousel({
		loop: true,
		autoplay: true,
		margin: 30,
		nav: true,
		dots: false,
		navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
		responsive: {
			0: {
				items: 1
			},
			480: {
				items: 2
			},
			767: {
				items: 2
			},
			1000: {
				items: 3
			}
		}
	})

	/*  OurBlog post Carousel function by = owl.carousel.js */
	jQuery('.our-blog-carousel').owlCarousel({
		loop: true,
		autoplay: true,
		margin: 30,
		nav: true,
		dots: false,
		navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
		responsive: {
			0: {
				items: 1
			},
			767: {
				items: 1
			},
			768: {
				items: 2
			},
			1000: {
				items: 3
			}
		}
	})

	/*  Blog post Carousel function by = owl.carousel.js */
	jQuery('.event-carousel').owlCarousel({
		loop: true,
		margin: 30,
		nav: true,
		dots: false,
		navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
		responsive: {
			0: {
				items: 1
			},

			480: {
				items: 2
			},

			767: {
				items: 3
			},
			1000: {
				items: 3
			}
		}
	})

	/*  Blog post Carousel function by = owl.carousel.js */
	jQuery('.client-logo-carousel').owlCarousel({
		loop: true,
		autoplay: true,
		margin: 30,
		nav: true,
		dots: false,
		navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
		responsive: {
			0: {
				items: 1
			},

			480: {
				items: 2
			},

			767: {
				items: 3
			},
			1000: {
				items: 5
			}
		}
	})

	/* Fade slider for home function by = owl.carousel.js */
	jQuery('.owl-fade-one').owlCarousel({
		loop: true,
		autoplay: true,
		autoplayTimeout: 2000,
		margin: 30,
		nav: true,
		navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
		items: 1,
		dots: false,
		animateOut: 'fadeOut',
	})

	/*  testimonial one function by = owl.carousel.js */
	jQuery('.testimonial-one').owlCarousel({
		loop: true,
		autoplay: true,
		margin: 30,
		nav: true,
		dots: false,
		navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
		responsive: {
			0: {
				items: 1
			},

			480: {
				items: 1
			},

			767: {
				items: 1
			},
			1000: {
				items: 1
			}
		}
	})

	/* testimonial two function by = owl.carousel.js */
	jQuery('.testimonial-two').owlCarousel({
		loop: true,
		margin: 30,
		nav: true,
		dots: false,
		navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
		responsive: {
			0: {
				items: 1
			},

			480: {
				items: 2
			},

			767: {
				items: 3
			},
			1000: {
				items: 3
			}
		}
	})

	/*  testimonial three function by = owl.carousel.js */
	jQuery('.testimonial-three').owlCarousel({
		loop: true,
		margin: 30,
		nav: true,
		dots: false,
		navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
		responsive: {
			0: {
				items: 1
			},

			480: {
				items: 2
			},

			767: {
				items: 3
			},
			1000: {
				items: 3
			}
		}
	})

	/*  testimonial four function by = owl.carousel.js */
	jQuery('.testimonial-four').owlCarousel({
		loop: true,
		margin: 80,
		nav: true,
		dots: false,
		navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
		responsive: {
			0: {
				items: 1
			},
			991: {
				items: 2
			}
		}
	})

	/*  testimonial five function by = owl.carousel.js */
	jQuery('.testimonial-five').owlCarousel({
		loop: true,
		autoplay: true,
		margin: 30,
		nav: false,
		dots: false,
		navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
		responsive: {
			0: {
				items: 1
			},
			991: {
				items: 2
			}
		}
	})

	/*  testimonial six function by = owl.carousel.js */
	jQuery('.testimonial-six').owlCarousel({
		loop: true,
		autoplay: true,
		margin: 30,
		nav: true,
		dots: false,
		navText: ['<i class="flaticon-left-arrow"></i>', '<i class="flaticon-right-arrow"></i>'],
		responsive: {
			0: {
				items: 1
			},

			480: {
				items: 1
			},

			767: {
				items: 1
			},
			1000: {
				items: 1
			}
		}
	})

	/*  testimonial seven function by = owl.carousel.js */
	jQuery('.testimonial-seven').owlCarousel({
		loop: true,
		autoplay: true,
		margin: 30,
		nav: true,
		dots: true,
		navText: ['<i class="flaticon-left-arrow"></i>', '<i class="flaticon-right-arrow"></i>'],
		responsive: {
			0: {
				items: 1
			},
			767: {
				items: 1
			},
			768: {
				items: 2
			},
			1000: {
				items: 3
			}
		}
	})

	/*  Our Classes function by = owl.carousel.js */
	jQuery('.our-classes').owlCarousel({
		loop: true,
		margin: 30,
		nav: false,
		dots: false,
		navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
		responsive: {
			0: {
				items: 1
			},

			480: {
				items: 2
			},

			767: {
				items: 2
			},
			1000: {
				items: 3
			},
			1200: {
				items: 4
			}
		}
	})

	/* blog curser */
	jQuery('.carousel-gallery').owlCarousel({
		loop: true,
		margin: 0,
		nav: false,
		dots: false,
		navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
		responsive: {
			0: {
				items: 4
			},
			480: {
				items: 5
			},
			1024: {
				items: 7
			},
			1200: {
				items: 10
			}
		}
	})

	if (jQuery('.banner-swiper-one').length > 0) {
		var swiper = new Swiper(".banner-swiper-one", {
			slidesPerView: "1.4",
			spaceBetween: 30,
			loop: true,
			speed: 1500,
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			breakpoints: {
				992: {
					slidesPerView: 1.4,
				},
				768: {
					slidesPerView: 1,
				},
				320: {
					slidesPerView: 1,
				},
			}
		});
	}
	
	/ post Carousel = owl.carousel.js /
	jQuery('.post-carousel').owlCarousel({
		loop:true,
		margin:30,
		nav:true,
		autoplaySpeed: 3000,
		navSpeed: 3000,
		paginationSpeed: 3000,
		slideSpeed: 3000,
		smartSpeed: 3000,
		autoplay: true,
		dots: true,
		responsive:{

			0:{

				items:1
			},
			600:{

				items:1
			},			
			
			767:{

				items:1
			},
			1200:{
				items:1
			}
		}
	})

	if (jQuery('.status-swiper').length > 0) {
		var Statusswiper = new Swiper('.status-swiper', {
			loop: true,
			spaceBetween: 0,
			slidesPerView: "auto",
			speed: 1500,
			effect: "fade",
			autoplay: {
				delay: 2000,
			},
			pagination: {
				el: ".status-pagination",
				clickable: true,
			},
		});

		jQuery('.post-status-btn').on('click', function () {
			Statusswiper.slideTo(0); 
			Statusswiper.autoplay.start(); 
		});
	}

});
/* Document .ready END */