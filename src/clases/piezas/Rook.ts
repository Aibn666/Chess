import { PieceType } from '../../types/theme';
import Piece from "../piezas";

class Rook extends Piece {
    constructor(color){
        super(color,PieceType.rook,['♖','♜']);
    }
}

export default Rook;