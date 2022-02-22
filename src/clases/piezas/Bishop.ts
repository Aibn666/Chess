import { PieceType } from '../../types/theme';
import Cell from '../celdas';
import Piece from "../piezas";

class Bishop extends Piece {
    constructor(color){
        super(color,PieceType.bishop,['♗','♝']);
    }

    availableMovement(position: [number,number],boardMatrix: Cell[][]) {
        const [x, y] = position;
        //down right
        for(let i = 1; i <= boardMatrix.length; i += 1){
            const cell = this.getCellFromCoords([x + i, y + i], boardMatrix);
            if (!cell) break;
            if (cell.piece && cell.piece.color == this.color) break;
            cell.setAvailableMovement(true);
            if (cell.piece)break;
        }
        //down left
        for(let i = 1; i <= boardMatrix.length; i += 1){
            const cell = this.getCellFromCoords([x - i, y + i], boardMatrix);
            if (!cell) break;
            if (cell.piece && cell.piece.color == this.color) break;
            cell.setAvailableMovement(true);
            if (cell.piece)break;
        }
        //up right
        for(let i = 1; i <= boardMatrix.length; i += 1){
            const cell = this.getCellFromCoords([x + i, y - i], boardMatrix);
            if (!cell) break;
            if (cell.piece && cell.piece.color == this.color) break;
            cell.setAvailableMovement(true);
            if (cell.piece)break;
        }
        //up left
        for(let i = 1; i <= boardMatrix.length; i += 1){
            const cell = this.getCellFromCoords([x - i, y - i], boardMatrix);
            if (!cell) break;
            if (cell.piece && cell.piece.color == this.color) break;
            cell.setAvailableMovement(true);
            if (cell.piece)break;
        }
    }
}

export default Bishop;