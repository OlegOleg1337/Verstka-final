import '../scss/style.scss'

document.addEventListener('DOMContentLoaded', function () {
  const sidebarMenu = document.getElementById('sidebarMenu')
  const openMenuBtn = document.getElementById('openMenuBtn')
  const closeMenuBtn = sidebarMenu ? sidebarMenu.querySelector('.close') : null
  const mainContentWrapper = document.querySelector('.main-content-wrapper')
  const body = document.body

  // Важно: Этот брейкпоинт должен совпадать с $mobile-breakpoint в SCSS
  const mobileBreakpoint = 767

  // Функция для применения/снятия мобильных классов и управления прокруткой
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

  // Логика открытия бокового меню
  if (openMenuBtn) {
    openMenuBtn.addEventListener('click', () => {
      toggleMobileMenuClasses('add')
    })
  }

  // Логика закрытия бокового меню по кнопке внутри сайдбара
  if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', () => {
      toggleMobileMenuClasses('remove')
    })
  }

  // Закрытие меню по клику вне его области (только на мобильных)
  document.addEventListener('click', (event) => {
    if (window.innerWidth <= mobileBreakpoint && sidebarMenu && openMenuBtn) {
      if (
        sidebarMenu.classList.contains('sidebar-menu--open') &&
        !sidebarMenu.contains(event.target) &&
        !openMenuBtn.contains(event.target)
      ) {
        // Если клик был по mainContentWrapper, когда он сдвинут
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

  // Логика для сброса классов при изменении размера экрана (из мобильного в десктоп)
  window.addEventListener('resize', () => {
    if (window.innerWidth > mobileBreakpoint) {
      if (sidebarMenu) {
        sidebarMenu.classList.remove('sidebar-menu--open')
      }
      if (mainContentWrapper) {
        mainContentWrapper.classList.remove('main-content-wrapper--shifted')
      }
      if (body) {
        body.classList.remove('no-scroll')
      }
    }
    // Переинициализация Swiper'ов при изменении размера окна
    initSwipers()
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
    readMoreButton.addEventListener('click', (event) => {
      event.preventDefault()

      // Проверяем текущее состояние display
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

  // --- ЛОГИКА ДЛЯ Swiper.js ---
  let brandsSwiper // Экземпляр Swiper для брендов
  let repairTypesSwiper // Экземпляр Swiper для видов ремонта
  let pricingSwiper // Экземпляр Swiper для цен

  function initSwipers() {
    if (window.innerWidth <= mobileBreakpoint) {
      // --- Инициализируем Swiper для брендов ---
      if (!brandsSwiper) {
        brandsSwiper = new Swiper('.brands-swiper', {
          direction: 'horizontal',
          loop: false, // Логика "Показать все" лучше работает без loop
          slidesPerView: 'auto', // Автоматическое определение количества слайдов
          spaceBetween: 16, // Отступ между слайдами (в пикселях)
          pagination: {
            el: '.brands-pagination',
            clickable: true
          }
        })
      } else {
        // Если Swiper уже есть, но был деактивирован на десктопе, активируем его
        brandsSwiper.enable()
        brandsSwiper.update() // Обновляем Swiper при включении
      }

      // --- Инициализируем Swiper для видов ремонта ---
      if (!repairTypesSwiper) {
        repairTypesSwiper = new Swiper('.repair-types-swiper', {
          direction: 'horizontal',
          loop: false,
          slidesPerView: 'auto',
          spaceBetween: 16,
          pagination: {
            el: '.repair-types-pagination',
            clickable: true
          }
        })
      } else {
        repairTypesSwiper.enable()
        repairTypesSwiper.update()
      }

      // --- Инициализируем Swiper для цен ---
      // Скрываем десктопный контейнер и показываем Swiper
      const pricingDesktopContainer = document.querySelector(
        '.pricing-container--desktop'
      )
      if (pricingDesktopContainer) {
        pricingDesktopContainer.style.display = 'none'
      }
      const pricingSwiperElement = document.querySelector('.pricing-swiper')
      if (pricingSwiperElement) {
        pricingSwiperElement.style.display = 'block'
      }

      if (!pricingSwiper) {
        pricingSwiper = new Swiper('.pricing-swiper', {
          direction: 'horizontal',
          loop: false,
          slidesPerView: 'auto', // 'auto' или 1, в зависимости от желаемого поведения
          spaceBetween: 16,
          pagination: {
            el: '.pricing-pagination',
            clickable: true
          }
        })
      } else {
        pricingSwiper.enable()
        pricingSwiper.update()
      }
    } else {
      // --- На десктопе уничтожаем или отключаем все Swiper'ы ---

      if (brandsSwiper) {
        brandsSwiper.disable() // Отключаем функциональность Swiper
        // brandsSwiper.destroy(true, true); // Если нужно полностью удалить Swiper
        // brandsSwiper = undefined;
      }
      if (repairTypesSwiper) {
        repairTypesSwiper.disable()
        // repairTypesSwiper.destroy(true, true);
        // repairTypesSwiper = undefined;
      }

      // Показываем десктопный контейнер и скрываем Swiper для цен
      const pricingDesktopContainer = document.querySelector(
        '.pricing-container--desktop'
      )
      if (pricingDesktopContainer) {
        pricingDesktopContainer.style.display = 'block'
      }
      const pricingSwiperElement = document.querySelector('.pricing-swiper')
      if (pricingSwiperElement) {
        pricingSwiperElement.style.display = 'none'
      }

      if (pricingSwiper) {
        pricingSwiper.disable()
        // pricingSwiper.destroy(true, true);
        // pricingSwiper = undefined;
      }

      // При переходе на десктоп, убедимся, что скрытые элементы брендов и типов ремонта
      // скрыты по умолчанию, если кнопка "Показать все" еще не нажата.
      // Это предотвращает их отображение, если пользователь изменил размер окна
      // после расширения списка на мобильном.
      const brandsHiddenItems = document.querySelectorAll(
        '.services__brands-item--hidden-on-load'
      )
      brandsHiddenItems.forEach((item) => (item.style.display = 'none'))
      if (brandsToggleText) {
        brandsToggleText.textContent = 'Показать все'
        brandsToggleIcon.style.transform = 'rotate(0deg)'
      }
      const repairHiddenItems = document.querySelectorAll(
        '.repair-types-item--hidden-on-load'
      )
      repairHiddenItems.forEach((item) => (item.style.display = 'none'))
      if (repairTypesToggleText) {
        repairTypesToggleText.textContent = 'Показать все'
        repairTypesToggleIcon.style.transform = 'rotate(0deg)'
      }
    }
  }

  // Инициализация Swiper'ов при загрузке страницы
  initSwipers()

  // --- Логика для кнопки "Показать все" в разделе брендов ---
  const brandsToggleBtn = document.getElementById('toggleBrandsBtn')
  const brandsToggleText = brandsToggleBtn
    ? brandsToggleBtn.querySelector('.services__toggle-text')
    : null
  const brandsToggleIcon = brandsToggleBtn
    ? brandsToggleBtn.querySelector('.services__toggle-icon')
    : null
  const brandsSwiperContainer = document.querySelector('.brands-swiper')

  if (
    brandsToggleBtn &&
    brandsSwiperContainer &&
    brandsToggleText &&
    brandsToggleIcon
  ) {
    brandsToggleBtn.addEventListener('click', () => {
      // Эта логика будет работать только на десктопах, так как кнопка скрыта на мобильных
      if (window.innerWidth > mobileBreakpoint) {
        const isExpanded = brandsSwiperContainer.classList.toggle(
          'services__brands-grid--expanded'
        )

        const hiddenItems = brandsSwiperContainer.querySelectorAll(
          '.services__brands-item--hidden-on-load'
        )

        if (isExpanded) {
          hiddenItems.forEach((item) => {
            item.style.display = 'flex' // Используем flex, так как это flex-контейнер
          })
          brandsToggleText.textContent = 'Скрыть'
          brandsToggleIcon.style.transform = 'rotate(180deg)'
        } else {
          hiddenItems.forEach((item) => {
            item.style.display = 'none'
          })
          brandsToggleText.textContent = 'Показать все'
          brandsToggleIcon.style.transform = 'rotate(0deg)'
        }
      }
    })
  }

  // --- КОНЕЦ ЛОГИКИ ДЛЯ Swiper.js ---

  // --- ЛОГИКА ДЛЯ КНОПКИ "Показать все" В РАЗДЕЛЕ "РЕМОНТ РАЗЛИЧНЫХ ВИДОВ ТЕХНИКИ" ---
  // Эта кнопка теперь работает только на десктопах, когда Swiper отключен
  const repairTypesShowAllContainer = document.querySelector(
    '.repair-types-section .show-all'
  )
  const repairTypesToggleText = document.getElementById('toggleRepairTypesText')
  const repairTypesToggleIcon = document.getElementById('toggleRepairTypesIcon')
  const repairTypesCards = document.querySelectorAll(
    '.repair-types-swiper .swiper-slide.card'
  )
  // Количество карточек, которые изначально видимы (до 8 на десктопе по макету, т.е. скрыто 4)
  const visibleRepairCardsCountDesktop = 8

  if (
    repairTypesShowAllContainer &&
    repairTypesToggleText &&
    repairTypesToggleIcon &&
    repairTypesCards.length > 0
  ) {
    // Скрываем лишние карточки при загрузке на десктопе
    // и при каждой инициализации initSwipers, если экран десктоп
    const applyInitialVisibility = () => {
      if (window.innerWidth > mobileBreakpoint) {
        for (
          let i = visibleRepairCardsCountDesktop;
          i < repairTypesCards.length;
          i++
        ) {
          repairTypesCards[i].style.display = 'none'
        }
        repairTypesToggleText.textContent = 'Показать все'
        repairTypesToggleIcon.style.transform = 'rotate(0deg)'
      } else {
        // На мобильных убедимся, что все карточки видимы для Swiper
        repairTypesCards.forEach((card) => (card.style.display = 'flex')) // Или 'block', в зависимости от стиля
      }
    }

    applyInitialVisibility() // Применить при загрузке

    // Повторно применяем при изменении размера, чтобы сбросить состояние "Показать все"
    window.addEventListener('resize', applyInitialVisibility)

    repairTypesShowAllContainer.addEventListener('click', (event) => {
      event.preventDefault()

      // Эта логика работает только на десктопе, когда Swiper выключен
      if (window.innerWidth > mobileBreakpoint) {
        // Проверяем, скрыта ли хоть одна из дополнительных карточек
        const isCurrentlyHidden =
          repairTypesCards[visibleRepairCardsCountDesktop] &&
          (repairTypesCards[visibleRepairCardsCountDesktop].style.display ===
            'none' ||
            repairTypesCards[visibleRepairCardsCountDesktop].style.display ===
              '')

        if (isCurrentlyHidden) {
          for (
            let i = visibleRepairCardsCountDesktop;
            i < repairTypesCards.length;
            i++
          ) {
            repairTypesCards[i].style.display = 'flex' // Используем flex, так как это flex-контейнер
          }
          repairTypesToggleText.textContent = 'Скрыть'
          repairTypesToggleIcon.style.transform = 'rotate(180deg)'
        } else {
          for (
            let i = visibleRepairCardsCountDesktop;
            i < repairTypesCards.length;
            i++
          ) {
            repairTypesCards[i].style.display = 'none'
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
