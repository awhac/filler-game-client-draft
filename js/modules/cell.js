import { colors } from "./colors.js";

export class Cell {
    constructor(playerId) {
        this.colorId = Math.floor(Math.random() * colors.length);
        this.playerId = playerId;
    }

    // Make color darker or brighter
    // Example: adjustColor("#ff0000", -10); e.t.c
    //
    static _adjustColor(color, amount) {
        return '#' + color.replace(/^#/, '')
                          .replace(/../g, color => (
                          '0'+ Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
                      ).substr(-2));
    }

    draw(ctx, x, y, w, h) {
        // top left
        ctx.beginPath();
        ctx.moveTo(x, y + h / 2);
        ctx.lineTo(x + w / 2, y + h / 2);
        ctx.lineTo(x + w / 2, y);
        ctx.fillStyle = colors[this.colorId];
        ctx.fill();
    
        // top right
        ctx.beginPath();
        ctx.moveTo(x + w / 2, y + h / 2);
        ctx.lineTo(x + w, y + h / 2);
        ctx.lineTo(x + w / 2, y);
        ctx.fillStyle = Cell._adjustColor(colors[this.colorId], -50);
        ctx.fill();
    
        // bottom left
        ctx.beginPath();
        ctx.moveTo(x + w / 2, y + h / 2);
        ctx.lineTo(x, y + h / 2);
        ctx.lineTo(x + w / 2, y + h);
        ctx.fillStyle = Cell._adjustColor(colors[this.colorId], -50);
        ctx.fill();
    
        // bottom right
        ctx.beginPath();
        ctx.moveTo(x + w / 2, y + h / 2);
        ctx.lineTo(x + w / 2, y + h);
        ctx.lineTo(x + w, y + h / 2);
        ctx.fillStyle = Cell._adjustColor(colors[this.colorId], -100);
        ctx.fill();
    }

    static drawCell(ctx, x, y, w, h, customColor) {
        // top left
        ctx.beginPath();
        ctx.moveTo(x, y + h / 2);
        ctx.lineTo(x + w / 2, y + h / 2);
        ctx.lineTo(x + w / 2, y);
        ctx.fillStyle = customColor;
        ctx.fill();
    
        // top right
        ctx.beginPath();
        ctx.moveTo(x + w / 2, y + h / 2);
        ctx.lineTo(x + w, y + h / 2);
        ctx.lineTo(x + w / 2, y);
        ctx.fillStyle = Cell._adjustColor(customColor, -50);
        ctx.fill();
    
        // bottom left
        ctx.beginPath();
        ctx.moveTo(x + w / 2, y + h / 2);
        ctx.lineTo(x, y + h / 2);
        ctx.lineTo(x + w / 2, y + h);
        ctx.fillStyle = Cell._adjustColor(customColor, -50);
        ctx.fill();
    
        // bottom right
        ctx.beginPath();
        ctx.moveTo(x + w / 2, y + h / 2);
        ctx.lineTo(x + w / 2, y + h);
        ctx.lineTo(x + w, y + h / 2);
        ctx.fillStyle = Cell._adjustColor(customColor, -100);
        ctx.fill();
    }

    toJSON() {
        return {
            color: colors[this.colorId],
            playerId: this.playerId
        };
    }
};