import React, { useEffect, useState } from "react";
import "./App.css";
import { Board } from "@/components/Board";
import { Board as BoardClass } from "./models/Board";
import { Player } from "./models/Player";
import { Colors } from "./models/Colors";
import { LostFigures } from "@/components/LostFigures";
import { Timer } from "@/components/Timer";

export const App = () => {
  const [board, setBoard] = useState(new BoardClass());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [win, setWin] = useState<string>("game");
  useEffect(() => {
    restart();
  }, []);

  function restart() {
    const newBoard = new BoardClass();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer);
    setWin("game");
  }

  function swapPlayer() {
    setCurrentPlayer(
      currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer
    );
  }

  return (
    <div className="app">
      <Timer currentPlayer={currentPlayer} restart={restart} />
      <Board
        whitePlayer={whitePlayer}
        blackPlayer={blackPlayer}
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
        win={win}
        setWin={setWin}
      />
      <div>
        <LostFigures title="Черные" figures={board.lostBlackFigures} />
        <LostFigures title="Белые" figures={board.lostWhiteFigures} />
      </div>
    </div>
  );
};
