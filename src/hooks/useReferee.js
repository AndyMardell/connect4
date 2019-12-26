import useConnectFour from './useConnectFour'

const useReferee = () => {
  const { getLines } = useConnectFour()

  const checkWinner = grid => {
    const gridClone = [...grid]
    for (const cells of getLines(gridClone)) {
      if (cells.join('').includes('1111')) {
        return 1
      }

      if (cells.join('').includes('2222')) {
        return 2
      }
    }

    return false
  }

  return { checkWinner }
}

export default useReferee
