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
        this.checkDirection(position, [1,1], boardMatrix);
        //down left
        this.checkDirection(position, [-1,1], boardMatrix);
        //up right
        this.checkDirection(position, [1,-1], boardMatrix);
        //up left
        this.checkDirection(position, [-1,-1], boardMatrix);
    }
}

export default Bishop;