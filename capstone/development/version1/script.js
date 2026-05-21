(function () {
    'use strict';
  
    let canvas;
  
    window.setup = function () {
      Parse.initialize('Fk2IM8CiaJ1aTlS9AhnhMvB1GLcnvaVw0PARLBci', 'x7FUHqKcGi13hGSz21MJ2kc0Etfgv3fRfDI7Jq8H');
      Parse.serverURL = 'https://parseapi.back4app.com/';
  
      canvas = createCanvas(800, 500);
      canvas.parent('canvas-container');
  
      background('black');
      strokeWeight(5);
  
      $('#clear').on('click', function () {
        background('black');
      });
  
     /* convert canvas to base64, then call cloud code */
      $('#save').on('click', async function () {
        const dataUrl = canvas.elt.toDataURL('image/png');
        const base64Data = dataUrl.split(',')[1];
  
        if (!base64Data) {
          alert('Could not prepare image data.');
          return;
        }
  
        try {
          const result = await Parse.Cloud.run('saveDrawingBlob', {
            imageBase64: base64Data,
            title: 'Student drawing',
            name: 'Anonymous'
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
      const pickedColor = $('#picker').val();
      stroke(pickedColor);
      line(pmouseX, pmouseY, mouseX, mouseY);
    };
  })();