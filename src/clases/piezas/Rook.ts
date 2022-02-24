import { PieceType } from '../../types/theme';
import Cell from '../celdas';
import Piece from "../piezas";

class Rook extends Piece {
    constructor(color){
        super(color,PieceType.rook,['♖','♜']);
    }
    availableMovement(position: [number, number], boardMatrix: Cell[][]){
        const [x, y] = position;
        //check direction
        //up
        this.checkDirection(position, [0, -1], boardMatrix);
        //right
        this.checkDirection(position, [1, 0], boardMatrix);
        //down
        this.checkDirection(position, [0, 1], boardMatrix);
        //left
        this.checkDirection(position, [-1, 0], boardMatrix);
    }
}

export default Rook;