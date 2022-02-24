import Board from "./clases/board";

import Bishop from "./clases/piezas/Bishop";
import King from "./clases/piezas/King";
import Knight from "./clases/piezas/Knight";
import Pawn from "./clases/piezas/Pawn";
import Queen from "./clases/piezas/Queen";
import Rook from "./clases/piezas/Rook";
import { Color } from "./types/theme";

const WIDTH = 500;
const HEIGHT = 500;

//filas y columnas

const FILES = 8;
const RANKS = 8;


const theme = {
    light: '#DAF7A6',
    dark: '#05C5A5',
}

const pieceTheme = {
    light: '#FFFFFF',
    dark: '#000000',
}

const board = new Board(WIDTH, HEIGHT, FILES, RANKS, theme, pieceTheme);
//♔♕♖♗♘♙  ♚♛♜♝♞♟
//const pieces = {
//    king: ['♔','♚'],
//    queen: ['♕','♛'],
//    rook: ['♖','♜'],
//    bishop: ['♗','♝'],
//    knight: ['♘','♞'],
//    pawn: ['♙','♟'],
//}
//ubicar piezas
for (let i=0; i < RANKS; i += 1){
    board.initPlacePiece(i, 1 , new Pawn(Color.dark));
    board.initPlacePiece(i, 6, new Pawn(Color.light));
}

for(let i = 0; i < 2; i+=1){
    board.initPlacePiece(0, i * 7, new Rook(i ? Color.light : Color.dark));
    board.initPlacePiece(7, i * 7, new Rook(i ? Color.light : Color.dark));
    board.initPlacePiece(1, i * 7, new Knight(i ? Color.light : Color.dark));
    board.initPlacePiece(6, i * 7, new Knight(i ? Color.light : Color.dark));
    board.initPlacePiece(2, i * 7, new Bishop(i ? Color.light : Color.dark));
    board.initPlacePiece(5, i * 7, new Bishop(i ? Color.light : Color.dark));
    board.initPlacePiece(3, i * 7, new Queen(i ? Color.light : Color.dark));
    board.initPlacePiece(4, i * 7, new King(i ? Color.light : Color.dark));
}

board.render();
