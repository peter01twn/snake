const moveArea = document.querySelector('#move-area');
let head = [10, 10],
    tail = [10, 8],
    come = 'right',
    directive = 'right',
    arrowKey = {
        up: 38,
        right: 39,
        down: 40,
        left: 37
    };
document.onkeydown = e => {
    let key = '';
    switch (e.keyCode) {
        case 37:
            key = 'right';
            break;
        case 38:
            key = 'down';
            break;
        case 39:
            key = 'left';
            break;
        case 40:
            key = 'up';
            break;
    }
    if (key != come) {
        switch (e.keyCode) {
            case 37:
                directive = 'left';
                break;
            case 38:
                directive = 'up';
                break;
            case 39:
                directive = 'right';
                break;
            case 40:
                directive = 'down';
                break;
        }
    }
}
const moveSnake = to => {
    let tailTo = moveArea.rows[tail[0]].cells[tail[1]].dataset.to;
    let nextHead = head;
    let headCell = moveArea.rows[head[0]].cells[head[1]];
    switch (to) {
        case 'right':
            nextHead[1] += 1;
            break;
        case 'down':
            nextHead[0] += 1;
            break;
        case 'left':
            nextHead[1] -= 1;
            break;
        case 'up':
            nextHead[0] -= 1;
            break;
    }
    let nextCell = moveArea.rows[nextHead[0]].cells[nextHead[1]];
    console.log(headCell);
    console.log(nextCell);
    nextHead.forEach((val) => {
        console.log(val);
        console.log(val > 29);
        if (val > 29 || val < 0) {
            clearInterval(loop);
            alert('you are die');
            return;
        }
        if (/bg-snake/.test(nextCell.className)) {
            clearInterval(loop);
            alert('you are die');
            return;
        }
    })
    if (nextCell.className !== 'bg-food') {
        moveArea.rows[tail[0]].cells[tail[1]].dataset.to = '';
        moveArea.rows[tail[0]].cells[tail[1]].className = '';
        switch (tailTo) {
            case 'right':
                tail[1] += 1;
                break;
            case 'down':
                tail[0] += 1;
                break;
            case 'left':
                tail[1] -= 1;
                break;
            case 'up':
                tail[0] -= 1;
                break;
        }
    }
    headCell.id = '';
    headCell.dataset.to = to;
    nextCell.id = 's-head';
    nextCell.className = 'bg-snake';
    head = nextHead;
    come = directive;
}

for (let x = 8; x < 11; x++) {
    moveArea.rows[10].cells[x].className = 'bg-snake';
    moveArea.rows[10].cells[x].dataset.to = 'right';
    if (x == 10) {
        moveArea.rows[10].cells[x].id = 's-head';
    }
}

let loop = setInterval(() => {
    moveSnake(directive);
}, 300)