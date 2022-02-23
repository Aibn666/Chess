import { Color, PieceType } from '../../types/theme';
import Cell from '../celdas';
import Piece from "../piezas";

class Pawn extends Piece {
    constructor(color: Color){
        super(color,PieceType.pawn,['♙','♟']);
    }

    availableMovement(position: [number,number],boardMatrix: Cell[][]) {
        const yDirection = this.color == Color.dark ? 1 : -1;
        const [x, y] = position;
        for(let i = 1; i <= (this.moved ? 1 : 2); i += 1){
            const cell = this.getCellFromCoords([x, y + (i * yDirection)], boardMatrix);
            if (cell.piece) break;
            cell.setAvailableMovement(true);
        }

        for(let i = 0; i<2; i += 1){
            const takeCell = this.getCellFromCoords(
                [x + (i ? 1 : -1) , y + (1 * yDirection)],
                 boardMatrix
            );
            if (takeCell.piece 
                && takeCell.piece.color != this.color
            ) takeCell.setAvailableMovement(true);
        }
        
    }
}

export default Pawn;