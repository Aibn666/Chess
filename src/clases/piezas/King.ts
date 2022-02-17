import { PieceType } from '../../types/theme';
import Piece from "../piezas";

class King extends Piece {
    constructor(color){
        super(color,PieceType.king,['♔','♚']);
    }
}

export default King;