const useConnectFour = () => {
  const getColumns = grid => {
    let columns = []
    ;[...Array(7)].map((_, row) => {
      columns = [
        ...columns,
        [...Array(6)].map((_, cell) => grid[cell * 7 + row])
      ]
      return true
    })
    return columns
  }

  const getRows = grid => {
    let rows = []
    const gridClone = [...grid]
    while (gridClone.length) {
      rows = [...rows, gridClone.splice(0, 7)]
    }
    return rows
  }

  const getDiagonals = (grid, reverse = false) => {
    const rows = reverse ? getRows(grid).reverse() : getRows(grid)
    const columns = getColumns(grid)

    const columnDiagonals = columns.map((_, column) => {
      return rows
        .filter((cells, row) => column + row <= cells.length)
        .map((cells, row) => cells[column + row])
    })

    const rowDiagonals = rows.map((_, row) => {
      return columns
        .filter((cells, column) => row + column <= cells.length)
        .map((cells, column) => cells[row + column])
    })

    return [...columnDiagonals, ...rowDiagonals]
  }

  const getLines = grid => [
    ...getColumns(grid),
    ...getRows(grid),
    ...getDiagonals(grid),
    ...getDiagonals(grid, true)
  ]

  return { getLines }
}

export default useConnectFour
