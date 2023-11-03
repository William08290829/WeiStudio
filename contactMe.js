//Contact Btn
const contactMe = document.querySelector(".contactMe");
const contactContainer = document.querySelector(".about__contact-me-container");
const contactMeBtn = document.querySelector(".contactMeBtn");
const contactMeH1 = document.querySelectorAll(".contactMeH1");
const marquee = document.querySelector(".marquee");
const ripple = document.querySelector(".rippleHover");

contactMeBtn.addEventListener("mouseover", function() {
    // contactContainer.style.backgroundColor = "#DDB771";
    // contactContainer.style.backgroundImage = "none"; 
    ripple.classList.add('active');
    // contactContainer.classList.add('rippleHover');
});

contactMeBtn.addEventListener("mouseout", function() {
    // contactContainer.style.backgroundColor = ""; // 回復原本的樣式
    // contactContainer.style.backgroundImage = "";
    ripple.classList.remove('active');
    // contactContainer.classList.remove('rippleHover');
});



contactMeBtn.addEventListener("mouseout", function() {
    contactMeH1.forEach(element => {
        element.style.display = "none";
    });
    // marquee.style.display = "none";
});
contactMeBtn.addEventListener("mouseover", function() {
    contactMeH1.forEach(element => {
        element.style.display = "";
    });
    // marquee.style.display = "none";
});
