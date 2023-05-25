import { Queen } from "../../models/figures/Queen";
import { Pawn } from "../../models/figures/Pawn";
import { Cell } from "../../models/Cell";
import { Colors } from "../../models/Colors";
import { Board } from "../../models/Board";

describe("Knight", () => {
  let board: Board;
  let queen: Queen;
  let pawn: Pawn;
  let targetCell: Cell;

  beforeEach(() => {
    board = new Board();
    board.initCells();
    const cell = new Cell(board, 2, 2, Colors.WHITE, null);
    queen = new Queen(Colors.BLACK, cell);
    targetCell = new Cell(board, 2, 1, Colors.WHITE, null);
    targetCell.isEmpty = jest.fn().mockReturnValue(true);
  });

  test("canMove should return true when target cell is empty ", () => {
    expect(queen.canMove(targetCell)).toBe(true);
  });

  test("canMove should return true when target cell is diagonally in front of the pawn and contains an enemy figure", () => {
    const enemyCell = new Cell(board, 2, 1, Colors.WHITE, pawn); // Ячейка, находящаяся по диагонали от пешки и содержащая фигуру противника
    enemyCell.isEmpty = jest.fn().mockReturnValue(false);
    expect(queen.canMove(enemyCell)).toBe(true);
  });

  test("canMove should return false when target cell is not in a valid move position", () => {
    const invalidCell = new Cell(board, 3, 7, Colors.WHITE, null); // Ячейка, которая не находится в допустимой позиции для хода пешки
    expect(queen.canMove(invalidCell)).toBe(false);
  });
});
