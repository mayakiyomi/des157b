(function () {
  'use strict';

  let canvas;
  let currentColor = '#ffffff';
  let brushSize = 5;

  const prompts = [
    'What will cities look like in the future?',
    'What kind of homes will people live in?',
    'How will people travel in your future?',
    'What will people wear in 50 years?',
    'What does a peaceful future look like?',
    'What kind of technology will shape tomorrow?',
    'What does your ideal world feel like?',
    'What kind of job will you dream of having?',
    'How will people connect with each other?',
    'What will art look like in the future?'
  ];

  $(function () {
    $('#begin-btn').on('click', function () {
      $('#intro-overlay').fadeOut(500);
    });

    $('#prompt-btn').on('click', function () {
      const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
      $('#prompt-text').text(randomPrompt);
    });

    $('#draw-more-btn').on('click', function () {
      $('#save-overlay').addClass('hidden');
      background('white')
      $('#save').prop('disabled', false).text('SAVE DRAWING');
    });

    $('#go-gallery-btn').on('click', function () {
      window.location.href = 'gallery.html';
    });
  });

  window.setup = function () {
    Parse.initialize('Fk2IM8CiaJ1aTlS9AhnhMvB1GLcnvaVw0PARLBci', 'x7FUHqKcGi13hGSz21MJ2kc0Etfgv3fRfDI7Jq8H');
    Parse.serverURL = 'https://parseapi.back4app.com/';

    canvas = createCanvas(800, 500);
    canvas.parent('canvas-container');

    background('white');
    strokeWeight(brushSize);
    stroke(currentColor);

    $('#clear').on('click', function () {
      background('white');
    });

    $('.swatch').not('.custom-swatch').on('click', function () {
      currentColor = $(this).data('color');
      $('#picker').val(currentColor);
      $('.swatch').not('.custom-swatch').removeClass('active');
      $(this).addClass('active');
    });

    $('#picker').on('input', function () {
      currentColor = $(this).val();
      $('.swatch').removeClass('active');
    });

    $('.brush-btn').on('click', function () {
      brushSize = Number($(this).data('size'));
      $('.brush-btn').removeClass('active');
      $(this).addClass('active');
      strokeWeight(brushSize);
    });

    $('#save').on('click', async function () {
      const saveBtn = $(this);

      if (saveBtn.prop('disabled')) return;

      saveBtn.prop('disabled', true).text('Saving...');

      const dataUrl = canvas.elt.toDataURL('image/png');
      const base64Data = dataUrl.split(',')[1];

      const name = $('#name').val().trim();
      const title = $('#title').val().trim();
      const ageGroup = $('input[name="artistAge"]:checked').val();

      if (!base64Data) {
        alert('Could not prepare image data.');
        saveBtn.prop('disabled', false).text('SAVE DRAWING');
        return;
      }

      try {
        const result = await Parse.Cloud.run('saveDrawingBlob', {
          imageBase64: base64Data,
          name: name || 'Anonymous',
          title: title || 'Untitled',
          ageGroup: ageGroup || '17 and below'
        });

        console.log('Uploaded:', result);
        $('#save-overlay').removeClass('hidden');
      } catch (err) {
        console.error('Save failed:', err);
        alert('Upload failed: ' + err.message);
        saveBtn.prop('disabled', false).text('SAVE DRAWING');
      }
    });
  };

  window.mouseDragged = function () {
    stroke(currentColor);
    strokeWeight(brushSize);
    line(pmouseX, pmouseY, mouseX, mouseY);
  };
})();