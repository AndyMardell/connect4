const useReferee = () => {
  function getColumns (grid) {
    return Array.from({ length: grid.length / 6 }, (_, row) =>
      Array.from(
        { length: grid.length / 7 },
        (_, column) => grid[column * 7 + row]
      )
    )
  }

  function getRows (grid) {
    return Array.from({ length: grid.length / 7 }, (_, column) =>
      grid.slice(column * 7, column * 7 + 7)
    )
  }

  function getDiagonals (grid, reverse = false) {
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

  function getLines (grid) {
    return [
      ...getColumns(grid),
      ...getRows(grid),
      ...getDiagonals(grid),
      ...getDiagonals(grid, true)
    ]
  }

  function checkWinner (grid) {
    for (const cells of getLines(grid)) {
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
