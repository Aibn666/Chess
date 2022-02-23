import { PieceType } from '../../types/theme';
import Cell from '../celdas';
import Piece from "../piezas";

class Rook extends Piece {
    constructor(color){
        super(color,PieceType.rook,['♖','♜']);
    }
    availableMovement(position: [number, number], boardMatrix: Cell[][]){
        const [x, y] = position;
        //check files
        for(let i = 1; i < boardMatrix.length; i += 1){
            const cell = this.getCellFromCoords([x + i, y], boardMatrix);
            if(!cell) break;
            if(cell.piece && cell.piece.color == this.color)break;
            cell.setAvailableMovement(true);
            if(cell.piece)break;
        }
        for(let i = 1; i < boardMatrix.length; i += 1){
            const cell = this.getCellFromCoords([x - i, y], boardMatrix);
            if(!cell) break;
            if(cell.piece && cell.piece.color == this.color)break;
            cell.setAvailableMovement(true);
            if(cell.piece)break;
        }
        for(let i = 1; i < boardMatrix.length; i += 1){
            const cell = this.getCellFromCoords([x, y + i], boardMatrix);
            if(!cell) break;
            if(cell.piece && cell.piece.color == this.color)break;
            cell.setAvailableMovement(true);
            if(cell.piece)break;
        }
        for(let i = 1; i < boardMatrix.length; i += 1){
            const cell = this.getCellFromCoords([x, y - i], boardMatrix);
            if(!cell) break;
            if(cell.piece && cell.piece.color == this.color)break;
            cell.setAvailableMovement(true);
            if(cell.piece)break;
        }
    }
}

export default Rook;