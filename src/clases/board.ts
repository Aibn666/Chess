import Cell from './celdas';
import { Theme } from '../types/theme';


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

    selectedCellPosition: [number, number];

    $canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor(width, height, files, ranks, theme, pieceTheme){
        this.width = width;
        this.height = height;
        this.files = files;
        this.ranks = ranks;
        this.theme = theme;
        this.pieceTheme = pieceTheme;

        this.cellWidth = this.width/this.files;
        this.cellHeith = this.height/this.ranks;

        this.piecesOffset = this.cellHeith * 0.1;

        this.selectedCellPosition = null;

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
        for (let x = 0; x < this.files; x += 1){
            this.boardMatrix[x] = [];
            for (let y = 0; y < this.ranks; y += 1){
                this.boardMatrix[x][y] = new Cell(null);
            }
        }
        //bind method
        this.setMouseCell = this.setMouseCell.bind(this);
        this.setSelectedCell = this.setSelectedCell.bind(this);
        //mouse event
        this.$canvas.addEventListener('mousedown', this.setSelectedCell);
        this.$canvas.addEventListener('mouseup', ()=>{
            console.log('Drop');
        });
        this.$canvas.addEventListener('mousemove', this.setMouseCell);
    }

    mouseCoordinatesToCell(x: number, y: number){
        const file = Math.floor(x/this.cellWidth);
        const rank = Math.floor(y/this.cellHeith);
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

        const x = Math.floor(offsetX/this.cellWidth);
        const y = Math.floor(offsetY/this.cellHeith);
        console.log(x,y);
        //const selectedCell = this.boardMatrix[x][y];
        //selectedCell.setSelected(true);
        //this.render();
    }

    initPlacePiece(x,y,piece){
        const cell = this.boardMatrix[x][y];
        cell.setPiece(piece);
    }
    render() {
        for (let x = 0; x < this.files; x += 1){
            for (let y = 0; y < this.ranks; y += 1){
                let rectColor = this.theme.light;
                let textColor = this.theme.dark;
            
                if ((x+y) % 2){
                    rectColor = this.theme.dark;
                    textColor = this.theme.light;
                }
            
                this.ctx.fillStyle = rectColor;
                this.ctx.fillRect(x * this.cellWidth,y * this.cellHeith,this.cellWidth, this.cellHeith);
                //posicion
                this.ctx.fillStyle = textColor;
    
                this.ctx.textBaseline = 'top';
                this.ctx.textAlign = 'start';
                this.ctx.font = '8px Arial';
                this.ctx.fillText(`[${x};${y}]`,x * this.cellWidth + 10, y * this.cellHeith + 10);
                    
                    //dibujo pieza
                const cell  = this.boardMatrix[x][y];
                if (cell.selected){
                    this.ctx.strokeStyle = '#FFDC4E';
                    this.ctx.lineWidth = 8;
                    this.ctx.strokeRect(x * this.cellWidth,y * this.cellHeith,this.cellWidth, this.cellHeith);
                }

                const piece  = cell ?. piece;
                if(piece){
                    this.ctx.fillStyle = piece.color;
                    this.ctx.textBaseline = 'middle';
                    this.ctx.textAlign = 'center';
                    this.ctx.font = '64px Arial';
                    this.ctx.fillText(piece.type[1],x * this.cellWidth + this.cellWidth / 2, y * this.cellHeith + this.cellHeith / 2);
                    this.ctx.fillStyle = this.pieceTheme.dark;
                    this.ctx.fillText(piece.type[0],x * this.cellWidth + this.cellWidth / 2, y * this.cellHeith + this.cellHeith / 2);    
                }
            }
        }
    }
}

export default Board;