const modalOverlays = document.querySelectorAll('.modal_overlay');
const openModalDiv = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
let isModalActive = false;

// ===== Open / close =====
openModalDiv.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    if (modal == null) return;

    openModal(modal);
    modalOverlays.forEach(openModal);
    document.body.classList.add('body-fixed'); // 防止頁面滾動

    isModalActive = true;
    header.classList.add('header--hidden');

    setupModal(modal);   // 事件只綁一次
    refreshModal(modal); // 每次開啟都更新尺寸與資訊
  });
});

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    closeModal(button.closest('.modal'));
    modalOverlays.forEach(closeModal);
    isModalActive = false;
  });
});

window.addEventListener('click', e => {
  if (e.target.classList.contains('modal_overlay')) {
    document.querySelectorAll('.modal').forEach(closeModal);
    modalOverlays.forEach(closeModal);
    isModalActive = false;
  }
});

window.addEventListener('resize', () => {
  const modalActive = document.querySelector('.modal.active');
  if (modalActive) refreshModal(modalActive);
});

function openModal(modal) {
  if (modal == null) return;

  modal.classList.add('display-delay');
  setTimeout(function () {
    modal.classList.add('active');
  });
}

function closeModal(modal) {
  if (modal == null) return;

  modal.classList.remove('active');
  setTimeout(function () {
    modal.classList.remove('display-delay');
  }, 300);

  document.body.classList.remove('body-fixed');
}

// ===== Per-modal setup (runs once per modal) =====
function setupModal(modal) {
  if (modal.dataset.ready) return;
  modal.dataset.ready = 'true';

  const image = modal.querySelector('.modal-img');
  if (image) {
    // 點擊圖片可開啟新分頁（桌面版）
    image.addEventListener('click', () => {
      if (window.innerWidth > 768) window.open(image.src, '_blank');
    });
    // 圖片是 lazy load，載入完成後再計算解析度
    image.addEventListener('load', () => updateImageInfo(modal));
  }

  modal.querySelectorAll('.modal-relate').forEach(setupSlider);
}

function refreshModal(modal) {
  updateImageInfo(modal);
  modal.querySelectorAll('.modal-relate').forEach(section => {
    if (section.refreshSlider) section.refreshSlider();
  });
}

// 算圖片解析度與檔案類型
function updateImageInfo(modal) {
  const image = modal.querySelector('.modal-img');
  if (!image || !image.naturalWidth) return;

  const resolutionText = modal.querySelector('#resolution');
  const mediaTypeText = modal.querySelector('#mediaType');
  const fileType = image.getAttribute('src').split('.').pop().toUpperCase();
  if (resolutionText) resolutionText.textContent = `Resolution: ${image.naturalWidth} x ${image.naturalHeight}`;
  if (mediaTypeText) mediaTypeText.textContent = `Media Type: ${fileType}`;
}

// ===== Relate slider (Other Version / Design Resource) =====
function setupSlider(section) {
  const slider = section.querySelector('.relate__slider');
  if (slider == null) return;

  const arrows = section.querySelectorAll('.relate__wrapper i');
  const scrollBarContainer = section.querySelector('.relate__scrollbar-container');
  const scrollBar = section.querySelector('.relate__scrollbar');
  const thumb = section.querySelector('.scrollbar-thumb');
  const maxScrollLeft = () => slider.scrollWidth - slider.clientWidth;

  // ARROW_ICONS
  const showHideIcons = () => {
    if (arrows.length < 2) return;
    arrows[0].style.display = slider.scrollLeft <= 0 ? 'none' : 'block';
    arrows[1].style.display = slider.scrollLeft + 1 >= maxScrollLeft() ? 'none' : 'block';
  };

  const updateThumb = () => {
    if (!thumb || !scrollBar) return;
    thumb.style.width = `${slider.clientWidth / slider.scrollWidth * 100}%`;
    const max = maxScrollLeft();
    const left = max > 0 ? (slider.scrollLeft / max) * (scrollBar.clientWidth - thumb.offsetWidth) : 0;
    thumb.style.left = `${left}px`;
  };

  // 沒有溢出時隱藏箭頭與捲軸
  const refresh = () => {
    const overflow = slider.scrollWidth > slider.clientWidth;
    arrows.forEach(arrow => arrow.classList.toggle('visibilityHidden', !overflow));
    if (scrollBarContainer) scrollBarContainer.classList.toggle('visibilityHidden', !overflow);
    updateThumb();
    showHideIcons();
  };
  section.refreshSlider = refresh;

  // 圖片載入後寬度才確定，需重新計算
  slider.querySelectorAll('img').forEach(img => img.addEventListener('load', refresh));

  arrows.forEach(icon => {
    icon.addEventListener('click', () => {
      const scrollAmount = slider.clientWidth;
      slider.scrollLeft += icon.id.endsWith('_left') ? -scrollAmount : scrollAmount;
    });
  });

  // DRAG（滑鼠拖曳；觸控裝置使用原生捲動）
  let isDragStart = false, prevPageX, prevScrollLeft;
  slider.addEventListener('mousedown', e => {
    isDragStart = true;
    prevPageX = e.pageX;
    prevScrollLeft = slider.scrollLeft;
  });
  slider.addEventListener('mousemove', e => {
    if (!isDragStart) return;
    e.preventDefault();
    slider.classList.add('dragging');
    slider.scrollLeft = prevScrollLeft - (e.pageX - prevPageX);
  });
  const dragStop = () => {
    isDragStart = false;
    slider.classList.remove('dragging');
  };
  slider.addEventListener('mouseup', dragStop);
  slider.addEventListener('mouseleave', dragStop);

  // 拖曳自訂捲軸
  if (thumb && scrollBar) {
    thumb.addEventListener('mousedown', e => {
      const startX = e.clientX;
      const thumbPosition = thumb.offsetLeft;

      const handleMouseMove = e => {
        slider.classList.add('dragging');
        const maxThumbPosition = scrollBar.getBoundingClientRect().width - thumb.offsetWidth;
        const boundPosition = Math.max(0, Math.min(maxThumbPosition, thumbPosition + e.clientX - startX));
        thumb.style.left = `${boundPosition}px`;
        slider.scrollLeft = (boundPosition / maxThumbPosition) * maxScrollLeft();
      };
      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        slider.classList.remove('dragging');
      };
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    });
  }

  slider.addEventListener('scroll', () => {
    updateThumb();
    showHideIcons();
  }, { passive: true });
}
