import React, { useReducer } from 'react'
import styled from 'styled-components'
import useReferee from '../../hooks/useReferee'

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
  const { checkWinner } = useReferee()
  const [game, setGame] = useReducer(
    (game, newGame) => ({ ...game, ...newGame }),
    {
      id: 1, // A game ID for socket
      player: 1, // Current player 1|2
      upNext: 1, // Who's go next 1|2
      grid: [...Array(42)].map(() => 0), // Empty grid
      winner: false
    }
  )

  const handleClick = cell => {
    if (game.player !== game.upNext) return
    handleTurn(cell)
  }

  const getColumnCells = cell => {
    const column = cell % 7
    const cellsInColumn = [...Array(6)].map(
      (cellId, i) => (cellId = i * 7 + column)
    )
    return cellsInColumn
  }

  const handleTurn = cell => {
    let goTaken = false

    // Decide which cell to fill
    const column = getColumnCells(cell).reverse()
    for (let i = 0; i < column.length; i++) {
      if (goTaken || game.grid[column[i]] !== 0) continue
      game.grid[column[i]] = game.player
      goTaken = true
    }

    if (!goTaken) {
      return console.error('Column full')
    }

    setGame({
      grid: game.grid,
      upNext: game.upNext === 1 ? 2 : 1,
      player: game.player === 1 ? 2 : 1, // Temp debug switcher
      winner: checkWinner(game.grid)
      // winner: false
    })
  }

  return (
    <div>
      <div>
        {game.player === game.upNext ? 'Your turn' : 'Waiting for player'}
      </div>
      <Container>
        {game.grid.map((cell, i) => (
          <Cell key={i} onClick={() => handleClick(i)} cellState={cell} />
        ))}
      </Container>
    </div>
  )
}

export default Grid
