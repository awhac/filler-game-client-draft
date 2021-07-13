import { Cell } from "./cell.js";

export class Field {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        
        this.cells = new Array(width * height).fill(0);
        for (let i = 0; i < this.cells.length; i++) {
            this.cells[i] = new Cell(0);
        }
    }

    isValidCell(y, x) {
        return (x >= 0 && x < this.width) && (y >= 0 && y < this.height);
    }

    debugFieldColors() {
        console.table(this.cells);
    }

    draw(ctx, x, y, cell_width, cell_height) { 
        for (let h = 0; h < this.height; h++) {
            for (let w = 0; w < this.width; w++) {
                let index = h * this.width + w;
                this.cells[index].draw(ctx, 
                    x + w * cell_width  + ((h % 2) * cell_width / 2), 
                    y + h * cell_height - (h * (cell_height / 2)), 
                    cell_width, 
                    cell_height
                    );
            }
        }
    }
}