import { Figure, FigureNames } from "./Figure";
import blackLogo from "../../assets/b_pawn_png_shadow_128px.png";
import whiteLogo from "../../assets/w_pawn_png_shadow_128px.png";
import { Colors } from "../Colors";
import { Cell } from "../Cell";

export class Pawn extends Figure {
  isFirstStep = true;

  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.PAWN;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false;
    const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;

    if (
      target.y === this.cell.y + direction &&
      target.x === this.cell.x &&
      target.isEmpty()
    ) {
      return true;
    }

    if (
      this.cell.y === (this.cell.figure?.color === Colors.BLACK ? 1 : 6) &&
      target.y === this.cell.y + 2 * direction &&
      target.x === this.cell.x &&
      target.isEmpty() &&
      this.cell.board.getCell(this.cell.x, this.cell.y + direction).isEmpty()
    ) {
      return true;
    }

    return (
      target.y === this.cell.y + direction &&
      (target.x === this.cell.x + 1 || target.x === this.cell.x - 1) &&
      !target.isEmpty() &&
      this.cell.isEnemy(target)
    );
  }
}
