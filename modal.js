const modal_overlay = document.getElementById('modal_overlay');
const openModalDiv = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
let clickTimes = 0;
let OV_nextImg = null;

// const overlay = document.getElementById('overlay')
const stopScroll = $('#modal_overlay')

openModalDiv.forEach(button => {
  button.addEventListener('click', () => {
    const modal_overlay = document.querySelectorAll('.modal_overlay')
    const modal = document.querySelector(button.dataset.modalTarget)

    openModal(modal)

    modal_overlay.forEach(modal_overlay => {
      openModal(modal_overlay)

    })

    document.body.classList.add('body-fixed'); // 添加样式以防止页面滚动
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    const modal_overlay = document.querySelectorAll('.modal_overlay')

    closeModal(modal)

    modal_overlay.forEach(modal_overlay => {
      closeModal(modal_overlay)
    })
  })
})

function openModal(modal) {
  if (modal == null) return;

  modal.classList.add('display-delay');
  setTimeout(function () {
    modal.classList.add('active')
  });
}

function closeModal(modal) {
  if (modal == null) return;

  modal.classList.remove('active');
  setTimeout(function () {
    modal.classList.remove('display-delay')
  }, 300);

  document.body.classList.remove('body-fixed');
}


window.onclick = function (e) {
  if (e.target.classList.contains('modal_overlay')) {
    const modal_overlay = document.querySelectorAll('.modal_overlay')
    const modal = document.querySelectorAll('.modal')
    // e.target.style.classListy.remove('active');
    modal.forEach(modal => {
      closeModal(modal)
    })

    modal_overlay.forEach(modal_overlay => {
      closeModal(modal_overlay)
    })
  }
};

//========================================================IF(visibility)
const computedStyles = window.getComputedStyle(modal_overlay);

let isModalActive = false;
const checkVisibilityInterval = setInterval(function () {
  let visibility = computedStyles.getPropertyValue('visibility');
  if (visibility === "visible") {
    isModalActive = true;
    header.style.top = "-80px";


    // JavaScript to get image details and update the text
    const modalActive = document.querySelector(".modal.active");
    if (modalActive !== null){
      const image = modalActive.querySelector('.modal-img');


      const imageUrl = image.getAttribute('src');
      const resolutionText = modalActive.querySelector('#resolution');
      const mediaTypeText = modalActive.querySelector('#mediaType');

      //算圖片解析度
      const width = image.naturalWidth;
      const height = image.naturalHeight;
      const fileType = getImageType(imageUrl);
      resolutionText.textContent = `Resolution: ${width} x ${height}`;
      mediaTypeText.textContent = `Media Type: ${fileType}`;
      // console.log(width);
      // console.log(fileType);


      // Function to get image type from the URL
      function getImageType(imageUrl) {
        const fileExtension = imageUrl.split('.').pop().toUpperCase();
        return fileExtension;
      }

      //===============================

      //OtherVersion Relate Slider
      const OV_slider = modalActive.querySelector(".otherVersion");
      const OV_fristImg = modalActive.querySelectorAll(".otherVersion img")[0];

      OV_arrowIcons = modalActive.querySelectorAll(".OV_relate__wrapper i");
      OV_scrollBar = modalActive.querySelector(".other-version .relate__scrollbar-container");
      OV_haveArrow = modalActive.querySelector(".OV_relate__wrapper i");


      let OV_isDragStart = false, OV_prevPageX, OV_preScrollLeft;
      if (OV_slider !== null) {

        if (OV_slider.scrollWidth === OV_slider.clientWidth){ 
          OV_arrowIcons.forEach(arrow =>{
            arrow.classList.add('visibilityHidden');
          })
          OV_scrollBar.classList.add('visibilityHidden');
        } else {
          OV_arrowIcons.forEach(arrow =>{
            arrow.classList.remove('visibilityHidden');
          })
          OV_scrollBar.classList.remove('visibilityHidden');
        }

        

        // ARROW_ICONS
        const OV_showHideIcons = () => {
          let OV_scrollWidth = OV_slider.scrollWidth - OV_slider.clientWidth; //get MAX scrollable width
          OV_arrowIcons[0].style.display = OV_slider.scrollLeft == 0 ? "none" : "block";
          OV_arrowIcons[1].style.display = OV_slider.scrollLeft + 1 >= OV_scrollWidth ? "none" : "block";
          // console.log(OV_slider.scrollLeft)
          // console.log(OV_scrollWidth)
        }

        OV_arrowIcons.forEach(icon => {
          icon.addEventListener("click", () => {
            // console.log(clickTimes)
            // let OV_ImgWidth = 0;
            // if(clickTimes === 0){
            //   OV_ImgWidth = OV_fristImg.clientWidth + 14;
            //   OV_nextImg = OV_fristImg;
            //   clickTimes = 1;
            // }
            // OV_ImgWidth = OV_nextImg.clientWidth + 14;
            
            
            // if(icon.id == "OV_left"){
            //   OV_slider.scrollLeft -= OV_ImgWidth;
            //   OV_nextImg = OV_nextImg.previousElementSibling;
              
            // } else {
            //   OV_slider.scrollLeft += OV_ImgWidth;
            //   OV_nextImg = OV_nextImg.nextElementSibling;
            // }

            const scrollAmout = OV_slider.clientWidth;
            OV_slider.scrollLeft += icon.id == "OV_left" ? -scrollAmout : scrollAmout;
          })
        })

        //DRAG
        const OV_dragStart = (e) => {
          OV_isDragStart = true;
          OV_prevPageX = e.pageX || e.touches[0].pageX;

          OV_preScrollLeft = OV_slider.scrollLeft;
        }

        const OV_dragging = (e) => {
          if (!OV_isDragStart) return;

          e.preventDefault();
          OV_slider.classList.add('dragging');
          let OV_positionDiff = (e.pageX || e.touches[0].pageX) - OV_prevPageX;
          OV_slider.scrollLeft = OV_preScrollLeft - OV_positionDiff;
          OV_showHideIcons();
        }

        const OV_dragStop = () => {
          OV_isDragStart = false;
          OV_slider.classList.remove('dragging');
        }

        OV_slider.addEventListener("mousemove", OV_dragging);
        OV_slider.addEventListener("touchstart", OV_dragging);

        OV_slider.addEventListener("mousedown", OV_dragStart);
        OV_slider.addEventListener("touchmove", OV_dragStart);

        OV_slider.addEventListener("mouseup", OV_dragStop);
        OV_slider.addEventListener("mouseleave", OV_dragStop);
        OV_slider.addEventListener("touchend", OV_dragStop);

        const OV_maxScrollLeft = OV_slider.scrollWidth - OV_slider.clientWidth;
        const OV_sliderScrollbar = modalActive.querySelector('.other-version .relate__scrollbar');
        const OV_scrollbarThumb = modalActive.querySelector('.other-version .scrollbar-thumb');

        let OV_scrollbarThumbLength = OV_slider.clientWidth / OV_slider.scrollWidth * 100;
        OV_scrollbarThumb.style.width = `${OV_scrollbarThumbLength}%`;


        OV_scrollbarThumb.addEventListener("mousedown", (e) => {
          const startX = e.clientX;
          const thumbPosition = OV_scrollbarThumb.offsetLeft;

          const handleMouseMove = (e) => {
            OV_slider.classList.add('dragging');
            const detlaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + detlaX;
            const maxThumbPosition = OV_sliderScrollbar.getBoundingClientRect().width - OV_scrollbarThumb.offsetWidth;
            const boundPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPositionByThumb = (boundPosition / maxThumbPosition) * OV_maxScrollLeft;

            OV_scrollbarThumb.style.left = `${boundPosition}px`;
            OV_slider.scrollLeft = scrollPositionByThumb;
          }

          const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            OV_slider.classList.remove('dragging');
          }
          document.addEventListener('mousemove', handleMouseMove);
          document.addEventListener('mouseup', handleMouseUp);
        })

        const updateScrollThumbPosition = () => {
          const OV_scrollPosition = OV_slider.scrollLeft;
          const OV_thumbPosition = (OV_scrollPosition / OV_maxScrollLeft) * (OV_sliderScrollbar.clientWidth - OV_scrollbarThumb.offsetWidth);
          OV_scrollbarThumb.style.left = `${OV_thumbPosition}px`;
        }

        OV_slider.addEventListener("scroll", () => {
          setTimeout(() => OV_showHideIcons(), 60); //calling showHideIcon after 60ms
          updateScrollThumbPosition();
          // console.log("scroll!")
        })
      }
      //====================================
      //DesignResource Relate Slider
      const DR_slider = modalActive.querySelector(".designResource");
      const DR_firstImg = modalActive.querySelectorAll(".designResource img")[0];
      DR_arrowIcons = modalActive.querySelectorAll(".DR_relate__wrapper i");
      DR_scrollBar = modalActive.querySelector(".design-resource .relate__scrollbar-container");
      DR_haveArrow = modalActive.querySelector(".DR_relate__wrapper i");

      let DR_isDragStart = false, DR_prevPageX, DR_preScrollLeft;

      if (DR_slider !== null) {


        if (DR_slider.scrollWidth === DR_slider.clientWidth){ 
          DR_arrowIcons.forEach(arrow =>{
            arrow.classList.add('visibilityHidden');
          })
          DR_scrollBar.classList.add('visibilityHidden');
        } else {
          DR_arrowIcons.forEach(arrow =>{
            arrow.classList.remove('visibilityHidden');
          })
          DR_scrollBar.classList.remove('visibilityHidden');
        }

        const DR_showHideIcons = () => {
          let DR_scrollWidth = DR_slider.scrollWidth - DR_slider.clientWidth; //get MAX scrollable width
          DR_arrowIcons[0].style.display = DR_slider.scrollLeft == 0 ? "none" : "block";
          DR_arrowIcons[1].style.display = DR_slider.scrollLeft + 1 >= DR_scrollWidth ? "none" : "block";
          // console.log(DR_slider.scrollLeft)
          // console.log(DR_scrollWidth)
        }

        //ARROW_ICONS
        DR_arrowIcons.forEach(icon => {
          icon.addEventListener("click", () => {
            const scrollAmout = DR_slider.clientWidth;
            DR_slider.scrollLeft += icon.id == "DR_left" ? -scrollAmout : scrollAmout;
            

            // let DR_firstImgWidth = DR_firstImg.clientWidth + 14;
            // DR_slider.scrollLeft += icon.id == "DR_left" ? -DR_firstImgWidth : DR_firstImgWidth;
          })
        })

        //DRAG
        const DR_dragStart = (e) => {
          DR_isDragStart = true;
          DR_prevPageX = e.pageX || e.touches[0].pageX;

          DR_preScrollLeft = DR_slider.scrollLeft;
        }

        const DR_dragging = (e) => {
          if (!DR_isDragStart) return;

          e.preventDefault();
          DR_slider.classList.add('dragging');
          let DR_positionDiff = (e.pageX || e.touches[0].pageX) - DR_prevPageX;
          DR_slider.scrollLeft = DR_preScrollLeft - DR_positionDiff;
          DR_showHideIcons();
        }

        const DR_dragStop = () => {
          DR_isDragStart = false;
          DR_slider.classList.remove('dragging');
        }

        DR_slider.addEventListener("mousemove", DR_dragging);
        DR_slider.addEventListener("touchstart", DR_dragging);

        DR_slider.addEventListener("mousedown", DR_dragStart);
        DR_slider.addEventListener("touchmove", DR_dragStart);

        DR_slider.addEventListener("mouseup", DR_dragStop);
        DR_slider.addEventListener("mouseleave", DR_dragStop);
        DR_slider.addEventListener("touchend", DR_dragStop);

        const DR_maxScrollLeft = DR_slider.scrollWidth - DR_slider.clientWidth;
        const DR_sliderScrollbar = modalActive.querySelector('.design-resource .relate__scrollbar');
        const DR_scrollbarThumb = modalActive.querySelector('.design-resource .scrollbar-thumb');

        let DR_scrollbarThumbLength = DR_slider.clientWidth / DR_slider.scrollWidth * 100;
        DR_scrollbarThumb.style.width = `${DR_scrollbarThumbLength}%`;

        DR_scrollbarThumb.addEventListener("mousedown", (e) => {
          const startX = e.clientX;
          const thumbPosition = DR_scrollbarThumb.offsetLeft;

          const handleMouseMove = (e) => {
            DR_slider.classList.add('dragging');
            const detlaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + detlaX;
            const maxThumbPosition = DR_sliderScrollbar.getBoundingClientRect().width - DR_scrollbarThumb.offsetWidth;
            const boundPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPositionByThumb = (boundPosition / maxThumbPosition) * DR_maxScrollLeft;

            DR_scrollbarThumb.style.left = `${boundPosition}px`;
            DR_slider.scrollLeft = scrollPositionByThumb;
          }

          const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            DR_slider.classList.remove('dragging');
          }
          document.addEventListener('mousemove', handleMouseMove);
          document.addEventListener('mouseup', handleMouseUp);
        })

        const DR_updateScrollThumbPosition = () => {
          const DR_scrollPosition = DR_slider.scrollLeft;
          const DR_thumbPosition = (DR_scrollPosition / DR_maxScrollLeft) * (DR_sliderScrollbar.clientWidth - DR_scrollbarThumb.offsetWidth);
          DR_scrollbarThumb.style.left = `${DR_thumbPosition}px`;
        }

        DR_slider.addEventListener("scroll", () => {
          setTimeout(() => DR_showHideIcons(), 60); //calling showHideIcon after 60ms
          DR_updateScrollThumbPosition();
          // console.log("scroll!")
        })
      }
    } //if(modalActive)

  } //if(visible)
  else {
    isModalActive = false;
    // console.log(visibility);
  }
}, 500); // 500 毫秒（0.5 秒）檢查一次

// 停止定期檢查，當你不再需要檢查時，可以使用以下代碼停止定期檢查
// clearInterval(checkVisibilityInterval);
