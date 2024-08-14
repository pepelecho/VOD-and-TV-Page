

//Cambiar pestañas Mi lista
$(document).ready(function () {
  // Función para actualizar la interfaz según el contenido seleccionado
  function actualizarSeleccion(contentId) {
    // Ocultar todas las secciones de contenido
    $('.contenido-seccion').hide();

    // Mostrar la sección correspondiente
    $('#' + contentId).show();

    // Actualizar la selección de elementos de la lista
    $('.milista-item')
      .removeClass('selected-milista')
      .addClass('unselected-milista');
    $('p').removeClass('texto-negro-milista').addClass('texto-blanco-milista');
    $('.milista-item[data-content="' + contentId + '"]')
      .removeClass('unselected-milista')
      .addClass('selected-milista');
    $('.milista-item[data-content="' + contentId + '"]')
      .find('p')
      .removeClass('texto-blanco-milista')
      .addClass('texto-negro-milista');

    // Sincronizar el selector con el contenido seleccionado
    $('#list-selector').val(contentId);
  }

  // Manejar clics en los elementos de la lista
  $('.milista-item').on('click', function () {
    // Obtener el valor del atributo data-content
    var contentId = $(this).data('content');

    // Actualizar la interfaz
    actualizarSeleccion(contentId);
  });

  // Manejar cambios en el selector de temporada
  $('#list-selector').on('change', function () {
    // Obtener el valor seleccionado
    var selectedValue = $(this).val();

    // Actualizar la interfaz
    actualizarSeleccion(selectedValue);
  });
});

// Mostrar descripciones de programas
$(document).ready(function () {
  $('.programa-milista').on('click', function () {
    var $contenedorDescripcion = $(this)
      .closest('.programa-milista')
      .next('.contenedor-descripcion-programa-milista');

    // Cerrar todas las descripciones abiertas, excepto la actual
    $('.contenedor-descripcion-programa-milista')
      .not($contenedorDescripcion)
      .each(function () {
        if ($(this).hasClass('visible')) {
          $(this)
            .removeClass('visible')
            .css({
              padding: $(this).data('original-padding'),
              'margin-bottom': $(this).data('original-margin-bottom'),
              opacity: '0',
              transform: 'translateY(-10px)', // Ejemplo de un efecto de desplazamiento
            });
          $(this)
            .prev('.programa-milista')
            .find('.btn-descripcion')
            .removeClass('active');
        }
      });

    // Añadir la transición antes de cualquier cambio de estilo
    $contenedorDescripcion.css({
      transition:
        'margin-bottom 0s ease, padding 0s ease, opacity 0.3s ease, transform 0.3s ease',
    });

    // Si el contenedor ya tiene la clase 'visible', revertir estilos
    if ($contenedorDescripcion.hasClass('visible')) {
      $contenedorDescripcion.removeClass('visible').css({
        padding: $contenedorDescripcion.data('original-padding'),
        'margin-bottom': $contenedorDescripcion.data('original-margin-bottom'),
        opacity: '0',
        transform: 'translateY(-10px)', // Ejemplo de un efecto de desplazamiento
      });
    } else {
      // Guardar estilos originales antes de aplicar nuevos estilos
      var originalPadding = $contenedorDescripcion.css('padding');
      var originalMarginBottom = $contenedorDescripcion.css('margin-bottom');

      // Guardar los estilos originales en data attributes para restauración
      $contenedorDescripcion.data('original-padding', originalPadding);
      $contenedorDescripcion.data(
        'original-margin-bottom',
        originalMarginBottom
      );

      // Aplicar nuevos estilos para la transición
      $contenedorDescripcion.addClass('visible').css({
        padding: '20px',
        'margin-bottom': '20px',
        opacity: '1',
        transform: 'translateY(0)', // Regresar a la posición original
      });
    }

    $(this).find('.btn-descripcion').toggleClass('active');
  });
});

//Slider Deportes

// Asegúrate de que este array tenga tantos elementos como sliders.
let currentSlideIndex = [];

// Inicializar el índice de cada slider a 0
document.querySelectorAll('.slider').forEach((_, index) => {
  currentSlideIndex[index] = 0;
});

function moveSlide(n, sliderIndex) {
  const sliders = document.querySelectorAll('.slider');
  if (sliderIndex >= sliders.length) {
    console.error(`Slider index ${sliderIndex} out of bounds`);
    return;
  }

  const slides = sliders[sliderIndex].querySelector('.slides');
  const slideWidth =
    sliders[sliderIndex].querySelector('.slide').clientWidth + 20; // Añadir margen
  const totalSlides = slides.children.length;

  currentSlideIndex[sliderIndex] += n;

  if (currentSlideIndex[sliderIndex] < 0) {
    currentSlideIndex[sliderIndex] = totalSlides - 1;
  } else if (currentSlideIndex[sliderIndex] >= totalSlides) {
    currentSlideIndex[sliderIndex] = 0;
  }

  slides.style.transform = `translateX(-${currentSlideIndex[sliderIndex] * slideWidth
    }px)`;
}

// Slider canales tactil

$(document).ready(function () {
  // Función para inicializar el manejo de eventos de desplazamiento
  function initializeTouchEvents() { }

  // Inicializa el manejo de eventos al cargar la página
  initializeTouchEvents();
});

$(document).ready(function () {
  // Función que verifica si el elemento con el ID #channelsContainer está presente
  function checkElement() {
    if ($('#channelsContainer').length) {
      // Selecciona el contenedor de canales
      var $container = $('#channelsContainer');

      // Manejo del evento de toque para dispositivos móviles
      $container.off('touchstart').on('touchstart', function (e) {
        var startX = e.originalEvent.touches[0].pageX;
        var scrollLeft = $container.scrollLeft();

        $container.off('touchmove').on('touchmove', function (e) {
          var currentX = e.originalEvent.touches[0].pageX;
          var deltaX = startX - currentX;
          $container.scrollLeft(scrollLeft + deltaX);
        });

        $container.off('touchend').on('touchend', function () {
          $container.off('touchmove touchend');
        });
      });
    }
  }

  // Ejecutar checkElement cada 500 milisegundos
  var intervalId = setInterval(checkElement, 500);
});

//Hace un slider al menu de las temporadas si el tamaño es muy pequeño (excepto moviles)

document.addEventListener('DOMContentLoaded', function () {
  function initializeSlider() {
    document
      .querySelectorAll('.season-container')
      .forEach(function (container) {
        var parentWidth = container.parentElement.offsetWidth;
        var containerWidth = 0;

        // Calcula el ancho total del contenedor
        container.querySelectorAll('.season-item').forEach(function (item) {
          containerWidth +=
            item.offsetWidth +
            parseFloat(window.getComputedStyle(item).marginRight) +
            20;
        });

        // Solo crea el slider si el contenedor es más ancho que su padre
        if (containerWidth > parentWidth) {
          var wrapper = document.createElement('div');
          wrapper.classList.add('wrapper1234'); // Cambio de nombre aquí
          wrapper.style.overflow = 'hidden';
          wrapper.style.position = 'relative';
          container.parentElement.insertBefore(wrapper, container);
          wrapper.appendChild(container);

          // Establece el ancho y la posición del contenedor
          container.style.width = containerWidth + 'px';
          container.style.position = 'relative';
          container.style.left = '0px';
          container.style.transition = 'left 0.6s ease';

          // Crear botón de navegación izquierda
          var leftNav = document.createElement('button');
          leftNav.classList.add('nav-button-2', 'left');
          leftNav.innerHTML = '&lt;';
          leftNav.style.position = 'absolute';
          leftNav.style.left = '0';
          leftNav.style.top = '50%';
          leftNav.style.transform = 'translateY(-50%)';
          leftNav.style.background = 'rgba(0,0,0,0.5)';
          leftNav.style.color = '#fff';
          leftNav.style.border = 'none';
          leftNav.style.cursor = 'pointer';
          leftNav.style.zIndex = '10';
          leftNav.addEventListener('click', function () {
            var currentLeft = parseInt(container.style.left, 10);
            if (currentLeft < 0) {
              var newLeft = Math.min(currentLeft + 200, 0);
              disableNavButtons();
              container.style.left = newLeft + 'px';
              enableNavButtons();
              toggleNavButtons();
            }
          });

          // Crear botón de navegación derecha
          var rightNav = document.createElement('button');
          rightNav.classList.add('nav-button-2', 'right');
          rightNav.innerHTML = '&gt;';
          rightNav.style.position = 'absolute';
          rightNav.style.right = '0';
          rightNav.style.top = '50%';
          rightNav.style.transform = 'translateY(-50%)';
          rightNav.style.background = 'rgba(0,0,0,0.5)';
          rightNav.style.color = '#fff';
          rightNav.style.border = 'none';
          rightNav.style.cursor = 'pointer';
          rightNav.style.zIndex = '10';
          rightNav.addEventListener('click', function () {
            var currentLeft = parseInt(container.style.left, 10);
            var maxLeft = parentWidth - containerWidth;
            if (currentLeft > maxLeft) {
              var newLeft = Math.max(currentLeft - 200, maxLeft);
              disableNavButtons();
              container.style.left = newLeft + 'px';
              enableNavButtons();
              toggleNavButtons();
            }
          });

          function toggleNavButtons() {
            var currentLeft = parseInt(container.style.left, 10);
            var maxLeft = parentWidth - containerWidth;
            leftNav.disabled = currentLeft >= 0;
            rightNav.disabled = currentLeft <= maxLeft;
          }

          function disableNavButtons() {
            leftNav.disabled = true;
            rightNav.disabled = true;
          }

          function enableNavButtons() {
            setTimeout(function () {
              leftNav.disabled = false;
              rightNav.disabled = false;
            }, 600);
          }

          wrapper.appendChild(leftNav);
          wrapper.appendChild(rightNav);
          toggleNavButtons();
        }
      });
  }

  function resetSliderPosition() {
    document
      .querySelectorAll('.season-container')
      .forEach(function (container) {
        var parentWidth = container.parentElement.offsetWidth;
        var containerWidth = 0;

        container.querySelectorAll('.season-item').forEach(function (item) {
          containerWidth +=
            item.offsetWidth +
            parseFloat(window.getComputedStyle(item).marginRight);
        });

        if (containerWidth <= parentWidth) {
          container.style.left = '0';
          container.parentElement
            .querySelectorAll('.nav-button-2')
            .forEach(function (button) {
              button.remove();
            });
        }
      });
  }

  initializeSlider();

  window.addEventListener('resize', function () {
    document.querySelectorAll('.wrapper1234').forEach(function (wrapper) {
      // Cambio de nombre aquí
      var container = wrapper.querySelector('.season-container');
      container.style.left = '0';
      wrapper.querySelectorAll('.nav-button-2').forEach(function (button) {
        button.remove();
      });
    });
    initializeSlider();
    resetSliderPosition();
  });
});

//Animación de scroll nombres de programas si son mas anchos que el div

$(document).ready(function () {
  function applyScrollingAnimation() {
    $('.program-name-channels span').each(function () {
      const $programName = $(this);
      const containerWidth = $programName.parent().width();
      const contentWidth = $programName[0].scrollWidth;

      if (contentWidth > containerWidth) {
        $programName.css('animation', 'text-scroll 20s linear infinite');
      } else {
        $programName.css('animation', 'none');
      }
    });
  }

  // Apply animation on initial page load
  applyScrollingAnimation();

  // Apply animation after new content is loaded
  $(document).on('scroll', function () {
    // Assuming your scroll event is related to content loading
    applyScrollingAnimation();
  });
});


//Animación scroll títulos de episodios

$(document).ready(function () {
  function chaptername() {
    $('.episode-title').each(function () {
      const $titleElement = $(this); // Renombrado para mayor claridad
      const containerWidth = $titleElement.parent().width();
      const contentWidth = $titleElement[0].scrollWidth;

      if (contentWidth > containerWidth) {
        $titleElement.css('animation', 'text-scroll 20s linear infinite');
      } else {
        $titleElement.css('animation', 'none');
      }
    });
  }

  // Apply animation on initial page load
  chaptername();

  // Observe changes in the DOM (for dynamically shown content)
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === 'childList' || mutation.type === 'attributes') {
        chaptername();
      }
    });
  });

  // Configure the observer to watch for changes in child elements or attributes of a parent container
  const targetNode = document.body; // Adjust this selector to the container where content might be added
  const config = { childList: true, subtree: true, attributes: true };
  observer.observe(targetNode, config);

  // Apply animation on window resize (to handle changes in container width)
  $(window).on('resize', function () {
    chaptername();
  });
});

//Descripciones flotantes para cine-all.html
document.addEventListener('DOMContentLoaded', () => {
  const addTooltipsToMovies = () => {
    const movieDivs = document.querySelectorAll('.movie2');

    movieDivs.forEach(movieDiv => {
      if (!movieDiv.classList.contains('tooltip-initialized')) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        movieDiv.appendChild(tooltip);
        movieDiv.classList.add('tooltip-initialized');

        movieDiv.addEventListener('mouseenter', () => {
          const title = movieDiv.getAttribute('data-title');
          const year = movieDiv.getAttribute('data-year');
          const voteAverage = movieDiv.getAttribute('data-vote-average');
          const genre = movieDiv.getAttribute('data-genre');
          const synopsis = movieDiv.getAttribute('data-synopsis');

          tooltip.innerHTML = `
              <h2>${title || 'Título no disponible'} (${year || 'Año no disponible'
            })</h2>
              <div class="movie-meta">
                <span class="rating2">${voteAverage || 'N/A'}</span>
                <span class="year">${year || 'Año no disponible'}</span>
                <span class="genre2">${genre || 'Género no disponible'}</span>
              </div>
              <p>${synopsis || 'Sinopsis no disponible'}</p>
            `;

          tooltip.style.display = 'block';
        });

        movieDiv.addEventListener('mouseleave', () => {
          tooltip.style.display = 'none';
        });

        tooltip.addEventListener('mouseenter', () => {
          tooltip.style.display = 'block';
        });

        tooltip.addEventListener('mouseleave', () => {
          tooltip.style.display = 'none';
        });
      }
    });
  };

  // Inicializar tooltips en los elementos cargados al principio
  addTooltipsToMovies();

  // Configurar el MutationObserver para manejar contenido dinámico
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.addedNodes.length) {
        addTooltipsToMovies();
      }
    });
  });

  // Configurar el observer para observar cambios en el body
  observer.observe(document.body, { childList: true, subtree: true });
});

//Scroll infinito

$(document).ready(function () {
  const totalPages = {
    index: 2,
    cine: 1,
    cineall: 4,
    seriesall: 4, // Número total de páginas disponibles para 'seriesall'
    // Añadir más divs aquí según sea necesario
  };


  const state = {
    index: { page: 1, loading: false },
    cine: { page: 1, loading: false },
    cineall: { page: 1, loading: false },
    seriesall: { page: 1, loading: false },
    // Añadir más divs aquí según sea necesario
  };

  const loadingIndicator = $('.loading');

  async function loadMoreContent(divId, urlTemplate) {
    const divState = state[divId];
    const $div = $(`#${divId}`);

    // Verificar si el div existe en la página
    if ($div.length === 0) {
      console.warn(`El div con id "${divId}" no existe en la página.`);
      return;
    }

    if (divState.loading || divState.page > totalPages[divId]) return;
    divState.loading = true;
    loadingIndicator.show();
    console.log(`Loading page ${divState.page} into ${divId}`);

    try {
      const data = await fetchContent(divState.page, urlTemplate);
      console.log('Fetched data:', data);

      if (data.trim() === '') {
        console.log('No more content to load.');
        $(window).off('scroll', onScrolls[divId]);
      } else {
        // Insertar el contenido nuevo con un retraso para que se pueda ver la animación
        // Primero, añade el contenido al div
        $div.append(data);

        // Luego, aplica una clase que habilite la transición
        $div.find('.nuevo-contenido').each(function () {
          // Inicialmente, establece la opacidad en 0 y no aplica la transición

          // Forzar un reflujo para que el navegador registre el estado inicial
          $(this)[0].offsetHeight;

          // Ahora aplica la transición para el cambio de opacidad
          $(this)
            .css({
              opacity: 1,
              transition: 'all 0.2s', // Aplica la transición de opacidad
            })
            .addClass('mostrarArriba'); // Añade la clase que activará la animación
        });

        divState.page++;
        initializeFunctions(); // Inicializar funciones después de añadir nuevo contenido

        console.log(`Page ${divState.page} loaded into ${divId}.`);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      divState.loading = false;
      loadingIndicator.hide();
    }
  }

  // Función para realizar la solicitud AJAX
  function fetchContent(page, urlTemplate) {
    const url = urlTemplate.replace('{page}', page);
    return $.ajax({
      url: url,
      method: 'GET',
    });
  }

  // Debounce para limitar la frecuencia de llamadas a la función de scroll
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  const onScrolls = {
    index: debounce(function () {
      console.log('Scroll event triggered for index.');
      if (
        $(window).scrollTop() + $(window).height() >=
        $(document).height() - 100
      ) {
        loadMoreContent('index', 'pagination/index/page{page}.html');
      }
    }, 100),

    cine: debounce(function () {
      console.log('Scroll event triggered for cine.');
      if (
        $(window).scrollTop() + $(window).height() >=
        $(document).height() - 100
      ) {
        loadMoreContent('cine', 'pagination/cine/page{page}.html');
      }
    }, 100),

    cineall: debounce(function () {
      console.log('Scroll event triggered for cineall.');
      if (
        $(window).scrollTop() + $(window).height() >=
        $(document).height() - 100
      ) {
        loadMoreContent('cineall', 'pagination/cineall/page{page}.html');
      }
    }, 100),

    seriesall: debounce(function () {
      console.log('Scroll event triggered for seriesall.');
      if (
        $(window).scrollTop() + $(window).height() >=
        $(document).height() - 100
      ) {
        loadMoreContent('seriesall', 'pagination/seriesall/page{page}.html');
      }
    }, 100),
    // Añadir más divs aquí según sea necesario
  };

  if ($('#index').length) {
    $(window).scroll(onScrolls['index']);
    loadMoreContent('index', 'pagination/index/page{page}.html');
  }

  if ($('#cine').length) {
    $(window).scroll(onScrolls['cine']);
    loadMoreContent('cine', 'pagination/cine/page{page}.html');
  }

  if ($('#cineall').length) {
    $(window).scroll(onScrolls['cineall']);
    loadMoreContent('cineall', 'pagination/cineall/page{page}.html');
  }

  if ($('#seriesall').length) {
    $(window).scroll(onScrolls['seriesall']);
    loadMoreContent('seriesall', 'pagination/seriesall/page{page}.html');
  }


  // Función para inicializar todas las funciones
  function initializeFunctions() {
    makesClickables();
    setupMenuToggle();
    setupScroll();
    setupMovieInfo();
    setupChapterInfo();
    //seasonMenu();
    chaptername();
  }

  function makesClickables() {
    // Obtén todos los elementos con las clases especificadas
    var channelDivs = $(
      '.movie, .stream-button, .channel-channels, .chapter-container, .more-button, .button-more-3'
    );

    // Define la función que se ejecutará al hacer clic
    function handleClick(event) {
      // Obtén el elemento que fue clickeado
      var clickedDiv = $(event.currentTarget);
      // Obtén la URL desde el atributo 'data-url'
      var url = clickedDiv.attr('data-url');

      // Redirige a la URL si existe
      if (url) {
        window.location.href = url;
      } else {
        console.log('No URL found for this element.');
      }
    }

    // Limpiar los manejadores de eventos anteriores
    channelDivs.off('click', handleClick);

    // Agregar el manejador de eventos 'click' a los elementos seleccionados
    channelDivs.on('click', handleClick);
  }

  //Función menú móviles
  function setupMenuToggle() {
    document.querySelectorAll('.menu-toggle').forEach(toggle => {
      toggle.removeEventListener('click', menuToggleHandler);
      toggle.addEventListener('click', menuToggleHandler);
    });
  }

  function menuToggleHandler(event) {
    event.currentTarget.classList.toggle('active');
    document.querySelector('.top-menu').classList.toggle('show');
  }

  //Hacer slider y hacer tactil los slider de peliculas (para moviles)
  function setupScroll() {
    const infiniteWrappers = document.querySelectorAll('.infinite-scroll');

    infiniteWrappers.forEach(wrapper => {
      const container = wrapper.querySelector('.movie-container');
      const leftButton = wrapper.querySelector('.nav-button.left');
      const rightButton = wrapper.querySelector('.nav-button.right');
      const scrollAmount = 200;

      const movies = Array.from(container.querySelectorAll('.movie'));
      const movieCount = movies.length;
      if (movieCount === 0) return;

      // Clonar elementos y agregar al contenedor
      movies.forEach(movie => {
        container.appendChild(movie.cloneNode(true));
      });
      movies.forEach(movie => {
        container.insertBefore(movie.cloneNode(true), movies[0]);
      });

      container.scrollLeft = 1;

      rightButton.addEventListener('click', () => {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });

      leftButton.addEventListener('click', () => {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });

      container.addEventListener('scroll', () => {
        const scrollLeft = container.scrollLeft;
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;
        const maxScrollLeft = scrollWidth / 3;

        if (scrollLeft <= 1) {
          container.scrollLeft = maxScrollLeft;
        }

        if (scrollLeft >= maxScrollLeft + clientWidth) {
          container.scrollLeft = scrollLeft - maxScrollLeft;
        }
      });

      // Manejo del evento táctil
      let startX;
      let isDragging = false;
      const scrollSpeed = 1.1; // Factor de velocidad del scroll táctil

      container.addEventListener('touchstart', e => {
        const touch = e.touches[0];
        startX = touch.pageX;
        isDragging = true;
      });

      container.addEventListener('touchmove', e => {
        if (!isDragging) return;
        const touch = e.touches[0];
        const dx = (startX - touch.pageX) * scrollSpeed; // Multiplica por el factor de velocidad
        container.scrollLeft += dx;
        startX = touch.pageX;
      });

      container.addEventListener('touchend', () => {
        isDragging = false;
      });
    });

    const simpleWrappers = document.querySelectorAll('.simple-scroll');

    simpleWrappers.forEach(wrapper => {
      const container = wrapper.querySelector('.movie-container');
      const leftButton = wrapper.querySelector('.nav-button.left');
      const rightButton = wrapper.querySelector('.nav-button.right');
      const scrollAmount = 300;

      const movies = Array.from(container.querySelectorAll('.movie'));

      if (movies.length > 0) {
        movies.forEach(movie => (movie.style.marginRight = ''));
      }

      rightButton.addEventListener('click', () => {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });

      leftButton.addEventListener('click', () => {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });

      // Manejo del evento táctil
      let startX;
      let isDragging = false;
      const scrollSpeed = 1.1; // Factor de velocidad del scroll táctil

      container.addEventListener('touchstart', e => {
        const touch = e.touches[0];
        startX = touch.pageX;
        isDragging = true;
      });

      container.addEventListener('touchmove', e => {
        if (!isDragging) return;
        const touch = e.touches[0];
        const dx = (startX - touch.pageX) * scrollSpeed; // Multiplica por el factor de velocidad
        container.scrollLeft += dx;
        startX = touch.pageX;
      });

      container.addEventListener('touchend', () => {
        isDragging = false;
      });
    });

    // Llama a makesClickables después de configurar el scroll
    makesClickables();
  }


  //Informacion de la pelicula (efecto se desplaza a la derecha)

  function setupMovieInfo() {
    // Seleccionamos todos los contenedores de películas
    const containers = document.querySelectorAll('.movie-container');
    let currentMovie = null; // Variable para rastrear la película actual con animación en curso

    // Iteramos sobre cada contenedor de película
    containers.forEach(container => {
      // Dentro de cada contenedor, seleccionamos cada película
      container.querySelectorAll('.movie').forEach(movie => {
        // Obtenemos la información de la película desde los atributos de datos
        const movieInfo = movie.querySelector('.movie-info');
        const title = movie.dataset.title;
        const year = movie.dataset.year;
        const voteAverage = movie.dataset.voteAverage;
        const genre = movie.dataset.genre;
        const synopsis = movie.dataset.synopsis;

        // Verificamos si todos los atributos de datos están vacíos
        // Si es así, ocultamos la información de la película y eliminamos los event listeners
        if (!title && !year && !voteAverage && !genre && !synopsis) {
          movieInfo.style.display = 'none';
          movie.removeEventListener('mouseenter', showMovieInfo);
          movie.removeEventListener('mouseleave', hideMovieInfo);
          return;
        }

        // Establecemos el contenido HTML para la información de la película
        movieInfo.innerHTML = `
        <h2>${title || 'Título no disponible'} (${year || 'Año no disponible'
          })</h2>
        <div class="movie-meta">
          <span class="rating2">${voteAverage || 'N/A'}</span>
          <span class="year">${year || 'Año no disponible'}</span>
          <span class="genre2">${genre || 'Género no disponible'}</span>
        </div>
        <p>${synopsis || 'Sinopsis no disponible'}</p>
      `;

        // Definimos variables para el desplazamiento
        let scrollTimeout;
        let scrollAnimationFrame;
        let isScrolling = false;
        const scrollStep = 0.2; // Cantidad de desplazamiento por frame
        const scrollSpeed = 500; // Tiempo entre frames en ms (menor valor = más rápido)

        // Función para detener el desplazamiento
        function stopScrolling() {
          cancelAnimationFrame(scrollAnimationFrame);
          clearTimeout(scrollTimeout);
          isScrolling = false;
        }

        // Función para iniciar el desplazamiento
        function startScrolling() {
          const scrollHeight = movieInfo.scrollHeight;
          let lastScrollTop = movieInfo.scrollTop;

          function scrollContent() {
            const newScrollTop = lastScrollTop + scrollStep;

            if (newScrollTop < scrollHeight - movieInfo.clientHeight) {
              movieInfo.scrollTop = newScrollTop;
              lastScrollTop = newScrollTop;
              scrollAnimationFrame = requestAnimationFrame(scrollContent);
            } else {
              stopScrolling();
            }
          }

          if (!isScrolling) {
            isScrolling = true;
            scrollAnimationFrame = requestAnimationFrame(scrollContent);
          }
        }

        // Función para mostrar la información de la película
        function showMovieInfo() {
          if (window.innerWidth > 768) {
            // Aseguramos que el ancho de la ventana es mayor a 768px
            // Detenemos la animación de la película actual si hay alguna
            if (currentMovie && currentMovie !== movie) {
              stopScrolling(); // Detenemos el desplazamiento de la película anterior
            }

            movieInfo.style.display = 'block';
            movie.style.marginRight = `${movieInfo.offsetWidth + 20}px`;
            movieInfo.scrollTop = 0; // Reiniciamos el desplazamiento
            stopScrolling(); // Detenemos cualquier desplazamiento en curso
            scrollTimeout = setTimeout(startScrolling, 2500); // Iniciamos el desplazamiento después de un retraso

            currentMovie = movie; // Actualizamos la película actual con animación en curso
          }
        }

        // Función para ocultar la información de la película
        function hideMovieInfo() {
          if (window.innerWidth > 768) {
            // Aseguramos que el ancho de la ventana es mayor a 768px
            movieInfo.style.display = 'none';
            movie.style.marginRight = '10px'; // Restauramos el margen
            stopScrolling(); // Detenemos el desplazamiento

            // Si esta película es la actual con animación, restablecemos la variable
            if (currentMovie === movie) {
              currentMovie = null;
            }
          }
        }

        // Añadimos event listeners para mostrar y ocultar la información de la película
        movie.addEventListener('mouseenter', showMovieInfo);
        movie.addEventListener('mouseleave', hideMovieInfo);
      });
    });
  }

  //Descripción/Información de las series

  function setupChapterInfo() {
    const chapterContainers = document.querySelectorAll('.chapter-container');

    chapterContainers.forEach(container => {
      const chapterInfo = container.querySelector('.chapter-info');
      if (chapterInfo) {
        chapterInfo.innerHTML = `
        <div class="movie-meta">
          <span class="rating2">${container.dataset.voteAverage || 'N/A'}</span>
          <span class="year">${container.dataset.duration}</span>
          <span class="year">·</span>
          <span class="genre2">${container.dataset.year}</span>
        </div>
        <p>${container.dataset.synopsis}</p>
      `;

        let scrollTimeout;
        let isScrolling = false;
        let scrollInterval;

        function startScrolling() {
          const scrollHeight = chapterInfo.scrollHeight;
          const scrollStep = 1;
          const scrollSpeed = 65;

          function scrollContent() {
            if (
              chapterInfo.scrollTop + chapterInfo.clientHeight <
              scrollHeight
            ) {
              chapterInfo.scrollTop += scrollStep;
              scrollInterval = setTimeout(scrollContent, scrollSpeed);
            } else {
              clearTimeout(scrollInterval);
              isScrolling = false;
            }
          }

          if (!isScrolling) {
            isScrolling = true;
            scrollContent();
          }
        }

        function showChapterInfo() {
          if (window.innerWidth > 768) {
            chapterInfo.style.display = 'block';
            container.style.marginRight = `${chapterInfo.offsetWidth + 20}px`;

            chapterInfo.scrollTop = 0;

            scrollTimeout = setTimeout(startScrolling, 2500);
          }
        }

        function hideChapterInfo() {
          if (window.innerWidth > 768) {
            chapterInfo.style.display = 'none';
            container.style.marginRight = '10px';
            clearTimeout(scrollTimeout);
            clearTimeout(scrollInterval);
            isScrolling = false;
          }
        }

        container.addEventListener('mouseenter', showChapterInfo);
        container.addEventListener('mouseleave', hideChapterInfo);
      }
    });
  }

  // Llamar a las funciones de inicialización inicialmente
  initializeFunctions();
});

//Dropdown en movie.html y show.html para moviles
$(document).ready(function () {
  function setupDropdown() {
    var $dropdownButton = $('#dropdownButton');
    var $closeButton = $('#closeButton');
    var $dropdown = $dropdownButton.parent();

    $dropdownButton.on('click', function () {
      $dropdown.addClass('show');
      $dropdownButton.hide(); // Ocultar el botón "Más"
      $closeButton.show(); // Mostrar el botón "Menos"
    });

    $closeButton.on('click', function () {
      $dropdown.removeClass('show');
      $dropdownButton.show(); // Mostrar el botón "Más"
      $closeButton.hide(); // Ocultar el botón "Menos"
    });

    // Cerrar el dropdown si se hace clic fuera de él
    $(window).on('click', function (event) {
      if (!$(event.target).closest('.dropdown').length) {
        $dropdown.removeClass('show');
        $dropdownButton.show(); // Mostrar el botón "Más"
        $closeButton.hide(); // Ocultar el botón "Menos"
      }
    });

    // Manejar clics en los items del dropdown
    $('.season-item').on('click', function (e) {
      e.preventDefault(); // Prevenir el comportamiento por defecto del enlace

      // Eliminar la clase 'active' de todos los elementos del menú
      $('.season-item').removeClass('active');

      // Añadir la clase 'active' al elemento clicado
      $(this).addClass('active');
    });
  }

  setupDropdown();
});


//Scroll de series (capitulos de las temporadas)
$(document).ready(function () {
  // Función para el scroll del wrapper de temporadas
  function setupSeasonScroll() {
    $('.season-scroll').each(function () {
      const $wrapper = $(this);
      const $container = $wrapper.find('.season-container');
      const $leftButton = $wrapper.find('.nav-button.left');
      const $rightButton = $wrapper.find('.nav-button.right');

      let startX;
      let isDragging = false;
      const scrollSpeed = 1.1; // Factor de velocidad del scroll táctil

      // Función para hacer el scroll suave
      function smoothScroll($element, targetScrollLeft) {
        $element.animate({ scrollLeft: targetScrollLeft }, 80);
      }

      // Función para actualizar los botones de navegación
      function updateScrollButtons($wrapper) {
        const $container = $wrapper.find('.season-container');
        const maxScrollLeft =
          $container[0].scrollWidth - $container[0].clientWidth;
        $wrapper.find('.nav-button.left').toggle($container.scrollLeft() > 0);
        $wrapper
          .find('.nav-button.right')
          .toggle($container.scrollLeft() < maxScrollLeft);
      }

      // Función para ajustar el margen derecho
      function addRightMargin($wrapper) {
        // Aquí puedes ajustar el margen derecho según tus necesidades
      }

      $leftButton.off('click').on('click', function () {
        smoothScroll($container, $container.scrollLeft() - 270);
        addRightMargin($wrapper); // Ajustar margen derecho después de hacer scroll
      });

      $rightButton.off('click').on('click', function () {
        smoothScroll($container, $container.scrollLeft() + 270);
        addRightMargin($wrapper); // Ajustar margen derecho después de hacer scroll
      });

      $container.off('scroll').on('scroll', function () {
        updateScrollButtons($wrapper);
      });

      // Manejo del evento táctil
      $container.on('touchstart', function (e) {
        const touch = e.originalEvent.touches[0];
        startX = touch.pageX;
        isDragging = true;
      });

      $container.on('touchmove', function (e) {
        if (!isDragging) return;
        const touch = e.originalEvent.touches[0];
        const dx = (startX - touch.pageX) * scrollSpeed; // Multiplica por el factor de velocidad
        $container.scrollLeft($container.scrollLeft() + dx);
        startX = touch.pageX;
      });

      $container.on('touchend', function () {
        isDragging = false;
      });

      updateScrollButtons($wrapper);
      addRightMargin($wrapper); // Añadir margen derecho al cargar
    });
  }

  // Función para animar el scroll suavemente
  function smoothScroll($container, targetScrollLeft) {
    const startScrollLeft = $container.scrollLeft();
    const distance = targetScrollLeft - startScrollLeft;
    const duration = 300;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easeInOut = t => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t); // Ease-in-out function
      $container.scrollLeft(startScrollLeft + distance * easeInOut(progress));
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        $container.scrollLeft(targetScrollLeft);
      }
    }

    requestAnimationFrame(animation);
  }

  function updateScrollButtons($wrapper) {
    const $container = $wrapper.find('.season-container');
    const $leftButton = $wrapper.find('.nav-button.left');
    const $rightButton = $wrapper.find('.nav-button.right');
    const scrollLeft = $container.scrollLeft();
    const scrollWidth = $container[0].scrollWidth;
    const clientWidth = $container[0].clientWidth;

    $leftButton.prop('disabled', scrollLeft <= 0);
    $rightButton.prop('disabled', scrollLeft >= scrollWidth - clientWidth);
  }

  // Función para ajustar el margen derecho del contenedor
  function addRightMargin($wrapper) {
    // Aquí puedes ajustar el margen derecho según el contenido dinámico
    // Ejemplo: Ajustar según el ancho del contenedor
    const $container = $wrapper.find('.season-container');
    $container.css('margin-right', '20px'); // Ejemplo de margen derecho fijo
  }



  // Función para el menú de temporadas (Select y menu)
  function seasonMenu() {
    $('.season-item').on('click', function () {
      // Actualiza el selector para reflejar la temporada actual
      const index = $('.season-item').index(this);

      // Remover la clase 'initial' de todos los elementos
      $('.season-item').removeClass('initial');

      // Remover la clase 'initial' de todos los elementos
      $('.season-item').removeClass('active');

      // Agregar la clase 'initial' al elemento seleccionado
      $(this).addClass('active');

      $('#season-selector').val(index + 1); // Ajusta el índice porque los valores del selector comienzan en 1
    });
  }

  // Función para cambiar de temporada
  function changeSeason() {
    const $seasonItems = $('.season-item');
    const $seasonScrolls = $('.season-scroll');
    const $seasonSelector = $('#season-selector');

    function updateSeason(index) {
      // Ocultar todas las temporadas
      $seasonScrolls.hide();

      // Mostrar la temporada correspondiente
      $seasonScrolls.eq(index).show();
      setupSeasonScroll(); // Configurar el scroll para la nueva temporada visible

      // Remover la clase 'initial' de todos los elementos
      $('.season-item').removeClass('initial');

      // Remover la clase 'initial' de todos los elementos
      $('.season-item').removeClass('active');

      // Agregar la clase 'initial' al elemento de temporada correspondiente
      $seasonItems.eq(index).addClass('active');
    }

    // Mostrar la primera temporada por defecto
    $seasonScrolls.eq(0).show();
    setupSeasonScroll(); // Configurar el scroll para la temporada visible

    $seasonItems.on('click', function (event) {
      event.preventDefault();
      const index = $seasonItems.index(this);
      updateSeason(index);

      // Actualiza el selector para reflejar la temporada actual
      $seasonSelector.val(index + 1); // Ajusta el índice porque los valores del selector comienzan en 1
    });

    $seasonSelector.on('change', function () {
      const selectedIndex = parseInt($(this).val(), 10) - 1; // Ajusta el índice para que coincida con el de los elementos
      updateSeason(selectedIndex);

      // Actualiza los elementos de temporada para reflejar la selección del selector
      $seasonItems.eq(selectedIndex).focus();

      $('.season-item').removeClass('active');

      $seasonItems.eq(selectedIndex).addClass('active');
    });
  }

  // Inicializar las funciones
  seasonMenu();
  changeSeason();
});



//Slider de  Canales

// Tiempo en milisegundos entre desplazamientos para evitar saltos
const scrollDelay = 350; // Ajusta este valor según sea necesario

let lastScrollTime = 0; // Guarda el último tiempo de desplazamiento

// Función para desplazar los canales hacia la derecha usando jQuery
function nextChannel() {
  const $container = $('#channelsContainer');
  const scrollAmount = 300; // Ajusta este valor según sea necesario

  if ($container.length) {
    const now = Date.now();
    // Verifica si ha pasado suficiente tiempo desde el último desplazamiento
    if (now - lastScrollTime > scrollDelay) {
      lastScrollTime = now;
      // Detiene cualquier animación en curso y reinicia el scroll
      $container.stop(true, true).animate(
        {
          scrollLeft: $container.scrollLeft() + scrollAmount,
        },
        500
      ); // Duración del desplazamiento en milisegundos
    }
  }
}

// Función para desplazar los canales hacia la izquierda usando jQuery
function prevChannel() {
  const $container = $('#channelsContainer');
  const scrollAmount = 300; // Ajusta este valor según sea necesario

  if ($container.length) {
    const now = Date.now();
    // Verifica si ha pasado suficiente tiempo desde el último desplazamiento
    if (now - lastScrollTime > scrollDelay) {
      lastScrollTime = now;
      // Detiene cualquier animación en curso y reinicia el scroll
      $container.stop(true, true).animate(
        {
          scrollLeft: $container.scrollLeft() - scrollAmount,
        },
        500
      ); // Duración del desplazamiento en milisegundos
    }
  }
}

// Inicializar event listeners después de que el documento esté listo
$(document).ready(function () {
  const $nextButton = $('.nav-button-channels.right');
  const $prevButton = $('.nav-button-channels.left');

  // Asegúrate de que los botones existen antes de agregar eventos
  if ($nextButton.length) {
    $nextButton.on('click', nextChannel);
  }

  if ($prevButton.length) {
    $prevButton.on('click', prevChannel);
  }
});


//Tactil de canales

$(document).ready(function () {
  // Función que verifica si el elemento con el ID #channelsContainer está presente
  function checkElement() {
    if ($('#channelsContainer').length) {
      // Selecciona el contenedor de canales
      var $container = $('#channelsContainer');

      // Manejo del evento de toque para dispositivos móviles
      $container.off('touchstart').on('touchstart', function (e) {
        var startX = e.originalEvent.touches[0].pageX;
        var scrollLeft = $container.scrollLeft();

        $container.off('touchmove').on('touchmove', function (e) {
          var currentX = e.originalEvent.touches[0].pageX;
          var deltaX = startX - currentX;
          $container.scrollLeft(scrollLeft + deltaX);
        });

        $container.off('touchend').on('touchend', function () {
          $container.off('touchmove touchend');
        });
      });
    }
  }

  // Ejecutar checkElement cada 500 milisegundos
  var intervalId = setInterval(checkElement, 500);
});



document.addEventListener('DOMContentLoaded', function () {
  const navItems = document.querySelectorAll('.nav-guide-mobile li');
  const sections = document.querySelectorAll('.channel-guide-mobile');
  const channelItems = document.querySelectorAll('.channel-guide-item');
  let selectedChannel = channelItems[0].getAttribute('data-channel');

  const slider = document.querySelector('.slider-track');
  const leftArrow = document.querySelector('.left-arrow');
  const rightArrow = document.querySelector('.right-arrow');
  const visibleItems = 5; // Número de elementos visibles en pantalla
  let currentIndex = 0;
  const scrollAmount = 2;

  function updateSliderPosition() {
    const totalWidth = slider.scrollWidth;
    const itemWidth = slider.clientWidth / visibleItems;
    const maxIndex = Math.max(0, Math.ceil((totalWidth - slider.clientWidth) / itemWidth));

    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }

    slider.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
  }

  leftArrow.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex = Math.max(0, currentIndex - scrollAmount);
      updateSliderPosition();
    }
  });

  rightArrow.addEventListener('click', () => {
    const totalWidth = slider.scrollWidth;
    const itemWidth = slider.clientWidth / visibleItems;
    const maxIndex = Math.max(0, Math.ceil((totalWidth - slider.clientWidth) / itemWidth));

    if (currentIndex < maxIndex) {
      currentIndex = Math.min(maxIndex, currentIndex + scrollAmount);
      updateSliderPosition();
    }
  });

  slider.addEventListener('touchstart', handleTouchStart, false);
  slider.addEventListener('touchmove', handleTouchMove, false);

  let x1 = null;

  function handleTouchStart(evt) {
    x1 = evt.touches[0].clientX;
  }

  function handleTouchMove(evt) {
    if (!x1) {
      return false;
    }

    let x2 = evt.touches[0].clientX;
    let xDiff = x2 - x1;

    if (xDiff > 0) {
      if (currentIndex > 0) {
        currentIndex = Math.max(0, currentIndex - scrollAmount);
        updateSliderPosition();
      }
    } else {
      const totalWidth = slider.scrollWidth;
      const itemWidth = slider.clientWidth / visibleItems;
      const maxIndex = Math.max(0, Math.ceil((totalWidth - slider.clientWidth) / itemWidth));

      if (currentIndex < maxIndex) {
        currentIndex = Math.min(maxIndex, currentIndex + scrollAmount);
        updateSliderPosition();
      }
    }

    x1 = null;
  }

  // Cambiar la programación según el canal seleccionado
  channelItems.forEach(channel => {
    channel.addEventListener('click', () => {
      selectedChannel = channel.getAttribute('data-channel');
      updateVisibleSections();
    });
  });

  // Cambiar la programación según el día seleccionado
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      document.querySelector('.nav-guide-mobile .active2').classList.remove('active2');
      item.classList.add('active2');
      updateVisibleSections();
    });
  });

  function updateVisibleSections() {
    const selectedDay = document.querySelector('.nav-guide-mobile .active2').getAttribute('data-day');
    sections.forEach(section => {
      if (section.getAttribute('data-channel') === selectedChannel && section.getAttribute('data-day') === selectedDay) {
        section.style.display = 'block';
      } else {
        section.style.display = 'none';
      }
    });
  }

  function setupCategoryFilter() {
    const categories = document.querySelectorAll('#gf-filter__list li:not(.menu-bigger)');
    const channels = document.querySelectorAll('.channel-guide, .show3, .channel-guide-item');
    const alwaysVisibleClass = 'always-visible'; // Clase para los canales que siempre deben ser visibles

    // Guardar el estado original de los canales
    const originalStates = Array.from(channels).map(channel => ({
      element: channel,
      display: channel.style.display,
      gridRow: channel.style.gridRow
    }));

    categories.forEach(category => {
      category.addEventListener('click', function () {
        const categoryName = this.textContent.trim();
        let currentRow = 1; // Inicializamos la fila actual en 1 para la categoría "Todos"

        // Eliminar la clase 'active2' de todos los botones
        categories.forEach(cat => cat.classList.remove('active2'));

        // Añadir la clase 'active2' al botón seleccionado
        this.classList.add('active2');

        // Primero, restablecer el gridRow y la visibilidad de todos los canales
        channels.forEach(channel => {
          channel.style.display = 'none'; // Ocultar todos los canales
          channel.style.gridRow = 'auto'; // Restablecer el gridRow a auto
        });

        if (categoryName === "Todos") {
          // Restaurar el estado original de todos los canales
          originalStates.forEach(state => {
            state.element.style.display = state.display;
            state.element.style.gridRow = state.gridRow;
          });
        } else {
          channels.forEach(channel => {
            if (channel.classList.contains(alwaysVisibleClass)) {
              // Mantener siempre visibles los canales con la clase 'always-visible'
              channel.style.display = 'flex';
              channel.style.gridRow = 'auto'; // Aplicar gridRow auto
            } else {
              // Mostrar o ocultar según la categoría seleccionada
              if (channel.classList.contains(categoryName.toLowerCase())) {
                channel.style.display = 'flex';
                channel.style.gridRow = 'auto'; // Aplicar gridRow auto
              } else {
                channel.style.display = 'none'; // Ocultar el canal si no coincide con la categoría
              }
            }
          });
        }

        // Reiniciar la posición del slider a la posición original
        currentIndex = 0;
        updateSliderPosition();
      });


      // Inicializar mostrando la primera sección
      sections.forEach(section => (section.style.display = 'none'));
      sections[0].style.display = 'block';

      // Inicializar la posición del slider
      updateSliderPosition();
    });

    //Slider botonoes si la resolucion es baja
    let isMouseDown = false;
    let startX;
    let scrollLeft;

    const scheduleWrapper = document.querySelector('.schedule-wrapper');

    scheduleWrapper.addEventListener('mousedown', e => {
      isMouseDown = true;
      startX = e.pageX - scheduleWrapper.offsetLeft;
      scrollLeft = scheduleWrapper.scrollLeft;
    });

    scheduleWrapper.addEventListener('mouseleave', () => {
      isMouseDown = false;
    });

    scheduleWrapper.addEventListener('mouseup', () => {
      isMouseDown = false;
    });

    scheduleWrapper.addEventListener('mousemove', e => {
      if (!isMouseDown) return;
      e.preventDefault();
      const x = e.pageX - scheduleWrapper.offsetLeft;
      const walk = (x - startX) * 2; // Ajusta la velocidad del desplazamiento
      scheduleWrapper.scrollLeft = scrollLeft - walk;
    });

    let isTouching = false;
    let touchStartX;
    let touchScrollLeft;

    scheduleWrapper.addEventListener('touchstart', e => {
      isTouching = true;
      touchStartX = e.touches[0].pageX - scheduleWrapper.offsetLeft;
      touchScrollLeft = scheduleWrapper.scrollLeft;
    });

    scheduleWrapper.addEventListener('touchend', () => {
      isTouching = false;
    });

    scheduleWrapper.addEventListener('touchmove', e => {
      if (!isTouching) return;
      e.preventDefault();
      const x = e.touches[0].pageX - scheduleWrapper.offsetLeft;
      const walk = (x - touchStartX) * 2; // Ajusta la velocidad del desplazamiento
      scheduleWrapper.scrollLeft = touchScrollLeft - walk;
    });

  }



  // Inicializamos las funciones
  setupCategoryFilter();
  updateSliderPosition();
  updateVisibleSections();
  ajustarAltura();
  actualizarLineaDeTiempo()
});



//Ajustar altura linea de tiempo actual
function ajustarAltura() {
  var schedule = document.querySelector('.container3');
  var currentTime = document.querySelector('.current-time-line');
  var currentTime2 = document.querySelector('.current-time-estela');
  var scheduleHeight = schedule.offsetHeight;
  currentTime.style.height = scheduleHeight + 'px';
  currentTime2.style.height = scheduleHeight + 'px';
}

// Ajustar línea al tiempo actual
// Ajustar línea al tiempo actual
function actualizarLineaDeTiempo() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var totalMinutes = hours * 60 + minutes;

  // Ancho en píxeles para 15 minutos
  var pixelsPer15Minutes = 80.73;

  // Calculamos el ancho en píxeles por minuto
  var pixelsPerMinute = pixelsPer15Minutes / 15;

  // Calculamos la posición actual en píxeles
  var currentTimePosition = totalMinutes * pixelsPerMinute;

  var currentTime = document.querySelector('.current-time-line');
  var currentTimeEstela = document.querySelector('.current-time-estela');

  var scheduleWrapper = document.querySelector('.schedule-wrapper');

  // Ajustar la posición de la línea de tiempo
  currentTime.style.left = currentTimePosition + 'px';

  currentTimeEstela.style.left = '0px';

  // Ajustar la estela para que se extienda desde el inicio hasta la posición actual
  currentTimeEstela.style.width = currentTimePosition + 'px';

  // Ajustar el desplazamiento del contenedor para centrar la línea de tiempo
  scheduleWrapper.scrollLeft = currentTimePosition - scheduleWrapper.clientWidth / 2;
}


// Ajusta la altura y posiciona la línea de tiempo al cargar la página
window.addEventListener('load', function () {
  ajustarAltura();
  actualizarLineaDeTiempo();
  // Opcional: actualizar la línea de tiempo cada minuto
  setInterval(actualizarLineaDeTiempo, 60000);
  /*
  actualizarLineaDeTiempo();
  desplazarHorario();
  setInterval(actualizarLineaDeTiempo, 60000); // Actualizar cada minuto
  setInterval(desplazarHorario, 60000); // Desplazar cada minuto
  */
});

// Opcional: Ajusta la altura cuando cambie el tamaño de la ventana
window.addEventListener('resize', ajustarAltura);
(function ($) {
  $(document).ready(function () {
    var filters = $('#gf-filter__list li');
    var color = ['#000', '#ff5d', '#fdsr', '#ddd'];
    var colorDivide = Math.round($(filters).length / $(color).length);
    var colorIndex = -1;
    var list = $('#gf-filter__list');
    var innerContainer = $('#gf-filter__list ul');
    var innerWidth = 0;
    var outerContainer = $('#gf-filter__container');
    var outerWidth = 0;
    var arrowRight = $('#arrow-right');
    var arrowLeft = $('#arrow-left');
    var positionIndex = 0;
    var move = 0;
    var extraAmount = 50;
    var timer;
    var animationDuration = 300; // Duración de la animación en milisegundos

    // initialize filters carousel arrows
    showHideArrows();

    // arrow right click
    $(arrowRight).click(function () {
      getWidth();
      // check if container is wider than buttons
      if (positionIndex < innerWidth - outerWidth) {
        move = outerWidth - extraAmount;
        if (
          outerWidth >
          innerWidth - positionIndex - outerWidth + extraAmount
        ) {
          // move to the end of the list
          move = innerWidth - positionIndex - outerWidth;
        }
        positionIndex += move;
        animateList('-=' + move);
      }
    });

    // arrow left click
    $(arrowLeft).click(function () {
      getWidth();
      if (positionIndex > 0) {
        move = outerWidth - extraAmount;
        if (
          outerWidth >
          outerWidth + positionIndex - outerWidth + extraAmount
        ) {
          // move to the beginning of the list
          move = positionIndex;
        }
        positionIndex -= move;
        animateList('+=' + move);
      }
    });

    // hide or show arrows after window resize
    jQuery(window).resize(function () {
      if (timer) {
        window.clearTimeout(timer);
      }
      timer = window.setTimeout(function () {
        showHideArrows();
      }, 100);
    });

    // get width of filter containers
    function getWidth() {
      innerWidth = $(innerContainer).outerWidth();
      outerWidth = $(outerContainer).outerWidth();
    }

    // animate the list and hide/show arrows
    function animateList(direction) {
      hideArrows(); // Oculta los botones antes de comenzar el desplazamiento
      $(list).animate(
        {
          left: direction,
        },
        animationDuration,
        function () {
          showArrows(); // Muestra los botones después de que el desplazamiento haya terminado
        }
      );
      showHideArrows();
    }

    // hide or show left and right carousel arrows
    function showHideArrows() {
      getWidth();
      if (positionIndex == 0) {
        $(arrowLeft).fadeOut('fast');
      } else {
        $(arrowLeft).fadeIn('slow');
      }
      if (positionIndex < innerWidth - outerWidth) {
        $(arrowRight).fadeIn('slow');
      } else {
        $(arrowRight).fadeOut('fast');
      }
    }

    // Oculta los botones de navegación
    function hideArrows() {
      $(arrowLeft).fadeOut('fast');
      $(arrowRight).fadeOut('fast');
    }

    // Muestra los botones de navegación
    function showArrows() {
      showHideArrows(); // Asegúrate de llamar a showHideArrows para actualizar el estado de los botones
    }
  });
})(jQuery);
