import { Color, PieceType } from '../../types/theme';
import Cell from '../celdas';
import Piece from "../piezas";

class Pawn extends Piece {
    constructor(color: Color){
        super(color,PieceType.pawn,['♙','♟']);
    }

    availableMovement(position: [number,number],boardMatrix: Cell[][]) {
        const [x, y] = position;
        for(let i = 1; i <= 2; i += 1){
            const cell = boardMatrix[x][this.color === Color.dark ? y + i : y - i];
            if (cell.piece) break;
            cell.setAvailableMovement(true);
        }
    }
}

export default Pawn;