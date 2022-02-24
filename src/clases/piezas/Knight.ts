import { PieceType } from '../../types/theme';
import Cell from '../celdas';
import Piece from "../piezas";

class Knight extends Piece {
    constructor(color){
        super(color,PieceType.knight,['♘','♞']);
    }

    availableMovement(position: [number, number], boardMatrix: Cell[][]){
        const [x, y] = position;

        const possibleMovements: [number, number][] = [
            [x - 1, y - 2],
            [x + 1, y - 2],
            [x + 2, y - 1],
            [x + 2, y + 1],
            [x + 1, y + 2],
            [x - 1, y + 2],
            [x - 2, y + 1],
            [x - 2, y - 1],
        ];

        possibleMovements.forEach((pm)=>{
            const cell = this.getCellFromCoords(pm, boardMatrix);
            if(this.checkValidCell(cell))cell.setAvailableMovement(true);
        });
    }
}

export default Knight;