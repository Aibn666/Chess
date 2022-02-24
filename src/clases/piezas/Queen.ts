import { PieceType } from '../../types/theme';
import Piece from "../piezas";
import Cell from '../celdas';

class Queen extends Piece {
    constructor(color){
        super(color,PieceType.queen,['♕','♛']);
    }
    availableMovement(position: [number, number], boardMatrix: Cell[][]){
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

        directions.forEach((dir) =>  this.checkDirection(position,dir, boardMatrix));
        //down right
        //this.checkDirection(position, [1, 1], boardMatrix);
        //down left
        //this.checkDirection(position, [-1, 1], boardMatrix);
        //up right
        //this.checkDirection(position, [1, -1], boardMatrix);
        //up left
        //this.checkDirection(position, [-1, -1], boardMatrix);
        //up
        //this.checkDirection(position, [0, -1], boardMatrix);
        //right
        //this.checkDirection(position, [1, 0], boardMatrix);
        //down
        //this.checkDirection(position, [0, 1], boardMatrix);
        //left
        //this.checkDirection(position, [-1, 0], boardMatrix);
    }
}

export default Queen;