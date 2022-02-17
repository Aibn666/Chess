import Cell from './celdas';
import { Theme } from "src/types/theme";
import Piece from './piezas';


class Board {
    width: number;
    height: number;
    files: number;
    ranks: number;
    theme: Theme;
    pieceTheme: Theme;

    cellWidth: number;
    cellHeith: number;
    piecesOffset: number;
    boardMatrix: Cell[][];

    flip: boolean;

    previousCell: Cell;
    selectedCells: Cell[];

    $canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor(width, height, files, ranks, theme, pieceTheme){
        this.width = width;
        this.height = height;
        this.files = files;
        this.ranks = ranks;
        this.theme = theme;
        this.pieceTheme = pieceTheme;

        this.flip = false;

        this.cellWidth = this.width/this.files;
        this.cellHeith = this.height/this.ranks;

        this.piecesOffset = this.cellHeith * 0.1;

        this.previousCell = null;
        this.selectedCells = [];

        this.$canvas = document.createElement('canvas');

        this.ctx = this.$canvas.getContext('2d');

        this.$canvas.width = this.width;
        this.$canvas.height = this.height;


        document.body.appendChild(this.$canvas);
        document.body.style.display = 'grid';
        document.body.style.placeItems = 'center';
        document.body.style.height = '100%';
        document.body.parentElement.style.height = '100%';
        document.body.style.backgroundColor = '#333333';
        
        //initializing
        this.boardMatrix = [];
        for (let drawX = 0; drawX < this.files; drawX += 1){
            this.boardMatrix[drawX] = [];
            for (let drawY = 0; drawY < this.ranks; drawY += 1){
                this.boardMatrix[drawX][drawY] = new Cell(null);
            }
        }
        //bind method
        this.setMouseCell = this.setMouseCell.bind(this);
        this.setSelectedCell = this.setSelectedCell.bind(this);
        this.pickPiece = this.pickPiece.bind(this);
        this.dragPiece = this.dragPiece.bind(this);
        this.dropPiece = this.dropPiece.bind(this);
        //mouse event
        this.$canvas.addEventListener('mousemove', this.dragPiece);
        this.$canvas.addEventListener('mousedown', this.pickPiece);
        this.$canvas.addEventListener('mouseup',this.dropPiece);
    }

    clearSelections(){
        this.selectedCells.forEach((c) => c.setSelected(false));
        this.selectedCells = [];
    }
    clearAvailableMovement(){
        this.boardMatrix.forEach((file)=>{
            file.forEach((cell) =>{
                cell.setAvailableMovement(false);
            });
        });
    }
    pickPiece(event: MouseEvent){
        this.clearSelections();
        if(this.previousCell)return;
        const { offsetX, offsetY } = event;
        const [file, rank] = this.mouseCoordinatesToCell(offsetX,offsetY);
        const selectedCell = this.boardMatrix[file][rank];
        if(!selectedCell.piece) return;
        
        selectedCell.piece.availableMovement([file,rank], this.boardMatrix);

        this.previousCell = selectedCell;
        this.selectedCells.push(selectedCell);
        selectedCell.setSelected(true);
        this.render();
    }
    
    dragPiece(){

    }
    dropPiece(event: MouseEvent){
        if(!this.previousCell)return;
        const { offsetX, offsetY } = event;
        const [file, rank] = this.mouseCoordinatesToCell(offsetX,offsetY);
        const selectedCell = this.boardMatrix[file][rank];

        if(this.previousCell === selectedCell){
            this.previousCell = null;
            this.clearSelections();
            this.render();
            return;
        }
        //suelto solo si es un movimiento posible
        if(!selectedCell.availableMove){
            this.previousCell = null;
            this.render();
            return;
        }
        selectedCell.setPiece(this.previousCell.piece);
        this.selectedCells.push(selectedCell);
        this.previousCell.setPiece(null);
        this.previousCell = null;
        selectedCell.setSelected(true);
        this.flip = !this.flip;
        this.clearAvailableMovement();
        this.render();
    }

    mouseCoordinatesToCell(drawX: number, drawY: number){
        let file = Math.floor(drawX/this.cellWidth);
        let rank = Math.floor(drawY/this.cellHeith);

        if (this.flip){
            file = this.files - 1 - file;
            rank = this.ranks - 1 - rank;
        }
        return[file,rank];
    }

    
    setSelectedCell(event: MouseEvent){
        const { offsetX, offsetY } = event;
        const [file, rank] = this.mouseCoordinatesToCell(offsetX,offsetY);
        const selectedCell = this.boardMatrix[file][rank];
        selectedCell.setSelected(true);
        this.render();
    }
    private setMouseCell(event: MouseEvent){
        const { offsetX, offsetY } = event;

        const drawX = Math.floor(offsetX/this.cellWidth);
        const drawY = Math.floor(offsetY/this.cellHeith);
        console.log(drawX,drawY);
        //const selectedCell = this.boardMatrix[drawX][drawY];
        //selectedCell.setSelected(true);
        //this.render();
    }

    initPlacePiece(drawX,drawY,piece){
        const cell = this.boardMatrix[drawX][drawY];
        cell.setPiece(piece);
    }
    render() {
        for (let x = 0; x < this.files; x += 1){
            for (let y = 0; y < this.ranks; y += 1){

                let drawX = x;
                let drawY = y;

                if (this.flip){
                    drawX = this.ranks - 1 - drawX;
                    drawY = this.files - 1 - drawY;
                }

                let rectColor = this.theme.light;
                let textColor = this.theme.dark;
            
                if ((drawX+ drawY) % 2){
                    rectColor = this.theme.dark;
                    textColor = this.theme.light;
                }
            
                this.ctx.fillStyle = rectColor;
                this.ctx.fillRect(drawX * this.cellWidth,drawY * this.cellHeith,this.cellWidth, this.cellHeith);
                
                
                //posicion
                this.ctx.fillStyle = textColor;
    
                this.ctx.textBaseline = 'top';
                this.ctx.textAlign = 'start';
                this.ctx.font = '8px Arial';
                this.ctx.fillText(`[${x};${y}]`,drawX * this.cellWidth + 10, drawY * this.cellHeith + 10);
                    
                    //dibujo pieza
                const cell  = this.boardMatrix[x][y];
                if (cell.selected){
                    this.ctx.fillStyle = '#FFDC4E';
                    this.ctx.fillRect(drawX * this.cellWidth,
                        drawY * this.cellHeith,
                        this.cellWidth, 
                        this.cellHeith);
                }

                if (cell.availableMove){
                    this.ctx.fillStyle = '#000000';
                    this.ctx.globalAlpha = 0.3;
                    this.ctx.beginPath();
                    this.ctx.arc(
                        drawX * this.cellWidth + this.cellWidth/2,
                        drawY * this.cellHeith + this.cellHeith/2,
                        16,0, 2 * Math.PI );
                    this.ctx.fill();
                    this.ctx.globalAlpha = 1;
                }

                const piece  = cell ?. piece;
                if(piece){
                    this.ctx.fillStyle = this.pieceTheme[piece.color];
                    this.ctx.textBaseline = 'middle';
                    this.ctx.textAlign = 'center';
                    this.ctx.font = '64px Arial';
                    this.ctx.fillText(piece.token[1],drawX * this.cellWidth + this.cellWidth / 2, drawY * this.cellHeith + this.cellHeith / 2);
                    this.ctx.fillStyle = this.pieceTheme.dark;
                    this.ctx.fillText(piece.token[0],drawX * this.cellWidth + this.cellWidth / 2, drawY * this.cellHeith + this.cellHeith / 2);    
                }
            }
        }
    }
}

export default Board;