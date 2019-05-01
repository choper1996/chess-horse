const field = document.createElement('div'),
    startButton = document.createElement('button');

document.body.appendChild(field);
document.body.appendChild(startButton);

field.setAttribute('id','field');
startButton.setAttribute('id','start-button');
startButton.innerText = 'start';


for (let i = 1; i < 65; i++) {
    let excel = document.createElement('div');

    field.appendChild(excel);
    excel.classList.add('excel');
}

let excel = document.querySelectorAll('.excel');

let x = 1,
    y = 8;

let currentX,
    currentY;

let step = 1;

for (let i = 0; i < excel.length; i++) {
    excel[i].setAttribute('posX', x);
    excel[i].setAttribute('posY', y);

    excel[i].addEventListener('click', (e) => {

        if (currentX !== undefined ) {
            let clearExcel = document.querySelector(`[posX="${currentX}"][posY="${currentY}"]`);

            clearExcel.classList.remove('current','set');
            clearExcel.innerText = '';
        }

        let chosenExcel = e.target;

        chosenExcel.classList.add('current','set');
        chosenExcel.innerText = step;

        currentX = +chosenExcel.getAttribute('posX');
        currentY = +chosenExcel.getAttribute('posY');
    });

    x++;

    if  ((i % 2 === 0 && y % 2 === 0) || (i % 2 !== 0 && y % 2 !== 0)) {
        excel[i].style.backgroundColor = 'rgb(255,248,220)';
    } else {
        excel[i].style.backgroundColor = 'brown';
    }

    if (x > 8) {
        x = 1;
        y--;
    }
}

function nextStep () {
    let vars = [
        document.querySelector(`[posX="${+currentX + 1}"][posY="${+currentY + 2}"]`),
        document.querySelector(`[posX="${+currentX + 1}"][posY="${+currentY - 2}"]`),
        document.querySelector(`[posX="${+currentX - 1}"][posY="${+currentY + 2}"]`),
        document.querySelector(`[posX="${+currentX - 1}"][posY="${+currentY - 2}"]`),
        document.querySelector(`[posX="${+currentX + 2}"][posY="${+currentY + 1}"]`),
        document.querySelector(`[posX="${+currentX + 2}"][posY="${+currentY - 1}"]`),
        document.querySelector(`[posX="${+currentX - 2}"][posY="${+currentY + 1}"]`),
        document.querySelector(`[posX="${+currentX - 2}"][posY="${+currentY - 1}"]`)
    ];

    vars = vars.filter(item => {
        return (item !== null && !item.classList.contains('set'));
    });

    function whatToDoNext() {
        return (
            vars.map(item => {
                let nextX = item.getAttribute('posX'),
                    nextY = item.getAttribute('posY');

                let nextVars = [
                    document.querySelector(`[posX="${+nextX + 1}"][posY="${+nextY + 2}"]`),
                    document.querySelector(`[posX="${+nextX + 1}"][posY="${+nextY - 2}"]`),
                    document.querySelector(`[posX="${+nextX - 1}"][posY="${+nextY + 2}"]`),
                    document.querySelector(`[posX="${+nextX - 1}"][posY="${+nextY - 2}"]`),
                    document.querySelector(`[posX="${+nextX + 2}"][posY="${+nextY + 1}"]`),
                    document.querySelector(`[posX="${+nextX + 2}"][posY="${+nextY - 1}"]`),
                    document.querySelector(`[posX="${+nextX - 2}"][posY="${+nextY + 1}"]`),
                    document.querySelector(`[posX="${+nextX - 2}"][posY="${+nextY - 1}"]`)
                ];

                let filteredNextVars = nextVars.filter(item => {
                    return (item !== null && !item.classList.contains('set'));
                });

                return filteredNextVars.length;
            })
        )
    }

    let nextStepsNumbers = whatToDoNext(),
        maxSteps = 8,
        stepIndex;

    for (let i = nextStepsNumbers.length - 1; i > -1; i--) {
        if (nextStepsNumbers[i] < maxSteps) {
            maxSteps = nextStepsNumbers[i];
            stepIndex = i;
        }
    }

    step++;

    document.querySelector('.current').classList.remove('current');

    vars[stepIndex].classList.add('current');
    vars[stepIndex].classList.add('set');
    vars[stepIndex].innerHTML = step;

    currentX = vars[stepIndex].getAttribute('posX');
    currentY = vars[stepIndex].getAttribute('posY');

    if (step === 64) {
        clearInterval(interval);
    }
}

let interval;

startButton.addEventListener('click', (e)=> {
    if (currentX === undefined) {
        alert('Please choose excel')

    } else if (startButton.innerText === 'start') {
        interval = setInterval(()=> {
            nextStep();
        }, 200);

        startButton.innerText = 'stop'

    } else if (startButton.innerText === 'stop') {
        for (let i = 0; i < excel.length; i++) {
            clearInterval(interval);
            startButton.innerText = 'start';
        }
    }

});



