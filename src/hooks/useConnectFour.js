const useConnectFour = () => {
  const getColumns = grid => {
    let columns = []
    ;[...Array(7)].map(() => {
      columns = [...columns, [...Array(6)].map((_, i) => grid[i * 7])]
    })
    console.log('cols', columns)
    return columns
  }

  const getRows = grid => {
    const gridClone = [...grid]
    let rows = []
    while (gridClone.length) {
      rows = [...rows, gridClone.splice(0, 7)]
    }
    return rows
  }

  const getDiagonals = grid => {
    // const rows = getRows(grid)

    // for (const cell of rows[0]) {
    // }

    return []
  }

  const getLines = grid => {
    console.log([...getColumns(grid), ...getRows(grid), ...getDiagonals(grid)])
    return [...getColumns(grid), ...getRows(grid), ...getDiagonals(grid)]
  }

  return { getLines }
}

export default useConnectFour
