# 1D Minesweeper
## 1 dimensional remake of an old classic
![screencapture-ebolblga-github-io-1D-Minesweeper-2022-10-27-08_13_49](https://user-images.githubusercontent.com/82185066/198197631-e6a59bc3-8881-4856-a817-f7b76e495574.png)  


Minesweeper is a logic game that became famous after getting included in Windows 3.1 release. More about this game and its rules you can read on [MinesweeperWiki](https://minesweepergame.com/website/authoritative-minesweeper/wiki/Windows_Minesweeper). While the original game is 2D (everything happens on a plane), my idea was to make it only 1D (everything happens on a single line). You can find 3D and even 4D versions on the internet, even hexagonal and triangular versions, but to my surprise no one was dumb enough to remake it in a single dimension until me.

Texture atlas is also 1D:  
![image](https://user-images.githubusercontent.com/82185066/197850339-6fef63d5-78a2-4dbb-a599-cef29248a9a2.png)  
One of the biggest challenges of 1D games is making players understand what is happening even. By using depth map and carefully chosen textures it is possible to make a 3D-like scene - [Mashpoe](https://youtu.be/3xx7sgNVE-A) did it for example. I, on the other hand, couldn't rely on shaders and 3D anaglyph effect, my only tool was textures. The fact that textures of the original Minesweeper are so recognizable helps a lot too, plus to that I think I did a good job at keeping key parts of original sprites, for example:
- empty cell didn't change at all
- 1 and 2 instead of using Arabic numerals, use roman - I and II
- default cell clearly looks 3D'ish
- flag uses gradient, emulating the original triangular look
- mines are spiky
- crossed mine uses same 2 red lines, just positioned differently

Some down sides of this project, just like in the original game - sometimes you have to guess. And sadly in single dimension it's more often. Also, just like in the original game, it is possible to solve level with 1 click (3BV = 1).

## Default levels
First thing I did is I analised original levels
- Beginner - 8x8, 10 Mines, 15.625% density
- Intermediate - 16x16, 40 Mines, 15.625% density
- Expert - 30x16, 99 Mines, 20.625% density

So now I had two options, keep same density:
- Beginner - 32x1, 5 Mines, 15.625% density
- Intermediate - 64x1, 10 Mines, 15.625% density
- Expert - 160x1, 33 Mines, 99 Mines, 20.625% density

Or keep original width, adjusting mine count as close as possible:
- Beginner - 8x1 1 Mine, 12.5% density
- Intermediate - 16x1, 3 Mines, 18.75%% density
- Expert - 30x1, 6 Mines, 20% density

I went with second option, although it is pretty "fun" to try first variant in custom mode.

## [Speedrunning](https://www.speedrun.com/minesweeper)
Since I wanted to pay homage to the original game, I also tried to bring speedrunning part of Minesweeper to this remake. Here are the available statistics you can track:
- Time - total time it took you to complete the level
- [3BV](http://www.stephan-bechtel.de/3bv.htm) - shows minimal amount of clicks needed to solve the level for no flag players (NF)
- [3BV/s](https://minesweepergame.com/website/authoritative-minesweeper/wiki/3BV#3BV_and_3BV.2Fs) - 3BV per second of total time
- Clicks - total left clicks + total right clicks
- Efficiency - 3BV devided by total time
- CL/s - simply clicks per second
- Mine density - amount of tiles divided by amount of mines
- [IOE](https://minesweepergame.com/statistics.php) - 3BV / total clicks
- [RQP](https://minesweepergame.com/statistics.php) - total time / 3BV/s

## Board statistics
After watching a video by [хGames Computers Play](https://youtu.be/YTnelZkjB68) about probabilities of getting and 8, or two 8's in a shape of an 8 in the original game I got interested in finding something cool in 1D version. As you can guess there aren't that many cool patterns in 1 dimension. I guess coolest is getting two 2's in intermediate - 4.787%  

![21aqwf](https://user-images.githubusercontent.com/82185066/198197349-7f340244-0436-41f7-977a-97cb8379a759.png)  

## 6 Segment display
Since original Minesweeper used 7 segment display, I went for -1 here too and used 6 segment display. Insporation came from [Posy](https://youtu.be/RTB5XhjbgZA) and his 6 segment display design called [X Black](http://www.michieldb.nl/other/segments/). I made a pixelated version of it with nice [Bayer2x2](https://en.wikipedia.org/wiki/Ordered_dithering) dithering for unlit segments and I think it looks really cool:  
![image](https://user-images.githubusercontent.com/82185066/198189577-7e1eb15b-e042-4bd3-a7ae-49fd2c94e322.png)  

This was a really stupid, but a fun project to work on, I hope you enjoy!

## How to launch yourself using [Node.js](https://nodejs.org/en/) and [Visual Studio Code](https://code.visualstudio.com/download)

```bash
# install yarn
npm install --global yarn

# now install all modules
yarn

# now start project
yarn dev

# build ssg version
yarn build
```

## License
This program is licensed under the Apache License 2.0. Please read the License file to know about the usage terms and conditions.
