import { PieceType } from '../../types/theme';
import Piece from "../piezas";

class Queen extends Piece {
    constructor(color){
        super(color,PieceType.queen,['♕','♛']);
    }
}

export default Queen;