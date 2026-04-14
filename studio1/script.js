(function(){
    'use strict';
    console.log('reading js');

    const expand = document.querySelector('.fa-expand');
    const loader = document.querySelector('.fa-water');
    const body = document.querySelector('body');
    const lines = document.querySelectorAll('#mySection p');
    myVideo.addEventListener('playing', function() {
        loader.style.display = 'none';
        body.style.backgroundColor = 'white';
      })

    expand.addEventListener('click', function(){
        if (!document.fullscreenElement){
            document.documentElement.requestFullscreen();
        }else{
            document.exitFullscreen();
        }
    });

    lines.forEach(line => {
        line.addEventListener('mouseover', () => {
            body.style.backgroundColor = 'blue';
            document.querySelectorAll('#mySection p').forEach(p => {
                p.style.color = 'white';
            });
        });
    
        line.addEventListener('mouseout', () => {
            body.style.backgroundColor = 'white';
            document.querySelectorAll('#mySection p').forEach(p => {
                p.style.color = 'blue';
            });
        });
    });
  
})();