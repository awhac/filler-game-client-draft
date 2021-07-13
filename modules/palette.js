import { colors } from "./colors.js";
import { Cell } from "./cell.js";

export class Palette {
    constructor(cellWidth, cellHeight, cellPadding) {
        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;
        this.cellPadding = cellPadding;

        this.currentColorIndex = 0;
    }

    getCurrentColor() {
        return colors[this.currentColorIndex];
    }

    getCurrentColorIndex() {
        return this.currentColorIndex;
    }

    // Do we really need it ? (functions: right, left) We can just select with mouse
    // But for now we can do it with keyboard events -- it is easier

    right() {
        this.currentColorIndex = (this.currentColorIndex + 1) % colors.length;
    }
    
    left() {
        this.currentColorIndex = this.currentColorIndex == 0 ? colors.length - 1 : this.currentColorIndex - 1;
    }

    // make current cell bigger
    draw(ctx, x, y, excludedColorId) {
        for (let i = 0; i < colors.length; i++) {
            Cell.drawCell(
                ctx,
                                                  /* Calibrate (x) offset for enlarged cell */ 
                x + (2 * i * this.cellPadding) - ((i == this.currentColorIndex) * 10), 
                    /* Calibrate (y) offset for enlarged cell */
                y - ((i == this.currentColorIndex) * 10), 
                this.cellWidth + ((i == this.currentColorIndex) * 20), 
                this.cellHeight + ((i == this.currentColorIndex) * 20), 
                i == excludedColorId ? Cell._adjustColor(colors[i], -200) : colors[i]
            );
        }
    }
}