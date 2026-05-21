(function() {
  'use strict';

  const toggle = document.querySelector('#modeToggle');
  const body = document.querySelector('body');
  const sections = document.querySelectorAll('section');

  toggle.addEventListener('change', function() {

      if (toggle.checked) {
          body.classList.add('switch');

          for (const section of sections) {
              section.classList.add('switch');
          }

      } else {
          body.classList.remove('switch');

          for (const section of sections) {
              section.classList.remove('switch');
          }
      }
  });

})();