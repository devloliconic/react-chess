import { Pawn } from "../../models/figures/Pawn";
import { Cell } from "../../models/Cell";
import { Colors } from "../../models/Colors";
import { Board } from "../../models/Board";

describe("Pawn", () => {
  let board: Board;
  let pawn: Pawn;
  let pawn2: Pawn;
  let targetCell: Cell;

  beforeEach(() => {
    board = new Board();
    board.initCells();
    const cell = new Cell(board, 2, 2, Colors.WHITE, null);
    pawn = new Pawn(Colors.BLACK, cell);
    targetCell = new Cell(board, 2, 3, Colors.WHITE, null);
    targetCell.isEmpty = jest.fn().mockReturnValue(true);
  });

  test("canMove should return true when target cell is empty and in front of the pawn", () => {
    expect(pawn.canMove(targetCell)).toBe(true);
  });

  test("canMove should return true when target cell is two steps forward and pawn is in the initial position", () => {
    const initialCell = new Cell(board, 2, 1, Colors.BLACK, pawn); // Пешка находится на начальной позиции
    const emptyCell = new Cell(board, 2, 2, Colors.BLACK, null); // Ячейка между пешкой и целевой ячейкой пустая
    emptyCell.isEmpty = jest.fn().mockReturnValue(true);
    pawn.cell = initialCell;
    expect(pawn.canMove(targetCell)).toBe(true);
  });

  test("canMove should return true when target cell is diagonally in front of the pawn and contains an enemy figure", () => {
    const enemyCell = new Cell(board, 3, 3, Colors.WHITE, pawn2); // Ячейка, находящаяся по диагонали от пешки и содержащая фигуру противника
    pawn2 = new Pawn(Colors.WHITE, enemyCell);
    enemyCell.isEmpty = jest.fn().mockReturnValue(false);
    expect(pawn.canMove(enemyCell)).toBe(true);
  });

  test("canMove should return false when target cell is not in a valid move position", () => {
    const invalidCell = new Cell(board, 4, 4, Colors.WHITE, null); // Ячейка, которая не находится в допустимой позиции для хода пешки
    expect(pawn.canMove(invalidCell)).toBe(false);
  });
});
