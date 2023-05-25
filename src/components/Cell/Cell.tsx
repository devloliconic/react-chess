import React, { FC } from "react";
import { Cell as CellClass } from "@/models/Cell";

interface Props {
  cell: CellClass;
  selected: boolean;
  onClick: (cell: CellClass) => void;
}

export const Cell: FC<Props> = ({ cell, selected, onClick }) => {
  return (
    <div
      className={["cell", cell.color, selected ? "selected" : ""].join(" ")}
      onClick={() => onClick(cell)}
      style={{ background: cell.available && cell.figure ? "green" : "" }}>
      {cell.available && !cell.figure && <div className="available"></div>}
      {cell.figure?.logo && <img src={cell.figure.logo} alt="" />}
    </div>
  );
};
