$(document).ready(function(){

    $('#slides').superslides({
        animation: 'fade',
        play: 3000
    });

    const typed = new Typed('.sub', {
        strings: ["Software Developer", "Web Developer", "Tech Savvy"],
        typeSpeed: 50,
        loop: true
    })

    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:5
            }
        }
    })

    const skillsSectionElement = document.querySelector('.skillsSection');
    const boundingValuesSkillsSection = skillsSectionElement.getBoundingClientRect();
    const skillTopOffset = boundingValuesSkillsSection.top + window.scrollY;

    window.addEventListener("scroll", () => {
        if(window.pageYOffset > skillTopOffset - (window.innerHeight + 200))
        {
            $('.chart').easyPieChart({
                easing: 'easeInOut',
                barColor: '#fff',
                trackColor: false,
                scaleColor: false,
                lineWidth: 4,
                size: 152,
                onStep: function(from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent));
                }
            });
        }
    })

    const statsSectionElement = document.querySelector('.statsSection');
    const boundingValuesStatsSection = statsSectionElement.getBoundingClientRect();
    const statsTopOffset = boundingValuesStatsSection.top + window.scrollY;

    const statsCountElement = document.querySelectorAll('.statsCountValue');
    const arrayNodes = [...statsCountElement];
    let statsUpdated = false; 
    window.addEventListener("scroll", () => {
        console.log(statsTopOffset, window.pageYOffset, window.innerHeight);
        console.log(window.pageYOffset > (statsTopOffset - (window.innerHeight + 200)));   
        if((window.pageYOffset > (statsTopOffset - (window.innerHeight + 200))) && !statsUpdated)
        {            
            arrayNodes.map(countElement => {
                const statsCountValue = countElement.innerHTML;
                console.log(statsCountValue);
                const numAnim = new CountUp(countElement, 0, statsCountValue);
                if (!numAnim.error) {
                    statsUpdated = true;
                    numAnim.start();
                } else {
                    console.error(numAnim.error);
                }
            })
        }
    })

    $("[data-fancybox]").fancybox();


	$(".items").isotope({
		filter: '*',
		animationOptions: {
			duration: 1500,
			easing: 'linear',
			queue: false
		}
	});

	$("#filters a").click(function() {

		$("#filters .current").removeClass("current");
		$(this).addClass("current");

		var selector = $(this).attr("data-filter");

		$(".items").isotope({
			filter: selector,
			animationOptions: {
				duration: 1500,
				easing: 'linear',
				queue: false
			}
		});

		return false;
    });
    
    const nav = $("#navigation");
    const navTop = nav.offset().top;

    $(window).on("scroll", stickyNavigation);

    function stickyNavigation() {
        const body = $("body");

        if($(window).scrollTop() >= navTop) {
            body.css("padding-top", nav.outerHeight() + "px");
            body.addClass("fixedNav");
        }
        else {
            body.removeClass("fixedNav");
        }
    }
    
    $("#navigation li a").click(function(e) {
        e.preventDefault();

        const targetElement = $(this).attr("href");
        const targetPosition = $(targetElement).offset().top;
        $("html, body").animate({
            scrollTop: targetPosition - 50
        }, "slow")
    });
})