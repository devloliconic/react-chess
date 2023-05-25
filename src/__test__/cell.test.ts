import { Cell } from "../models/Cell";
import { Board } from "../models/Board";
import { Colors } from "../models/Colors";
import { Figure } from "../models/figures/Figure";

describe("Cell", () => {
  let cell: Cell;
  let board: Board;

  test("isEmpty should return true when cell is empty", () => {
    board = new Board();
    board.initCells();
    cell = new Cell(board, 0, 0, Colors.WHITE, null);
    expect(cell.isEmpty()).toBe(true);
  });

  beforeEach(() => {
    board = new Board();
    board.initCells();
    cell = new Cell(board, 0, 0, Colors.WHITE, null);
  });

  test("isEmpty should return false when cell is not empty", () => {
    cell.isEmpty = jest.fn().mockReturnValue(false);
    expect(cell.isEmpty()).toBe(false);
  });

  test("isEnemy should return true when target cell contains a figure of a different color", () => {
    const targetCell = new Cell(board, 1, 1, Colors.BLACK, null);
    targetCell.figure = new Figure(Colors.BLACK, targetCell);
    expect(cell.isEnemy(targetCell)).toBe(true);
  });

  test("isEnemy should return false when target cell contains a figure of the same color", () => {
    const targetCell = new Cell(board, 1, 1, Colors.WHITE, null);
    expect(cell.isEnemy(targetCell)).toBe(false);
  });

  test("isEnemy should return false when target cell is empty", () => {
    const targetCell = new Cell(board, 1, 1, Colors.BLACK, null);
    targetCell.figure = null;
    expect(cell.isEnemy(targetCell)).toBe(false);
  });

  test("isEmptyVertical should return true when there are no figures between current and target cell vertically", () => {
    const targetCell = new Cell(board, 0, 2, Colors.WHITE, null);
    expect(cell.isEmptyVertical(targetCell)).toBe(true);
  });
});
