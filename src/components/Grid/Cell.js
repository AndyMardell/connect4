import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledCell = styled.div`
  background-color: ${({ cellState }) =>
    cellState === 1 ? 'red' : cellState === 2 ? 'blue' : 'grey'};
  height: 60px;
  width: 60px;
  border-radius: 50%;
  margin: 0.25em;
`

const Cell = ({ handleClick, cellState }) => (
  <StyledCell onClick={() => handleClick()} cellState={cellState} />
)

Cell.propTypes = {
  handleClick: PropTypes.func,
  cellState: PropTypes.oneOfType([PropTypes.bool, PropTypes.number])
}

export default Cell
