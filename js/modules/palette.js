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

    right(excludedColorId) {
        this.currentColorIndex = ((this.currentColorIndex + 1) % colors.length) === excludedColorId ? (this.currentColorIndex + 2) % colors.length :
                                (this.currentColorIndex + 1) % colors.length;
    }
    
    left(excludedColorId) {
        this.currentColorIndex = ((this.currentColorIndex - 1 + colors.length) % colors.length) === excludedColorId ? (this.currentColorIndex - 2 + colors.length) % colors.length :  
                                (this.currentColorIndex - 1 + colors.length) % colors.length;
    }

    // make current cell bigger
    draw(ctx, x, y, excludedColorId) {
        // in case current color is now excluded we just scip to the next one
        if (this.currentColorIndex === excludedColorId) {
            this.right(excludedColorId);
        }

        for (let i = 0; i < colors.length; i++) {
            Cell.drawCell(
                ctx,
                                                  /* Calibrate (x) offset for enlarged cell */ 
                x + (2 * i * this.cellPadding) - ((i == this.currentColorIndex) * 10), 
                    /* Calibrate (y) offset for enlarged cell */
                y - ((i == this.currentColorIndex) * 10), 
                this.cellWidth + ((i == this.currentColorIndex) * 20), 
                this.cellHeight + ((i == this.currentColorIndex) * 20), 
                i == excludedColorId ? colors[i] + "5F" : colors[i]
            );
        }
    }

    // for mouse events (returns picked color id, otherwise `-1`)
    // ..yeah we check collsion with square instead of rhombus .. whatever
    checkCollision(x, y, excludedColorId, mouseX, mouseY) {
        for (let i = 0; i < colors.length; i++) {   
                if (i == excludedColorId) {
                    continue;
                }

                var elementX = x + (2 * i * this.cellPadding) - ((i == this.currentColorIndex) * 10), 
                    elementY = y - ((i == this.currentColorIndex) * 10), 
                    elementWidth = this.cellWidth + ((i == this.currentColorIndex) * 20), 
                    elementHeight = this.cellHeight + ((i == this.currentColorIndex) * 20);

                if (mouseY > elementY && mouseY < elementY + elementHeight
                    && mouseX > elementX && mouseX < elementX + elementWidth) {
                        return i;
                    }
        }

        return -1;
    }

}