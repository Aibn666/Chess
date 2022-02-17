import { PieceType } from '../../types/theme';
import Piece from "../piezas";

class Bishop extends Piece {
    constructor(color){
        super(color,PieceType.bishop,['♗','♝']);
    }
}

export default Bishop;