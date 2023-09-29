// 获取要观察的元素
var highlightElement = document.querySelectorAll('.highlight');
var greetingElement = document.querySelector(".about__greeting-bg h3");

// // 创建一个 Intersection Observer
// var observer = new IntersectionObserver(function(entries) {
//   // entries 是一个包含观察到的元素的数组
//   entries.forEach(function(entry) {
//     // 如果元素进入视口
//     if (entry.isIntersecting) {
//       highlightElement.classList.add('show-after');
//     }
//   });
// }, { threshold: 1 }); 

// // 开始观察元素
// observer.observe(highlightElement);

highlightElement.forEach(function(element) {
    const observerHighlight = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.target.classList.toggle("show-after", entry.isIntersecting);
      });
    }, { threshold: 1 });
  
    observerHighlight.observe(element);
  });

const observerGreeting = new IntersectionObserver(entries =>{
    entries.forEach(entry =>{
       if(entry.isIntersecting){
        greetingElement.classList.add('typing')
       }
    })
}, { threshold: 1 });

observerGreeting.observe(greetingElement);