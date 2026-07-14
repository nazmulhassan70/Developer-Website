$(document).ready(function(){
    initNavLink();
	initSidebar();
	initSidebarDropdown();
	initAnimationScroll();
    initCounter();
    initScheduleCount();
});

function initNavLink() {
	const currentUrl = window.location.href;
	$(".navbar-nav .nav-link").each(function() {
		if (this.href === currentUrl) {
			$(this).addClass("active");
		}
	});
	$(".navbar-nav .dropdown-menu .dropdown-item").each(function() {
		if (this.href === currentUrl) {
			$(this).addClass("active");
			$(this).closest(".dropdown").find(".nav-link.dropdown-toggle").addClass("active");
		}
	});
}

function initSidebar() {
    $(document).on("click", ".nav-btn", function() {
        $(".sidebar-overlay").addClass("active");
        setTimeout(() => $(".sidebar").addClass("active"), 200);
    });

    $(document).on("click", ".sidebar-close-btn, .sidebar-overlay", function() {
        $(".sidebar").removeClass("active");
        setTimeout(() => $(".sidebar-overlay").removeClass("active"), 200);
    });
}

function initSidebarDropdown() {
    $(document).on("click", ".sidebar-dropdown-btn", function() {
        const $dropdownMenu = $(this).parent().next(".sidebar-dropdown-menu");
        const isOpen = $dropdownMenu.hasClass("active");

        $(".sidebar-dropdown-menu").not($dropdownMenu).removeClass("active");

        $dropdownMenu.toggleClass("active", !isOpen);
    });
}

function initAnimationScroll() {
    const elements = document.querySelectorAll('[data-animation]');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const el = entry.target;
            const animation = el.dataset.animation;

            const styles = getComputedStyle(el);

            const duration = el.dataset.duration 
                || styles.getPropertyValue('--anim-duration').trim() 
                || '1s';

            const delay = el.dataset.delay 
                || styles.getPropertyValue('--anim-delay').trim() 
                || '0s';

            el.style.animationName = animation;
            el.style.animationDuration = duration;
            el.style.animationDelay = delay;
            el.style.animationPlayState = 'running';
            el.classList.add('animated');

            observer.unobserve(el);
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(el => {
        el.style.animationPlayState = 'paused';
        el.style.opacity = '0';
        observer.observe(el);
    });
}

function initCounter() {
    const $counters = $('.counter');
    
    const observer = new window.IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const $el = $(entry.target);
                
                // Gunakan parseFloat untuk mengizinkan bilangan desimal
                const targetCount = parseFloat($el.data('count')) || 0;
                
                let currentCount = 0;
                
                // Animation duration in milliseconds
                const duration = 2000;
                const increment = targetCount / (duration / 16);

                // Cek apakah targetCount adalah bilangan bulat atau desimal
                const isDecimal = !Number.isInteger(targetCount);

                const counter = setInterval(() => {
                    currentCount += increment;
                    
                    if (currentCount >= targetCount) {
                        currentCount = targetCount;
                        clearInterval(counter);
                    }
                    
                    // Jika desimal, tampilkan satu angka di belakang koma, jika tidak bulatkan
                    if (isDecimal) {
                        $el.text(currentCount.toFixed(1));
                    } else {
                        $el.text(Math.floor(currentCount));
                    }
                }, 16);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    $counters.each(function () {
        observer.observe(this);
    });
}

function initScheduleCount() {

    function createNewTarget() {
        const target = new Date();

        // tambah 1 tahun dari sekarang
        target.setFullYear(target.getFullYear() + 1);

        return target;
    }

    let targetDate = createNewTarget();

    function updateCountdown() {

        const now = new Date();
        const distance = targetDate - now;

        // reset otomatis jika countdown habis
        if (distance <= 0) {
            targetDate = createNewTarget();
            return;
        }

        const days = Math.floor(
            distance / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );

        const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) /
            (1000 * 60)
        );

        const seconds = Math.floor(
            (distance % (1000 * 60)) / 1000
        );

        $("#countdown-days").text(days);
        $("#countdown-hours").text(
            String(hours).padStart(2, "0")
        );

        $("#countdown-minutes").text(
            String(minutes).padStart(2, "0")
        );

        $("#countdown-seconds").text(
            String(seconds).padStart(2, "0")
        );
    }

    updateCountdown();

    setInterval(updateCountdown, 1000);
}