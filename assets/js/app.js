$( window ).on("load", function() {
        $('.starter').fadeOut('slow');
        $('.header-right').fadeIn('slow');
});


$(document).ready(function(){


	/*
	/* jquery code for hide show address
	*/
	$('#arrow-key').hide();
	$('#arrow-key-p').hide();

	$('.fa-globe').hover(function(){
		$('#arrow-key').fadeIn();
		$('#arrow-key-p').fadeIn();
	});

	$('.address').hover(function(){
		$('#arrow-key').fadeIn();
		$('#arrow-key-p').fadeIn();
	});

	$('.fa-globe').mouseout(function(){
		$('#arrow-key').fadeOut();
		$('#arrow-key-p').fadeOut();
	});

	$('.address').mouseout(function(){
		$('#arrow-key').fadeOut();
		$('#arrow-key-p').fadeOut();
	});

	/*
	/* jquery code for hide show contact/email
	*/

	$('#arrow-key-2').hide();
	$('#arrow-key-2-p').hide();

	$('.fa-envelope').hover(function(){
		$('#arrow-key-2').fadeIn();
		$('#arrow-key-2-p').fadeIn();
	});

	$('.fa-envelope').mouseout(function(){
		$('#arrow-key-2').fadeOut();
		$('#arrow-key-2-p').fadeOut();
	});


	$('.email').hover(function(){
		$('#arrow-key-2').fadeIn();
		$('#arrow-key-2-p').fadeIn();
	});

	$('.email').mouseout(function(){
		$('#arrow-key-2').fadeOut();
		$('#arrow-key-2-p').fadeOut();
	});

	window.goUp = function () {
		$("html, body").animate({ scrollTop: 0 }, "slow");
	}

	setInterval(function(){
		if (this.scrollY > 200) {
			$('#scroller-button').fadeIn();
		}else{
			$('#scroller-button').fadeOut();
		}

		if (this.scrollY === 0) {
			$('#protfolio-drp').hover(function(){
				$('#portfolio-dropdown').removeClass('portfolio-dropdown');
				$('#portfolio-dropdown').addClass('portfolio-dropdown-position-0');
			})
		}else{
			$('#protfolio-drp').hover(function(){
				$('#portfolio-dropdown').removeClass('portfolio-dropdown-position-0');
				$('#portfolio-dropdown').addClass('portfolio-dropdown');
			})
		}
	});

	$('#protfolio-drp').hover(function(){
		$('#portfolio-dropdown').show();
	});

	$('#protfolio-drp').mouseout(function(){
		$('#portfolio-dropdown').hide();
	});


	$("#pages-area").hover(function(){
		$('#pages-menu').removeClass('pages-manu');
		$('#pages-menu').addClass('pages-manu-2');
	});

	$("#pages-area").mouseout(function(){
		$('#pages-menu').removeClass('pages-manu-2');
		$('#pages-menu').addClass('pages-manu');
	});

	$('.slider-btn').hide();

	$('.slider-area').hover(function(){
		$('.slider-btn').fadeIn('slow');
	});

	$('.slider-area').mouseout(function(){
		$('.slider-btn').fadeOut('slow');
	});


	$('.slider-images img').css(
		{
			'transform': 'scale(1)', 
			'transition': '15s'
		}
	);

	

	
	// recusrsive function 
	// var i = 0;

	// function test () {
	// 	i++;
	// 	console.log(i);
	// 	setTimeout(function(){
	// 		test();
	// 	}, 5000);
	// }

	// test();
});