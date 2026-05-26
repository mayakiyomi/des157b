(function () {
  'use strict';

  let canvas;
  let currentColor = '#ffffff';
  let brushSize = 5;

  $(function () {
    $('#begin-btn').on('click', function () {
      $('#intro-overlay').fadeOut(500);
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
      const dataUrl = canvas.elt.toDataURL('image/png');
      const base64Data = dataUrl.split(',')[1];

      const name = $('#name').val().trim();
      const title = $('#title').val().trim();
      const ageGroup = $('input[name="artistAge"]:checked').val();

      if (!base64Data) {
        alert('Could not prepare image data.');
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
        alert('Drawing saved to Back4App!');
      } catch (err) {
        console.error('Save failed:', err);
        alert('Upload failed: ' + err.message);
      }
    });
  };

  window.mouseDragged = function () {
    stroke(currentColor);
    strokeWeight(brushSize);
    line(pmouseX, pmouseY, mouseX, mouseY);
  };
})();