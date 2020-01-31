class Gomoku {

    constructor() {
        this.width = 19
        this.height = 19
        this.status = 'playing' // playing, black win, white win
        this.grid = {}
        this.turn = 'b'

        for (let x = -4; x < this.width + 4; x++) {
            this.grid[x] = {}
            for (let y = -4; y < this.height + 4; y++) {
                this.grid[x][y] = { color: '', score: 0 }
            }
        }
    }

    place(x, y) {
        if (this.grid[x][y].color !== '' || this.status !== 'playing') return
        this.grid[x][y].color = this.turn
        this.turn = this.turn === 'b' ? 'w' : 'b'
        this.judge()
        return true
    }

    judge() {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                this.checkLine(x, y, 1, 0)
                this.checkLine(x, y, -1, 0)
                this.checkLine(x, y, 0, 1)
                this.checkLine(x, y, 0, -1)
                this.checkLine(x, y, 1, 1)
                this.checkLine(x, y, -1, -1)
                this.checkLine(x, y, 1, -1)
                this.checkLine(x, y, -1, 1)
            }
        }
    }

    checkLine(x, y, vx, vy) {
        let s = ''
        for (let i = 0; i < 5; i++) {
            s += this.grid[x + i * vx][y + i * vy].color
        }
        if (s === 'bbbbb') this.status = 'black win'
        if (s === 'wwwww') this.status = 'white win'
    }
}


