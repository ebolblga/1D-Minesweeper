# 1D-Minesweeper
## 1 dimensional remake of an old classic
![image](https://user-images.githubusercontent.com/82185066/197916082-86298f11-fd51-469a-9440-6fa983172319.png)  

Minesweeper is a logic game that became famous after getting included in Windows 3.1 release. More about this game and it's rules you can read on [MinesweeperWiki](https://minesweepergame.com/website/authoritative-minesweeper/wiki/Windows_Minesweeper). While the original game is 2D (everything happens on a plane), my idea was to make it only 1D (everything happens on a single line). You can find 3D and even 4D versions on the internet, but to my surprise no one was dumb enough to remake it in a single dimension untill me.

Texture atlas is also 1D:  
![image](https://user-images.githubusercontent.com/82185066/197850339-6fef63d5-78a2-4dbb-a599-cef29248a9a2.png)  
One of the biggest challenges of 1D games is making players understand what is happening even. By using depth map and carefully chosen textures it is possible to make a 3D-like scene - [Mashpoe](https://youtu.be/3xx7sgNVE-A) did it for example. I, on the other hand, couldn't rely on shaders and 3D anaglyph effect, my only tool was textures. The fact that textures of the original Minesweeper are so recognizable helps a lot too, plus to that I think I did a good job at keeping key parts of original sprites, for example:
- empty cell didn't change at all
- 1 and 2 instead of using arabic numerals, use roman - I and II
- default cell clearly looks 3D'ish
- flag uses gradient, emulating original triangular look
- mines are spiky
- crossed mine uses same 2 red lines, just positioned differently

I tried my best to stay as close to the original game as possible, for example if it happens that you click on mine on your first click, min will get moved to top left corner (or step to the right untill finds free spot).

![image](https://user-images.githubusercontent.com/82185066/198094451-85f70995-d1ca-4635-a152-ed5030b07ef9.png)  
![image](https://user-images.githubusercontent.com/82185066/198095915-14b74858-6d1f-439a-b70a-8fce335e683e.png)



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
