import { Game } from './modules/game.js'
import { Palette } from './modules/palette.js';

// TODO: We can just store colors as ints and return strings when we JSON-ify them

var canvas = document.getElementById("canvas");
var body = document.getElementById("body");
var messageBox = document.getElementById("game-message");
var ctx;
var game = new Game("game-1", 15, 10);
var palette = new Palette(50, 50, 50);

function init() {
    if (canvas) {
        // same is defined in `style.css`
        canvas.width = 1000; 
        canvas.height = 600;
    } // TODO: handle null

    if (canvas.getContext) {
        ctx = canvas.getContext("2d");
    } // TODO: handle null
}

function draw() {
    // TODO: not handled width resize - cooridnates are just hardcoded
    
    let p1Color = "#FF0000";
    let p2Color = "#0000FF";

    // player plates style
    ctx.font = "bold 48px serif";
    ctx.textBaseline = "hanging";
    
    if (body) {
        if (game.currentPlayerId == 1) {
            body.style.backgroundImage = "linear-gradient(135deg, "+ "#FF9999, 5%" +", "+ "#FFFFFF" +")";
            p2Color = p2Color + "22"; // add alpha
        } else if (game.currentPlayerId == 2) {
            body.style.backgroundImage = "linear-gradient(-90deg, "+ "#6EE1F5, 5%" +", "+ "#FFFFFF" +")";
            p1Color = p1Color + "22"; // add alpha;
        } else {
            body.style.backgroundImage = "linear-gradient(90deg, "+ "0F0F0F" +", "+ "0F0F0F" +")";
        }
    }
    
    // draw player plates
    ctx.fillStyle = p1Color;
    ctx.fillText("P1", 0, 10);

    ctx.fillStyle = p2Color;
    ctx.fillText("P2", 825, 325);

    game.field.draw(ctx, 50, 50, 50, 50);
    palette.draw(ctx, 125, 400, game.players[(game.currentPlayerIndex + 1) % 2].colorId);
}

init();
draw();

// This is doable without a game loop
document.onkeydown = function(e) {
    var currentColorId = null;

    switch (e.keyCode) {
        case 37:
            palette.left();
            break;
        case 39:
            palette.right();
            break;
        case 13:
            currentColorId = palette.getCurrentColorIndex();
            break;
    }

    if (currentColorId != null) {
        game.handleMove(currentColorId);
    }

    // clean canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
}