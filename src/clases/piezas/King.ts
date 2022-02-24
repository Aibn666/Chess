import { PieceType } from '../../types/theme';
import Piece from "../piezas";
import Cell from '../celdas';

class King extends Piece {
    constructor(color){
        super(color,PieceType.king,['♔','♚']);
    }
    availableMovement(position: [number, number], boardMatrix: Cell[][]){
        const [x, y] = position;
        const directions = [
            [1, 1 ],
            [-1, 1],
            [1, -1],
            [-1,-1],
            [0, -1],
            [1, 0 ],
            [0, 1 ],
            [-1, 0],
        ];

        directions.forEach((dir)=>{
            const [xDir, yDir] = dir;
            const cell = this. getCellFromCoords([x + (1*xDir), y + (1*yDir)], boardMatrix);
            if (cell && !(cell.piece && cell.piece.color == this.color)) cell.setAvailableMovement(true);
        });
    }
}

export default King;