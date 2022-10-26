<script setup lang="ts">
import { onMounted } from '#imports'
useHead({ title: "1D Minesweeper" });
const size = ref(16);
const mineCount = ref(3);
const isCustom = ref(false);
let map = [];
let canvas;
let ctx;
let tiles = [];
const isOver = ref(false);
let firstClick = true;
const clicks = ref(0);
const startTime = ref();
const finalTime = ref();
const won = ref(false);
const _3bv = ref(0);
const flagsLeft = ref(3);

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
        this.height = 16;
    }

    draw() {
        ctx.drawImage(atlas, this.type * this.width, 0, this.width, this.height, this.position * this.width, 0, this.width, this.height);
    }
}

onMounted(async ()=>{
    setup();
});

async function setup() {
    isOver.value = false;
    firstClick = true;
    clicks.value = 0;
    finalTime.value = 0;
    won.value = false;
    _3bv.value = 0;

    if (mineCount.value > Math.floor(size.value / 3)) {
        mineCount.value = Math.floor(size.value / 3);
        if (mineCount.value < 1) {
            mineCount.value = 1;
        }
    }

    canvas = document.querySelector("canvas");
    canvas.width = 16 * size.value;
    canvas.height = 17;
    ctx = canvas.getContext("2d");

    tiles = [];
    map = [];
    await genMap();

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
    for (let i = 0; i < size.value; i++) {
        map[i] = false;
    }

    // Fills map with mines (true = cell has mine, false = doesn't)
    let isPlanted;
    let index;
    for (let i = 0; i < mineCount.value; i++) {
        isPlanted = false;
        while (!isPlanted) {
            index = Math.floor(Math.random() * size.value)
            if (!map[index]) {
                map[index] = true;
                isPlanted = true;
            }
        }
    }

    // console.log(...map);
}

async function lClickCell(event) {
    if (isOver.value) return;
    const pos = getMousePos(canvas, event);
    const index = Math.floor(pos.x / 16);
    if (firstClick) {
        startTime.value = Date.now();
        if (tiles[index].isMine) {
            for(let i = 0; i < size.value; i++) {
                if (!tiles[i].isMine) {
                    tiles[i].isMine = true;
                    map[i] = true;
                    break;
                }
            }

            tiles[index].isMine = false;
            map[index] = false;
            tiles[index].type = neighbors(index);
        }

        firstClick = false;
    } 

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
            while ((count === 0) && (indexRec < size.value)) {
                count = neighbors(indexRec);
                tiles[indexRec].type = count;
                tiles[indexRec].draw();
                indexRec++;
            }
        }
    }
    else if (tiles[index].isMine && (tiles[index].type > 2) && (tiles[index].type < 5)) {  
        tiles[index].type = 6;
        //console.log("You lost!");
        gameOver();  
    }
    
    tiles[index].draw();
    clicks.value++;

    if (checkWin()) {
        won.value = true;
        //console.log("You won!");
        gameOver(); 
    }
}

async function rClickCell(event) {
    if (isOver.value) return;
    const pos = getMousePos(canvas, event);
    const index = Math.floor(pos.x / 16);
    if (tiles[index].type === 3) {
        tiles[index].type = 4;
        flagsLeft.value--;
    }
    else if (tiles[index].type === 4) {
        tiles[index].type = 3;
        flagsLeft.value++;
    }

    tiles[index].draw();
    clicks.value++;
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
    finalTime.value = Date.now() - startTime.value;
    tiles.forEach((tile, i) => {
        if (tile.isMine && (tile.type === 3)) {
            tile.type = 5;
        }
        else if ((!tile.isMine) && (tile.type === 4)) {
            tile.type = 7;
        }

        tile.draw();
    })

    isOver.value = true;
    _3bv.value = tbv();
}

async function debug() {
    console.log("Map: " + map.toString());
    console.log("Tiles: ")
    tiles.forEach((tile, i) => {
        console.log("tile #" + i + " type: " + tile.type + ", has mine: " + tile.isMine);
    });
}

function neighbors(index) {
    let count = 0;
    if (index > 0) {
        if (tiles[index - 1].isMine) {
            count++;
        }
    }

    if (index < size.value - 1) {
        if (tiles[index + 1].isMine) {
            count++;
        }
    }

    return count;
}

function checkWin() {
    let finishedCells = 0;
    tiles.forEach((tile) => {
        if (tile.isMine && (tile.type > 2) && (tile.type < 5)) {
            finishedCells++;
        }
        else if ((!tile.isMine) && (tile.type < 3)) {
            finishedCells++;
        }
    });
    
    if (finishedCells === size.value) {
        return true;
    }
    else return false;
}

function tbv() {
    let _3BV = 0;
    let hadEmt = 0;

    for (let i = 0; i < size.value; i++) {
        // console.log("#" + i + ": " + map[i]);
        if (!map[i]) {
            hadEmt++;
        }
        else {
            if (hadEmt > 2) {
                _3BV++; 
            }
            else if (hadEmt === 2) {
                if (i === 2) {
                    _3BV++;
                }
                else {
                    _3BV += 2;
                }
            }
            else if (hadEmt === 1) {
                _3BV++; 
            }

            hadEmt = 0;
        }
        // console.log("#" + i + " 3bv: " + _3BV);
    }

    if (hadEmt) {
        _3BV++;
    }

    return _3BV;
}
</script>

<template>
    <div class="flex justify-center flex-wrap pt-2 flex-col items-center min-w-[300px]">
        <!-- <button @click="debug()">Debug</button> -->
        <div class="border-4 border-[#0855DD] w-[95vw] rounded-lg bg-[#C0C0C0] min-w-[300px] mt-5">
            <div class="w-full h-6 bg-[#0855DD] text-white font-bold pl-3">1D Minesweeper</div>
            <div class="bg-[#ECE9D8] text-left flex flex-row">
                <p class="ml-2 cursor-pointer" @click="size = 8; mineCount = 1; setup(); isCustom = false;">Beginner</p>
                <p class="ml-2 cursor-pointer" @click="size = 16; mineCount = 3; setup(); isCustom = false;">Intermediate</p>
                <p class="ml-2 cursor-pointer" @click="size = 30; mineCount = 6; setup(); isCustom = false;">Expert</p>
                <div class="text-left h-6 w-full flex flex-row-reverse">
                    <input class="mr-2 border-2 w-10 cursor-pointer" type="number" v-model = mineCount :disabled="!isCustom" @change="setup()" min="1" max="200"/>
                    <input class="mr-2 border-2 w-10 cursor-pointer" type="number" v-model = size :disabled="!isCustom" @change="setup()" min="1" max="200"/>
                    <p class="mr-2" @click="setup(); isCustom = true;">Custom</p>
                </div>
            </div>
            <div class="bg-white p-1">
                <div class="border-4 border-[#808080] bg-[#C0C0C0] flex flex-row">
                    <div class="w-[33%] h-full text-center my-auto text-[#FF0000] text-lg font-black">
                        <p>{{ flagsLeft }}</p>
                    </div>
                    <div class="w-[33%] h-full">
                        <img v-if="!isOver" @click="setup()" src="/assets/default.png" style="image-rendering: pixelated" class="ml-auto mr-auto my-2 cursor-pointer" />
                        <img v-if="isOver && won" @click="setup()" src="/assets/won.png" style="image-rendering: pixelated" class="ml-auto mr-auto my-2 cursor-pointer" />
                        <img v-if="isOver && !won" @click="setup()" src="/assets/lost.png" style="image-rendering: pixelated" class="ml-auto mr-auto my-2 cursor-pointer" />
                    </div>
                    <div class="w-[33%] h-full text-center my-auto text-[#FF0000] text-lg font-black">
                        <p>{{ size }}x1</p>
                    </div>
                </div>
                <div class="bg-[#808080] p-1">
                    <canvas @click="lClickCell($event)" @contextmenu.prevent="rClickCell($event)" class="w-full" style="image-rendering: pixelated"></canvas>
                </div>
            </div>
        </div>
        <div v-if="isOver" class="mt-3">
            <p v-if="won" class="text-center text-lg mb-3">You won!</p>
            <p v-else class="text-center text-lg mb-3">You lost...</p>
            <div v-if="won">
                <p>Time: <b>{{ finalTime / 1000 }}</b> sec</p>
                <a href="http://www.stephan-bechtel.de/3bv.htm" target="_blank" rel="noopener noreferrer" class="underline">3BV: {{ _3bv }}</a><br>
                <a href="https://minesweepergame.com/website/authoritative-minesweeper/wiki/3BV#3BV_and_3BV.2Fs" target="_blank" rel="noopener noreferrer" class="underline">3BV/sec: {{ Math.round((_3bv / (finalTime / 1000)) * 10000) / 10000 }}</a>
                <p>Clicks: {{ clicks }}</p>
                <p>Efficiency: {{ Math.round(((_3bv / clicks) * 100) * 10000) / 10000 }}%</p>
                <p>CL/s: {{ Math.round((clicks / (finalTime / 1000)) * 10000) / 10000 }}</p>
            </div>
        </div>
    </div>
</template>