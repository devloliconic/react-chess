import { Figure } from "../../models/figures/Figure.ts";
import { Colors } from "../../models/Colors.ts";
import { Cell } from "../../models/Cell.ts";
import { Board } from "../../models/Board.ts";

describe("Figure", () => {
  let figure: Figure;
  let targetCell: Cell;
  let board: Board;

  beforeEach(() => {
    board = new Board();
    board.initCells();
    const cell = new Cell(board, 0, 0, Colors.WHITE, null);
    figure = new Figure(Colors.WHITE, cell);
    targetCell = new Cell(board, 1, 1, Colors.WHITE, null);
  });

  test("canMove should return true when target cell contains a figure of a different color", () => {
    expect(figure.canMove(targetCell)).toBe(true);
  });

  test("canMove should return true when target cell is empty", () => {
    expect(figure.canMove(targetCell)).toBe(true);
  });
});
