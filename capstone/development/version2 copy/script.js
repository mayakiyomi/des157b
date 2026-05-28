(function () {
  'use strict';

  let canvas;
  let currentColor = '#ffffff';
  let brushSize = 5;

  const prompts = [
    'Draw yourself in 30 years.',
    'What will cities look like in 50 years?',
    'What will schools look like in 50 years?',
    'What will people wear in 50 years?',
    'Draw a scientific innovation from 50 years in the future',
    'Draw a college student in 2060.',
    'Draw the Earth in 2100.',
    'What will greenspace look like in 50 years?',
    'Draw a sustainable home 40 years from now.',
    'Draw a garden in 2050.',
    'What will agriculture look like in 50 years?',
    'What will transportation look like in 50 years?',
    'What will AI look like in 50 years?',
    'Will we be on Earth in 2100? Or a different planet?'
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

    $('.brush-btn').removeClass('active');
    $('.brush-btn[data-size="5"]').addClass('active');

    $('.swatch').not('.custom-swatch').removeClass('active');
    $('.swatch[data-color="#000000"]').addClass('active');
    $('#picker').val('#000000');
    currentColor = '#000000';
    brushSize = 5;
    stroke(currentColor);
    strokeWeight(brushSize);

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