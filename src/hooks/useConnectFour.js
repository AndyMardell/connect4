import { useReducer } from 'react'
import useReferee from './useReferee'

const useConnectFour = () => {
  const { checkWinner } = useReferee()
  const [game, setGame] = useReducer(
    (game, newGame) => ({ ...game, ...newGame }),
    {
      id: 1, // A game ID for socket
      player: 1, // Current player 1|2
      upNext: 1, // Who's go next 1|2
      grid: [...Array(42)].map(() => 0), // Empty grid
      winner: false,
      error: false
    }
  )

  function getColumnFromCell (cell, grid) {
    return [...Array(grid.length / 7)].map(
      (_, row) => row * (grid.length / 6) + (cell % (grid.length / 6))
    )
  }

  function handleTurn (cell) {
    setGame({ error: false })

    const grid = [...game.grid]

    const availableCell = getColumnFromCell(cell, grid)
      .reverse()
      .find(columnCell => grid[columnCell] === 0)

    if (typeof availableCell === 'undefined') {
      return setGame({ error: 'Column full' })
    }

    grid[availableCell] = game.player

    setGame({
      grid,
      upNext: game.upNext === 1 ? 2 : 1,
      player: game.player === 1 ? 2 : 1, // Temp debug switcher
      winner: checkWinner(grid),
      error: false
    })
  }

  return { handleTurn, game }
}

export default useConnectFour
