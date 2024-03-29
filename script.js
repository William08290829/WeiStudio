function revealFunction() {
    const sr = ScrollReveal({
        duration: "1350",
        distance: '250px',
        easing: 'ease'
    });

    //Home
    sr.reveal('.news h2', {
        origin: 'bottom',
        reset: false,
        delay: 500
    });
    sr.reveal('.sloganbg', {
        origin: 'left',
        reset: false,
        delay: 1500
    });
    sr.reveal('.news a', {
        origin: 'bottom',
        reset: false,
        delay: 500
    });

    //About
    sr.reveal('.about__introduction-container', {
        origin: 'bottom',
        reset: false,
        delay: 500
    });
    sr.reveal('.about__information-image img', {
        origin: 'left',
        reset: false,
        delay: 500
    });
    sr.reveal(".about__information-content", {
        origin: 'bottom',
        reset: false,
        delay: 1500,
    });
    sr.reveal(".about__contact-me-container a", {
        origin: 'bottom',
        reset: true,
    });

    //Contact
    sr.reveal('.title h3', {
        origin: 'bottom',
        reset: false,
        delay: 300
    });
    sr.reveal('.contact__subtitle', {
        origin: 'bottom',
        reset: false,
        delay: 500
    });

    sr.reveal('.contact__left .email', {
        origin: 'bottom',
        reset: false,
        delay: 800
    });
    sr.reveal('.contact__left .number', {
        origin: 'bottom',
        reset: false,
        delay: 1100
    });
    sr.reveal('.contact__left .line-id', {
        origin: 'bottom',
        reset: false,
        delay: 1400
    });

    sr.reveal('.contact__left .line_qrcode', {
        origin: 'bottom',
        reset: false,
        delay: 1600
    });


    sr.reveal(".contact__row-social-link a", {
        origin: 'top',
        interval: 200,
        delay: 300
    });

    sr.reveal(".about__introduction-content .highlight::after", {
        interval: 200,
        delay: 500
    });

}

function revealFunction_greetingGreenBg(){
    const sr1 = ScrollReveal({
        duration: "3000",
        distance: '350px',
        easing: 'ease'
    });

    sr1.reveal('.about__greetingGreenBg', {
        origin: 'left',
        reset: false,
        delay: 2000,
        opacity: 1
    });
}

function revealFunction_greeting(){
    const sr1 = ScrollReveal({
        duration: "2500",
        distance: '300px',
        easing: 'ease',
        opacity: 1
    });
 
    sr1.reveal('.about__greetingOrangeBg', {
        origin: 'left',
        reset: false,
        delay: 2000,
        opacity: 1
    });
    sr1.reveal('.about__greeting', {
        origin: 'right',
        reset: false,
        delay: 2000,
        opacity: 1
    });
    sr1.reveal('.about__greeting h3', {
        origin: 'right',
        reset: false,
        delay: 2000,
        opacity: 1
    });
}

window.addEventListener('load', () => {
    revealFunction();
    revealFunction_greetingGreenBg();
    revealFunction_greeting();
})

//Hide Header
var lastScrollTop = 0;
header = document.getElementById("header")
window.addEventListener("scroll", function () {
    // console.log(isModalActive);
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        header.style.top = "-80px";
    } else {
        header.style.top = "0";
    }
    lastScrollTop = scrollTop;
});



//FancyBox
Fancybox.bind('[data-fancybox="gallery"]', {
    //
});
jQuery.noConflict();
$('[data-fancybox]').fancybox({
    buttons: [
        'zoom',
        'share',
        'fullScreen',
        'slideShow',
        'close'
    ]
})

//Loading
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');

    if (loader && loader.parentNode === document.body) {
        loader.classList.add('loader--hidden');

        loader.addEventListener('transitionend', () => {
            document.body.removeChild(loader);
        });
    }
});

