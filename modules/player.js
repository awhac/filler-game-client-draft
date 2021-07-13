import { colors } from "./colors.js";

export class Player {
    constructor(id, colorId) {
        this.id = id;
        this.colorId = colorId;
    }

    toJSON() {
        return {
            id: this.id,
            color: colors[this.colorId]
        };
    }
}