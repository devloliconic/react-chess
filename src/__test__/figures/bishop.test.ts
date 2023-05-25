import { Cell } from "../../models/Cell";
import { Colors } from "../../models/Colors";
import { Board } from "../../models/Board";
import { Bishop } from "../../models/figures/Bishop.ts";

describe("Bishop", () => {
  let board: Board;
  let bishop: Bishop;
  let bishop2: Bishop;
  let targetCell: Cell;

  beforeEach(() => {
    board = new Board();
    board.initCells();
    const cell = new Cell(board, 2, 2, Colors.WHITE, null);
    bishop = new Bishop(Colors.BLACK, cell);
    targetCell = new Cell(board, 3, 3, Colors.WHITE, null);
    targetCell.isEmpty = jest.fn().mockReturnValue(true);
  });

  test("canMove should return true when target cell is empty", () => {
    expect(bishop.canMove(targetCell)).toBe(true);
  });

  test("canMove should return true when target cell is diagonally in front of the bishop and contains an enemy figure", () => {
    const enemyCell = new Cell(board, 3, 3, Colors.WHITE, bishop2); // Ячейка, находящаяся по диагонали от пешки и содержащая фигуру противника
    bishop2 = new Bishop(Colors.WHITE, enemyCell);
    enemyCell.isEmpty = jest.fn().mockReturnValue(false);
    expect(bishop.canMove(enemyCell)).toBe(true);
  });

  test("canMove should return false when target cell is not in a valid move position", () => {
    const invalidCell = new Cell(board, 6, 4, Colors.WHITE, null); // Ячейка, которая не находится в допустимой позиции для хода пешки
    expect(bishop.canMove(invalidCell)).toBe(false);
  });
});
