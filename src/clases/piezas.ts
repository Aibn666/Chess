import { Color , PieceType } from '../types/theme';
import Cell from './celdas';

class Piece {
    color: Color;
    type: PieceType;
    //token (caracter asignado a la pieza)
    token: string[]; 
    moved: boolean;

    constructor(color,type, token){
        this.color = color;
        this.type = type;
        this.token = token;
        this.moved = false;
    }

    getCellFromCoords(position: [number,number],boardMatrix: Cell[][]): Cell | null{
        const [x , y] = position;
        const rank = boardMatrix[x] || [];
        const cell = rank[y];
        return cell;
    }

    availableMovement(position: [number,number],boardMatrix: Cell[][]) {
        throw new Error(`Missing available movement in ${this.type}`);
        
    }
}

export default Piece;