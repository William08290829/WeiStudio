const tabsBtn = document.querySelectorAll('.tabs__btn');
const tabsContent = document.querySelectorAll('.content__box');

tabsBtn.forEach((tab, index) => {
    tab.addEventListener('click',(e) =>{
        tabsBtn.forEach(tab => {
            tab.classList.remove('active')
        });
        tab.classList.add('active');

        var tabsLine = document.querySelector('.tabs__line');
        tabsLine.style.width = e.target.offsetWidth + "px";
        tabsLine.style.left = e.target.offsetLeft + "px";

        tabsContent.forEach(content =>{
            content.classList.remove('active')
        });
        tabsContent[index].classList.add('active');
    })
})