import { calculateNeighbours } from "./calculateNeighbours.js"
import Tile from "./Tile.js"

const BOARD_DIMENSIONS = 20 // [rows, cols]

const createBoard = (boardSize) => {
    const board = []
    for (let i = 0; i < boardSize; i++) {
        const tmp = []
        for (let j = 0; j < boardSize; j++) {
            const element = document.createElement('div')
            element.classList.add('tile')
            element.dataset.status = 'dead'

            const tile = new Tile(element, i, j)
            tmp.push(tile)
        }
        board.push(tmp)
    }
    return board
}

const renderBoard = (board, boardSize) => {
    const boardElement = document.querySelector('.board')
    boardElement.style.setProperty('--rows', boardSize)
    boardElement.style.setProperty('--cols', boardSize)
    board.forEach(row => {
        row.forEach(tile => {
            boardElement.append(tile.element)
            tile.element.addEventListener('click', () => {
                if (tile.getStatus() == 'dead') {
                    tile.setStatus('alive')
                } else {
                    tile.setStatus('dead')
                }
            })
        })
    });
}

const updateBoard = (boardVar) => {
    // console.log('updateBoard')
    const prev = [...boardVar]
    calculateNeighbours(prev)

    for (let i = 0; i < prev.length; i++) {
        for (let j = 0; j < prev.length; j++) {
            const prevTile = prev[i][j]
            const tile = boardVar[i][j]
            if (prevTile.status == 'alive') {
                if (prevTile.neighbours < 2) {
                    tile.setStatus('dead')
                } else if (prevTile.neighbours >= 2 && prevTile.neighbours <= 3) {
                    console.log('this tile lives!')
                } else if (prevTile.neighbours > 3) {
                    tile.setStatus('dead')
                }
            } else {
                if (prevTile.neighbours == 3) {
                    tile.setStatus("alive")
                }
            }
        }
    }
}

const startAnimation = (board) => {
    // console.log('animation started!')
    updateBoard(board)
}

const board = createBoard(BOARD_DIMENSIONS)
board[3][3].setStatus("alive")
board[3][4].setStatus("alive")
board[3][5].setStatus("alive")
renderBoard(board, BOARD_DIMENSIONS)
    // console.log(board)

const startBtn = document.querySelector('#start')
startBtn.addEventListener('click', () => {
    startAnimation(board)
    var refreshIntervalId = setInterval(() => startAnimation(board), 500)

    const stopBtn = document.querySelector('#stop')
    stopBtn.addEventListener('click', () => {
        clearInterval(refreshIntervalId)
    })
})

const resetBtn = document.querySelector('#reset')
resetBtn.addEventListener('click', () => {
    board.forEach(row => {
        row.forEach(tile => {
            tile.setStatus('dead')
        })
    })
})