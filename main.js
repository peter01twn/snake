const moveArea = document.querySelector('#move-area');
const startBtn = document.querySelector('#start');
const stopBtn = document.querySelector('#stop');
const scoreE = document.querySelector('#score');
scoreE.innerHTML = '0';

let score = 0,
    snake = [
        [5, 5],
        [5, 6],
        [5, 7],
        [5, 8],
        [5, 9]
    ],
    food = [],
    tableSize = 30,
    come = 'right',
    directive = 'right',
    arrowKey = {
        38: 'up',
        39: 'right',
        40: 'down',
        37: 'left'
    },
    loop;

startBtn.addEventListener('click', function () {
    loop = setInterval(function () {
        moveSnake();
    }, '300')
    startBtn.className = 'btn disabled';
})
stopBtn.addEventListener('click', function () {
    clearInterval(loop);
})

document.onkeydown = e => {
    switch (e.keyCode) {
        case 37:
            if (come != 'right') {
                directive = 'left';
            }
            break;
        case 38:
            if (come != 'down') {
                directive = 'up';
            }
            break;
        case 39:
            if (come != 'left') {
                directive = 'right';
            }
            break;
        case 40:
            if (come != 'up') {
                directive = 'down';
            }
            break;
    }
}
const tableBuild = () => {
    let col = '';
    for (let x = 0; x < tableSize; x++) {
        col += `<td></td>`;
    }
    for (let x = 0; x < tableSize; x++) {
        moveArea.innerHTML += `<tr>${col}</tr>`;
    }
}
const moveSnake = () => {
    let cell = (row, col) => moveArea.rows[row].cells[col];
    let head = snake[snake.length - 1],
        nextHead = [];

    switch (directive) {
        case 'up':
            nextHead = [head[0] - 1, head[1]];
            break;
        case 'right':
            nextHead = [head[0], head[1] + 1];
            break;
        case 'down':
            nextHead = [head[0] + 1, head[1]];
            break;
        case 'left':
            nextHead = [head[0], head[1] - 1];
            break;
    }

    // 判斷是否撞牆或咬到身體
    if (nextHead[0] < 0 || nextHead[0] > 29 || nextHead[1] < 0 || nextHead[1] > 29) {
        alert('you are die');
        clearInterval(loop);
        return
    } else {
        snake.forEach((item) => {
            if (item.toString() == nextHead.toString()) {
                alert('you are die');
                clearInterval(loop);
                return
            }
        })
    }

    // 擦除尾巴
    // 判斷是否吃到食物
    if (nextHead.toString() != food.toString()) {
        cell(...snake[0]).className = '';
        snake.splice(0, 1);
    } else {
        score += 1;
        scoreE.innerHTML = score;
        addFood();
        if (score == 5) {
            clearInterval(loop);
            loop = setInterval(function () {
                moveSnake();
            }, '200')
        } else if (score == 15) {
            start = () => {
                clearInterval(loop);
                loop = setInterval(function () {
                    moveSnake();
                }, '100')
            }
        }
    }
    snake.push(nextHead);
    come = directive;

    // 繪製 snake
    snake.forEach((item, index, arry) => {
        let el = cell(...item);
        if (index == arry.length - 1) {
            switch (directive) {
                case 'up':
                    el.className = 'bg-snake u-head';
                    break;
                case 'right':
                    el.className = 'bg-snake r-head';
                    break;
                case 'down':
                    el.className = 'bg-snake d-head';
                    break;
                case 'left':
                    el.className = 'bg-snake l-head';
                    break;
            }
        } else {
            el.className = 'bg-snake';
        }

    })


}
const addFood = () => {
    let num = () => Math.floor(Math.random() * tableSize),
        repeat = true;
    while (repeat) {
        let ary = [num(), num()];
        let x = snake.find((item) => {
            return item.toString() == ary.toString()
        })
        if (!x) {
            food = ary;
            repeat = false;
        }
    }
    moveArea.rows[food[0]].cells[food[1]].className = 'bg-food';
}

tableBuild();
moveSnake();
addFood();