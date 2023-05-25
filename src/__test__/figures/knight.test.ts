import { Knight } from "../../models/figures/Knight";
import { Pawn } from "../../models/figures/Pawn";
import { Cell } from "../../models/Cell";
import { Colors } from "../../models/Colors";
import { Board } from "../../models/Board";

describe("Knight", () => {
  let board: Board;
  let knight: Knight;
  let pawn: Pawn;
  let targetCell: Cell;

  beforeEach(() => {
    board = new Board();
    board.initCells();
    const cell = new Cell(board, 2, 2, Colors.WHITE, null);
    knight = new Knight(Colors.BLACK, cell);
    targetCell = new Cell(board, 1, 4, Colors.WHITE, null);
    targetCell.isEmpty = jest.fn().mockReturnValue(true);
  });

  test("canMove should return true when target cell is empty ", () => {
    expect(knight.canMove(targetCell)).toBe(true);
  });

  test("canMove should return true when target cell is Г position and contains an enemy figure", () => {
    const enemyCell = new Cell(board, 1, 4, Colors.WHITE, pawn);
    enemyCell.isEmpty = jest.fn().mockReturnValue(false);
    expect(knight.canMove(enemyCell)).toBe(true);
  });

  test("canMove should return false when target cell is not in a valid move position", () => {
    const invalidCell = new Cell(board, 2, 1, Colors.WHITE, null);
    expect(knight.canMove(invalidCell)).toBe(false);
  });
});
