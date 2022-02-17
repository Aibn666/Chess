import { PieceType } from '../../types/theme';
import Piece from "../piezas";

class Knight extends Piece {
    constructor(color){
        super(color,PieceType.knight,['♘','♞']);
    }
}

export default Knight;