const card = document.querySelector('.card__inner');

card.addEventListener('click', function () {
    card.classList.toggle('isFlipped');
});

gsap.set('.cursor',{xPercent:-50, yPercent: -50});
let flipCursor = document.querySelector('.card__flipCursor');
let mouseX;
let mouseY;

window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
})

card.addEventListener('mouseenter', () => {
    gsap.to(flipCursor, 0.3, {    //1 sec
        scale: 1,
        opacity: 1,
        rotate: 0,
        top: '-50px',
        left: '-50px',
        // ease: Elastic.easeOut.config(1, 0.3)
    })
})

card.addEventListener('mousemove', () => {
    gsap.to(flipCursor, 0.2, {x: mouseX, y:mouseY});
})

card.addEventListener('mouseleave', () => {
    gsap.to(flipCursor, 0.2, {    //1 sec
        scale: 0,
        opacity: 0,
        rotate: 0,
        top: 10,
        left: 10,
        rotate: 45
        // ease: Elastic.easeOut.config(1, 0.3)
    })
})
