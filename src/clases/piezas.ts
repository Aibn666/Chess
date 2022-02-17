import { Color , PieceType } from '../types/theme';
import Cell from './celdas';

class Piece {
    color: Color;
    type: PieceType;
    //token (caracter asignado a la pieza)
    token: string[]; 

    constructor(color,type, token){
        this.color = color;
        this.type = type;
        this.token = token;
    }

    availableMovement(position: [number,number],boardMatrix: Cell[][]) {
        throw new Error(`Missing available movement in ${this.type}`);
        
    }
}

export default Piece;