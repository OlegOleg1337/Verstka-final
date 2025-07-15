import '../scss/style.scss'

document.addEventListener('DOMContentLoaded', function () {
  const sidebarMenu = document.getElementById('sidebarMenu')
  const openMenuBtn = document.getElementById('openMenuBtn')
  const closeMenuBtn = sidebarMenu ? sidebarMenu.querySelector('.close') : null
  const mainContentWrapper = document.querySelector('.main-content-wrapper')
  const body = document.body

  const mobileBreakpoint = 767 // Соответствует $mobile-breakpoint в SCSS

  // --- ЛОГИКА ДЛЯ БОКОВОГО МЕНЮ ---
  function toggleMobileMenuClasses(action) {
    if (sidebarMenu && mainContentWrapper && body) {
      if (window.innerWidth <= mobileBreakpoint) {
        if (action === 'add') {
          sidebarMenu.classList.add('sidebar-menu--open')
          mainContentWrapper.classList.add('main-content-wrapper--shifted')
          body.classList.add('no-scroll')
        } else {
          sidebarMenu.classList.remove('sidebar-menu--open')
          mainContentWrapper.classList.remove('main-content-wrapper--shifted')
          body.classList.remove('no-scroll')
        }
      }
    }
  }

  if (openMenuBtn) {
    openMenuBtn.addEventListener('click', () => {
      toggleMobileMenuClasses('add')
    })
  }

  if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', () => {
      toggleMobileMenuClasses('remove')
    })
  }

  document.addEventListener('click', (event) => {
    if (window.innerWidth <= mobileBreakpoint && sidebarMenu && openMenuBtn) {
      if (
        sidebarMenu.classList.contains('sidebar-menu--open') &&
        !sidebarMenu.contains(event.target) &&
        !openMenuBtn.contains(event.target)
      ) {
        if (
          mainContentWrapper.classList.contains(
            'main-content-wrapper--shifted'
          ) &&
          event.target === mainContentWrapper
        ) {
          toggleMobileMenuClasses('remove')
        }
      }
    }
  })

  // --- ЛОГИКА ДЛЯ КНОПКИ "Читать дальше" В ПЕРВОМ РАЗДЕЛЕ ---
  const readMoreButton = document.getElementById('readMoreButton')
  const olegMessage = document.getElementById('olegMessage')
  const readMoreText = readMoreButton
    ? readMoreButton.querySelector('span')
    : null
  const readMoreIcon = readMoreButton
    ? readMoreButton.querySelector('img')
    : null

  if (readMoreButton && olegMessage && readMoreText && readMoreIcon) {
    // Изначально скрываем, если это не сделано в CSS
    olegMessage.style.display = 'none'

    readMoreButton.addEventListener('click', (event) => {
      event.preventDefault()

      const isHidden =
        olegMessage.style.display === 'none' || olegMessage.style.display === ''

      if (isHidden) {
        olegMessage.style.display = 'block'
        readMoreText.textContent = 'Скрыть'
        readMoreIcon.style.transform = 'rotate(180deg)'
      } else {
        olegMessage.style.display = 'none'
        readMoreText.textContent = 'Читать дальше'
        readMoreIcon.style.transform = 'rotate(0deg)'
      }
    })
  }
  // --- КОНЕЦ ЛОГИКИ ДЛЯ КНОПКИ "Читать дальше" ---

  // --- ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ ДЛЯ SWIPER И КНОПОК "ПОКАЗАТЬ ВСЕ" ---
  let brandsSwiper = null
  let repairTypesSwiper = null
  let pricingSwiper = null

  const brandsToggleBtn = document.getElementById('toggleBrandsBtn')
  const brandsToggleText = brandsToggleBtn
    ? brandsToggleBtn.querySelector('.services__toggle-text')
    : null
  const brandsToggleIcon = brandsToggleBtn
    ? brandsToggleBtn.querySelector('.services__toggle-icon')
    : null
  const brandsSwiperContainer = document.querySelector('.brands-swiper')
  const allBrandsItems = document.querySelectorAll('.services__brands-item') // Все элементы брендов

  const repairTypesShowAllContainer = document.querySelector(
    '.repair-types-section .show-all'
  )
  const repairTypesToggleText = document.getElementById('toggleRepairTypesText')
  const repairTypesToggleIcon = document.getElementById('toggleRepairTypesIcon')
  const allRepairTypesCards = document.querySelectorAll(
    '.repair-types-swiper .swiper-slide.card'
  ) // Все карточки типов ремонта
  const visibleRepairCardsCountDesktop = 4 // Количество карточек, которые изначально видимы на десктопе

  // --- ФУНКЦИЯ ИНИЦИАЛИЗАЦИИ/ДЕАКТИВАЦИИ SWIPER'ОВ И УПРАВЛЕНИЯ ВИДИМОСТЬЮ НА ДЕСКТОПЕ ---
  function initSwipersAndDesktopLayout() {
    if (window.innerWidth <= mobileBreakpoint) {
      // --- НА МОБИЛЬНЫХ (SWIPER АКТИВЕН) ---
      // Убедимся, что все элементы видимы для Swiper
      allBrandsItems.forEach((item) => {
        item.style.display = '' // Сбрасываем display, чтобы Swiper мог управлять
        item.classList.remove('services__brands-item--hidden-on-load') // Убираем класс скрытия
      })
      allRepairTypesCards.forEach((item) => {
        item.style.display = '' // Сбрасываем display, чтобы Swiper мог управлять
        // Класс repair-types-item--hidden-on-load теперь не используется для скрытия в CSS,
        // но убедимся, что он не мешает Swiper
        item.classList.remove('repair-types-item--hidden-on-load')
      })

      // Деактивируем класс расширения для брендов
      if (brandsSwiperContainer) {
        brandsSwiperContainer.classList.remove(
          'services__brands-grid--expanded'
        )
      }

      // Скрываем кнопки "Показать все" на мобильных
      if (brandsToggleBtn) brandsToggleBtn.style.display = 'none'
      if (repairTypesShowAllContainer)
        repairTypesShowAllContainer.style.display = 'none'

      // Инициализация/активация Swiper для брендов
      if (!brandsSwiper) {
        brandsSwiper = new Swiper('.brands-swiper', {
          direction: 'horizontal',
          loop: false,
          slidesPerView: 'auto',
          spaceBetween: 16,
          pagination: { el: '.brands-pagination', clickable: true }
        })
      } else {
        brandsSwiper.enable()
        brandsSwiper.update()
      }

      // Инициализация/активация Swiper для видов ремонта
      if (!repairTypesSwiper) {
        repairTypesSwiper = new Swiper('.repair-types-swiper', {
          direction: 'horizontal',
          loop: false,
          slidesPerView: 'auto',
          spaceBetween: 16,
          pagination: { el: '.repair-types-pagination', clickable: true }
        })
      } else {
        repairTypesSwiper.enable()
        repairTypesSwiper.update()
      }

      // Управление Swiper для цен
      const pricingDesktopContainer = document.querySelector(
        '.pricing-container--desktop'
      )
      const pricingSwiperElement = document.querySelector('.pricing-swiper')
      if (pricingDesktopContainer)
        pricingDesktopContainer.style.display = 'none'
      if (pricingSwiperElement) pricingSwiperElement.style.display = 'block'

      if (!pricingSwiper) {
        pricingSwiper = new Swiper('.pricing-swiper', {
          direction: 'horizontal',
          loop: false,
          slidesPerView: 'auto',
          spaceBetween: 16,
          pagination: { el: '.pricing-pagination', clickable: true }
        })
      } else {
        pricingSwiper.enable()
        pricingSwiper.update()
      }
    } else {
      // --- НА ДЕСКТОПЕ (GRID АКТИВЕН) ---
      // Деактивация Swiper'ов
      if (brandsSwiper) {
        brandsSwiper.disable()
      }
      if (repairTypesSwiper) {
        repairTypesSwiper.disable()
      }
      if (pricingSwiper) {
        pricingSwiper.disable()
      }

      // Показываем десктопный контейнер цен, скрываем Swiper цен
      const pricingDesktopContainer = document.querySelector(
        '.pricing-container--desktop'
      )
      const pricingSwiperElement = document.querySelector('.pricing-swiper')
      if (pricingDesktopContainer)
        pricingDesktopContainer.style.display = 'block'
      if (pricingSwiperElement) pricingSwiperElement.style.display = 'none'

      // Показываем кнопки "Показать все" на десктопе
      if (brandsToggleBtn) brandsToggleBtn.style.display = 'flex'
      if (repairTypesShowAllContainer)
        repairTypesShowAllContainer.style.display = 'flex'

      // Сброс состояния "Показать все" для брендов на десктопе
      // Важно: здесь класс services__brands-item--hidden-on-load в HTML
      // и CSS-правила используются для управления видимостью.
      if (brandsSwiperContainer) {
        brandsSwiperContainer.classList.remove(
          'services__brands-grid--expanded'
        ) // Убираем класс расширения
      }
      allBrandsItems.forEach((item) => {
        if (item.classList.contains('services__brands-item--hidden-on-load')) {
          item.style.display = 'none' // Скрываем их, если у них есть этот класс
        } else {
          item.style.display = 'flex' // Убедимся, что видимые видны
        }
      })
      if (brandsToggleText) {
        brandsToggleText.textContent = 'Показать все'
        brandsToggleIcon.style.transform = 'rotate(0deg)'
      }

      // Сброс состояния "Показать все" для типов ремонта на десктопе
      // Здесь JS напрямую управляет display для всех карточек,
      // основываясь на visibleRepairCardsCountDesktop
      for (let i = 0; i < allRepairTypesCards.length; i++) {
        if (i >= visibleRepairCardsCountDesktop) {
          allRepairTypesCards[i].style.display = 'none' // Скрываем лишние на десктопе
        } else {
          allRepairTypesCards[i].style.display = 'flex' // Убедимся, что видимые видны
        }
      }
      if (repairTypesToggleText) {
        repairTypesToggleText.textContent = 'Показать все'
        repairTypesToggleIcon.style.transform = 'rotate(0deg)'
      }
    }
  }

  // --- ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ ---
  initSwipersAndDesktopLayout()

  // --- ОБРАБОТЧИК ИЗМЕНЕНИЯ РАЗМЕРА ОКНА ---
  window.addEventListener('resize', () => {
    // При изменении размера, если переходим из мобильного в десктоп и наоборот,
    // сбрасываем классы меню и переинициализируем Swiper'ы
    if (window.innerWidth > mobileBreakpoint) {
      if (sidebarMenu) sidebarMenu.classList.remove('sidebar-menu--open')
      if (mainContentWrapper)
        mainContentWrapper.classList.remove('main-content-wrapper--shifted')
      if (body) body.classList.remove('no-scroll')
    }
    initSwipersAndDesktopLayout() // Переинициализация Swiper'ов
  })

  // --- ЛОГИКА ДЛЯ КНОПКИ "Показать все" в разделе брендов (работает только на десктопе) ---
  if (
    brandsToggleBtn &&
    brandsSwiperContainer &&
    brandsToggleText &&
    brandsToggleIcon &&
    allBrandsItems.length > 0 // Убедимся, что есть элементы
  ) {
    brandsToggleBtn.addEventListener('click', () => {
      // Эта логика работает только на десктопе, когда Swiper выключен
      if (window.innerWidth > mobileBreakpoint) {
        const isExpanded = brandsSwiperContainer.classList.toggle(
          'services__brands-grid--expanded'
        )

        // Итерируемся по всем элементам, чтобы показать/скрыть те, у которых есть класс hidden-on-load
        allBrandsItems.forEach((item) => {
          if (
            item.classList.contains('services__brands-item--hidden-on-load')
          ) {
            if (isExpanded) {
              item.style.display = 'flex' // Показываем скрытые элементы
            } else {
              item.style.display = 'none' // Скрываем элементы
            }
          }
        })

        if (isExpanded) {
          brandsToggleText.textContent = 'Скрыть'
          brandsToggleIcon.style.transform = 'rotate(180deg)'
        } else {
          brandsToggleText.textContent = 'Показать все'
          brandsToggleIcon.style.transform = 'rotate(0deg)'
        }
      }
    })
  }

  // --- ЛОГИКА ДЛЯ КНОПКИ "Показать все" В РАЗДЕЛЕ "РЕМОНТ РАЗЛИЧНЫХ ВИДОВ ТЕХНИКИ" (работает только на десктопе) ---
  if (
    repairTypesShowAllContainer &&
    repairTypesToggleText &&
    repairTypesToggleIcon &&
    allRepairTypesCards.length > 0
  ) {
    repairTypesShowAllContainer.addEventListener('click', (event) => {
      event.preventDefault()

      // Эта логика работает только на десктопе, когда Swiper выключен
      if (window.innerWidth > mobileBreakpoint) {
        // Проверяем, скрыта ли хоть одна из дополнительных карточек
        const isCurrentlyHidden =
          allRepairTypesCards[visibleRepairCardsCountDesktop] &&
          (allRepairTypesCards[visibleRepairCardsCountDesktop].style.display ===
            'none' ||
            allRepairTypesCards[visibleRepairCardsCountDesktop].style
              .display === '')

        if (isCurrentlyHidden) {
          for (
            let i = visibleRepairCardsCountDesktop;
            i < allRepairTypesCards.length;
            i++
          ) {
            allRepairTypesCards[i].style.display = 'flex'
          }
          repairTypesToggleText.textContent = 'Скрыть'
          repairTypesToggleIcon.style.transform = 'rotate(180deg)'
        } else {
          for (
            let i = visibleRepairCardsCountDesktop;
            i < allRepairTypesCards.length;
            i++
          ) {
            allRepairTypesCards[i].style.display = 'none'
          }
          repairTypesToggleText.textContent = 'Показать все'
          repairTypesToggleIcon.style.transform = 'rotate(0deg)'
        }
      }
    })
  }
  // --- КОНЕЦ ЛОГИКИ ДЛЯ КНОПКИ "Показать все" В РАЗДЕЛЕ "РЕМОНТ РАЗЛИЧНЫХ ВИДОВ ТЕХНИКИ" ---

  // Логика для кнопок "Заказать"
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
