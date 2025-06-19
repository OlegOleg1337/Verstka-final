document.addEventListener('DOMContentLoaded', function () {
  // Sidebar functionality
  const sidebarMenu = document.getElementById('sidebarMenu')
  const openMenuBtn = document.getElementById('openMenuBtn')
  // Теперь closeMenuBtn точно существует, так как мы добавили его в HTML
  const closeMenuBtn = document.getElementById('closeMenuBtn')
  const mainContentWrapper = document.querySelector('.main-content-wrapper')

  openMenuBtn.addEventListener('click', () => {
    sidebarMenu.classList.add('sidebar-menu--open')
    mainContentWrapper.classList.add('main-content-wrapper--shifted')
  })

  // Listener для кнопки закрытия сайдбара
  if (closeMenuBtn) {
    // Проверка на всякий случай, хотя теперь она должна быть
    closeMenuBtn.addEventListener('click', () => {
      sidebarMenu.classList.remove('sidebar-menu--open')
      mainContentWrapper.classList.remove('main-content-wrapper--shifted')
    })
  }

  // Close sidebar on click outside
  document.addEventListener('click', (event) => {
    if (
      sidebarMenu.classList.contains('sidebar-menu--open') &&
      !sidebarMenu.contains(event.target) &&
      !openMenuBtn.contains(event.target)
    ) {
      sidebarMenu.classList.remove('sidebar-menu--open')
      mainContentWrapper.classList.remove('main-content-wrapper--shifted')
    }
  })

  // --- Brands section "Показать все" toggle ---
  const brandsToggleBtn = document.getElementById('toggleBrandsBtn')
  const brandsToggleText = brandsToggleBtn.querySelector(
    '.services__toggle-text'
  )
  const brandsToggleIcon = brandsToggleBtn.querySelector(
    '.services__toggle-icon'
  )
  const brandsGrid = document.querySelector('.services__brands-grid')

  brandsToggleBtn.addEventListener('click', () => {
    const isExpanded = brandsGrid.classList.toggle(
      'services__brands-grid--expanded'
    )

    if (isExpanded) {
      brandsToggleText.textContent = 'Скрыть'
      brandsToggleIcon.style.transform = 'rotate(180deg)'
    } else {
      brandsToggleText.textContent = 'Показать все'
      brandsToggleIcon.style.transform = 'rotate(0deg)'
    }
  })

  // --- Swiper initialization for brands section ---
  let mySwiper

  function initSwiper() {
    // Разрушаем существующий Swiper перед инициализацией нового или если он больше не нужен
    if (mySwiper) {
      mySwiper.destroy(true, true)
      mySwiper = undefined // Очищаем переменную
    }

    // Инициализируем Swiper только на экранах меньше 768px
    if (window.innerWidth < 768) {
      // Проверяем, что Swiper доступен (глобальный объект, если загружен через CDN)
      if (typeof Swiper !== 'undefined') {
        mySwiper = new Swiper('.services__brands-wrapper', {
          // Используем класс обертки Swiper
          direction: 'horizontal',
          loop: false,
          slidesPerView: 'auto', // Позволяет нескольким слайдам быть видимыми, подстраиваясь под размер контейнера
          spaceBetween: 16
          // Можно добавить пагинацию, навигацию, если нужны
          // pagination: {
          //   el: '.swiper-pagination',
          //   clickable: true,
          // },
          // navigation: {
          //   nextEl: '.swiper-button-next',
          //   prevEl: '.swiper-button-prev',
          // },
        })
      } else {
        console.warn('Swiper library not loaded or not available.')
      }
    }
  }

  // Вызываем initSwiper при загрузке страницы
  initSwiper()

  window.addEventListener('resize', initSwiper)

  // --- "Показать все" toggle for "Ремонт различных видов техники" ---
  const repairTypesShowAllBtn = document.querySelector(
    '.repair-types-section .show-all'
  )
  const repairTypesToggleText = document.getElementById('toggleRepairTypesText')
  const repairTypesToggleIcon = document.getElementById('toggleRepairTypesIcon')

  if (repairTypesShowAllBtn) {
    repairTypesShowAllBtn.addEventListener('click', (event) => {
      event.preventDefault() // Предотвращаем переход по ссылке

      const isExpanded = repairTypesToggleText.textContent === 'Скрыть'

      if (!isExpanded) {
        repairTypesToggleText.textContent = 'Скрыть'
        repairTypesToggleIcon.style.transform = 'rotate(180deg)'
      } else {
        repairTypesToggleText.textContent = 'Показать все'
        repairTypesToggleIcon.style.transform = 'rotate(0deg)'
      }
    })
  }

  // --- Order buttons functionality ---
  document.querySelectorAll('.order-btn').forEach((btn) => {
    btn.addEventListener('click', function () {
      this.style.transform = 'scale(0.95)'
      setTimeout(() => {
        this.style.transform = 'scale(1)'
      }, 150)

      const serviceNameElement =
        this.closest('.pricing-item').querySelector('.service-name')
      if (serviceNameElement) {
        console.log('Заказ услуги:', serviceNameElement.textContent)
      } else {
        console.log('Заказ услуги: Название услуги не найдено')
      }
    })
  })
})
