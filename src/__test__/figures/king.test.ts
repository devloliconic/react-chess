import { King } from "../../models/figures/King";
import { Pawn } from "../../models/figures/Pawn";
import { Cell } from "../../models/Cell";
import { Colors } from "../../models/Colors";
import { Board } from "../../models/Board";

describe("King", () => {
  let board: Board;
  let king: King;
  let pawn: Pawn;
  let targetCell: Cell;

  beforeEach(() => {
    board = new Board();
    board.initCells();
    const cell = new Cell(board, 2, 2, Colors.WHITE, null);
    king = new King(Colors.BLACK, cell);
    targetCell = new Cell(board, 2, 3, Colors.WHITE, null);
    targetCell.isEmpty = jest.fn().mockReturnValue(true);
  });

  test("canMove should return true when target cell is empty and in front of the pawn", () => {
    expect(king.canMove(targetCell)).toBe(true);
  });

  test("canMove should return true when target cell is diagonally in front of the king and contains an enemy figure", () => {
    const enemyCell = new Cell(board, 3, 3, Colors.WHITE, pawn);
    enemyCell.isEmpty = jest.fn().mockReturnValue(false);
    expect(king.canMove(enemyCell)).toBe(true);
  });

  test("canMove should return false when target cell is not in a valid move position", () => {
    const invalidCell = new Cell(board, 4, 4, Colors.WHITE, null);
    expect(king.canMove(invalidCell)).toBe(false);
  });
});
