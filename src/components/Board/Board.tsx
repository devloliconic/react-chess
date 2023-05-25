import React, { FC, useCallback, useEffect, useState } from "react";
import { Board as BoardClass } from "@/models/Board";
import { Cell } from "@/components/Cell";
import { Cell as CellClass } from "@/models/Cell";
import { Player } from "@/models/Player";
import { Figure, FigureNames } from "@/models/figures/Figure";
import { Colors } from "@/models/Colors";

interface BoardProps {
  board: BoardClass;
  setBoard: (board: BoardClass) => void;
  currentPlayer: Player | null;
  whitePlayer: Player | null;
  blackPlayer: Player | null;
  swapPlayer: () => void;
  win: string;
  setWin: (win: string) => void;
}

export const Board: FC<BoardProps> = ({
  board,
  setBoard,
  currentPlayer,
  swapPlayer,
  whitePlayer,
  blackPlayer,
  win,
  setWin,
}) => {
  const [selectedCell, setSelectedCell] = useState<CellClass | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleCellClick = (cell: CellClass) => {
    if (
      selectedCell &&
      selectedCell !== cell &&
      selectedCell.figure?.canMove(cell)
    ) {
      selectedCell.moveFigure(cell);
      swapPlayer();
      setSelectedCell(null);
    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        setSelectedCell(cell);
      }
    }
  };

  const kingIsUnderAttack = useCallback(
    (kingCell: CellClass | null, currentPlayer: Player | null) => {
      let shah = false;
      board.cells.forEach((row) =>
        row.forEach((cell) => {
          if (cell.figure?.color !== currentPlayer?.color) {
            if (kingCell && cell.figure?.canMove(kingCell)) {
              shah = true;
            }
          }
        })
      );
      return shah;
    },
    [board.cells]
  );

  function isCheckmate() {
    return false;
  }

  useEffect(() => {
    setMessage("");
    let whiteKing: CellClass | null = null;
    let blackKing: CellClass | null = null;
    board.cells.forEach((row) =>
      row.forEach((cell) => {
        if (
          cell.figure?.color === Colors.WHITE &&
          cell.figure?.name === FigureNames.KING
        ) {
          whiteKing = cell;
        }
        if (
          cell.figure?.color === Colors.BLACK &&
          cell.figure?.name === FigureNames.KING
        ) {
          blackKing = cell;
        }
      })
    );
    if (kingIsUnderAttack(whiteKing, whitePlayer)) {
      if (isCheckmate()) {
        setMessage("Мат белым");
      } else {
        setMessage("Шах белым");
      }
    }
    if (kingIsUnderAttack(blackKing, blackPlayer)) {
      if (isCheckmate()) {
        setMessage("Мат черным");
      } else {
        setMessage("Шах черным");
      }
    }
  });

  useEffect(() => {
    const lastLostWhite: Figure | undefined = board.lostWhiteFigures.at(-1);
    const lastLostBlack: Figure | undefined = board.lostBlackFigures.at(-1);
    if (lastLostWhite?.name === FigureNames.KING) setWin("черные");
    if (lastLostBlack?.name === FigureNames.KING) setWin("белые");
  }, [currentPlayer]);

  const updateBoard = useCallback(() => {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }, [board, setBoard]);

  const highlightCell = useCallback(() => {
    board.highlightCell(selectedCell);
    updateBoard();
  }, [board, selectedCell, updateBoard]);

  useEffect(() => {
    highlightCell();
  }, [selectedCell]);

  return (
    <>
      {win === "game" ? (
        <div>
          <h3 className="currentplayer">
            Текущий игрок {currentPlayer?.color}
          </h3>
          <div className="board">
            {board.cells.map((row, index) => (
              <React.Fragment key={index}>
                {row.map((cell) => (
                  <Cell
                    onClick={handleCellClick}
                    cell={cell}
                    key={cell.id}
                    selected={
                      cell.x === selectedCell?.x && cell.y === selectedCell?.y
                    }
                  />
                ))}
              </React.Fragment>
            ))}
          </div>
          <h3 className="currentPlayer">{message}</h3>
        </div>
      ) : (
        <div className="win">Победили {win}</div>
      )}
    </>
  );
};
