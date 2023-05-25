import { Board } from "../models/Board";
import { Cell } from "../models/Cell.ts";
import { Pawn } from "../models/figures/Pawn.ts";
import { Bishop } from "../models/figures/Bishop.ts";
import { King } from "../models/figures/King.ts";
import { Colors } from "../models/Colors.ts";

describe("Board", () => {
  let board: Board;

  beforeEach(() => {
    board = new Board();
    board.initCells();
    board.addFigures();
  });

  test("initCells should initialize the board with correct number of cells", () => {
    expect(board.cells.length).toBe(8);
    expect(board.cells[0].length).toBe(8);
    expect(board.cells[7].length).toBe(8);
  });

  test("getCell should return the correct cell at specified coordinates", () => {
    const cell = board.getCell(0, 0);
    expect(cell).toBeInstanceOf(Cell);
    expect(cell.x).toBe(0);
    expect(cell.y).toBe(0);
  });

  test("getCopyBoard should return a new instance of the board with the same cell configuration", () => {
    const copyBoard = board.getCopyBoard();
    expect(copyBoard).toBeInstanceOf(Board);
    expect(copyBoard.cells).toEqual(board.cells);
    expect(copyBoard.lostWhiteFigures).toEqual(board.lostWhiteFigures);
    expect(copyBoard.lostBlackFigures).toEqual(board.lostBlackFigures);
  });

  test("highlightCell should set 'available' property to true for cells where the selected cell's figure can move", () => {
    const selectedCell = board.getCell(4, 1); // Select a black pawn
    board.highlightCell(selectedCell);

    // Check if the cells where the pawn can move are highlighted
    expect(board.getCell(4, 2).available).toBe(true);
    expect(board.getCell(4, 3).available).toBe(true);
  });

  test("addPawns should add the correct number of pawns to the board", () => {
    const blackPawns = board.cells[1].filter(
      (cell) =>
        cell.figure instanceof Pawn && cell.figure.color === Colors.BLACK
    );
    const whitePawns = board.cells[6].filter(
      (cell) =>
        cell.figure instanceof Pawn && cell.figure.color === Colors.WHITE
    );
    expect(blackPawns.length).toBe(8);
    expect(whitePawns.length).toBe(8);
  });

  test("addBishops should add two bishops to the board", () => {
    const blackBishops = board.cells[0].filter(
      (cell) =>
        cell.figure instanceof Bishop && cell.figure.color === Colors.BLACK
    );
    const whiteBishops = board.cells[7].filter(
      (cell) =>
        cell.figure instanceof Bishop && cell.figure.color === Colors.WHITE
    );
    expect(blackBishops.length).toBe(2);
    expect(whiteBishops.length).toBe(2);
  });

  test("addKings should add one black king and one white king to the board", () => {
    const blackKing = board.cells[0].find(
      (cell) =>
        cell.figure instanceof King && cell.figure.color === Colors.BLACK
    );
    const whiteKing = board.cells[7].find(
      (cell) =>
        cell.figure instanceof King && cell.figure.color === Colors.WHITE
    );
    expect(blackKing).toBeDefined();
    expect(whiteKing).toBeDefined();
  });

  // Add more tests for other methods...
});
