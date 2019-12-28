import React, { useReducer } from 'react'
import styled from 'styled-components'
import useConnectFour from '../../hooks/useConnectFour'

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(7, auto);
`

const Cell = styled.div`
  background-color: ${({ cellState }) =>
    cellState === 1 ? 'red' : cellState === 2 ? 'blue' : 'grey'};
  height: 60px;
  width: 60px;
  border-radius: 50%;
  margin: 0.25em;
`

const Grid = () => {
  const { checkWinner } = useConnectFour()
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

  const handleClick = cell => {
    if (game.player !== game.upNext) {
      return
    }

    handleTurn(cell)
  }

  const getColumnCells = (cell, grid) => {
    return [...Array(grid.length / 7)].map(
      (_, row) => row * (grid.length / 6) + (cell % (grid.length / 6))
    )
  }

  const handleTurn = cell => {
    setGame({ error: false })

    const grid = [...game.grid]

    const availableCell = getColumnCells(cell, grid)
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

  return (
    <div>
      {game.error && <div>{game.error}</div>}
      {game.winner && <div>{`WINNER IS ${game.winner}`}</div>}
      <div>
        {game.player === game.upNext ? 'Your turn' : 'Waiting for player'}
      </div>
      <Container>
        {game.grid.map((cell, i) => (
          <Cell key={i} onClick={() => handleClick(i)} cellState={cell}>
            {i}
          </Cell>
        ))}
      </Container>
    </div>
  )
}

export default Grid
