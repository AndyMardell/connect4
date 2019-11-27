import React, { useReducer } from 'react'
import styled from 'styled-components'
import useReferee from '../../hooks/useReferee'

const Container = styled.div`
  display: flex;
`

const Column = styled.div`
  display: flex;
  flex-direction: column-reverse;
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
      grid: [...Array(7)].map(col => [...Array(6)].map(cell => 0)), // Empty grid
      winner: false
    }
  )

  const handleClick = col => {
    if (game.player !== game.upNext) return // Not your turn
    handleTurn(col)
  }

  const handleTurn = col => {
    let goTaken = false
    for (let i = 0; i < game.grid[col].length; i++) {
      if (goTaken || game.grid[col][i] !== 0) continue
      game.grid[col][i] = game.player
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
    })
  }

  console.log(game)

  return (
    <div>
      <div>
        {game.player === game.upNext ? 'Your turn' : 'Waiting for player'}
      </div>
      <Container>
        {game.grid.map((col, x) => (
          <Column key={x}>
            {col.map((cell, y) => (
              <Cell
                key={y}
                onClick={() => handleClick(x, y)}
                cellState={cell}
              />
            ))}
          </Column>
        ))}
      </Container>
    </div>
  )
}

export default Grid
