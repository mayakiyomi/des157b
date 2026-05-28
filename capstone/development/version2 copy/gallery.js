(function () {
  'use strict';

  Parse.initialize('Fk2IM8CiaJ1aTlS9AhnhMvB1GLcnvaVw0PARLBci', 'x7FUHqKcGi13hGSz21MJ2kc0Etfgv3fRfDI7Jq8H');
  Parse.serverURL = 'https://parseapi.back4app.com/';

  const gallery = document.getElementById('gallery');
  const overlay = document.getElementById('overlay');
  const overlayImage = document.getElementById('overlay-image');
  const overlayTitle = document.getElementById('overlay-title');
  const overlayName = document.getElementById('overlay-name');
  const overlayAge = document.getElementById('overlay-age');
  const overlayClose = document.getElementById('overlay-close');
  const overlayPrev = document.getElementById('overlay-prev');
  const overlayNext = document.getElementById('overlay-next');
  const backBtn = document.getElementById('back-btn');

  let drawings = [];
  let currentIndex = 0;

  backBtn.addEventListener('click', function () {
    window.location.href = 'index.html';
  });

  function renderOverlay(index) {
    if (!drawings.length) return;

    currentIndex = (index + drawings.length) % drawings.length;
    const data = drawings[currentIndex];

    overlayImage.src = data.imageUrl;
    overlayImage.alt = data.title || 'Drawing';
    overlayTitle.textContent = data.title || 'Untitled';
    overlayName.textContent = 'Artist: ' + (data.name || 'Anonymous');
    overlayAge.textContent = 'Age: ' + (data.ageGroup || '');
    overlay.classList.remove('hidden');
  }

  function closeOverlay() {
    overlay.classList.add('hidden');
    overlayImage.src = '';
  }

  async function loadGallery() {
    gallery.innerHTML = '<p>Loading gallery...</p>';

    try {
      const query = new Parse.Query('Drawing');
      query.descending('createdAt');

      const results = await query.find();

      drawings = results.map(function (item) {
        const file = item.get('image');
        return {
          imageUrl: file ? file.url() : '',
          title: item.get('title') || 'Untitled',
          name: item.get('name') || 'Anonymous',
          ageGroup: item.get('ageGroup') || ''
        };
      });

      gallery.innerHTML = '';

      if (drawings.length === 0) {
        gallery.innerHTML = '<p>No drawings yet.</p>';
        return;
      }

      drawings.forEach(function (data, index) {
        const card = document.createElement('article');
        card.className = 'gallery-card';

        card.innerHTML = '<img src="' + data.imageUrl + '" alt="' + data.title + '">';

        card.addEventListener('click', function () {
          renderOverlay(index);
        });

        gallery.appendChild(card);
      });
    } catch (err) {
      console.error('Gallery load failed:', err);
      gallery.innerHTML = '<p>Could not load gallery.</p>';
    }
  }

  overlayClose.addEventListener('click', closeOverlay);

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeOverlay();
  });

  overlayPrev.addEventListener('click', function () {
    renderOverlay(currentIndex - 1);
  });

  overlayNext.addEventListener('click', function () {
    renderOverlay(currentIndex + 1);
  });

  window.addEventListener('DOMContentLoaded', loadGallery);
})();