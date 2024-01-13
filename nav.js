const primaryNav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle");
const list = document.querySelectorAll('.navbar li');
const body = document.body;
let timePassed = 0;


navToggle.addEventListener('click', () =>{
    const visibility = primaryNav.getAttribute('data-visible');

    if(visibility === 'false'){
        primaryNav.setAttribute('data-visible', true);
        navToggle.setAttribute('aria-expanded', true);
        list.forEach(li => {
            timePassed += 1;
            setTimeout(function() {
                li.setAttribute('data-visible', true);
            }, 100*timePassed);
        })
        timePassed = 0;
        body.style.overflow = 'hidden';
    } 
    else if(visibility === 'true'){
        primaryNav.setAttribute('data-visible', false);
        navToggle.setAttribute('aria-expanded', false);
        list.forEach(li => {
            timePassed += 1;
            setTimeout(function() {
                li.setAttribute('data-visible', false);
            }, 80*timePassed);
        })
        timePassed = 0;
        body.style.overflow = 'auto';
    }
    
});

primaryNav.addEventListener('scroll', disableScroll)

function disableScroll() { document.body.style.overflow = "hidden";  }
function enableScroll() { document.body.style.overflow="initial";  }


// navbar li animation
// list.forEach(function(li) {
//     const observerlist = new IntersectionObserver(entries => {  // 回傳現在有哪些元素進入到視窗
//         entries.forEach(entry => {
//           entry.target.classList.toggle("show-after", entry.isIntersecting);
//         });
//     }, { threshold: 1 });   // 完全進入視口時觸發回調
    
//     observerlist.observe(li);
// });

// function revealFunction_navList(){
//     const sr_nav = ScrollReveal({
//         duration: "3000",
//         distance: '350px',
//         easing: 'ease'
//     });

//     sr_nav.reveal('.about__greetingGreenBg', {
//         origin: 'left',
//         reset: false,
//         delay: 2000,
//         opacity: 1
//     });
// }