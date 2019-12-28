const useConnectFour = () => {
  const getColumns = grid => {
    let columns = []
    ;[...Array(7)].map((_, row) => {
      columns = [
        ...columns,
        [...Array(6)].map((_, cell) => grid[cell * 7 + row])
      ]
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
    const colDiagonals = []
    const rowDiagonals = []

    const rows = reverse ? getRows(grid).reverse() : getRows(grid)
    const columns = getColumns(grid)

    columns.forEach((_, coli) => {
      colDiagonals[coli] = []
      rows.forEach((row, rowi) => {
        if (coli + rowi > row.length) return
        colDiagonals[coli] = [...colDiagonals[coli], row[coli + rowi]]
      })
    })

    rows.forEach((_, rowi) => {
      rowDiagonals[rowi] = []
      columns.forEach((column, coli) => {
        if (coli + rowi > column.length) return
        rowDiagonals[rowi] = [...rowDiagonals[rowi], column[coli + rowi]]
      })
    })

    return [...colDiagonals, ...rowDiagonals]
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
