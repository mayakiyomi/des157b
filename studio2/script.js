(function(){
    'use strict';
    console.log('reading js');

    //todo: 
  /*   fetch data and store 
    parse through and create bars 
    create hover data 
    color switch on hover???- add event listener for each bar 
     */

    async function getData(){
        const sleep = await fetch('data/sleep.json');
        const sleepData = await sleep.json();
        console.log(sleepData);
        drawBars(sleepData);
    }

    function drawBars(data){
        const chart = document.querySelector('#chart');
        const statDate = document.querySelector('#stat-date');
        const statTime = document.querySelector('#stat-time');
        const statHours = document.querySelector('#stat-hours');
        const statReason = document.querySelector('#stat-reason');
        
        let maxHours = 0;
        /* find max amount of sleep  */
        Object.values(data).forEach(function(point){
            if (point.hours > maxHours) {
                maxHours = point.hours;
            }
        });
    
        /* scale */
        const scale = 520; 
    
        /* create bars: create row, add label, set width of bar */
        Object.values(data).forEach(function(point){
            /* new row for bar */
            const row = document.createElement('div');
            row.classList.add('row');
            /* label*/
            const label = document.createElement('div');
            label.classList.add('label');
            label.textContent = point.label;
            /* new bar */
            const bar = document.createElement('div');
            bar.classList.add('bar');
            /* divide hours by max hours to create a decimal to multiply by scale (max width) */
            const width = (point.hours / maxHours) * scale;
            bar.style.width = `${width}px`;
    
            row.appendChild(label);
            row.appendChild(bar);
            chart.appendChild(row);

            /* add stats to div when hovered */
            bar.addEventListener('mouseover', function(){
                statDate.textContent = point.date;
                statTime.textContent = `${point.sleepTime} - ${point.wakeTime}`;
                statHours.textContent = `${point.hours} hours`;
                statReason.textContent = point.reason;
            });
            /* clear stats panel when unhovered */
            bar.addEventListener('mouseout', function() {
                statDate.textContent = "";
                statTime.textContent = "";
                statHours.textContent = "";
                statReason.textContent = "";
            });
        });
    }
    getData();
})();