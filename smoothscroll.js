function smoothScroll(target, duration){
    var target = document.querySelector(target)
    var targetPosition = target.getBoundingClientRect().top;
    var startPosition = window.scrollY;

    // console.log(startPosition);
    
    var distance = targetPosition;
    console.log("target: " + targetPosition);
    console.log("start: " + startPosition);
    console.log("distance: " + distance);
    var startTime = null;
    

    // console.log(targetPosition);
    function animation(currentTime){
        if(startTime == null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if(timeElapsed < duration){
            requestAnimationFrame(animation);
        }
    }
    function ease(t, b, c, d){
        t /= d;
        t--;
        // return c * Math.sin(t/d * (Math.PI/2)) + b;
        return c*(t*t*t*t*t + 1) + b;
    };
    requestAnimationFrame(animation);
}


var downBtn = document.querySelector('.down-btn');
const scrollingDuration = 2000;

downBtn.addEventListener('click', function(){
    if(document.querySelector(".porfolio-page") != null){
        smoothScroll('.porfolio-page', scrollingDuration);
    }
    else if(document.querySelector(".about") != null){
        smoothScroll('.about', scrollingDuration);
    }
    else if(document.querySelector(".contact") != null){
        smoothScroll('.contact', scrollingDuration);
    }
    else{
        console.log("smoothScroll ERROR");
    }
});

// smoothScroll('.about', 1500);
