import { PieceType } from '../../types/theme';
import Cell from '../celdas';
import Piece from "../piezas";

class Bishop extends Piece {
    constructor(color){
        super(color,PieceType.bishop,['♗','♝']);
    }
    checkDiag(position,movement,boardMatrix){
        const [x , y] = position;
        const [xMove , yMove] = movement;
        for(let i = 1; 1<= boardMatrix.length; i += 1){
            const cell = this. getCellFromCoords([x + (i*xMove), y + (i*yMove)], boardMatrix);
            if (!cell)break;
            if (cell.piece && cell.piece.color == this.color) break;
            cell.setAvailableMovement(true);
            if (cell.piece)break; 
        }
    }

    availableMovement(position: [number,number],boardMatrix: Cell[][]) {
        const [x, y] = position;
        //down right
        this.checkDiag(position, [1,1], boardMatrix);
        //down left
        this.checkDiag(position, [-1,1], boardMatrix);
        //up right
        this.checkDiag(position, [1,-1], boardMatrix);
        //up left
        this.checkDiag(position, [-1,-1], boardMatrix);
    }
}

export default Bishop;