import { Field } from "./field.js";
import { Player } from "./player.js";
import { colors } from "./colors.js";

export class Game {
    constructor(id, width, height) {
        this.id = id;
        this.width = width;
        this.height = height;
        
        this.field = new Field(width, height);

        // generate 2 random color indexes
        let col1 = 0, col2 = 0;
        while (col1 == col2) {
            col1 = Math.floor(Math.random() * colors.length);
            col2 = Math.floor(Math.random() * colors.length);
        }

        this.players = [
            new Player(1, col1), new Player(2, col2)
        ];

        this.currentPlayerId = 1;
        this.currentPlayerIndex = this.currentPlayerId - 1;

        this.winnerPlayerId = 0;

        // further Field initialization (1st cell to 1st player, last cell to 2nd player)
        this.field.cells[0].playerId = this.players[0].id;
        this.field.cells[0].colorId = this.players[0].colorId;
        this.field.cells[this.field.cells.length - 1].playerId = this.players[1].id;
        this.field.cells[this.field.cells.length - 1].colorId = this.players[1].colorId;
        
        // store each player cells
        this.playerOwnedCellIndexes = [
            [0],
            [this.field.cells.length - 1]
        ];
    }

    handleMove(colorId) {
        // TODO: players nearby cells must not block their first move
        //          and must not have the same color

        // players can't have same colors
        // ..still can sometimes block players first move
        if (colorId == this.players[(this.currentPlayerIndex + 1) % 2].colorId) {
            console.log("[handleMove]: Players cant have same colors");
            return;
        }

        // choosing the same color - is ok...as disallowing it might cause 
        // problems at the beginning of the game (where player is blocked)

        // update player color
        this.players[this.currentPlayerIndex].colorId = colorId;

        this._updatePlayerCells();
        this._nextPlayerTurn();
    }

    _updatePlayerCells() {
        let initialCount = this.playerOwnedCellIndexes[this.currentPlayerIndex].length;

        // update cells ids
        for (let i = 0; i < this.playerOwnedCellIndexes[this.currentPlayerIndex].length; i++) {
            let cellIndex = this.playerOwnedCellIndexes[this.currentPlayerIndex][i];
            let cellY = ~~(cellIndex / this.field.width); // same as Math.floor
            let cellX = cellIndex % this.field.width;

            // left
            let leftY = cellY - 1, leftX = cellX - !(cellY % 2);
            this._handleIndex(leftY, leftX);

            // top
            let topY = cellY - 1, topX = cellX + 1 - !(cellY % 2);
            this._handleIndex(topY, topX);

            // right 
            let rightY = cellY + 1, rightX = cellX + 1 - !(cellY % 2);
            this._handleIndex(rightY, rightX);

            // bottom
            let bottomY = cellY + 1, bottomX = cellX - !(cellY % 2);
            this._handleIndex(bottomY, bottomX);
        }

        // update cells color
        this.playerOwnedCellIndexes[this.currentPlayerIndex].forEach(cellId => {
            this.field.cells[cellId].playerId = this.players[this.currentPlayerIndex].id;
            this.field.cells[cellId].colorId = this.players[this.currentPlayerIndex].colorId;
        });

        console.log("[updatePlayerCells]: Added ", 
                    this.playerOwnedCellIndexes[this.currentPlayerIndex].length - initialCount, 
                    " cells"
        );
    }

    _handleIndex(y, x) {
        let index = y * this.field.width + x;

        if (this.field.isValidCell(y, x)) {
            if (this.field.cells[index].playerId != this.players[this.currentPlayerIndex].id) {
                if (this.field.cells[index].colorId == this.players[this.currentPlayerIndex].colorId) {
                    this.field.cells[index].playerId = this.players[this.currentPlayerIndex].id;
                    this.playerOwnedCellIndexes[this.currentPlayerIndex].push(index);
                } else {
                    console.log("[handleIndex]: Cell (y:", y,", x:", x, ") and player colors are different (p:", 
                    this.players[this.currentPlayerIndex].colorId, ", c:", this.field.cells[index].colorId, ")");
                }
            } else {
                console.log("[handleIndex]: Cell (y:", y,", x:", x, ") ID is the same as current player");
            }
        } else {
            console.log("[handleIndex]: Cell (y:", y,", x:", x, ") is invalid");
        }
    }

    _nextPlayerTurn() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % 2;
        this.currentPlayerId = this.currentPlayerIndex + 1;
    }
}