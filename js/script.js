const field = document.createElement('div');

document.body.appendChild(field);

field.classList.add('field');

for (let i = 1; i < 65; i++) {
    let excel = document.createElement('div');

    field.appendChild(excel);
    excel.classList.add('excel');
}

let excel = document.querySelectorAll('.excel');
let x = 1,
    y = 8;

for (let i = 0; i < excel.length; i++) {
    excel[i].setAttribute('posX', x);
    excel[i].setAttribute('posY', y);

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

let a = Math.round(Math.random()*63);

excel[a].classList.add('current');

let step = 1;

excel[a].innerHTML = step;

let currentX = +excel[a].getAttribute('posX'),
    currentY = +excel[a].getAttribute('posY');

function nextStep () {
    let vars = [
        document.querySelector(`[posX="${currentX + 1}"][posY="${currentY + 2}"]`),
        document.querySelector(`[posX="${currentX + 1}"][posY="${currentY - 2}"]`),
        document.querySelector(`[posX="${currentX - 1}"][posY="${currentY + 2}"]`),
        document.querySelector(`[posX="${currentX - 1}"][posY="${currentY - 2}"]`),
        document.querySelector(`[posX="${currentX + 2}"][posY="${currentY + 1}"]`),
        document.querySelector(`[posX="${currentX + 2}"][posY="${currentY - 1}"]`),
        document.querySelector(`[posX="${currentX - 2}"][posY="${currentY + 1}"]`),
        document.querySelector(`[posX="${currentX - 2}"][posY="${currentY - 1}"]`)
    ];

    vars = vars.filter(item => {
        return (item !== null && item.className !== 'excel set');
    });

    let NextStepsNumber = [];

    console.log(vars);

    for (let i = 0; i < vars.length; i++) {
        let nextX = +vars[i].getAttribute('posX'),
            nextY = +vars[i].getAttribute('posY');

        let nextVars = [
            document.querySelector(`[posX="${nextX + 1}"][posY="${nextY + 2}"]`),
            document.querySelector(`[posX="${nextX + 1}"][posY="${nextY - 2}"]`),
            document.querySelector(`[posX="${nextX - 1}"][posY="${nextY + 2}"]`),
            document.querySelector(`[posX="${nextX - 1}"][posY="${nextY - 2}"]`),
            document.querySelector(`[posX="${nextX + 2}"][posY="${nextY + 1}"]`),
            document.querySelector(`[posX="${nextX + 2}"][posY="${nextY - 1}"]`),
            document.querySelector(`[posX="${nextX - 2}"][posY="${nextY + 1}"]`),
            document.querySelector(`[posX="${nextX - 2}"][posY="${nextY - 1}"]`)
        ];

        nextVars = nextVars.filter(item => {
            return (item !== null && item.className !== 'excel set');
        });

        NextStepsNumber.push(+nextVars.length);
    }

    console.log(NextStepsNumber);


}

nextStep();
