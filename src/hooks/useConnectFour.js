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

  const getDiagonals = grid => {
    const colDiagonals = []
    const rowDiagonals = []

    const rows = getRows(grid)
    const columns = getColumns(grid)

    columns.forEach((_, coli) => {
      colDiagonals[coli] = []
      rows.forEach((_, rowi) => {
        const cell = (coli + rowi) * 8
        if (cell > grid.length) return
        colDiagonals[coli] = [...colDiagonals[coli], grid[cell]]
      })
    })

    rows.forEach((_, rowi) => {
      rowDiagonals[rowi] = []
      columns.forEach((_, coli) => {
        const cell = (rowi + coli) * 8
        if (cell > grid.length) return
        rowDiagonals[rowi] = [...rowDiagonals[rowi], grid[cell]]
      })
    })

    return [...colDiagonals, ...rowDiagonals]
  }

  const getLines = grid => [
    ...getColumns(grid),
    ...getRows(grid),
    ...getDiagonals(grid)
  ]

  return { getLines }
}

export default useConnectFour
