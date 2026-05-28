(function () {
    'use strict';
  
    Parse.initialize('Fk2IM8CiaJ1aTlS9AhnhMvB1GLcnvaVw0PARLBci', 'x7FUHqKcGi13hGSz21MJ2kc0Etfgv3fRfDI7Jq8H');
    Parse.serverURL = 'https://parseapi.back4app.com/';
  
    const gallery = document.getElementById('gallery');
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalName = document.getElementById('modal-name');
    const modalAge = document.getElementById('modal-age');
    const modalClose = document.getElementById('modal-close');
    const modalPrev = document.getElementById('modal-prev');
    const modalNext = document.getElementById('modal-next');
  
    let drawings = [];
    let currentIndex = 0;
  
    function renderModal(index) {
      if (!drawings.length) return;
  
      currentIndex = (index + drawings.length) % drawings.length;
      const data = drawings[currentIndex];
  
      modalImage.src = data.imageUrl;
      modalImage.alt = data.title || 'Drawing';
      modalTitle.textContent = data.title || 'Untitled';
      modalName.textContent = `Artist: ${data.name || 'Anonymous'}`;
      modalAge.textContent = `Age: ${data.ageGroup || ''}`;
      modal.classList.remove('hidden');
    }
  
    function closeModal() {
      modal.classList.add('hidden');
      modalImage.src = '';
    }
  
    async function loadGallery() {
      gallery.innerHTML = '<p>Loading gallery...</p>';
  
      try {
        const query = new Parse.Query('Drawing');
        query.descending('createdAt');
  
        const results = await query.find();
  
        drawings = results.map((item) => {
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
  
        drawings.forEach((data, index) => {
          const card = document.createElement('article');
          card.className = 'gallery-card';
  
          card.innerHTML = `
            <img src="${data.imageUrl}" alt="${data.title}">
          `;
  
          card.addEventListener('click', () => renderModal(index));
          gallery.appendChild(card);
        });
      } catch (err) {
        console.error('Gallery load failed:', err);
        gallery.innerHTML = '<p>Could not load gallery.</p>';
      }
    }
  
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  
    modalPrev.addEventListener('click', () => renderModal(currentIndex - 1));
    modalNext.addEventListener('click', () => renderModal(currentIndex + 1));
  
    window.addEventListener('DOMContentLoaded', loadGallery);
  })();