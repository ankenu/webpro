let isGameStart = false
let gameTime = getGameTime()
const game = document.getElementById('game')
const btn = document.getElementById('start')
const square = document.getElementById('square')
let userScore = 0

function getGameTime() {
    return +document.getElementById('game-time').value
}

function setTime(value) {
    document.getElementById('time').innerHTML = value
}

function start() {
    if (gameTime) {
        userScore = 0
        btn.style.display = 'none'
        game.style.background = 'white'
        isGameStart = true
        let seconds = gameTime
        const interval = setInterval(() => {
            seconds -= 0.1
            setTime(seconds.toFixed(1))
            if (seconds < 0.1) {
                clearInterval(interval)
                end()    
            }
        }, 100)
        square.style.display = 'block'
        generateSquare()
    }
}

function end() {
    isGameStart = false
    setTime(gameTime)
    square.style.display = 'none'
    game.style.background = '#ccc'
    btn.style.display = 'block'

    const timeHeader = document.getElementById('time-header')
    const resultHeader = document.getElementById('result-header')
    document.getElementById('result').innerHTML = userScore

    resultHeader.classList.remove('hide')
    timeHeader.classList.add('hide')

    const handler = () => {
        resultHeader.classList.add('hide')
        timeHeader.classList.remove('hide')
        document.removeEventListener('click', handler)
    }

    document.addEventListener('click', handler)
}

function generateSquare(min = 30, max = 100, gameSize = 300) {
    const size = Math.floor(Math.random() * (max - min) + min)
    const generatePosition = () => Math.max(Math.floor(Math.random() * gameSize) - size, 0) + 'px'
    square.style.width = square.style.height = size + 'px'
    square.style.backgroundColor = '#' + Math.random().toString(16).slice(-6)
    square.style.top = generatePosition()
    square.style.right = generatePosition()
}

document.getElementById('game-time').addEventListener('change', () => {
    gameTime = getGameTime()
    if (!isGameStart && gameTime) setTime(gameTime)
})

square.addEventListener('click', () => {
    if (isGameStart) {
        userScore++
        generateSquare()
    }
})