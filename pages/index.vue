<script setup lang="ts">
import { onMounted } from '#imports'
useHead({ title: "1D Minesweeper" });

const mapSize = ref(16);   // amount of cells
const mineCount = ref(3);   // amout of mines
const isCustom = ref(false);    // true if custom mode selected
let map = [];   // generated map of mines
let canvas, ctx; // game canvas
let tiles = []; // tile map
const isOver = ref(false);  // true if game ended
let firstClick = true;  // used to move mine on first click
const leftClicks = ref(0);  // counts left clicks
const rightClicks = ref(0); // counts right clicks
const startTime = ref();    // keeps time of the first click
const finalTime = ref(0);    // calculated total time the game took
const won = ref(false); // true if player won
const _3bv = ref(0);    // calculated 3bv http://www.stephan-bechtel.de/3bv.htm
const flagsLeft = ref(3);   // flag display

const atlas = new Image();
atlas.src = "./assets/texture_atlas.png";
await new Promise((resolve) => {
    atlas.onload = () => resolve(1);
});

// canvas needed for animated favicon
let faviCanvas = document.createElement("canvas");
faviCanvas.width = 16;
faviCanvas.height = 16;
let favictx = faviCanvas.getContext("2d");

async function setFavicon(mode) {
    const img = new Image();

    switch (mode) {
        case 0: {
            img.src = "./favicon.ico";
            break;
        }
        case 1: {
            img.src = "./favicon_1.ico";
            break;
        }
        case 2: {
            img.src = "./favicon_2.ico";
            break;
        }
        case 3: {
            img.src = "./favicon_3.ico";
            break;
        }
    }

    await new Promise((resolve) => {
        img.onload = () => resolve(1);
    });

    favictx.drawImage(img, 0, 0, 16, 16);
    let favicon = document.getElementById("favicon");
    favicon.setAttribute("href", faviCanvas.toDataURL());
	history.replaceState(null, null, window.location.hash == "#1" ? "#0" : "#1");
}

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
    setupGame();
});

async function setupGame() {
    setFavicon(1);
    isOver.value = false;
    firstClick = true;
    leftClicks.value = 0;
    rightClicks.value = 0;
    finalTime.value = 0;
    won.value = false;
    _3bv.value = 0;
    flagsLeft.value = mineCount.value;

    if (mineCount.value > Math.floor(mapSize.value / 3)) {
        mineCount.value = Math.floor(mapSize.value / 3);
        if (mineCount.value < 1) {
            mineCount.value = 1;
        }
    }

    canvas = document.querySelector("canvas");
    canvas.width = 16 * mapSize.value;
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
    for (let i = 0; i < mapSize.value; i++) {
        map[i] = false;
    }

    // Fills map with mines (true = cell has mine, false = doesn't)
    let isPlanted;
    let index;
    for (let i = 0; i < mineCount.value; i++) {
        isPlanted = false;
        while (!isPlanted) {
            index = Math.floor(Math.random() * mapSize.value)
            if (!map[index]) {
                map[index] = true;
                isPlanted = true;
            }
        }
    }

    // console.log(...map);
}

async function leftClickEvent(event) {
    if (isOver.value) return;
    const pos = getMousePos(canvas, event);
    const index = Math.floor(pos.x / 16);
    if (tiles[index].type === 4) return;
    if (firstClick) {
        startTime.value = Date.now();
        if (tiles[index].isMine) {
            for(let i = 0; i < mapSize.value; i++) {
                if (!tiles[i].isMine) {
                    tiles[i].isMine = true;
                    map[i] = true;
                    break;
                }
            }

            tiles[index].isMine = false;
            map[index] = false;
            tiles[index].type = countNeighbors(index);
        }

        firstClick = false;
    } 

    if (!tiles[index].isMine) {
        let count = countNeighbors(index);
        tiles[index].type = count;
        if (count === 0) {
            let indexRec = index - 1;
            count = 0;
            while ((count === 0) && (indexRec >= 0)) {
                count = countNeighbors(indexRec);
                tiles[indexRec].type = count;
                tiles[indexRec].draw();
                indexRec--;
            }

            indexRec = index + 1;
            count = 0;
            while ((count === 0) && (indexRec < mapSize.value)) {
                count = countNeighbors(indexRec);
                tiles[indexRec].type = count;
                tiles[indexRec].draw();
                indexRec++;
            }
        }
    }
    else if (tiles[index].isMine && (tiles[index].type > 2) && (tiles[index].type < 5)) {  
        tiles[index].type = 6;
        stopGame();  
    }
    
    tiles[index].draw();
    leftClicks.value++;

    if (checkWin()) {
        stopGame(true); 
    }
}

async function rightClickEvent(event) {
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
    rightClicks.value++;
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

async function stopGame(didWin = false) {
    finalTime.value = Date.now() - startTime.value;
    if (didWin) {
        setFavicon(2);
    }
    else {
        setFavicon(3);
    }

    isOver.value = true;
    won.value = didWin;

    tiles.forEach((tile, i) => {
        if (tile.isMine && (tile.type === 3)) {
            tile.type = 5;
        }
        else if ((!tile.isMine) && (tile.type === 4)) {
            tile.type = 7;
        }
        tile.draw();
    })

    _3bv.value = bbbv();
}

async function debug() {
    console.log("Map: " + map.toString());
    console.log("Tiles: ")
    tiles.forEach((tile, i) => {
        console.log("tile #" + i + " type: " + tile.type + ", has mine: " + tile.isMine);
    });
}

function countNeighbors(index) {
    let count = 0;
    if (index > 0) {
        if (tiles[index - 1].isMine) {
            count++;
        }
    }

    if (index < mapSize.value - 1) {
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
    
    if (finishedCells === mapSize.value) {
        return true;
    }
    else return false;
}

function bbbv() {
    let _3BV = 0;
    let hadEmt = 0;

    for (let i = 0; i < mapSize.value; i++) {
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
    <div class="flex justify-center flex-wrap pt-2 flex-col items-center min-w-[300px] select-none">
        <!-- <button @click="debug()">Debug</button> -->
        <div class="border-4 border-[#0855DD] w-[95vw] rounded-lg bg-[#C0C0C0] min-w-[300px] mt-5">
            <div class="w-full h-6 bg-[#0855DD] text-white font-bold px-3 flex flex-row justify-between">
                1D Minesweeper
                <a href="https://youtu.be/Gb2jGy76v0Y" target="_blank" rel="noopener noreferrer">
                    <img  src="/assets/bar.png" style="image-rendering: pixelated" class="cursor-pointer h-4 mt-1" />
                </a>
            </div>
            <div class="bg-[#ECE9D8] text-left flex flex-row">
                <p class="ml-2 cursor-pointer" @click="mapSize = 8; mineCount = 1; setupGame(); isCustom = false;">Beginner</p>
                <p class="ml-2 cursor-pointer" @click="mapSize = 16; mineCount = 3; setupGame(); isCustom = false;">Intermediate</p>
                <p class="ml-2 cursor-pointer" @click="mapSize = 30; mineCount = 6; setupGame(); isCustom = false;">Expert</p>
                <div class="text-left h-6 w-full flex flex-row-reverse">
                    <input class="mr-2 border-2 w-10 cursor-pointer" type="number" v-model = mineCount :disabled="!isCustom" @change="setupGame()" min="1" max="200"/>
                    <input class="mr-2 border-2 w-10 cursor-pointer" type="number" v-model = mapSize :disabled="!isCustom" @change="setupGame()" min="1" max="200"/>
                    <p class="mr-2" @click="setupGame(); isCustom = true;">Custom</p>
                </div>
            </div>
            <div class="bg-white p-1">
                <div class="border-4 border-[#808080] bg-[#C0C0C0] flex flex-row">
                    <div class="w-[33%] h-[64px] text-center my-auto text-[#FF0000] text-lg font-black">
                        <p>{{ flagsLeft }}</p>
                    </div>
                    <div class="w-[33%] h-[64px]">
                        <img v-if="!isOver" @click="setupGame()" src="/assets/default.png" style="image-rendering: pixelated" class="ml-auto mr-auto my-2 cursor-pointer" />
                        <img v-if="isOver && won" @click="setupGame()" src="/assets/won.png" style="image-rendering: pixelated" class="ml-auto mr-auto my-2 cursor-pointer" />
                        <img v-if="isOver && !won" @click="setupGame()" src="/assets/lost.png" style="image-rendering: pixelated" class="ml-auto mr-auto my-2 cursor-pointer" />
                    </div>
                    <div class="w-[33%] h-[64px] text-center my-auto text-[#FF0000] text-lg font-black flex flex-col">
                        <p>{{ mapSize }}x1</p>
                        <!-- <img src="/assets/display/0.png" style="image-rendering: pixelated" class="ml-auto mr-auto cursor-pointer h-[64px]" /> -->
                    </div>
                </div>
                <div class="bg-[#808080] p-1">
                    <canvas @click="leftClickEvent($event)" @contextmenu.prevent="rightClickEvent($event)" class="w-full" style="image-rendering: pixelated" width="256" height="16" ></canvas>
                </div>
            </div>
        </div>
        <div v-if="isOver" class="mt-3">
            <p v-if="won" class="text-center text-lg mb-3">You won!</p>
            <p v-else class="text-center text-lg mb-3">You lost...</p>
            <div class="select-text" v-if="won">
                <p>Time: <b>{{ finalTime / 1000 }}</b> sec</p>
                <a href="http://www.stephan-bechtel.de/3bv.htm" target="_blank" rel="noopener noreferrer" class="underline">3BV: {{ _3bv }}</a><br>
                <a href="https://minesweepergame.com/website/authoritative-minesweeper/wiki/3BV#3BV_and_3BV.2Fs" target="_blank" rel="noopener noreferrer" class="underline">3BV/sec: {{ Math.round((_3bv / (finalTime / 1000)) * 10000) / 10000 }}</a>
                <p>Clicks: {{ leftClicks }} + {{ rightClicks }}</p>
                <p>Efficiency: {{ Math.round(((_3bv / (leftClicks + rightClicks)) * 100) * 10000) / 10000 }}%</p>
                <p>CL/s: {{ Math.round(((leftClicks + rightClicks) / (finalTime / 1000)) * 10000) / 10000 }}</p>
                <p>Mine density: {{ Math.round((mineCount / mapSize * 100) * 10000) / 10000 }}%</p>
                <a href="https://minesweepergame.com/statistics.php" target="_blank" rel="noopener noreferrer" class="underline">IOE: {{ Math.round((_3bv / (leftClicks + rightClicks)) * 10000) / 10000 }}</a><br>
                <a href="https://minesweepergame.com/statistics.php" target="_blank" rel="noopener noreferrer" class="underline">RQP: {{ Math.round((finalTime / 1000) /  _3bv / (finalTime / 1000) * 10000) / 10000 }}</a><br>
            </div>
        </div>
    </div>
</template>