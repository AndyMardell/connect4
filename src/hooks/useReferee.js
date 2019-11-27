import { useState } from 'react'

const useReferee = () => {
  const [winning, setWinning] = useState(0)
  const [connected, setConnected] = useState(1)

  const checkWinner = grid => {
    // Check cols
    grid.forEach(col => {
      let prevCell = 0
      col.forEach(cell => {
        // WELL THIS DOES NOT WORK
        if (cell && cell === prevCell) {
          setWinning(cell)
          setConnected(connected + 1)
        } else {
          setConnected(1)
        }
        console.log(winning, connected)
        prevCell = cell
      })
    })

    if (connected >= 4) {
      return winning
    }

    return false
  }

  return { checkWinner }
}

export default useReferee
