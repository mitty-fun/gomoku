

function AI(game) {

    const { width, height, grid, turn } = game
    const arr = []

    function getScoreOf(x, y, turn) {
        grid[x][y].color = turn
        const a = getLine(x, y, 1, 0) + getLine(x, y, -1, 0);
        const b = getLine(x, y, 0, 1) + getLine(x, y, 0, -1);
        const c = getLine(x, y, 1, 1) + getLine(x, y, -1, -1);
        const d = getLine(x, y, 1, -1) + getLine(x, y, -1, 1);
        grid[x][y].color = ''

        return [a, b, c, d].reduce((sum, length) => {
            return sum + 10 ** length
        }, 0)
    }

    function getLine(x, y, vx, vy) {
        let i
        for (i = 1; i < 5; i++) {
            let target = grid[x + vx * i][y + vy * i].color
            if (grid[x][y].color !== target) {
                if (target !== '') i -= 0.5
                break
            }
        }
        return i - 1;
    }

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            if (grid[x][y].color === '') {
                const attack = getScoreOf(x, y, turn)
                const defend = getScoreOf(x, y, turn === 'b' ? 'w' : 'b')
                const score = attack * 1.1 + defend
                grid[x][y].score = score
                arr.push({ x, y, score })
            }
        }
    }

    const best = arr.sort((a, b) => a.score - b.score).pop()

    game.place(best.x, best.y)
}