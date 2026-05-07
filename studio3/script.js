(function(){
    'use strict';

    let canvas;
/* ok so p5 is just processing? creating canvas like the setup function */
    window.setup = function() {

        canvas = createCanvas(800, 500);
        canvas.parent('canvas-container');

        background('white');
        strokeWeight(5);
        /* button interaction using jquery event handler */
        $('#clear').on('click', function(){
            background('white');
        });
    };

    window.mouseDragged = function() {
        /* get color by using jquery to quickly access input value */
        const pickedColor = $('#picker').val();

        stroke(pickedColor);
        line(pmouseX, pmouseY, mouseX, mouseY);
    };

})();