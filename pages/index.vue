<script setup lang="ts">
import { onMounted } from '#imports'
useHead({ title: "1D Minesweeper" });
const size = 16;
const mineCount = 3;
let map = [];
let canvas;
let ctx;
let tiles = [];

const atlas = new Image();
atlas.src = "./assets/texture_atlas.png";
await new Promise((resolve) => {
    atlas.onload = () => resolve(1);
});

class Cell {
    position: number;
    isMine: boolean;
    type: number;
    width: number;
    height: number;

    constructor(position, isMine, type) {
        this.position = position;
        this.isMine = isMine;
        this.type = type;
        this.width = 16;
        this.height = 17;
    }

    draw() {
        ctx.drawImage(atlas, this.type * this.width, 0, this.width, this.height, this.position * this.width, 0, this.width, this.height);
    }
}

onMounted(async ()=>{
    setup();
});

async function setup() {
    canvas = document.querySelector("canvas");
    canvas.width = 16 * size;
    canvas.height = 17;
    ctx = canvas.getContext("2d");

    await genMap();

    tiles = [];

    map.forEach((cell, i) => {
        switch (cell) {
            case false:
                tiles.push(new Cell(i, false, 3))
                break;

            case true:
                tiles.push(new Cell(i, true, 3))
                break;
        }
    })

    tiles.forEach((tile) => {
        tile.draw();
    })
}

async function genMap() {
    // Generation of map with correct size
    for(let i = 0; i < size; i++) {
        map[i] = false;
    }

    // Fills map with mines (true = cell has mine, false = doesn't)
    let isPlanted;
    let index;
    for (let i = 0; i < mineCount; i++) {
        isPlanted = false;
        while (!isPlanted) {
            index = Math.floor(Math.random() * size)
            if (!map[index]) {
                map[index] = true;
                isPlanted = true;
            }
        }
    }

    // console.log(...map);
}

async function lClickCell(event) {
    const pos = getMousePos(canvas, event);
    const index = Math.floor(pos.x / 16);
    if (!tiles[index].isMine) {
        let count = neighbors(index);
        tiles[index].type = count;
        if (count === 0) {
            let indexRec = index - 1;
            count = 0;
            while ((count === 0) && (indexRec >= 0)) {
                count = neighbors(indexRec);
                tiles[indexRec].type = count;
                tiles[indexRec].draw();
                indexRec--;
            }

            indexRec = index + 1;
            count = 0;
            while ((count === 0) && (indexRec < size)) {
                count = neighbors(indexRec);
                tiles[indexRec].type = count;
                tiles[indexRec].draw();
                indexRec++;
            }
        }
    }
    else if (tiles[index].isMine && (tiles[index].type > 2) && (tiles[index].type < 5)) {       
        tiles[index].type = 6;
        gameOver();
    }
    
    tiles[index].draw();
}

async function rClickCell(event) {
    const pos = getMousePos(canvas, event);
    const index = Math.floor(pos.x / 16);
    if (tiles[index].type === 3) {
        tiles[index].type = 4;
    }
    else if (tiles[index].type === 4) {
        tiles[index].type = 3;
    }

    tiles[index].draw();
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect(), // abs. size of element
    scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for x
    scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y

  return {
    x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
    y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
  }
}

async function gameOver() {
    tiles.forEach((tile, i) => {
        if (tile.isMine && (tile.type === 3)) {
            tile.type = 5;
        }

        tile.draw();
    })

    console.log("Game over!");
}

async function debug() {
    console.log("Map: " + map.toString());
    console.log("Tiles: ")
    tiles.forEach((tile, i) => {
        console.log("tile #" + i + " type: " + tile.type);
    });
}

function neighbors(index) {
    let count = 0;
    if (index > 0) {
        if (tiles[index - 1].isMine) {
            count++;
        }
    }

    if (index < size - 1) {
        if (tiles[index + 1].isMine) {
            count++;
        }
    }

    return count;
}
</script>

<template>
    <div class="flex justify-center flex-wrap pt-2 flex-col items-center min-w-[300px]">
        <button @click="debug()">Debug</button>
        <button @click="setup()">Start game</button>
        <canvas @click="lClickCell($event)" @contextmenu.prevent="rClickCell($event)" class="w-[95%] mt-5" style="image-rendering: pixelated"></canvas>
    </div>
</template>