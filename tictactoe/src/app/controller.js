export default class Controller {
  options = ["🟢", "❌"];

  constructor() {
    this.currentControl = 0;
  }

  getOption(current) {
    return this.options[current];
  }

  switchControl() {
    this.currentControl = Math.abs(this.currentControl - 1);
  }

  getActiveControl() {
    return this.currentControl;
  }

  checkWin(grid, current) {
    const WINNING_COMBINATIONS = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return WINNING_COMBINATIONS.some((comb) => {
      return comb.every((index) => {
        let row = index < 3 ? 0 : index < 6 ? 1 : 2;
        let col = index % 3;
        return grid[row][col] === current;
      });
    });

    //     const checkRow = (row) => row.every(element => element === current);
    //     const checkCol = (grid, j) => [grid[0][j], grid[1][j], grid[2][j]].every(element => element === current);
    //     const checkDiag = (grid) => {
    //         return (grid[0][0] === current && grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2])
    //         || (grid[0][2] === current && grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0])
    //     };

    //     let j = 0;

    //     for (let row of grid) {
    //         if (checkRow(row)) return true;
    //         if (checkCol(grid, j)) return true;
    //         if (checkDiag(grid)) return true;
    //         j++;
    //     }

    //     return false;
  }
}
