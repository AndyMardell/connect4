import React from 'react'
import styled from 'styled-components'
import useConnectFour from '../../hooks/useConnectFour'
import Cell from './Cell'

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(7, auto);
`

const Grid = () => {
  const { handleTurn, game } = useConnectFour()

  const handleClick = cell => {
    if (game.player !== game.upNext) {
      return
    }

    handleTurn(cell)
  }

  return (
    <div>
      {game.error && <div>{game.error}</div>}
      {game.winner && <div>{`WINNER IS ${game.winner}`}</div>}
      <div>
        {game.player === game.upNext ? 'Your turn' : 'Waiting for player'}
      </div>
      <Container>
        {game.grid.map((cellState, cell) => (
          <Cell
            key={cell}
            handleClick={() => handleClick(cell)}
            cellState={cellState}
          />
        ))}
      </Container>
    </div>
  )
}

export default Grid
