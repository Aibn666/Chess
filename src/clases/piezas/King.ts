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
            if (this.checkValidCell(cell)) cell.setAvailableMovement(true);
        });

        if(this.moved) return;
        
        const cell_castling_king_side_1 = this.getCellFromCoords([x + 1, y], boardMatrix);
        const cell_castling_king_side_2 = this.getCellFromCoords([x + 2, y], boardMatrix);
        const cell_castling_king_rook = this.getCellFromCoords([x + 3, y], boardMatrix);

        if(
            !cell_castling_king_side_1.piece
            && !cell_castling_king_side_2.piece
            && cell_castling_king_rook.piece
            && cell_castling_king_rook.piece.type == PieceType.rook
            && !cell_castling_king_rook.piece.moved
        ){
            cell_castling_king_side_2.setAvailableMovement(true);
        }

        const cell_castling_Queen_side_1 = this.getCellFromCoords([x - 1, y], boardMatrix);
        const cell_castling_Queen_side_2 = this.getCellFromCoords([x - 2, y], boardMatrix);
        const cell_castling_Queen_side_3 = this.getCellFromCoords([x - 3, y], boardMatrix);
        const cell_castling_Queen_rook = this.getCellFromCoords([x - 4, y], boardMatrix);

        if(
            !cell_castling_Queen_side_1.piece
            && !cell_castling_Queen_side_2.piece
            && !cell_castling_Queen_side_3.piece
            && cell_castling_Queen_rook.piece
            && cell_castling_Queen_rook.piece.type == PieceType.rook
            && !cell_castling_Queen_rook.piece.moved
        ){
            cell_castling_Queen_side_2.setAvailableMovement(true);
        }
    }
}

export default King;